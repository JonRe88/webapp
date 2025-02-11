import React from 'react';
import type { Hotel } from '../types';

interface HotelFormProps {
  hotel?: Hotel | null;
  onSubmit: (hotel: Partial<Hotel>) => void;
  onCancel: () => void;
}

export function HotelForm({ hotel, onSubmit, onCancel }: HotelFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      image: formData.get('image') as string,
      isEnabled: formData.get('isEnabled') === 'true',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold mb-6">
          {hotel ? 'Editar Hotel' : 'Nuevo Hotel'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre del Hotel
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={hotel?.name}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={hotel?.description}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={hotel?.address}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={hotel?.city}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              URL de la imagen
            </label>
            <input
              type="url"
              id="image"
              name="image"
              defaultValue={hotel?.image}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <div className="mt-1 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isEnabled"
                  value="true"
                  defaultChecked={hotel?.isEnabled !== false}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Activo</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isEnabled"
                  value="false"
                  defaultChecked={hotel?.isEnabled === false}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Inactivo</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {hotel ? 'Guardar Cambios' : 'Crear Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}