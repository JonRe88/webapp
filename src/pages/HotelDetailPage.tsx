import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bed, Users, MapPin } from 'lucide-react';

interface Room {
  id: string;
  room_type: string;
  base_price: number;
  tax_rate: number;
  location: string;
  capacity: number;
}

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<any>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // TODO: Fetch hotel and room data from Supabase
  }, [id]);

  const handleBookRoom = (roomId: string) => {
    navigate(`/booking/${roomId}`);
  };

  if (!hotel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hotel Images */}
      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <img
          src={hotel.images[currentImageIndex]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {hotel.images.map((_: string, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hotel Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{hotel.address}, {hotel.city}</span>
        </div>
        <p className="text-gray-700">{hotel.description}</p>
      </div>

      {/* Rooms */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Habitaciones Disponibles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{room.room_type}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>{room.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Hasta {room.capacity} personas</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    ${room.base_price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    +{(room.tax_rate * 100).toFixed(0)}% impuestos
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleBookRoom(room.id)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Reservar Ahora
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;