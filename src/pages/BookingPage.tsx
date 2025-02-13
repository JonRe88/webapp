import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { User, Phone, Calendar, CreditCard } from 'lucide-react';

interface GuestForm {
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  document_type: string;
  document_number: string;
  email: string;
  phone: string;
}

interface EmergencyContactForm {
  full_name: string;
  phone: string;
}

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [guests, setGuests] = useState<GuestForm[]>([{
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    document_type: '',
    document_number: '',
    email: '',
    phone: ''
  }]);
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContactForm>({
    full_name: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement reservation creation with Supabase
      toast.success('¡Reserva realizada con éxito!');
      navigate('/');
    } catch (error) {
      toast.error('Error al realizar la reserva');
    }
  };

  const addGuest = () => {
    setGuests([...guests, {
      first_name: '',
      last_name: '',
      birth_date: '',
      gender: '',
      document_type: '',
      document_number: '',
      email: '',
      phone: ''
    }]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Realizar Reserva</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Guest Information */}
        {guests.map((guest, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Huésped {index + 1}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombres
                </label>
                <input
                  type="text"
                  value={guest.first_name}
                  onChange={(e) => {
                    const newGuests = [...guests];
                    newGuests[index].first_name = e.target.value;
                    setGuests(newGuests);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  value={guest.last_name}
                  onChange={(e) => {
                    const newGuests = [...guests];
                    newGuests[index].last_name = e.target.value;
                    setGuests(newGuests);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  value={guest.birth_date}
                  onChange={(e) => {
                    const newGuests = [...guests];
                    newGuests[index].birth_date = e.target.value;
                    setGuests(newGuests);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Género
                </label>
                <select
                  value={guest.gender}
                  onChange={(e) => {
                    const newGuests = [...guests];
                    newGuests[index].gender = e.target.value;
                    setGuests(newGuests);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Documento
                </label>
                <select
                  value={guest.document_type}
                  onChange={(e) => {
                    const newGuests = [...guests];
                    newGuests[index].document_type = e.target.value;
                    setGuests(newGuests);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="DNI">DNI</option>
                  <option value="PASSPORT">Pasaporte</option>
                  <option value="OTHER">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Documento
                </label>
                <input
                  type="text"
                  value={guest.document_number}
                  onChange={(e) => {
                    const newGuests = [...guests];
                    newGuests[index].document_number = e.target.value;
                    setGuests(newGuests);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={guest.email}
                  onChange={(e) => {
                    const newGuests = [...guests];
                    newGuests[index].email = e.target.value;
                    setGuests(newGuests);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={guest.phone}
                  onChange={(e) => {
                    const newGuests = [...guests];
                    newGuests[index].phone = e.target.value;
                    setGuests(newGuests);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addGuest}
          className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          + Agregar Huésped
        </button>

        {/* Emergency Contact */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contacto de Emergencia</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombres Completos
              </label>
              <input
                type="text"
                value={emergencyContact.full_name}
                onChange={(e) => setEmergencyContact({
                  ...emergencyContact,
                  full_name: e.target.value
                })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono de Contacto
              </label>
              <input
                type="tel"
                value={emergencyContact.phone}
                onChange={(e) => setEmergencyContact({
                  ...emergencyContact,
                  phone: e.target.value
                })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
};

export default BookingPage;