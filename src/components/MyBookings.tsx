import React from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';
import type { Booking } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
}

export function MyBookings({ bookings }: MyBookingsProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No tienes reservas activas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={booking.room.image}
                alt={booking.room.name}
                className="h-48 w-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{booking.room.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {booking.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span>
                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} />
                  <span>{booking.guests} huéspedes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{booking.room.description}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Reservado el {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total de la reserva</p>
                  <p className="text-xl font-bold text-blue-600">
                    ${booking.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}