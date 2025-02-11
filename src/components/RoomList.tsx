import React from 'react';
import type { Room } from '../types';

interface RoomListProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

export function RoomList({ rooms, onSelectRoom }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay habitaciones disponibles para los criterios seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      {rooms.map((room) => (
        <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
            <p className="text-gray-600 mb-4">{room.description}</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                Capacidad: {room.capacity} personas
              </p>
              <p className="text-sm text-gray-600">
                Ubicación: {room.location}
              </p>
              <p className="text-sm text-gray-600">
                Tipo: {room.type}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Precio por noche</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${(room.basePrice + room.taxes).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => onSelectRoom(room)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Seleccionar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}