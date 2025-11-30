import React from 'react';
import { Globe, MapPin, Server } from 'lucide-react';

const UserInfoCards = ({ userInfo, appSettings }) => (
  <div className="col-span-2 mt-4 space-y-3">
    <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/10 border border-secondary/30 backdrop-blur-sm">
      <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
        <Globe className="w-5 h-5 text-gray-400" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-orange uppercase tracking-wider mb-0.5">Internet Provider</div>
        <div className="text-white font-medium truncate">
          {userInfo.loading ? (
            <span className="animate-pulse bg-gray-800 rounded h-4 w-24 block"></span>
          ) : userInfo.isp}
        </div>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-gray-900/30 border border-gray-800/50 backdrop-blur-sm">
        <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
        <div className="min-w-0">
          <div className="text-[10px] font-medium text-orange uppercase tracking-wider mb-0.5">Location</div>
          <div className="text-sm text-gray-300 truncate">
            {userInfo.loading ? '...' : userInfo.location}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-gray-900/30 border border-gray-800/50 backdrop-blur-sm">
        <Server className="w-4 h-4 text-gray-500 shrink-0" />
        <div className="min-w-0">
          <div className="text-[10px] font-medium text-orange uppercase tracking-wider mb-0.5">Server</div>
          <div className="text-sm text-gray-300 truncate font-mono">
            {appSettings.server === 'Automatic (Best)' ? 'Auto' : appSettings.server.split(',')[0]}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UserInfoCards;
