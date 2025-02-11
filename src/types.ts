export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'agent';
}

export interface Guest {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  documentType: 'passport' | 'id' | 'driver_license';
  documentNumber: string;
  email: string;
  phone: string;
}

export interface EmergencyContact {
  fullName: string;
  phone: string;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  city: string;
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  basePrice: number;
  taxes: number;
  capacity: number;
  image: string;
  type: 'standard' | 'deluxe' | 'suite' | 'family';
  location: string;
  isEnabled: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  image: string;
  isEnabled: boolean;
  rooms: Room[];
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  hotelId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guest: Guest;
  emergencyContact: EmergencyContact;
  room: Room;
  hotel: Hotel;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
  totalAmount: number;
}