import React from 'react';
import { Heart, Sparkles, Award, Sliders } from 'lucide-react';

export const WhyHandmade = () => {
  const features = [
    {
      icon: Heart,
      title: 'Handmade with Care',
      desc: 'Every piece is patiently hand-stitched loop by loop with gentle human love that machines can never replicate.',
      color: '#D96B4F',
      bg: 'var(--primary-rose-light)'
    },
    {
      icon: Sparkles,
      title: 'Unique Designs',
      desc: 'Artisan creations with charming details and character that make each item one-of-a-kind.',
      color: '#E5B448',
      bg: 'var(--accent-gold-light)'
    },
    {
      icon: Award,
      title: 'Quality Materials',
      desc: 'Selected premium skin-friendly milk cotton, merino wool, and eco-friendly packaging built to last.',
      color: '#7DA691',
      bg: 'var(--accent-sage-light)'
    },
    {
      icon: Sliders,
      title: 'Made for You',
      desc: 'Bespoke customization with your choice of favorite colors, sizes, name charms, and bouquet pairings.',
      color: '#A895BE',
      bg: 'var(--accent-lavender-light)'
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-warm-tint)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
          <span className="stitch-pill" style={{ marginBottom: '0.6rem' }}>
            <Sparkles size={13} /> The Slow Craft Difference
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Why The Yarn Basket?
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Every strand holds meaning, every knot tells a story. Here is what makes our handcrafted yarn art truly special.
          </p>
        </div>

        {/* Feature Cards Grid - 4 Curated Points */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.75rem'
        }}>
          {features.map((feat, idx) => {
            const IconComp = feat.icon;

            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '2rem 1.75rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-card)',
                  transition: 'var(--transition-smooth)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)',
                  background: feat.bg,
                  color: feat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <IconComp size={24} />
                </div>

                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: 'var(--text-main)',
                  marginBottom: '0.5rem'
                }}>
                  {feat.title}
                </h3>

                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6'
                }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
