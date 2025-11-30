import React from 'react';
import { Zap, Shield, AlertCircle } from 'lucide-react';

const AboutView = () => (
  <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 z-10 relative">
    <div className="text-center mb-12">
      <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-2">
        <Zap className="w-12 h-12 text-orange" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-1">FLASH</h1>
      <p className="text-gray-400 text-sm">Version 1.0.0</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary/20 backdrop-blur-md border border-secondary/30 p-6 rounded-2xl">
        <Shield className="w-8 h-8 text-orange mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">About Flash</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Flash is a personal project created to provide a fast and elegant way to test your internet connection. Built with modern web technologies, it offers real-time speed measurements with a beautiful, responsive interface.
        </p>
      </div>

      <div className="bg-secondary/20 backdrop-blur-md border border-secondary/30 p-6 rounded-2xl">
        <AlertCircle className="w-8 h-8 text-highlight mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Features</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Real-time speed testing with animated particle effects, download/upload speed measurements, ping and jitter analysis, test history tracking, and a beautiful dark theme with vibrant orange and purple accents.
        </p>
      </div>
    </div>

      <div className="mt-8 p-4 bg-secondary/10 rounded-xl border border-secondary/30 text-center">
      <p className="text-gray-500 text-sm">
        Created for fun • Made with React, Vite & Tailwind CSS<br/>
        A personal project built with passion.
      </p>
      <p className="text-gray-500 text-xs mt-2">
        © Shivshreyas
      </p>
    </div>
  </div>
);

export default AboutView;
