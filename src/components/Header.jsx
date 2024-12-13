import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1B1921] border-b border-[#2D2D3D]">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">DEX</div>
          <div className="flex gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `hover:text-blue-500 ${isActive ? 'text-blue-500' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/swap" 
              className={({ isActive }) => 
                `hover:text-blue-500 ${isActive ? 'text-blue-500' : ''}`
              }
            >
              Swap
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
