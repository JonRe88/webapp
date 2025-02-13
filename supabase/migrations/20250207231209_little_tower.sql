/*
  # Initial Schema for Hotel Management System

  1. New Tables
    - `hotels`
      - Basic hotel information
      - Managed by travel agents
    - `rooms`
      - Hotel room details including pricing and availability
    - `reservations`
      - Booking information
    - `guests`
      - Guest information for reservations
    - `emergency_contacts`
      - Emergency contact information for reservations

  2. Security
    - Enable RLS on all tables
    - Policies for travel agents and customers
*/

-- Hotels table
CREATE TABLE IF NOT EXISTS hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  city text NOT NULL,
  address text NOT NULL,
  is_active boolean DEFAULT true,
  agent_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  room_number text NOT NULL,
  room_type text NOT NULL,
  base_price decimal NOT NULL,
  tax_rate decimal NOT NULL,
  max_occupancy int NOT NULL,
  floor_number int,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(hotel_id, room_number)
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES rooms(id),
  check_in_date date NOT NULL,
  check_out_date date NOT NULL,
  total_price decimal NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Guests table
CREATE TABLE IF NOT EXISTS guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id uuid REFERENCES reservations(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  birth_date date NOT NULL,
  gender text NOT NULL,
  document_type text NOT NULL,
  document_number text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Emergency contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id uuid REFERENCES reservations(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

-- Policies for hotels
CREATE POLICY "Public users can view active hotels" ON hotels
  FOR SELECT USING (is_active = true);

CREATE POLICY "Agents can manage their own hotels" ON hotels
  FOR ALL USING (auth.uid() = agent_id);

-- Policies for rooms
CREATE POLICY "Public users can view active rooms" ON rooms
  FOR SELECT USING (
    is_active = true AND 
    EXISTS (SELECT 1 FROM hotels WHERE hotels.id = rooms.hotel_id AND hotels.is_active = true)
  );

CREATE POLICY "Agents can manage rooms of their hotels" ON rooms
  FOR ALL USING (
    EXISTS (SELECT 1 FROM hotels WHERE hotels.id = rooms.hotel_id AND hotels.agent_id = auth.uid())
  );

-- Policies for reservations
CREATE POLICY "Users can view their reservations" ON reservations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM guests 
      WHERE guests.reservation_id = reservations.id 
      AND guests.email = auth.email()
    )
  );

CREATE POLICY "Agents can view reservations for their hotels" ON reservations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM rooms 
      JOIN hotels ON rooms.hotel_id = hotels.id 
      WHERE rooms.id = reservations.room_id 
      AND hotels.agent_id = auth.uid()
    )
  );

-- Policies for guests
CREATE POLICY "Users can view their guest info" ON guests
  FOR SELECT USING (email = auth.email());

CREATE POLICY "Agents can view guest info for their hotels" ON guests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM reservations 
      JOIN rooms ON reservations.room_id = rooms.id
      JOIN hotels ON rooms.hotel_id = hotels.id
      WHERE guests.reservation_id = reservations.id 
      AND hotels.agent_id = auth.uid()
    )
  );

-- Policies for emergency contacts
CREATE POLICY "Users can view their emergency contacts" ON emergency_contacts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM reservations 
      JOIN guests ON reservations.id = guests.reservation_id
      WHERE emergency_contacts.reservation_id = reservations.id 
      AND guests.email = auth.email()
    )
  );

CREATE POLICY "Agents can view emergency contacts for their hotels" ON emergency_contacts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM reservations 
      JOIN rooms ON reservations.room_id = rooms.id
      JOIN hotels ON rooms.hotel_id = hotels.id
      WHERE emergency_contacts.reservation_id = reservations.id 
      AND hotels.agent_id = auth.uid()
    )
  );