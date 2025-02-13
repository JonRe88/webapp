import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Search, UserCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Hotel className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">HotelHub</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/search" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <Search className="h-5 w-5" />
              <span>Search Hotels</span>
            </Link>

            {user ? (
              <>
                <Link to="/manage-hotels" className="text-gray-600 hover:text-blue-600">
                  Manage Hotels
                </Link>
                <button
                  onClick={signOut}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <UserCircle className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}