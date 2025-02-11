import React from 'react';
import { Calendar, Users, Building2, CreditCard } from 'lucide-react';
import type { Booking } from '../types';

interface BookingsListProps {
  bookings: Booking[];
}

export function BookingsList({ bookings }: BookingsListProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay reservas para mostrar.</p>
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
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{booking.hotel.name}</h3>
                <p className="text-gray-600">{booking.room.name}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {booking.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
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
                  <Building2 size={18} />
                  <span>{booking.hotel.address}, {booking.hotel.city}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CreditCard size={18} />
                  <span>Total: ${booking.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Datos del Huésped</h4>
                <p>
                  {booking.guest.firstName} {booking.guest.lastName}
                </p>
                <p className="text-gray-600">{booking.guest.email}</p>
                <p className="text-gray-600">{booking.guest.phone}</p>

                <h4 className="font-semibold mt-4">Contacto de Emergencia</h4>
                <p>{booking.emergencyContact.fullName}</p>
                <p className="text-gray-600">{booking.emergencyContact.phone}</p>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Reservado el {new Date(booking.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}