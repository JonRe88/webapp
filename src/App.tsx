import React, { useState } from 'react';
import { Hotel as HotelIcon, LogOut, Building2, CalendarCheck, Users, Briefcase } from 'lucide-react';
import { SearchForm } from './components/SearchForm';
import { RoomList } from './components/RoomList';
import { BookingForm } from './components/BookingForm';
import { AuthForms } from './components/AuthForms';
import { MyBookings } from './components/MyBookings';
import { HotelManagement } from './components/HotelManagement';
import { BookingsList } from './components/BookingsList';
import type { BookingDetails, Room, Guest, EmergencyContact, User, Booking } from './types';

// Mock data for demonstration
const mockHotels = [
  {
    id: '1',
    name: 'Hotel Boutique San José',
    description: 'Un hotel boutique con encanto en el corazón de la ciudad',
    address: 'Calle Principal 123',
    city: 'San José',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
    isEnabled: true,
    rooms: [
      {
        id: '1',
        hotelId: '1',
        name: 'Habitación Deluxe',
        description: 'Espaciosa habitación con vista a la ciudad y balcón privado',
        basePrice: 180,
        taxes: 20,
        capacity: 2,
        type: 'deluxe',
        location: 'Piso 5, Vista ciudad',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80',
        isEnabled: true,
      },
      {
        id: '2',
        hotelId: '1',
        name: 'Suite Familiar',
        description: 'Amplia suite con sala de estar y dos habitaciones',
        basePrice: 300,
        taxes: 50,
        capacity: 4,
        type: 'family',
        location: 'Piso 4, Vista jardín',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
        isEnabled: true,
      },
      {
        id: '3',
        hotelId: '1',
        name: 'Suite Ejecutiva',
        description: 'Elegante suite con área de trabajo y amenidades premium',
        basePrice: 250,
        taxes: 30,
        capacity: 2,
        type: 'suite',
        location: 'Piso 6, Vista panorámica',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80',
        isEnabled: true,
      },
      {
        id: '4',
        hotelId: '1',
        name: 'Habitación Estándar',
        description: 'Cómoda habitación con todas las amenidades básicas',
        basePrice: 120,
        taxes: 15,
        capacity: 2,
        type: 'standard',
        location: 'Piso 3, Vista interior',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80',
        isEnabled: true,
      }
    ],
  },
  {
    id: '2',
    name: 'Costa Rica Resort & Spa',
    description: 'Resort de lujo con spa y vistas al océano',
    address: 'Playa Hermosa 456',
    city: 'Guanacaste',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
    isEnabled: true,
    rooms: [
      {
        id: '5',
        hotelId: '2',
        name: 'Villa Oceánica',
        description: 'Villa de lujo con piscina privada y vista al mar',
        basePrice: 500,
        taxes: 75,
        capacity: 6,
        type: 'suite',
        location: 'Frente al mar',
        image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80',
        isEnabled: true,
      },
      {
        id: '6',
        hotelId: '2',
        name: 'Suite Tropical',
        description: 'Suite con terraza y hamaca con vista al jardín tropical',
        basePrice: 280,
        taxes: 40,
        capacity: 3,
        type: 'deluxe',
        location: 'Área jardín',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80',
        isEnabled: true,
      }
    ],
  }
];

// Mock bookings data
const mockBookings = [
  {
    id: '1',
    userId: '1',
    roomId: '1',
    hotelId: '1',
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    guests: 2,
    guest: {
      firstName: 'Juan',
      lastName: 'Pérez',
      birthDate: '1990-01-01',
      gender: 'male',
      documentType: 'passport',
      documentNumber: 'AB123456',
      email: 'juan@example.com',
      phone: '+1234567890',
    },
    emergencyContact: {
      fullName: 'María Pérez',
      phone: '+0987654321',
    },
    room: mockHotels[0].rooms[0],
    hotel: mockHotels[0],
    createdAt: '2024-03-10',
    status: 'confirmed',
    totalAmount: 1000,
  },
];

type AppStep = 'home' | 'auth' | 'search' | 'rooms' | 'booking' | 'my-bookings' | 'hotel-management' | 'bookings-list';

