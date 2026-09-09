export interface ServiceItem {
  id: string;
  name: string;
  category: 'Hair' | 'Brows';
  tags: string[];
  price: string;
  priceNumeric: number;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  image: string;
  featuredOrder?: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  tag: string;
  date: string;
}

export interface BookingFormState {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  enquiry?: {
    id: string;
    timestamp: string;
    name: string;
    phone: string;
    service: string;
  };
  rowCount?: number;
}
