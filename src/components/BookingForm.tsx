import React from 'react';
import type { Guest, EmergencyContact } from '../types';

interface BookingFormProps {
  onSubmit: (guest: Guest, emergencyContact: EmergencyContact) => void;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const guest: Guest = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      birthDate: formData.get('birthDate') as string,
      gender: formData.get('gender') as 'male' | 'female' | 'other',
      documentType: formData.get('documentType') as 'passport' | 'id' | 'driver_license',
      documentNumber: formData.get('documentNumber') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    const emergencyContact: EmergencyContact = {
      fullName: formData.get('emergencyName') as string,
      phone: formData.get('emergencyPhone') as string,
    };

    onSubmit(guest, emergencyContact);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Información del huésped</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombres</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellidos</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género</label>
          <select
            id="gender"
            name="gender"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Tipo de documento</label>
          <select
            id="documentType"
            name="documentType"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="passport">Pasaporte</option>
            <option value="id">Documento de identidad</option>
            <option value="driver_license">Licencia de conducir</option>
          </select>
        </div>

        <div>
          <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">Número de documento</label>
          <input
            type="text"
            id="documentNumber"
            name="documentNumber"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Contacto de emergencia</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-700">Nombres completos</label>
          <input
            type="text"
            id="emergencyName"
            name="emergencyName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            id="emergencyPhone"
            name="emergencyPhone"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700"
      >
        Confirmar reserva
      </button>
    </form>
  );
}