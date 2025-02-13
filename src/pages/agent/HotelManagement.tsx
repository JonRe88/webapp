import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, ToggleLeft, ToggleRight } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  enabled: boolean;
}

const HotelManagement = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isAddingHotel, setIsAddingHotel] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    // TODO: Fetch hotels from Supabase
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement hotel creation/update with Supabase
  };

  const toggleHotelStatus = async (hotelId: string, enabled: boolean) => {
    // TODO: Implement hotel status toggle with Supabase
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestión de Hoteles</h1>
        <button
          onClick={() => setIsAddingHotel(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Nuevo Hotel
        </button>
      </div>

      <div className="grid gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
                <p className="text-gray-600 mb-2">{hotel.address}, {hotel.city}</p>
                <p className="text-gray-700">{hotel.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingHotel(hotel)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => toggleHotelStatus(hotel.id, !hotel.enabled)}
                  className={`${
                    hotel.enabled ? 'text-green-600' : 'text-gray-400'
                  } hover:text-blue-600`}
                >
                  {hotel.enabled ? (
                    <ToggleRight className="h-6 w-6" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelManagement;