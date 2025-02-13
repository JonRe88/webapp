import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Hotel, Bed, Eye } from 'lucide-react';

type Hotel = {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  is_active: boolean;
};

type Room = {
  id: string;
  room_number: string;
  room_type: string;
  base_price: number;
  tax_rate: number;
  max_occupancy: number;
  floor_number: number;
  is_active: boolean;
};

export function HotelManagement() {
  const { user } = useAuth();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isAddingHotel, setIsAddingHotel] = useState(false);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
  });
  const [roomData, setRoomData] = useState({
    room_number: '',
    room_type: '',
    base_price: 0,
    tax_rate: 0,
    max_occupancy: 1,
    floor_number: 1,
  });

  useEffect(() => {
    if (user) {
      loadHotels();
    }
  }, [user]);

  useEffect(() => {
    if (selectedHotel) {
      loadRooms(selectedHotel.id);
    }
  }, [selectedHotel]);

  async function loadHotels() {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('agent_id', user?.id);

    if (error) {
      console.error('Error loading hotels:', error);
      return;
    }

    setHotels(data || []);
  }

  async function loadRooms(hotelId: string) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('hotel_id', hotelId);

    if (error) {
      console.error('Error loading rooms:', error);
      return;
    }

    setRooms(data || []);
  }

  async function handleCreateHotel(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('hotels').insert([
      {
        ...formData,
        agent_id: user?.id,
        is_active: true,
      },
    ]);

    if (error) {
      console.error('Error creating hotel:', error);
      return;
    }

    setIsAddingHotel(false);
    setFormData({ name: '', description: '', city: '', address: '' });
    loadHotels();
  }

  async function handleCreateRoom(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedHotel) return;

    const { error } = await supabase.from('rooms').insert([
      {
        ...roomData,
        hotel_id: selectedHotel.id,
        is_active: true,
      },
    ]);

    if (error) {
      console.error('Error creating room:', error);
      return;
    }

    setIsAddingRoom(false);
    setRoomData({
      room_number: '',
      room_type: '',
      base_price: 0,
      tax_rate: 0,
      max_occupancy: 1,
      floor_number: 1,
    });
    loadRooms(selectedHotel.id);
  }

  async function toggleHotelStatus(hotel: Hotel) {
    const { error } = await supabase
      .from('hotels')
      .update({ is_active: !hotel.is_active })
      .eq('id', hotel.id);

    if (error) {
      console.error('Error updating hotel status:', error);
      return;
    }

    loadHotels();
  }

  async function toggleRoomStatus(room: Room) {
    const { error } = await supabase
      .from('rooms')
      .update({ is_active: !room.is_active })
      .eq('id', room.id);

    if (error) {
      console.error('Error updating room status:', error);
      return;
    }

    if (selectedHotel) {
      loadRooms(selectedHotel.id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hotel Management</h1>
        <button
          onClick={() => setIsAddingHotel(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Hotel</span>
        </button>
      </div>

      {isAddingHotel && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Hotel</h2>
          <form onSubmit={handleCreateHotel} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingHotel(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Hotel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Hotels</h2>
          <div className="space-y-4">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className={`p-4 border rounded-lg ${
                  selectedHotel?.id === hotel.id ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Hotel className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">{hotel.name}</h3>
                      <p className="text-sm text-gray-500">{hotel.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedHotel(hotel)}
                      className="p-2 text-gray-600 hover:text-blue-600"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => toggleHotelStatus(hotel)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        hotel.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {hotel.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedHotel && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Rooms - {selectedHotel.name}</h2>
              <button
                onClick={() => setIsAddingRoom(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
                <span>Add Room</span>
              </button>
            </div>

            {isAddingRoom && (
              <div className="mb-6 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Add New Room</h3>
                <form onSubmit={handleCreateRoom} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Room Number
                      </label>
                      <input
                        type="text"
                        value={roomData.room_number}
                        onChange={(e) =>
                          setRoomData({ ...roomData, room_number: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Room Type
                      </label>
                      <select
                        value={roomData.room_type}
                        onChange={(e) =>
                          setRoomData({ ...roomData, room_type: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select type</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="suite">Suite</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Base Price
                      </label>
                      <input
                        type="number"
                        value={roomData.base_price}
                        onChange={(e) =>
                          setRoomData({
                            ...roomData,
                            base_price: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        value={roomData.tax_rate}
                        onChange={(e) =>
                          setRoomData({
                            ...roomData,
                            tax_rate: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Max Occupancy
                      </label>
                      <input
                        type="number"
                        value={roomData.max_occupancy}
                        onChange={(e) =>
                          setRoomData({
                            ...roomData,
                            max_occupancy: parseInt(e.target.value),
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Floor Number
                      </label>
                      <input
                        type="number"
                        value={roomData.floor_number}
                        onChange={(e) =>
                          setRoomData({
                            ...roomData,
                            floor_number: parseInt(e.target.value),
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingRoom(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add Room
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4 border rounded-lg border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Bed className="h-5 w-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">Room {room.room_number}</h3>
                        <p className="text-sm text-gray-500">
                          {room.room_type} - Floor {room.floor_number}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${room.base_price} + {room.tax_rate}% tax
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleRoomStatus(room)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          room.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {room.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}