import React from 'react';
import { Sparkles, ArrowRight, Palette, Scissors, Heart } from 'lucide-react';

export const CustomOrderBanner = ({ navigate }) => {
  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div
          style={{
            background: '#2E1C14',
            borderRadius: 'var(--radius-xs)',
            padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Decorative Background Thread Pattern */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '50%',
              height: '100%',
              pointerEvents: 'none',
              opacity: 0.12
            }}
            viewBox="0 0 400 400"
            fill="none"
          >
            <circle cx="200" cy="200" r="180" stroke="#FAF7F2" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="200" cy="200" r="130" stroke="#EAA888" strokeWidth="2" />
            <path d="M50 200 Q 200 50 350 200 T 50 200" stroke="#CE7C74" strokeWidth="2.5" />
          </svg>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <div>
              <span
                className="stitch-pill"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  borderColor: 'rgba(234, 168, 136, 0.4)',
                  color: 'var(--primary-peach)',
                  marginBottom: '1rem',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                <Sparkles size={13} /> Bespoke Commission Atelier
              </span>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: '1rem'
              }}>
                Want Something Made Just for You?
              </h2>

              <p style={{
                fontSize: '1.05rem',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.65',
                marginBottom: '2rem',
                maxWidth: '520px'
              }}>
                Have an idea in mind? Tell us what you want, and we’ll turn it into a handmade creation.
              </p>

              <button
                onClick={() => {
                  navigate('custom-order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary"
                style={{
                  fontSize: '1rem',
                  padding: '0.95rem 2.2rem',
                  background: 'var(--primary-terracotta)',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                <span>Request Custom Order</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Visual Custom Order Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-xs)',
                padding: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <Palette size={24} style={{ color: 'var(--primary-peach)', marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                  Custom Palette
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Match your wedding or interior decor colors
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-xs)',
                padding: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <Scissors size={24} style={{ color: 'var(--accent-sage)', marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                  Bespoke Sizing
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  From pocket keychains to 65" throws
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-xs)',
                padding: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <Heart size={24} style={{ color: 'var(--primary-rose)', marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                  Personalized Tags
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Laser-engraved wooden names & initials
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-xs)',
                padding: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}>
                <Sparkles size={24} style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                  Direct Collaboration
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  Chat directly with artist Saloni
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
