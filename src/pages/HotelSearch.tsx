import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Search, MapPin, Users, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

type Hotel = {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  rooms: Room[];
};

type Room = {
  id: string;
  room_number: string;
  room_type: string;
  base_price: number;
  tax_rate: number;
  max_occupancy: number;
  floor_number: number;
};

export function HotelSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: '',
    checkIn: format(new Date(), 'yyyy-MM-dd'),
    checkOut: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
    guests: 1,
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError('Database connection not configured. Please click "Connect to Supabase" to set up your database connection.');
      setLoading(false);
      return;
    }

    try {
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('hotels')
        .select(`
          id,
          name,
          description,
          city,
          address,
          rooms (
            id,
            room_number,
            room_type,
            base_price,
            tax_rate,
            max_occupancy,
            floor_number
          )
        `)
        .eq('is_active', true)
        .eq('city', searchParams.city)
        .filter('rooms.is_active', 'eq', true)
        .filter('rooms.max_occupancy', 'gte', searchParams.guests);

      if (hotelsError) throw hotelsError;

      // Filter out hotels with no available rooms
      const availableHotels = hotelsData?.filter((hotel) => hotel.rooms.length > 0) || [];
      setHotels(availableHotels);
    } catch (err) {
      console.error('Error searching hotels:', err);
      setError('Failed to search hotels. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  function handleRoomSelect(roomId: string) {
    navigate(`/reservation/${roomId}`, {
      state: {
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: searchParams.guests,
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Find Your Perfect Stay</h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>City</span>
                </div>
              </label>
              <input
                type="text"
                value={searchParams.city}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, city: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Check-in</span>
                </div>
              </label>
              <input
                type="date"
                value={searchParams.checkIn}
                min={format(new Date(), 'yyyy-MM-dd')}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, checkIn: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Check-out</span>
                </div>
              </label>
              <input
                type="date"
                value={searchParams.checkOut}
                min={searchParams.checkIn}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, checkOut: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Guests</span>
                </div>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={searchParams.guests.toString()}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    guests: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Search className="h-5 w-5" />
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for available hotels...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
                <p className="text-gray-600 mb-4">{hotel.description}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{hotel.address}, {hotel.city}</span>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Available Rooms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotel.rooms.map((room) => (
                      <div
                        key={room.id}
                        className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors duration-200"
                        onClick={() => handleRoomSelect(room.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">Room {room.room_number}</h4>
                            <p className="text-sm text-gray-500 capitalize">
                              {room.room_type}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${room.base_price}</p>
                            <p className="text-sm text-gray-500">
                              +{room.tax_rate}% tax
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Floor {room.floor_number}</p>
                          <p>Up to {room.max_occupancy} guests</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {hotels.length === 0 && !loading && !error && (
            <div className="text-center py-12">
              <p className="text-gray-600">No hotels found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}