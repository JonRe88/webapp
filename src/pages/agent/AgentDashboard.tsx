import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Calendar, Settings } from 'lucide-react';

const AgentDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Agente</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Link 
          to="/agent/hotels" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <Hotel className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-gray-500">Gestionar</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Hoteles</h2>
          <p className="text-gray-600">Administra tus hoteles y habitaciones</p>
        </Link>

        <Link 
          to="/agent/reservations" 
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-gray-500">Ver</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Reservaciones</h2>
          <p className="text-gray-600">Revisa las reservas de tus hoteles</p>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Settings className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-gray-500">Configurar</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Ajustes</h2>
          <p className="text-gray-600">Configura tu cuenta y preferencias</p>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;