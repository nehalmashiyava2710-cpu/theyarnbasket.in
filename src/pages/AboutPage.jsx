import React from 'react';
import { Heart, Sparkles, Scissors, Leaf, ArrowRight, ShieldCheck, Sun } from 'lucide-react';

export const AboutPage = ({ navigate }) => {
  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Editorial Hero Banner */}
      <div style={{
        background: 'var(--bg-warm)',
        padding: 'clamp(3.5rem, 6vw, 5.5rem) 0 3rem 0',
        borderBottom: '1px solid var(--border-subtle)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="stitch-pill" style={{ marginBottom: '1rem', borderRadius: 'var(--radius-xs)' }}>
            <Heart size={13} fill="var(--primary-terracotta)" /> The Story of The Yarn Basket
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            Crafting Warmth, Memory, and Magic in Every Strand.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
            The Yarn Basket was born from a simple belief: that objects made by patient human hands carry a soul, tenderness, and enduring beauty that machines will never match.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3.5rem' }}>
        {/* Founder Story 2-Column */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(2.5rem, 5vw, 4.5rem)',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          <div>
            <span className="stitch-pill stitch-pill-sage" style={{ marginBottom: '0.75rem', borderRadius: 'var(--radius-xs)' }}>
              <Scissors size={13} /> The Maker's Journey
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              How Saloni Began Stitched Dreams
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              What started at a sunlit wooden kitchen table with a single skein of sunflower-yellow cotton yarn has grown into a beloved slow-craft studio creating everlasting botanicals and heirloom throws for thousands of homes across India.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
              "When I crochet, time slows down. Each petal of a rose, each eye of a sleepy panda, each mandala stitch in a thalposh requires genuine presence. When that piece reaches your hands, you receive that quiet, loving energy." — Saloni
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => navigate('shop')} className="btn btn-primary" style={{ borderRadius: 'var(--radius-xs)' }}>
                <span>Explore the Creations</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xs)', border: '1.5px dashed var(--border-stitch)', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '85%', borderRadius: 'var(--radius-xs)', overflow: 'hidden', background: '#FAF7F2', marginBottom: '1.25rem' }}>
                <img
                  src="/logo.png"
                  alt="The Yarn Basket Official Brand"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
                />
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                The Yarn Basket Atelier
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--primary-terracotta)', fontWeight: '600' }}>
                Handmade with ♥ by Saloni • Est. 2023
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem'
        }}>
          <div className="glass-card" style={{ padding: '2.5rem 2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-xs)', background: 'var(--primary-rose-light)', color: 'var(--primary-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Leaf size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Pure, Skin-Soft Yarns
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              We test all fibers for zero synthetic prickliness. Our milk cotton and merino yarns are breathable, hypoallergenic, baby-safe, and colored with non-toxic dyes.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem 2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-xs)', background: 'var(--accent-gold-light)', color: '#B5851C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Sun size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Everlasting Botanical Art
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Cut flowers wilt in days, but our hand-tied crochet bouquets stay vibrant and fresh for decades — symbolizing everlasting love, gratitude, and friendship.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem 2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-xs)', background: 'var(--accent-sage-light)', color: 'var(--accent-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Artisan Community Support
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              By choosing The Yarn Basket, you directly support local Indian women artisans who earn dignified fair wages while practicing their cherished cultural crafts from home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
