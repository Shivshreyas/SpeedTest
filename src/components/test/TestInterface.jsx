import React from 'react';
import { RotateCcw, ArrowDown, ArrowUp } from 'lucide-react';
import GaugeCanvas from '../canvas/GaugeCanvas';

const TestInterface = ({ status, progress, startTest, ping, downloadSpeed, uploadSpeed, appSettings }) => {
  const getUnit = () => appSettings.unit;

  return (
    <div className="flex-1 flex flex-col items-center">
      {/* The Gauge Container */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center mb-8">
        <GaugeCanvas status={status} progress={progress} view="home" />
        
        {/* Center Info inside Gauge */}
        <div className="flex flex-col items-center justify-center text-center z-10 gauge-center-point">
          {status === 'idle' && (
            <button 
              onClick={startTest}
              className="group relative flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-transparent border-4 border-orange/30 hover:border-orange hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full bg-orange/10 group-hover:bg-orange/20 blur-md transition-all" />
              <span className="text-2xl sm:text-3xl font-bold font-mono tracking-widest text-orange group-hover:text-white transition-colors">GO</span>
            </button>
          )}

          {(status === 'download' || status === 'upload' || status === 'ping') && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">
                {status === 'ping' ? 'Pinging...' : status === 'download' ? 'Download' : 'Upload'}
              </div>
              <div className="text-5xl sm:text-7xl font-bold font-mono text-white tabular-nums tracking-tighter">
                {status === 'ping' ? ping : status === 'download' ? Math.floor(downloadSpeed) : Math.floor(uploadSpeed)}
              </div>
              <div className={`text-lg font-medium font-mono mt-1 ${status === 'upload' ? 'text-[#36D6CA]' : 'text-orange'}`}>
                {status === 'ping' ? 'ms' : getUnit()}
              </div>
            </div>
          )}

          {status === 'complete' && (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
              <button 
                onClick={startTest}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/30 hover:bg-secondary/50 transition-all hover:scale-110 text-orange border-2 border-orange hover:border-bright-orange animate-pulse"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestInterface;
