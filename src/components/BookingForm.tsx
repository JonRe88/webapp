import React, { useState } from 'react';
import { User, Phone, Calendar } from 'lucide-react';

interface BookingFormProps {
  onSubmit: (guest: Guest, emergencyContact: EmergencyContact) => void;
}

interface Guest {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phone: string;
}

interface EmergencyContact {
  fullName: string;
  phone: string;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const [guest, setGuest] = useState<Guest>({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    documentType: '',
    documentNumber: '',
    email: '',
    phone: '',
  });

  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>({
    fullName: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(guest, emergencyContact);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Guest Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <User className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Guest Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={guest.firstName}
                onChange={(e) => setGuest({ ...guest, firstName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={guest.lastName}
                onChange={(e) => setGuest({ ...guest, lastName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Birth Date
              </label>
              <input
                type="date"
                value={guest.birthDate}
                onChange={(e) => setGuest({ ...guest, birthDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                value={guest.gender}
                onChange={(e) => setGuest({ ...guest, gender: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Document Type
              </label>
              <select
                value={guest.documentType}
                onChange={(e) => setGuest({ ...guest, documentType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select document type</option>
                <option value="passport">Passport</option>
                <option value="national-id">National ID</option>
                <option value="drivers-license">Driver's License</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Document Number
              </label>
              <input
                type="text"
                value={guest.documentNumber}
                onChange={(e) => setGuest({ ...guest, documentNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={guest.email}
                onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={guest.phone}
                onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <Phone className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Emergency Contact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={emergencyContact.fullName}
                onChange={(e) =>
                  setEmergencyContact({ ...emergencyContact, fullName: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={emergencyContact.phone}
                onChange={(e) =>
                  setEmergencyContact({ ...emergencyContact, phone: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Complete Booking
          </button>
        </div>
      </form>
    </div>
  );
}