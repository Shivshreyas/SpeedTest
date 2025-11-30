import { useState, useEffect } from 'react';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    ip: 'Loading...',
    isp: 'Detecting...',
    location: 'Unknown',
    loading: true
  });

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserInfo({
          ip: data.ip || '192.168.1.1',
          isp: data.org || data.asn || 'Unknown ISP',
          location: `${data.city}, ${data.country_name}` || 'Unknown Location',
          loading: false
        });
      } catch (error) {
        setUserInfo({
          ip: '127.0.0.1',
          isp: 'Local Network',
          location: 'Unknown',
          loading: false
        });
      }
    };
    fetchIP();
  }, []);

  return userInfo;
};
