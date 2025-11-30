import React from 'react';
import { Zap, Play, Clock, Settings, Info } from 'lucide-react';

const Header = ({ view, setView }) => (
  <header className="p-6 flex justify-between items-center border-b border-primary/50 bg-primary/80 backdrop-blur-md sticky top-0 z-20">
    <div 
      className="flex items-center gap-2 cursor-pointer group" 
      onClick={() => setView('home')}
    >
      <div className="w-8 h-8 rounded flex items-center justify-center group-hover:scale-110 transition-transform">
        <Zap className="w-5 h-5 text-orange" />
      </div>
      <span className="text-xl font-bold tracking-tight text-gray-300">
        FLASH
      </span>
    </div>

    {/* Desktop Nav */}
    <div className="hidden sm:flex gap-1 p-1 bg-primary/60 rounded-full border border-secondary/30">
      {[
        { id: 'home', label: 'Test', icon: Play },
        { id: 'history', label: 'History', icon: Clock },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'about', label: 'About', icon: Info },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            view === item.id 
              ? 'bg-secondary text-white shadow-sm' 
              : 'text-gray-300 hover:text-white hover:bg-secondary/30'
          }`}
        >
          <item.icon className="w-3.5 h-3.5" />
          {item.label}
        </button>
      ))}
    </div>

    {/* Mobile Menu Icon */}
    <button className="sm:hidden text-gray-400 hover:text-white">
      <Settings className="w-6 h-6" onClick={() => setView(view === 'settings' ? 'home' : 'settings')} />
    </button>
  </header>
);

export default Header;
