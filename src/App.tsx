import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import HotelDetailPage from './pages/HotelDetailPage';
import BookingPage from './pages/BookingPage';
import AgentDashboard from './pages/agent/AgentDashboard';
import HotelManagement from './pages/agent/HotelManagement';
import ReservationsList from './pages/agent/ReservationsList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route path="/hotel/:id" element={
            <ProtectedRoute>
              <HotelDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/booking/:roomId" element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } />
          
          {/* Agent Routes */}
          <Route path="/agent" element={
            <ProtectedRoute roleRequired="agent">
              <AgentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/agent/hotels" element={
            <ProtectedRoute roleRequired="agent">
              <HotelManagement />
            </ProtectedRoute>
          } />
          <Route path="/agent/reservations" element={
            <ProtectedRoute roleRequired="agent">
              <ReservationsList />
            </ProtectedRoute>
          } />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;