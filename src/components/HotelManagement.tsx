import React, { useState } from 'react';
import { Building2, Plus, PencilLine, Trash2, BedDouble } from 'lucide-react';
import type { Hotel, Room } from '../types';
import { HotelForm } from './HotelForm';
import { RoomForm } from './RoomForm';

interface HotelManagementProps {
  hotels: Hotel[];
  onCreateHotel: (hotel: Omit<Hotel, 'id' | 'rooms'>) => void;
  onUpdateHotel: (hotelId: string, hotel: Partial<Hotel>) => void;
  onDeleteHotel: (hotelId: string) => void;
  onCreateRoom: (hotelId: string, room: Omit<Room, 'id' | 'hotelId'>) => void;
  onUpdateRoom: (hotelId: string, roomId: string, room: Partial<Room>) => void;
  onDeleteRoom: (hotelId: string, roomId: string) => void;
}

export function HotelManagement({
  hotels,
  onCreateHotel,
  onUpdateHotel,
  onDeleteHotel,
  onCreateRoom,
  onUpdateRoom,
  onDeleteRoom,
}: HotelManagementProps) {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isHotelFormOpen, setIsHotelFormOpen] = useState(false);
  const [isRoomFormOpen, setIsRoomFormOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Hoteles</h2>
        <button
          onClick={() => {
            setSelectedHotel(null);
            setIsHotelFormOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={20} />
          Nuevo Hotel
        </button>
      </div>

      <div className="grid gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <p className="text-gray-600 mt-1">{hotel.description}</p>
                    <p className="text-gray-600 mt-1">{hotel.address}, {hotel.city}</p>
                    <div className="mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          hotel.isEnabled
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {hotel.isEnabled ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setIsHotelFormOpen(true);
                    }}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <PencilLine size={20} />
                  </button>
                  <button
                    onClick={() => onDeleteHotel(hotel.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Habitaciones</h4>
                  <button
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setSelectedRoom(null);
                      setIsRoomFormOpen(true);
                    }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={20} />
                    Agregar Habitación
                  </button>
                </div>

                <div className="grid gap-4">
                  {hotel.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <BedDouble size={24} className="text-gray-400" />
                        <div>
                          <h5 className="font-semibold">{room.name}</h5>
                          <p className="text-sm text-gray-600">{room.description}</p>
                          <div className="mt-1 space-x-4 text-sm">
                            <span>Precio base: ${room.basePrice}</span>
                            <span>Impuestos: ${room.taxes}</span>
                            <span>Tipo: {room.type}</span>
                            <span>Ubicación: {room.location}</span>
                          </div>
                          <div className="mt-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                room.isEnabled
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {room.isEnabled ? 'Disponible' : 'No disponible'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedHotel(hotel);
                            setSelectedRoom(room);
                            setIsRoomFormOpen(true);
                          }}
                          className="p-2 text-gray-600 hover:text-blue-600"
                        >
                          <PencilLine size={20} />
                        </button>
                        <button
                          onClick={() => onDeleteRoom(hotel.id, room.id)}
                          className="p-2 text-gray-600 hover:text-red-600"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isHotelFormOpen && (
        <HotelForm
          hotel={selectedHotel}
          onSubmit={(hotelData) => {
            if (selectedHotel) {
              onUpdateHotel(selectedHotel.id, hotelData);
            } else {
              onCreateHotel(hotelData as Omit<Hotel, 'id' | 'rooms'>);
            }
            setIsHotelFormOpen(false);
          }}
          onCancel={() => setIsHotelFormOpen(false)}
        />
      )}

      {isRoomFormOpen && selectedHotel && (
        <RoomForm
          room={selectedRoom}
          onSubmit={(roomData) => {
            if (selectedRoom) {
              onUpdateRoom(selectedHotel.id, selectedRoom.id, roomData);
            } else {
              onCreateRoom(selectedHotel.id, roomData as Omit<Room, 'id' | 'hotelId'>);
            }
            setIsRoomFormOpen(false);
          }}
          onCancel={() => setIsRoomFormOpen(false)}
        />
      )}
    </div>
  );
}