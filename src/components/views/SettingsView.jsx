import React from 'react';
import { Settings, Check } from 'lucide-react';

const SettingsView = ({ appSettings, setAppSettings }) => (
  <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 z-10 relative">
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
      <Settings className="w-6 h-6 text-orange" /> Preferences
    </h2>
    
    <div className="space-y-6">
      {/* Server Selection */}
        <div className="bg-secondary/20 backdrop-blur-md border border-secondary/30 p-6 rounded-2xl">
        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Test Server
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['Automatic (Best)', 'New York, US', 'London, UK', 'Tokyo, JP', 'Singapore, SG'].map((server) => (
            <button
              key={server}
              onClick={() => setAppSettings(prev => ({...prev, server}))}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                appSettings.server === server 
                  ? 'bg-orange/10 border-orange text-white' 
                  : 'bg-primary/50 border-transparent text-gray-400 hover:border-secondary/50'
              }`}
            >
              <span className="text-sm">{server}</span>
                {appSettings.server === server && <Check className="w-4 h-4 text-orange" />}
            </button>
          ))}
        </div>
      </div>

      {/* Units */}
      <div className="bg-secondary/20 backdrop-blur-md border border-secondary/30 p-6 rounded-2xl">
        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Speed Units
        </label>
        <div className="flex gap-4">
          {['Mbps', 'MB/s', 'Kbps'].map((unit) => (
            <button
              key={unit}
              onClick={() => setAppSettings(prev => ({...prev, unit}))}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                appSettings.unit === unit 
                  ? 'bg-orange text-white border-orange' 
                  : 'bg-transparent text-gray-400 border-secondary/50 hover:border-orange/50'
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SettingsView;
