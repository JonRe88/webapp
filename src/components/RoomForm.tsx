import React from 'react';
import type { Room } from '../types';

interface RoomFormProps {
  room?: Room | null;
  onSubmit: (room: Partial<Room>) => void;
  onCancel: () => void;
}

export function RoomForm({ room, onSubmit, onCancel }: RoomFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      basePrice: Number(formData.get('basePrice')),
      taxes: Number(formData.get('taxes')),
      capacity: Number(formData.get('capacity')),
      type: formData.get('type') as Room['type'],
      location: formData.get('location') as string,
      image: formData.get('image') as string,
      isEnabled: formData.get('isEnabled') === 'true',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold mb-6">
          {room ? 'Editar Habitación' : 'Nueva Habitación'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre de la Habitación
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={room?.name}
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
              defaultValue={room?.description}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">
                Precio Base
              </label>
              <input
                type="number"
                id="basePrice"
                name="basePrice"
                defaultValue={room?.basePrice}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="taxes" className="block text-sm font-medium text-gray-700">
                Impuestos
              </label>
              <input
                type="number"
                id="taxes"
                name="taxes"
                defaultValue={room?.taxes}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Capacidad
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                defaultValue={room?.capacity}
                required
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Tipo de Habitación
              </label>
              <select
                id="type"
                name="type"
                defaultValue={room?.type}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="standard">Estándar</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="family">Familiar</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Ubicación
            </label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={room?.location}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Piso 3, Vista al mar"
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
              defaultValue={room?.image}
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
                  defaultChecked={room?.isEnabled !== false}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Disponible</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isEnabled"
                  value="false"
                  defaultChecked={room?.isEnabled === false}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">No disponible</span>
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
              {room ? 'Guardar Cambios' : 'Crear Habitación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}