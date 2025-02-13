import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

interface SearchForm {
  checkIn: string;
  checkOut: string;
  guests: number;
  city: string;
}

interface Hotel {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  images: string[];
}

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchForm>({
    checkIn: format(new Date(), 'yyyy-MM-dd'),
    checkOut: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
    guests: 2,
    city: '',
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let query = supabase
        .from('hotels')
        .select('*')
        .eq('enabled', true);

      if (searchParams.city) {
        query = query.ilike('city', `%${searchParams.city}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Filter hotels that have available rooms for the selected dates and guests
      const availableHotels = await Promise.all(
        (data as Hotel[]).map(async (hotel) => {
          const { data: rooms } = await supabase
            .from('rooms')
            .select('*')
            .eq('hotel_id', hotel.id)
            .eq('enabled', true)
            .gte('capacity', searchParams.guests)
            .not('id', 'in', (
              supabase
                .from('reservations')
                .select('room_id')
                .overlaps('check_in', searchParams.checkIn)
                .overlaps('check_out', searchParams.checkOut)
            ));

          return rooms && rooms.length > 0 ? hotel : null;
        })
      );

      setHotels(availableHotels.filter((hotel): hotel is Hotel => hotel !== null));

      if (availableHotels.length === 0) {
        toast.error('No se encontraron hoteles disponibles para las fechas y huéspedes seleccionados');
      }
    } catch (error: any) {
      toast.error('Error al buscar hoteles: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Form */}
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-6">Buscar Hoteles</h2>
        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Destino</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchParams.city}
                onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                className="w-full p-3 pl-10 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="¿A dónde vas?"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Fecha de Entrada</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  value={searchParams.checkIn}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                  className="w-full p-3 pl-10 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Fecha de Salida</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  value={searchParams.checkOut}
                  min={searchParams.checkIn}
                  onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                  className="w-full p-3 pl-10 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Huéspedes</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="number"
                min="1"
                value={searchParams.guests}
                onChange={(e) => setSearchParams({ ...searchParams, guests: parseInt(e.target.value) })}
                className="w-full p-3 pl-10 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="h-5 w-5" />
            {loading ? 'Buscando...' : 'Buscar Hoteles'}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={hotel.images[0] || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-2">{hotel.city}</p>
              <p className="text-gray-500 text-sm mb-4">{hotel.address}</p>
              <button
                onClick={() => navigate(`/hotel/${hotel.id}`)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;