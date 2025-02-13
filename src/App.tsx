import { React, useState } from 'react';
import { Hotel as HotelIcon, LogOut, Building2, CalendarCheck, Users, Briefcase } from 'lucide-react';
import { SearchForm } from './components/SearchForm';
import { RoomList } from './components/RoomList';
import { BookingForm } from './components/BookingForm';
import { AuthForms } from './components/AuthForms';
import { MyBookings } from './components/MyBookings';
import { HotelManagement } from './pages/HotelManagement';

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
    console.log('Booking submitted:', { bookingDetails, selectedRoom, guest, emergencyContact, userId: user?.id });
    alert('¡Reserva confirmada!');
    setStep('my-bookings');
    setBookingDetails(null);
    setSelectedRoom(null);
  };

  const getAvailableRooms = () => {
    if (!bookingDetails) return [];
    return hotels
      .filter(
        (hotel) => hotel.isEnabled && hotel.city.toLowerCase() === bookingDetails.city.toLowerCase()
      )
      .flatMap((hotel) => hotel.rooms)
      .filter((room) => room.isEnabled && room.capacity >= bookingDetails.guests);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Background Image with Overlay */}
      <div className="min-h-screen bg-cover bg-center relative" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")',
      }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Navbar */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12 pt-16">
              <h1 className="text-5xl font-bold text-white mb-4">Encuentra tu lugar perfecto</h1>
              <p className="text-xl text-white/90">Descubre hoteles increíbles para tu próxima aventura</p>
            </div>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto">
              <SearchForm onSearch={handleSearch} />
            </div>
          </div>
        
    

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {step === 'home' && (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl text-white font-bold mb-8">Bienvenido a nuestra plataforma de reservas</h2>
            <p className="text-xl text-gray-200 mb-12">Selecciona cómo deseas ingresar a la plataforma</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button onClick={() => handleRoleSelect('user')} className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <Users size={48} className="text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Viajero</h3>
                  <p className="text-gray-600">Busca y reserva habitaciones en los mejores hoteles</p>
                </div>
              </button>
              <button onClick={() => handleRoleSelect('agent')} className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <Briefcase size={48} className="text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Agente</h3>
                  <p className="text-gray-600">Gestiona hoteles y administra reservas</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Other steps like authentication, searching, etc. */}
        {step === 'auth' && <AuthForms onLogin={handleLogin} onRegister={handleRegister} />}
        {step === 'search' && <SearchForm onSearch={handleSearch} />}
        {step === 'rooms' && bookingDetails && <RoomList rooms={getAvailableRooms()} onSelectRoom={handleRoomSelect} />}
        {step === 'booking' && selectedRoom && <BookingForm onSubmit={handleBookingSubmit} />}
        {step === 'my-bookings' && <MyBookings bookings={mockBookings} />}
        {step === 'hotel-management' && <HotelManagement />}
        {step === 'bookings-list' && <BookingsList />}
      </main>
    </div>
      </div>
        </div>
  );
}

export default App;