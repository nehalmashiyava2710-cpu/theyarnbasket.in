import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, MessageCircle, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';
import { WhatsAppIcon } from './WhatsAppIcon';

const CUTE_TIPS = [
  "Handmade with lots of love by Saloni Ma'am! 🌸",
  "Every bloom & plushie is 100% hand-crocheted 🧶",
  "Want a custom name or favorite colors? Just ask on WhatsApp! 💬",
  "Softest milk cotton & organic merino yarns only ✨",
  "Tap me to sprinkle atelier craft magic! 💖"
];

export const CuteFloatingYarnBuddy = () => {
  const { directWhatsAppChat } = useStore();
  const [tipIndex, setTipIndex] = useState(0);
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % CUTE_TIPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleBuddyClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 800);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { x: 0.9, y: 0.85 },
        colors: ['#DE8C82', '#688B74', '#E5B448', '#C85A32', '#FAF7F2'],
        shapes: ['circle', 'square'],
        scalar: 0.9
      });
    } catch (e) {}
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="cute-bob"
        style={{
          position: 'fixed',
          bottom: '88px',
          right: '24px',
          zIndex: 890,
          background: 'var(--bg-surface)',
          border: '2px solid var(--primary-rose)',
          borderRadius: 'var(--radius-full)',
          padding: '0.4rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 14px rgba(222, 140, 130, 0.35)',
          cursor: 'pointer',
          fontSize: '0.78rem',
          fontWeight: '700',
          color: 'var(--primary-terracotta)'
        }}
        title="Open Yarn Buddy"
      >
        <span>🧶✨</span>
        <span>Yarn Buddy</span>
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '84px',
        right: '24px',
        zIndex: 890,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'none'
      }}
    >
      {/* Cute Animated Speech Bubble */}
      {isBubbleOpen && (
        <div
          className="cute-speech-bubble"
          style={{
            pointerEvents: 'auto',
            marginBottom: '10px',
            maxWidth: '240px',
            fontSize: '0.82rem',
            color: 'var(--text-main)',
            lineHeight: 1.4,
            fontWeight: '600'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-main)' }}>
              {CUTE_TIPS[tipIndex]}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsBubbleOpen(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-light)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Close speech bubble"
            >
              <X size={13} />
            </button>
          </div>

          {/* Quick 1-tap WhatsApp Action inside Bubble */}
          <div style={{ marginTop: '0.45rem', paddingTop: '0.4rem', borderTop: '1px dashed var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-sage)', fontWeight: '700' }}>
              • Atelier Online
            </span>
            <button
              onClick={() => directWhatsAppChat('Hi Saloni ma\'am! 🌸 I would like to ask a quick craft question.')}
              style={{
                background: 'var(--primary-rose-light)',
                color: 'var(--primary-terracotta)',
                border: '1px solid var(--primary-rose)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.2rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <WhatsAppIcon size={12} color="var(--primary-terracotta)" />
              <span>Say Hi!</span>
            </button>
          </div>
        </div>
      )}

      {/* Cute Interactive Yarn Mascot */}
      <div style={{ position: 'relative', pointerEvents: 'auto' }}>
        <button
          onClick={handleBuddyClick}
          className={isBouncing ? 'cute-wiggle-hover' : 'cute-bob'}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--primary-terracotta)',
            border: '2px solid #FFFFFF',
            boxShadow: 'var(--shadow-sm)',
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformOrigin: 'bottom center',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          title="Tap Yarn Buddy for craft magic! 🌸"
        >
          {/* Cute Face (Two little eyes & blushing cheeks) */}
          <div style={{ position: 'relative', width: '32px', height: '24px' }}>
            {/* Eyes */}
            <div style={{ position: 'absolute', top: '6px', left: '6px', width: '5px', height: '6px', background: '#FFFFFF', borderRadius: 'var(--radius-xs)' }} />
            <div style={{ position: 'absolute', top: '6px', right: '6px', width: '5px', height: '6px', background: '#FFFFFF', borderRadius: 'var(--radius-xs)' }} />
            {/* Eye glints */}
            <div style={{ position: 'absolute', top: '7px', left: '7px', width: '2px', height: '2px', background: '#2E1C14', borderRadius: 'var(--radius-xs)' }} />
            <div style={{ position: 'absolute', top: '7px', right: '7px', width: '2px', height: '2px', background: '#2E1C14', borderRadius: 'var(--radius-xs)' }} />
            {/* Blushing Cheeks */}
            <div style={{ position: 'absolute', top: '12px', left: '2px', width: '7px', height: '4px', background: 'rgba(255, 200, 210, 0.8)', borderRadius: 'var(--radius-xs)' }} />
            <div style={{ position: 'absolute', top: '12px', right: '2px', width: '7px', height: '4px', background: 'rgba(255, 200, 210, 0.8)', borderRadius: 'var(--radius-xs)' }} />
            {/* Smiling mouth */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', width: '8px', height: '4px', borderBottom: '2px solid #FFFFFF', borderRadius: '0 0 2px 2px' }} />
          </div>

          {/* Little Daisy Flower Hairpin */}
          <span
            className="cute-spin"
            style={{
              position: 'absolute',
              top: '-6px',
              right: '-4px',
              fontSize: '15px',
              lineHeight: 1,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
            }}
          >
            🌼
          </span>

          {/* Beating Heart Badge */}
          <span
            className="cute-heart-beat"
            style={{
              position: 'absolute',
              bottom: '-3px',
              left: '-3px',
              fontSize: '13px',
              lineHeight: 1
            }}
          >
            💖
          </span>
        </button>

        {/* Minimize Button */}
        <button
          onClick={() => setIsMinimized(true)}
          style={{
            position: 'absolute',
            top: '-6px',
            left: '-6px',
            width: '18px',
            height: '18px',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}
          title="Minimize Yarn Buddy"
          aria-label="Minimize"
        >
          <X size={10} />
        </button>
      </div>
    </div>
  );
};

export default CuteFloatingYarnBuddy;
