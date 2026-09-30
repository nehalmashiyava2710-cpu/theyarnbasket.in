import React, { useState } from 'react';
import { Sparkles, Scissors, HeartHandshake, PackageCheck, Palette, Check } from 'lucide-react';

export const HowItsMadeInteractive = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'Choose the Yarn',
      subtitle: 'Pure Ethical Fiber Sourcing',
      desc: 'We curate premium 100% milk cotton and organic wool yarns, carefully selected for skin softness and lasting color.',
      icon: Palette,
      badge: 'Step 01',
      details: ['Natural combed fibers', 'Skin-safe dyes', 'Buttery soft texture'],
      image: '/products/180--pairs-2-.jpg'
    },
    {
      number: 2,
      title: 'Create by Hand',
      subtitle: 'Stitch by Mindful Stitch',
      desc: 'Our artisans hand-crochet every loop with precision tension — no automated factory shortcuts.',
      icon: Scissors,
      badge: 'Step 02',
      details: ['Precision gauge tension', 'Sculpted wire supports', 'Heirloom knot security'],
      image: '/products/thai-rose-450--1-.jpg'
    },
    {
      number: 3,
      title: 'Finishing Touches',
      subtitle: 'Details that Define Quality',
      desc: 'Each piece undergoes gentle steam blocking and receives an engraved studio wooden tag.',
      icon: HeartHandshake,
      badge: 'Step 03',
      details: ['Steam fiber relax', 'Secure concealed joins', 'Artisan signature mark'],
      image: '/products/rose-hand-bracket-150-.jpg'
    },
    {
      number: 4,
      title: 'Pack & Deliver',
      subtitle: 'Gift Ready & Eco-Protected',
      desc: 'Lovingly gift-wrapped with butter paper, satin ribbon, and a personalized handwritten craft note.',
      icon: PackageCheck,
      badge: 'Step 04',
      details: ['Recyclable packaging', 'Handwritten note included', 'Tracked courier delivery'],
      image: '/products/bloming-sunflower-bouquet-1249-.jpg'
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-canvas)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
          <span className="stitch-pill" style={{ marginBottom: '0.6rem' }}>
            <Sparkles size={13} /> The Creation Journey
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            How It’s Handcrafted
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Follow the continuous strand of yarn as it transforms from a simple skein into a finished work of art.
          </p>
        </div>

        {/* Continuous Yarn Thread Path Connector (Desktop & Tablet) */}
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            position: 'relative',
            zIndex: 1
          }}>
            {steps.map((step) => {
              const isActive = activeStep === step.number;
              const isPassed = activeStep >= step.number;
              const IconComp = step.icon;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  style={{
                    background: isActive ? 'var(--bg-surface)' : 'var(--bg-warm)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem 1.25rem',
                    border: `1.5px solid ${isActive ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                    boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    transform: isActive ? 'translateY(-4px)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Step Number Square */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-xs)',
                    background: isPassed
                      ? 'var(--primary-terracotta)'
                      : 'var(--bg-tertiary)',
                    color: isPassed ? '#FFFFFF' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: isActive ? '0 4px 10px rgba(200,90,50,0.3)' : 'none',
                    transition: 'var(--transition-smooth)'
                  }}>
                    <IconComp size={20} />
                  </div>

                  <span className="stitch-pill" style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem', marginBottom: '0.5rem', borderRadius: 'var(--radius-xs)' }}>
                    {step.badge}
                  </span>

                  <h3 style={{
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: 'var(--text-main)',
                    marginBottom: '0.3rem'
                  }}>
                    {step.title}
                  </h3>

                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {step.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Step Feature Box */}
        <div className="glass-card" style={{
          padding: '2rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--border-card)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            {/* Step Description & Highlights */}
            <div>
              <span className="stitch-pill" style={{ marginBottom: '0.75rem', borderRadius: 'var(--radius-xs)' }}>
                Stage {steps[activeStep - 1].number} of 4: {steps[activeStep - 1].title}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                fontWeight: '600',
                color: 'var(--text-main)',
                marginBottom: '1rem'
              }}>
                {steps[activeStep - 1].subtitle}
              </h3>
              <p style={{
                fontSize: '0.98rem',
                color: 'var(--text-muted)',
                lineHeight: '1.7',
                marginBottom: '1.5rem'
              }}>
                {steps[activeStep - 1].desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {steps[activeStep - 1].details.map((detail, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: 'var(--radius-xs)',
                      background: 'var(--accent-sage-light)',
                      color: 'var(--accent-sage)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Visual Preview */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              paddingTop: '65%',
              background: 'var(--bg-warm)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <img
                src={steps[activeStep - 1].image}
                alt={steps[activeStep - 1].title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
