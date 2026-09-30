import React, { useState, useEffect } from 'react';

export const BrandedLoader = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Keep the cozy loading animation short (1.2s total) so visitors get instant delight without waiting
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1100);

    const completeTimer = setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#FAF7F2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s ease',
        pointerEvents: isFading ? 'none' : 'auto'
      }}
    >
      {/* Solid Clean Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#FAF7F2'
      }} />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
        {/* Animated Stitching Frame around Logo */}
        <div style={{ position: 'relative', width: '110px', height: '110px', marginBottom: '1.25rem' }}>
          {/* Animated SVG Stitching Ring */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              transform: 'rotate(-90deg)',
              pointerEvents: 'none'
            }}
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--primary-terracotta)"
              strokeWidth="2.5"
              strokeDasharray="283"
              strokeDashoffset="0"
              style={{
                animation: 'drawYarnLoop 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards'
              }}
            />
          </svg>

          {/* Central Circular Brand Logo */}
          <div style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(200, 90, 50, 0.25)',
            boxShadow: 'var(--shadow-md)',
            animation: 'cuteLogoPulse 1.2s ease-in-out infinite alternate',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FAF7F2'
          }}>
            <img
              src="/logo.png"
              alt="The Yarn Basket"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Brand Name & Heartwarming Caption */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.45rem',
          fontWeight: '700',
          color: 'var(--text-main)',
          marginBottom: '0.35rem',
          letterSpacing: '0.02em',
          animation: 'fadeInUp 0.6s ease-out both'
        }}>
          The Yarn Basket
        </h2>

        <div style={{
          fontSize: '0.82rem',
          fontWeight: '700',
          color: 'var(--primary-terracotta)',
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          animation: 'fadeInUp 0.8s ease-out both'
        }}>
          <span>HANDMADE WITH</span>
          <span style={{ color: 'var(--primary-rose)', animation: 'cuteHeartbeat 1.2s infinite' }}>♥</span>
          <span>BY SALONI</span>
        </div>
      </div>

      <style>{`
        @keyframes drawYarnLoop {
          0% {
            stroke-dashoffset: 276;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes cuteLogoPulse {
          0% {
            transform: scale(0.96);
          }
          100% {
            transform: scale(1.04);
          }
        }
      `}</style>
    </div>
  );
};

export default BrandedLoader;
