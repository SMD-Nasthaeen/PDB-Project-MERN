import React from 'react';
import { LogOut } from 'lucide-react';

function Logout({ onLogout }) {
  return (
    <button 
      onClick={onLogout} 
      className="px-4 py-2 text-white bg-red-600 rounded-md flex items-center hover:bg-red-700 transition"
    >
      <LogOut className="h-4 w-4 mr-2" /> Logout
    </button>
  );
}

export default Logout;