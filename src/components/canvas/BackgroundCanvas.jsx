import React, { useRef, useEffect } from 'react';

const BackgroundCanvas = ({ status }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    particlesRef.current = [];

    const animateBg = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      
      // Find the actual gauge center by looking for the gauge element
      const gaugeElement = document.querySelector('.gauge-center-point');
      let centerX = w / 2;
      let centerY = h / 2;
      
      if (gaugeElement) {
        const rect = gaugeElement.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      // Spawning Logic
      if (particlesRef.current.length < 150) {
        let p = {
          x: 0, 
          y: 0, 
          speed: Math.random() * 4 + 2, 
          size: Math.random() * 2 + 0.5, 
          alpha: 0,
          angle: Math.random() * Math.PI * 2
        };

        if (status === 'download') {
          const dist = Math.max(w, h) / 1.5;
          p.x = centerX + Math.cos(p.angle) * dist;
          p.y = centerY + Math.sin(p.angle) * dist;
          p.alpha = 0;
          p.targetX = centerX;
          p.targetY = centerY;
        } else if (status === 'upload') {
          p.x = centerX + (Math.random() * 40 - 20);
          p.y = centerY + (Math.random() * 40 - 20);
          p.alpha = 1;
          p.size = Math.random() * 2.5 + 1; // Larger size for upload
          p.angle = Math.random() * Math.PI * 2;
        } else {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.speed = Math.random() * 0.5 + 0.1;
          p.alpha = Math.random() * 0.3;
        }
        particlesRef.current.push(p);
      }

      // Update & Draw
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        let p = particlesRef.current[i];
        
        if (status === 'download') {
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          p.x += (dx / dist) * p.speed * 2;
          p.y += (dy / dist) * p.speed * 2;
          p.alpha = Math.min(p.alpha + 0.02, 0.8);

          if (dist < 20) {
            particlesRef.current.splice(i, 1);
            continue;
          }
        } else if (status === 'upload') {
          p.x += Math.cos(p.angle) * p.speed * 2;
          p.y += Math.sin(p.angle) * p.speed * 2;
          p.alpha -= 0.01;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }
        } else {
          p.y -= p.speed;
          if (p.y < 0) p.y = h;
          
          if (Math.random() > 0.95) p.alpha = Math.random() * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (status === 'download') ctx.fillStyle = `rgba(255, 133, 0, ${p.alpha})`; // #FF8500
        else if (status === 'upload') ctx.fillStyle = `rgba(54, 214, 202, ${p.alpha})`; // #36D6CA
        else ctx.fillStyle = `rgba(255, 158, 0, ${p.alpha})`; // #FF9E00

        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(animateBg);
    };

    requestRef.current = requestAnimationFrame(animateBg);

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [status]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0" 
    />
  );
};

export default BackgroundCanvas;
