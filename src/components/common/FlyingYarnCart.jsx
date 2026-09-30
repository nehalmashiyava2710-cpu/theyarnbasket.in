import React, { useState, useEffect } from 'react';

// Global Event Dispatcher for flying yarn effect
export const triggerFlyingYarn = (startX, startY) => {
  const event = new CustomEvent('fly-yarn-to-cart', {
    detail: { startX, startY }
  });
  window.dispatchEvent(event);
};

export const FlyingYarnCart = () => {
  const [yarnParticles, setYarnParticles] = useState([]);

  useEffect(() => {
    const handleFly = (e) => {
      const { startX = window.innerWidth / 2, startY = window.innerHeight / 2 } = e.detail || {};
      
      // Calculate destination (Top right cart icon in header)
      const cartIcon = document.getElementById('header-cart-icon');
      let destX = window.innerWidth - 60;
      let destY = 30;

      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect();
        destX = rect.left + rect.width / 2;
        destY = rect.top + rect.height / 2;
      }

      const id = Date.now() + Math.random();
      const newParticle = { id, startX, startY, destX, destY };

      setYarnParticles((prev) => [...prev, newParticle]);

      // Remove after animation ends (850ms) and trigger cart bounce
      setTimeout(() => {
        setYarnParticles((prev) => prev.filter((p) => p.id !== id));
        if (cartIcon) {
          cartIcon.classList.remove('cart-bounce-pop');
          void cartIcon.offsetWidth; // trigger reflow
          cartIcon.classList.add('cart-bounce-pop');
        }
      }, 850);
    };

    window.addEventListener('fly-yarn-to-cart', handleFly);
    return () => window.removeEventListener('fly-yarn-to-cart', handleFly);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {yarnParticles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.startX}px`,
            top: `${p.startY}px`,
            '--dest-x': `${p.destX - p.startX}px`,
            '--dest-y': `${p.destY - p.startY}px`,
            animation: 'flyParabola 0.82s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            filter: 'drop-shadow(0 4px 12px rgba(200, 90, 50, 0.4))'
          }}
        >
          🧶
        </div>
      ))}

      <style>{`
        @keyframes flyParabola {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          40% {
            transform: translate(calc(var(--dest-x) * 0.45), calc(var(--dest-y) * 0.25 - 45px)) scale(1.25) rotate(180deg);
            opacity: 1;
          }
          85% {
            transform: translate(calc(var(--dest-x) * 0.92), calc(var(--dest-y) * 0.92)) scale(0.85) rotate(320deg);
            opacity: 0.9;
          }
          100% {
            transform: translate(var(--dest-x), var(--dest-y)) scale(0.3) rotate(360deg);
            opacity: 0;
          }
        }

        .cart-bounce-pop {
          animation: cartPopSpring 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes cartPopSpring {
          0% {
            transform: scale(1);
          }
          40% {
            transform: scale(1.35);
          }
          75% {
            transform: scale(0.92);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default FlyingYarnCart;
