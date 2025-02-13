import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, User, Phone } from 'lucide-react';

interface Reservation {
  id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }[];
  emergency_contact: {
    full_name: string;
    phone: string;
  };
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

const ReservationsList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    // TODO: Fetch reservations from Supabase
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reservaciones</h1>

      <div className="grid gap-6">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedReservation(reservation)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">
                    {format(new Date(reservation.check_in), 'dd/MM/yyyy')} -{' '}
                    {format(new Date(reservation.check_out), 'dd/MM/yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span>
                    {reservation.guests[0].first_name} {reservation.guests[0].last_name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{reservation.guests[0].phone}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  ${reservation.total_price.toFixed(2)}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-sm ${
                    reservation.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : reservation.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {reservation.status === 'confirmed'
                    ? 'Confirmada'
                    : reservation.status === 'cancelled'
                    ? 'Cancelada'
                    : 'Pendiente'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsList;