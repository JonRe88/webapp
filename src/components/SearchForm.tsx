import React from 'react';
import { Search } from 'lucide-react';
import type { BookingDetails } from '../types';

interface SearchFormProps {
  onSearch: (details: BookingDetails) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch({
      checkIn: formData.get('checkIn') as string,
      checkOut: formData.get('checkOut') as string,
      guests: Number(formData.get('guests')),
      city: formData.get('city') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Ciudad de destino
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="¿A dónde vas?"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
            Fecha de entrada
          </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
            Fecha de salida
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
            Huéspedes
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Número de personas"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Search size={20} />
        Buscar hoteles
      </button>
    </form>
  );
}