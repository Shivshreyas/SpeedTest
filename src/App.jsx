import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackgroundCanvas from './components/canvas/BackgroundCanvas';
import TestInterface from './components/test/TestInterface';
import { DownloadCard, UploadCard, PingJitterCard } from './components/ui/StatCards';
import UserInfoCards from './components/ui/UserInfoCards';
import HistoryView from './components/views/HistoryView';
import SettingsView from './components/views/SettingsView';
import AboutView from './components/views/AboutView';
import { useUserInfo } from './hooks/useUserInfo';
import { useSpeedTest } from './hooks/useSpeedTest';

const SpeedTestApp = () => {
  const [view, setView] = useState('home');
  const [appSettings, setAppSettings] = useState({
    server: 'Automatic (Best)',
    unit: 'Mbps',
    theme: 'Dark'
  });
  const [history, setHistory] = useState([]);

  const userInfo = useUserInfo();
  const {
    status,
    progress,
    ping,
    jitter,
    downloadSpeed,
    uploadSpeed,
    startTest
  } = useSpeedTest(userInfo, appSettings, setHistory);

  const displaySpeed = (val) => val > 0 ? val : '—';
  const getUnit = () => appSettings.unit;

  return (
    <div className="min-h-screen bg-primary text-white font-sans selection:bg-orange selection:text-primary overflow-hidden flex flex-col relative">
      
      <BackgroundCanvas status={status} />

      <Header view={view} setView={setView} />

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-y-auto z-10">
        
        {view === 'home' ? (
          <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-center justify-center animate-in fade-in zoom-in duration-300">
            
            <TestInterface 
              status={status}
              progress={progress}
              startTest={startTest}
              ping={ping}
              downloadSpeed={downloadSpeed}
              uploadSpeed={uploadSpeed}
              appSettings={appSettings}
            />

            <div className="flex-1 w-full max-w-md grid grid-cols-2 gap-4">
              
              <DownloadCard 
                downloadSpeed={downloadSpeed}
                status={status}
                getUnit={getUnit}
                displaySpeed={displaySpeed}
              />

              <UploadCard 
                uploadSpeed={uploadSpeed}
                status={status}
                getUnit={getUnit}
                displaySpeed={displaySpeed}
              />

              <PingJitterCard ping={ping} jitter={jitter} />

              <UserInfoCards userInfo={userInfo} appSettings={appSettings} />
            </div>
          </div>
        ) : view === 'history' ? (
          <HistoryView 
            history={history}
            setHistory={setHistory}
            setView={setView}
            getUnit={getUnit}
          />
        ) : view === 'settings' ? (
          <SettingsView 
            appSettings={appSettings}
            setAppSettings={setAppSettings}
          />
        ) : (
          <AboutView />
        )}
      </main>

      <Footer />

    </div>
  );
};

export default SpeedTestApp;
