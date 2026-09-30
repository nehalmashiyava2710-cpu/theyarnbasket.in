import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

export const YarnStorySection = ({ navigate }) => {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      step: '01',
      title: 'Raw Spun Fibers',
      desc: 'Selecting ethical organic cotton & merino wool skeins for softest handfeel and lasting colorfast vibrancy.',
      img: '/products/180--pairs-2-.jpg',
      tag: 'Material Discovery'
    },
    {
      step: '02',
      title: 'Artisan Stitching',
      desc: 'Countless hours of focused loop-by-loop crochet tension, transforming yarn into intricate 3D sculptural forms.',
      img: '/products/thai-rose-450--1-.jpg',
      tag: 'Handcrafting Magic'
    },
    {
      step: '03',
      title: 'Finished Heirloom Creation',
      desc: 'Gentle hand-steaming, bespoke labels, and eco gift wrapping ready to bring warmth to your home or loved one.',
      img: '/products/bloming-sunflower-bouquet-1249-.jpg',
      tag: 'The Completed Piece'
    }
  ];

  return (
    <section className="section-padding" style={{
      background: 'var(--bg-warm)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Woven Stitched Border on Section */}
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: ' clamp(2.5rem, 5vw, 4.5rem)',
          alignItems: 'center'
        }}>
          {/* Left: Editorial Visual & Interactive Stage Card */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                position: 'relative',
                paddingTop: '80%',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--bg-canvas)'
              }}>
                <img
                  src={stages[activeStage - 1].img}
                  alt={stages[activeStage - 1].title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.5s ease'
                  }}
                />

                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(255,255,255,0.9)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: 'var(--primary-terracotta)'
                }}>
                  {stages[activeStage - 1].tag}
                </div>
              </div>

              {/* Stage Selector Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
                {stages.map((s, idx) => {
                  const isActive = activeStage === idx + 1;
                  return (
                    <button
                      key={s.step}
                      onClick={() => setActiveStage(idx + 1)}
                      style={{
                        padding: '0.6rem 0.4rem',
                        borderRadius: 'var(--radius-sm)',
                        background: isActive ? 'var(--primary-terracotta)' : 'var(--bg-canvas)',
                        color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        textAlign: 'center',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      Stage {s.step}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Narrative Storytelling */}
          <div>
            <span className="stitch-pill" style={{ marginBottom: '0.75rem' }}>
              <Sparkles size={13} /> Our Philosophy & Making
            </span>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
              color: 'var(--text-main)',
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}>
              From Yarn to Something Special.
            </h2>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-main)',
              fontWeight: '500',
              lineHeight: '1.6',
              marginBottom: '1.25rem'
            }}>
              Every piece starts with a simple strand of yarn and becomes something unique through creativity, patience, and handmade craftsmanship.
            </p>

            {/* Value Checkmarks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-sage)' }} />
                <span style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)' }}>
                  Hypoallergenic, skin-soft natural yarns
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-sage)' }} />
                <span style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)' }}>
                  Everlasting flowers that never wilt
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-sage)' }} />
                <span style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)' }}>
                  Empowering handmade artisan craft in India
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                navigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.85rem' }}
            >
              <span>Read Our Full Story</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
