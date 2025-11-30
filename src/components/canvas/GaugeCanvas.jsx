import React, { useRef, useEffect } from 'react';

const GaugeCanvas = ({ status, progress, view }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (view !== 'home') {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 20;

    const animateGauge = () => {
      ctx.clearRect(0, 0, width, height);

      // Background Track
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 2.25 * Math.PI);
      ctx.lineWidth = 15;
      ctx.strokeStyle = '#3C096C'; // secondary color
      ctx.lineCap = 'round';
      ctx.stroke();

      // Active Progress Arc
      if (status !== 'idle') {
        const startAngle = 0.75 * Math.PI;
        const totalAngle = 1.5 * Math.PI;
        const currentAngle = startAngle + (totalAngle * (progressRef.current / 100));

        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, status === 'upload' ? '#36D6CA' : '#FF6D00');
        gradient.addColorStop(1, status === 'upload' ? '#2AB3A8' : '#FF9E00');

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, currentAngle);
        ctx.lineWidth = 15;
        ctx.strokeStyle = gradient;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      requestRef.current = requestAnimationFrame(animateGauge);
    };

    requestRef.current = requestAnimationFrame(animateGauge);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [status, view]);

  return (
    <canvas 
      ref={canvasRef} 
      width={384} 
      height={384} 
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default GaugeCanvas;
