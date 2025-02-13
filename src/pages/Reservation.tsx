import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, Phone, Calendar, CreditCard } from 'lucide-react';

type GuestFormData = {
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  document_type: string;
  document_number: string;
  email: string;
  phone: string;
};

type EmergencyContactData = {
  full_name: string;
  phone: string;
};

export function Reservation() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { checkIn, checkOut, guests } = location.state || {};

  const [guestData, setGuestData] = useState<GuestFormData>({
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    document_type: '',
    document_number: '',
    email: '',
    phone: '',
  });

  const [emergencyContact, setEmergencyContact] = useState<EmergencyContactData>({
    full_name: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Create reservation
      const { data: reservationData, error: reservationError } = await supabase
        .from('reservations')
        .insert([
          {
            room_id: roomId,
            check_in_date: checkIn,
            check_out_date: checkOut,
            total_price: 0, // This should be calculated based on room price and dates
            status: 'confirmed',
          },
        ])
        .select()
        .single();

      if (reservationError) throw reservationError;

      // Create guest record
      const { error: guestError } = await supabase.from('guests').insert([
        {
          ...guestData,
          reservation_id: reservationData.id,
        },
      ]);

      if (guestError) throw guestError;

      // Create emergency contact
      const { error: emergencyContactError } = await supabase
        .from('emergency_contacts')
        .insert([
          {
            ...emergencyContact,
            reservation_id: reservationData.id,
          },
        ]);

      if (emergencyContactError) throw emergencyContactError;

      // Redirect to success page or show success message
      navigate('/');
    } catch (error) {
      console.error('Error creating reservation:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Complete Your Reservation</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={guestData.first_name}
                  onChange={(e) =>
                    setGuestData({ ...guestData, first_name: e.target.value })
                  }
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
                  value={guestData.last_name}
                  onChange={(e) =>
                    setGuestData({ ...guestData, last_name: e.target.value })
                  }
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
                  value={guestData.birth_date}
                  onChange={(e) =>
                    setGuestData({ ...guestData, birth_date: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  value={guestData.gender}
                  onChange={(e) =>
                    setGuestData({ ...guestData, gender: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Document Type
                </label>
                <select
                  value={guestData.document_type}
                  onChange={(e) =>
                    setGuestData({ ...guestData, document_type: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select document type</option>
                  <option value="passport">Passport</option>
                  <option value="id">ID Card</option>
                  <option value="driver">Driver's License</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Document Number
                </label>
                <input
                  type="text"
                  value={guestData.document_number}
                  onChange={(e) =>
                    setGuestData({ ...guestData, document_number: e.target.value })
                  }
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
                  value={guestData.email}
                  onChange={(e) =>
                    setGuestData({ ...guestData, email: e.target.value })
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
                  value={guestData.phone}
                  onChange={(e) =>
                    setGuestData({ ...guestData, phone: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={emergencyContact.full_name}
                  onChange={(e) =>
                    setEmergencyContact({
                      ...emergencyContact,
                      full_name: e.target.value,
                    })
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
                    setEmergencyContact({
                      ...emergencyContact,
                      phone: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <CreditCard className="h-5 w-5" />
              <span>Complete Reservation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}