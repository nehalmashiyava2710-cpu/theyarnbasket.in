import React, { useState } from 'react';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const CategoryBento = ({ navigate }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Separate standard categories (first 6) from featured bespoke custom creations
  const standardCategories = CATEGORIES.filter(c => c.id !== 'custom');
  const customCategory = CATEGORIES.find(c => c.id === 'custom');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-canvas)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          <span className="stitch-pill" style={{ marginBottom: '0.6rem' }}>
            <Sparkles size={13} /> Curated Handmade Collections
          </span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
            color: 'var(--text-main)',
            marginBottom: '0.75rem'
          }}>
            Explore Our Craft Worlds
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Each creation begins with premium unspun fibers and blossoms into an unforgettable story.
          </p>
        </div>

        {/* 6 Perfectly Balanced Category Cards in a Clean 3-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(1.25rem, 2.5vw, 1.85rem)',
          marginBottom: '1.85rem'
        }}>
          {standardCategories.map((cat) => {
            const isHovered = hoveredCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  navigate('shop', { category: cat.id });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: `1.5px solid ${isHovered ? 'var(--primary-terracotta)' : 'var(--border-card)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Edge-to-Edge Full Photo Container with Overlay */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '75%',
                  overflow: 'hidden',
                  background: cat.bgTint || 'var(--bg-warm)'
                }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: cat.imagePosition || 'center center',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />

                  {/* Top Badges Floating Over Image */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 2
                  }}>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.74rem',
                      fontWeight: '700',
                      color: 'var(--text-main)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      {cat.itemCount} Designs
                    </span>

                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-xs)',
                      background: isHovered ? 'var(--primary-terracotta)' : 'rgba(255, 255, 255, 0.94)',
                      color: isHovered ? '#FFFFFF' : 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      transition: 'all 0.25s ease'
                    }}>
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>

                {/* Bottom Content Body */}
                <div style={{
                  padding: '1.25rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg-surface)'
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.28rem',
                      fontWeight: '700',
                      color: 'var(--text-main)',
                      marginBottom: '0.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>{cat.name}</span>
                      <span style={{ fontSize: '1.1rem' }}>
                        {cat.id === 'crochet' ? '🌸' : cat.id === 'knitted' ? '🧶' : cat.id === 'bags' ? '👜' : cat.id === 'home-decor' ? '🏡' : cat.id === 'accessories' ? '🎀' : '🐼'}
                      </span>
                    </h3>
                    <p style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      margin: 0,
                      lineHeight: 1.4
                    }}>
                      {cat.tagline || '100% handcrafted with love'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Wide Custom Creations Showcase Banner */}
        {customCategory && (
          <div
            onClick={() => {
              navigate('custom-order');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: 'var(--bg-warm)',
              borderRadius: 'var(--radius-sm)',
              border: '2px dashed var(--primary-peach)',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.3s ease',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--primary-terracotta)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = 'var(--primary-peach)';
            }}
          >
            {/* Left: Headline & Description */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.6rem' }}>
                <span className="stitch-pill" style={{ background: 'var(--primary-rose-light)', color: 'var(--primary-terracotta)' }}>
                  <Sparkles size={13} /> Bespoke Commission Atelier
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', fontWeight: '700' }}>
                  • Custom Colors & Initial Tags
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                color: 'var(--text-main)',
                marginBottom: '0.5rem',
                fontWeight: '700'
              }}>
                Custom Creations & Keepsakes ✨
              </h3>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '520px' }}>
                Have a dream color palette, personalized name keychain, or special gift bouquet in mind? Saloni Ma’am crochets your vision to life.
              </p>

              <button
                className="btn btn-primary"
                style={{
                  fontSize: '0.92rem',
                  padding: '0.75rem 1.6rem',
                  boxShadow: '0 6px 18px rgba(200, 90, 50, 0.3)'
                }}
              >
                <span>Request Custom Creation</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right: Curated Photo Trio Preview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.85rem',
              alignItems: 'center'
            }}>
              <div style={{
                position: 'relative',
                paddingTop: '100%',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <img
                  src="/products/bunny-keychain-130-.jpg"
                  alt="Bunny Keychain"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 80%' }}
                />
              </div>

              <div style={{
                position: 'relative',
                paddingTop: '100%',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transform: 'scale(1.06)',
                zIndex: 2,
                border: '2px solid #FFFFFF'
              }}>
                <img
                  src="/products/bloming-sunflower-bouquet-1249-.jpg"
                  alt="Bouquet Creation"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{
                position: 'relative',
                paddingTop: '100%',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <img
                  src="/products/rose-hand-bracket-150-.jpg"
                  alt="Rose Charm"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryBento;
