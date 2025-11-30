import { useState, useRef, useEffect } from 'react';

export const useSpeedTest = (userInfo, appSettings, setHistory) => {
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  
  const resultSavedRef = useRef(false);

  // Save History Logic
  useEffect(() => {
    if (status === 'complete' && !resultSavedRef.current) {
      resultSavedRef.current = true;
      const newResult = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        ping,
        jitter,
        download: parseFloat(downloadSpeed),
        upload: parseFloat(uploadSpeed),
        isp: userInfo.isp,
        location: userInfo.location,
        server: appSettings.server
      };
      setHistory(prev => [newResult, ...prev]);
    }
  }, [status, ping, jitter, downloadSpeed, uploadSpeed, userInfo, appSettings, setHistory]);

  const runSpeedSimulation = (type) => {
    let speed = 0;
    let currentProgress = 0;
    const targetSpeed = type === 'download' ? (Math.random() * 100 + 150) : (Math.random() * 50 + 80);
    
    const interval = setInterval(() => {
      currentProgress += 1;
      
      if (currentProgress < 20) speed += targetSpeed * 0.02; 
      else if (currentProgress < 80) speed += (Math.random() * 10 - 2); 
      else speed -= targetSpeed * 0.01; 

      if (speed < 0) speed = 0;

      setProgress(currentProgress);
      if (type === 'download') setDownloadSpeed(speed.toFixed(1));
      else setUploadSpeed(speed.toFixed(1));

      if (currentProgress >= 100) {
        clearInterval(interval);
        if (type === 'download') {
          setStatus('upload');
          runSpeedSimulation('upload');
        } else {
          setStatus('complete');
          setProgress(100);
        }
      }
    }, 50);
  };

  const startTest = () => {
    resultSavedRef.current = false;
    setStatus('ping');
    setProgress(0);
    setPing(0);
    setJitter(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    
    let pingInterval = setInterval(() => {
      setPing(Math.floor(Math.random() * 20) + 10);
      setJitter(Math.floor(Math.random() * 5));
    }, 100);

    setTimeout(() => {
      clearInterval(pingInterval);
      setPing(14);
      setJitter(2);
      setStatus('download');
      runSpeedSimulation('download');
    }, 1500);
  };

  return {
    status,
    progress,
    ping,
    jitter,
    downloadSpeed,
    uploadSpeed,
    startTest
  };
};
