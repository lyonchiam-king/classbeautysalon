import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface Enquiry {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  status: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");
const CSV_FILE = path.join(DATA_DIR, "enquiries.csv");

// Ensure data directory and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, "Timestamp,ID,Name,Phone,Service,Preferred Date,Preferred Time,Notes,Status\n", "utf8");
}

if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), "utf8");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Submit Enquiry (Appends row to Spreadsheet CSV & JSON)
  app.post("/api/enquiries", async (req, res) => {
    try {
      const { name, phone, service, preferredDate, preferredTime, notes } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ error: "Name and phone number are required." });
      }

      const timestamp = new Date().toISOString();
      const id = "ENQ-" + Math.floor(1000 + Math.random() * 9000);
      
      const newEnquiry: Enquiry = {
        id,
        timestamp,
        name,
        phone,
        service: service || "General Booking",
        preferredDate: preferredDate || "As soon as possible",
        preferredTime: preferredTime || "Any time",
        notes: notes || "",
        status: "New"
      };

      // Read existing
      let enquiries: Enquiry[] = [];
      try {
        const raw = fs.readFileSync(ENQUIRIES_FILE, "utf8");
        enquiries = JSON.parse(raw);
      } catch {
        enquiries = [];
      }

      enquiries.unshift(newEnquiry);
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), "utf8");

      // Append row to CSV (Spreadsheet Format)
      const sanitizeCsv = (str: string) => `"${(str || "").replace(/"/g, '""')}"`;
      const csvRow = `${sanitizeCsv(timestamp)},${sanitizeCsv(id)},${sanitizeCsv(name)},${sanitizeCsv(phone)},${sanitizeCsv(newEnquiry.service)},${sanitizeCsv(newEnquiry.preferredDate)},${sanitizeCsv(newEnquiry.preferredTime)},${sanitizeCsv(newEnquiry.notes)},${sanitizeCsv(newEnquiry.status)}\n`;
      fs.appendFileSync(CSV_FILE, csvRow, "utf8");

      // Forward to Google Sheets Webhook if configured in ENV
      const googleSheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (googleSheetsWebhook) {
        try {
          await fetch(googleSheetsWebhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEnquiry),
          });
        } catch (err) {
          console.error("Failed to forward to Google Sheets Webhook:", err);
        }
      }

      return res.json({
        success: true,
        message: "Enquiry logged successfully to salon booking spreadsheet.",
        enquiry: newEnquiry,
        rowCount: enquiries.length
      });
    } catch (err) {
      console.error("Error saving enquiry:", err);
      return res.status(500).json({ error: "Failed to process enquiry." });
    }
  });

  // API Route: Get Enquiries (For Owner Spreadsheet view or export)
  app.get("/api/enquiries", (req, res) => {
    try {
      if (req.query.format === "csv") {
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", 'attachment; filename="class_beauty_salon_enquiries.csv"');
        return res.sendFile(CSV_FILE);
      }
      
      const raw = fs.readFileSync(ENQUIRIES_FILE, "utf8");
      const enquiries = JSON.parse(raw);
      return res.json({ enquiries, csvUrl: "/api/enquiries?format=csv" });
    } catch {
      return res.json({ enquiries: [], csvUrl: "/api/enquiries?format=csv" });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Class Beauty Salon server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