function App() {
  const [step, setStep] = useState<AppStep>('home');
  const [selectedRole, setSelectedRole] = useState<'agent' | 'user' | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hotels, setHotels] = useState(mockHotels);

  const handleRoleSelect = (role: 'agent' | 'user') => {
    setSelectedRole(role);
    setStep('auth');
  };

  const handleLogin = (email: string, password: string) => {
    // Here you would typically validate credentials with your backend
    setUser({
      id: '1',
      email,
      firstName: 'Juan',
      lastName: 'Pérez',
      role: selectedRole || 'user',
    });
    setStep('search');
  };

  const handleRegister = (email: string, password: string, firstName: string, lastName: string) => {
    // Here you would typically send registration data to your backend
    setUser({
      id: '1',
      email,
      firstName,
      lastName,
      role: selectedRole || 'user',
    });
    setStep('search');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setStep('home');
    setBookingDetails(null);
    setSelectedRoom(null);
  };

  const handleSearch = (details: BookingDetails) => {
    setBookingDetails(details);
    setStep('rooms');
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setStep('booking');
  };

  const handleBookingSubmit = (guest: Guest, emergencyContact: EmergencyContact) => {
    // Here you would typically send this data to your backend
    console.log('Booking submitted:', {
      bookingDetails,
      selectedRoom,
      guest,
      emergencyContact,
      userId: user?.id,
    });

    // Show success message
    alert('¡Reserva confirmada! Se ha enviado un correo electrónico con los detalles.');
    
    // Reset form and go to my bookings
    setStep('my-bookings');
    setBookingDetails(null);
    setSelectedRoom(null);
  };

  const handleCreateHotel = (hotel: Omit<Hotel, 'id' | 'rooms'>) => {
    setHotels([
      ...hotels,
      {
        ...hotel,
        id: String(Date.now()),
        rooms: [],
      },
    ]);
  };

  const handleUpdateHotel = (hotelId: string, hotelData: Partial<Hotel>) => {
    setHotels(
      hotels.map((hotel) =>
        hotel.id === hotelId
          ? { ...hotel, ...hotelData }
          : hotel
      )
    );
  };

  const handleDeleteHotel = (hotelId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este hotel?')) {
      setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
    }
  };

  const handleCreateRoom = (hotelId: string, room: Omit<Room, 'id' | 'hotelId'>) => {
    setHotels(
      hotels.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              rooms: [
                ...hotel.rooms,
                {
                  ...room,
                  id: String(Date.now()),
                  hotelId,
                },
              ],
            }
          : hotel
      )
    );
  };

  const handleUpdateRoom = (hotelId: string, roomId: string, roomData: Partial<Room>) => {
    setHotels(
      hotels.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              rooms: hotel.rooms.map((room) =>
                room.id === roomId
                  ? { ...room, ...roomData }
                  : room
              ),
            }
          : hotel
      )
    );
  };

  const handleDeleteRoom = (hotelId: string, roomId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
      setHotels(
        hotels.map((hotel) =>
          hotel.id === hotelId
            ? {
                ...hotel,
                rooms: hotel.rooms.filter((room) => room.id !== roomId),
              }
            : hotel
        )
      );
    }
  };

  // Find available rooms based on search criteria
  const getAvailableRooms = () => {
    if (!bookingDetails) return [];
    
    return hotels
      .filter(hotel => hotel.isEnabled && hotel.city.toLowerCase() === bookingDetails.city.toLowerCase())
      .flatMap(hotel => hotel.rooms)
      .filter(room => room.isEnabled && room.capacity >= bookingDetails.guests);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HotelIcon size={32} />
              <h1 className="text-3xl font-thin">México Travel</h1>
            </div>
            {user && (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    Bienvenido, {user.firstName}
                    {user.role === 'agent' && ' (Agente)'}
                  </span>
                </div>
                <nav>
                  <ul className="flex items-center gap-4">
                    <li>
                      <button
                        onClick={() => setStep('search')}
                        className="text-white hover:text-blue-100"
                      >
                        Buscar
                      </button>
                    </li>
                    {user.role === 'agent' ? (
                      <>
                        <li>
                          <button
                            onClick={() => setStep('hotel-management')}
                            className="flex items-center gap-1 text-white hover:text-blue-100"
                          >
                            <Building2 size={18} />
                            Gestionar Hoteles
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setStep('bookings-list')}
                            className="flex items-center gap-1 text-white hover:text-blue-100"
                          >
                            <CalendarCheck size={18} />
                            Ver Reservas
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          onClick={() => setStep('my-bookings')}
                          className="text-white hover:text-blue-100"
                        >
                          Mis Reservas
                        </button>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 text-white hover:text-blue-100"
                      >
                        <LogOut size={18} />
                        Salir
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        {step === 'home' && (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Bienvenido a nuestra plataforma de reservas</h2>
            <p className="text-xl text-gray-600 mb-12">
              Selecciona cómo deseas ingresar a la plataforma
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button
                onClick={() => handleRoleSelect('user')}
                className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Users size={48} className="text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Viajero</h3>
                  <p className="text-gray-600">
                    Busca y reserva habitaciones en los mejores hoteles
                  </p>
                </div>
              </button>
              <button
                onClick={() => handleRoleSelect('agent')}
                className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Briefcase size={48} className="text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Agente</h3>
                  <p className="text-gray-600">
                    Gestiona hoteles y administra reservas
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 'auth' && (
          <AuthForms onLogin={handleLogin} onRegister={handleRegister} />
        )}

        {step === 'search' && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Encuentra el hotel perfecto para tu viaje
            </h2>
            <SearchForm onSearch={handleSearch} />
          </>
        )}

        {step === 'rooms' && bookingDetails && (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Habitaciones disponibles en {bookingDetails.city}
            </h2>
            <RoomList rooms={getAvailableRooms()} onSelectRoom={handleRoomSelect} />
          </>
        )}

        {step === 'booking' && selectedRoom && (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Completa tu reserva
            </h2>
            <BookingForm onSubmit={handleBookingSubmit} />
          </>
        )}

        {step === 'my-bookings' && (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Mis Reservas
            </h2>
            <MyBookings bookings={mockBookings} />
          </>
        )}

        {step === 'hotel-management' && user?.role === 'agent' && (
          <HotelManagement
            hotels={hotels}
            onCreateHotel={handleCreateHotel}
            onUpdateHotel={handleUpdateHotel}
            onDeleteHotel={handleDeleteHotel}
            onCreateRoom={handleCreateRoom}
            onUpdateRoom={handleUpdateRoom}
            onDeleteRoom={handleDeleteRoom}
          />
        )}

        {step === 'bookings-list' && user?.role === 'agent' && (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Reservas de Hoteles
            </h2>
            <BookingsList bookings={mockBookings} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;