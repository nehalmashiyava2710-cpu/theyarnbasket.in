import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const StudioShowcase = () => {
  const feedItems = [
    { img: '/products/bloming-big-flowers-600-each.jpg', title: 'Peony Blooms in Progress', likes: '1.2k' },
    { img: '/products/img-20260926-wa0038.jpg', title: 'Panda Amigurumi Finishing', likes: '2.4k' },
    { img: '/products/4500-rose-blanket-50-inch.jpg', title: '50-Inch Heirloom Rose Blanket', likes: '3.1k' },
    { img: '/products/thal-posh-2800-30-inch.jpg', title: 'Intricate Royal Thalposh Mandala', likes: '1.8k' },
    { img: '/products/muffler-999-.jpg', title: 'Cloud-Soft Merino Winter Scarf', likes: '980' },
    { img: '/products/mini-sunflower-purse-280-.jpg', title: 'Sunflower Crossbody Purse', likes: '1.5k' }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-canvas)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <span className="stitch-pill" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span>@theyarnbasket.in</span>
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginTop: '0.35rem' }}>
              From Our Craft Atelier
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Behind the stitches, customer unboxing smiles, and slow making moments.
            </p>
          </div>

          <a
            href="https://www.instagram.com/theyarnbasket.in?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.88rem' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <span>Follow @theyarnbasket.in</span>
          </a>
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {feedItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                paddingTop: '100%',
                background: 'var(--bg-warm)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.feed-overlay');
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.feed-overlay');
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* Hover Overlay */}
              <div
                className="feed-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(42, 33, 29, 0.75)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.4rem', color: 'var(--primary-peach)' }}>
                  <Heart size={16} fill="var(--primary-peach)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.likes}</span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: '600', lineHeight: '1.3' }}>
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
