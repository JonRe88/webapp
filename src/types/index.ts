export interface User {
  id: string;
  email: string;
  role: 'traveler' | 'agent';
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  images: string[];
  enabled: boolean;
  agent_id: string;
}

export interface Room {
  id: string;
  hotel_id: string;
  room_type: string;
  base_price: number;
  tax_rate: number;
  location: string;
  capacity: number;
  enabled: boolean;
}

export interface Guest {
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  document_type: string;
  document_number: string;
  email: string;
  phone: string;
}

export interface EmergencyContact {
  full_name: string;
  phone: string;
}

export interface Reservation {
  id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: Guest[];
  emergency_contact: EmergencyContact;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}