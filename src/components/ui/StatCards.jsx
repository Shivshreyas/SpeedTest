import React from 'react';
import { ArrowDown, ArrowUp, Activity } from 'lucide-react';

export const DownloadCard = ({ downloadSpeed, status, getUnit, displaySpeed }) => (
  <div className={`col-span-2 sm:col-span-1 p-6 rounded-2xl border transition-all duration-300 ${
    status === 'download' || status === 'complete' 
      ? 'bg-secondary/20 border-orange/50 shadow-[0_0_30px_-10px_rgba(255,133,0,0.3)]' 
      : 'bg-secondary/10 border-secondary/30 opacity-60'
  }`}>
    <div className="flex items-center gap-2 text-orange mb-2">
      <ArrowDown className="w-5 h-5" />
      <span className="text-sm font-bold uppercase tracking-wider">Download</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-bold font-mono text-white">{displaySpeed(downloadSpeed)}</span>
      <span className="text-sm text-gray-500">{getUnit()}</span>
    </div>
  </div>
);

export const UploadCard = ({ uploadSpeed, status, getUnit, displaySpeed }) => (
  <div className={`col-span-2 sm:col-span-1 p-6 rounded-2xl border transition-all duration-300 ${
    status === 'upload' || status === 'complete' 
      ? 'bg-secondary/20 border-[#36D6CA]/50 shadow-[0_0_30px_-10px_rgba(54,214,202,0.3)]' 
      : 'bg-secondary/10 border-secondary/30 opacity-60'
  }`}>
    <div className="flex items-center gap-2 text-[#36D6CA] mb-2">
      <ArrowUp className="w-5 h-5" />
      <span className="text-sm font-bold uppercase tracking-wider">Upload</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-bold font-mono text-white">{displaySpeed(uploadSpeed)}</span>
      <span className="text-sm text-gray-500">{getUnit()}</span>
    </div>
  </div>
);

export const PingJitterCard = ({ ping, jitter }) => (
  <div className="col-span-2 p-6 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-secondary/30 flex justify-between items-center">
    <div>
      <div className="flex items-center gap-2 text-orange mb-1">
        <Activity className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Ping</span>
      </div>
      <div className="text-2xl font-bold text-white">
        {ping > 0 ? ping : '—'} <span className="text-sm font-normal text-gray-500">ms</span>
      </div>
    </div>
    <div className="w-px h-10 bg-secondary/50" />
    <div>
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        <span className="text-xs font-bold uppercase tracking-wider">Jitter</span>
      </div>
      <div className="text-2xl font-bold text-white">
        {jitter > 0 ? jitter : '—'} <span className="text-sm font-normal text-gray-500">ms</span>
      </div>
    </div>
  </div>
);
