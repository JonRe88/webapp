import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel, UserCircle, DollarSign } from 'lucide-react';
import { SearchForm } from '../components/SearchForm';
import type { BookingDetails, User } from '../types';
import { Navbar } from '../components/Navbar';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleSearch = (details: BookingDetails) => {
    navigate('/hotels', { state: { searchDetails: details } });
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")',
    }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <Navbar user={user} />

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12 pt-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Encuentra tu lugar perfecto
            </h1>
            <p className="text-xl text-white/90">
              Descubre hoteles increíbles para tu próxima aventura
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>

          {/* Features Section */}
          <div className="mt-24 grid md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <Hotel className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Hoteles de Calidad</h3>
                <p className="text-white/80">Selección cuidadosa de los mejores alojamientos</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <UserCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Servicio Personalizado</h3>
                <p className="text-white/80">Atención al cliente 24/7 para tu tranquilidad</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <DollarSign className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mejores Precios</h3>
                <p className="text-white/80">Garantizamos las mejores tarifas disponibles</p>
              </div>
            </div>
          </div>

    </div>
  );
export default Home;