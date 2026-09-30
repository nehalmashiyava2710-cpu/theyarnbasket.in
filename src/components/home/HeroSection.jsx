import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useStore } from '../../context/StoreContext';

export const HeroSection = ({ navigate }) => {
  const { directWhatsAppChat } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Quick Category Story Bubbles - 100% Verified Real Photos (Visible exclusively on Mobile)
  const categoryHighlights = [
    { id: 'crochet', name: 'Bouquets', emoji: '🌻', image: '/products/bloming-sunflower-bouquet-1249-.jpg' },
    { id: 'knitted', name: 'Plushies', emoji: '🧸', image: '/products/img-20260926-wa0038.jpg' },
    { id: 'bags', name: 'Bags', emoji: '👜', image: '/products/mini-sunflower-purse-280-.jpg' },
    { id: 'custom', name: 'Custom', emoji: '✨', image: '/products/pink-lily-999-.jpg' },
    { id: 'accessories', name: 'Keychains', emoji: '🌸', image: '/products/bunny-keychain-130-.jpg' },
    { id: 'home-decor', name: 'Home Décor', emoji: '🏡', image: '/products/thal-posh-2800-30-inch.jpg' }
  ];

  // Hero Featured Showcase Slides - 100% Verified Real Photos & Real Product IDs
  const heroSlides = [
    {
      id: 'prod-01',
      title: 'Grand Golden Sunflower Bouquet',
      category: 'Everlasting Handtied Blooms',
      price: 1249,
      origPrice: 1599,
      badge: '★ Featured Handcrafted Drop',
      image: '/products/bloming-sunflower-bouquet-1249-.jpg',
      leadTime: 'Ready to Ship'
    },
    {
      id: 'prod-17',
      title: 'Chubby Panda Plushie Cutie',
      category: '100% Skin-Soft Baby Yarns',
      price: 300,
      origPrice: 450,
      badge: '🧸 Handcrafted Amigurumi',
      image: '/products/img-20260926-wa0038.jpg',
      leadTime: 'Most Loved'
    },
    {
      id: 'prod-08',
      title: 'Mini Sunflower Artisan Purse Bag',
      category: 'Handcrafted Boho Pouch',
      price: 280,
      origPrice: 400,
      badge: '👜 Artisan Essential',
      image: '/products/mini-sunflower-purse-280-.jpg',
      leadTime: 'Bespoke Craft'
    },
    {
      id: 'prod-05',
      title: 'Van Gogh Inspired Sunflower Pot',
      category: 'Everlasting Deskposy Décor',
      price: 599,
      origPrice: 799,
      badge: '🌸 Desk Décor Special',
      image: '/products/van-gogh-bought-599-.jpg',
      leadTime: 'Instant Gift'
    }
  ];

  // Auto-slide loop on mobile / desktop when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4600);
    return () => clearInterval(interval);
  }, [isHovered, heroSlides.length]);

  const currentHero = heroSlides[activeSlide];

  return (
    <section className="hero-section-wrap">
      {/* Decorative Animated Handmade Thread Path Drawing Itself */}
      <svg
        className="hero-stitch-bg"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-50 150 C 300 50, 450 350, 750 200 C 1050 50, 1200 400, 1500 250"
          stroke="url(#threadGradientHero)"
          strokeWidth="3.5"
          strokeDasharray="12 12"
          fill="none"
          className="animated-stitch-path"
        />
        <defs>
          <linearGradient id="threadGradientHero" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C85A32" />
            <stop offset="35%" stopColor="#EAA888" />
            <stop offset="70%" stopColor="#DE8C82" />
            <stop offset="100%" stopColor="#688B74" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* 1. Category Stories Bar (Mobile ONLY - Completely hidden on Laptop/Desktop) */}
        <div className="hero-story-bar">
          <div className="hero-story-bubbles-row">
            {categoryHighlights.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'custom') {
                    navigate('custom-order');
                  } else {
                    navigate('shop', { category: cat.id });
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hero-story-bubble-item"
              >
                <div className="hero-story-bubble-img-wrap">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="hero-story-bubble-img"
                    onError={(e) => {
                      e.currentTarget.src = '/products/bloming-sunflower-bouquet-1249-.jpg';
                    }}
                  />
                  <span className="hero-story-bubble-emoji">{cat.emoji}</span>
                </div>
                <span className="hero-story-bubble-label">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Main 2-Column Hero Grid */}
        <div className="hero-grid">
          {/* Left Column: Brand Story, Headline & Rich Action Buttons */}
          <div className="hero-text-col">
            {/* Atelier Pill Badge */}
            <div style={{ marginBottom: '1.2rem' }}>
              <span className="stitch-pill cute-bob" style={{ fontSize: '0.86rem', padding: '0.45rem 1.15rem' }}>
                <Sparkles size={14} className="cute-sparkle-anim" /> Artisanal Handcrafted Studio • By Saloni
              </span>
            </div>

            {/* Main Headline with Animated Hand-Drawn Stitch Underline */}
            <h1 className="hero-headline">
              Made with Yarn.{' '}
              <span className="hero-highlight-word">
                Made with Love.
                {/* Hand-drawn stitch underline */}
                <svg
                  className="hero-underline-svg"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M5 8 Q 100 -2 195 8"
                    stroke="var(--primary-peach)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="210"
                    strokeDashoffset="210"
                    style={{ animation: 'drawUnderline 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.3s' }}
                  />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="hero-subtext">
              Everlasting crochet flower bouquets, bespoke amigurumi plushies, and heirloom creations handcrafted stitch-by-stitch with pure slow-craft magic.
            </p>

            {/* Action Buttons: 3 Full Buttons on Laptop, 2-Column Grid on Mobile */}
            <div className="hero-cta-group">
              <button
                onClick={() => {
                  navigate('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-primary hero-btn-primary"
              >
                <span>Shop Creations</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => {
                  navigate('custom-order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-secondary hero-btn-secondary"
              >
                <Sparkles size={16} />
                <span>Custom Order</span>
              </button>

              {/* 3rd WhatsApp CTA button (Visible on Laptop / Desktop) */}
              <button
                onClick={() => directWhatsAppChat("Hi Saloni ma'am! I would like to inquire about ordering handcrafted creations from The Yarn Basket.")}
                className="btn hero-btn-whatsapp d-mobile-hidden"
                title="Chat directly with artist Saloni on WhatsApp"
              >
                <WhatsAppIcon size={17} color="#FFFFFF" />
                <span>WhatsApp Order</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="hero-trust-bar">
              <div className="hero-trust-item">
                <div className="hero-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                </div>
                <div style={{ marginLeft: '4px' }}>
                  <span style={{ fontWeight: '800', fontSize: '0.92rem', color: 'var(--text-main)' }}>4.9/5</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '4px' }}>(2,400+ reviews)</span>
                </div>
              </div>

              <div className="hero-trust-item">
                <span className="stitch-pill stitch-pill-sage" style={{ fontSize: '0.82rem', padding: '0.35rem 0.85rem' }}>
                  🌿 100% Skin-Soft Baby Yarns
                </span>
              </div>

              <div className="hero-trust-item d-mobile-hidden">
                <span className="stitch-pill stitch-pill-gold" style={{ fontSize: '0.82rem', padding: '0.35rem 0.85rem' }}>
                  🚚 Pan-India Insured Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Handmade Craft Visual Showcase */}
          <div 
            className="hero-visual-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="hero-main-card">
              <div 
                className="hero-img-box"
                onClick={() => {
                  navigate('product', { id: currentHero.id });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <img
                  src={currentHero.image}
                  alt={currentHero.title}
                  className="hero-main-img"
                  key={currentHero.id}
                  onError={(e) => {
                    e.currentTarget.src = '/products/bloming-sunflower-bouquet-1249-.jpg';
                  }}
                />

                {/* Top Badge on Image */}
                <div className="hero-img-top-tag">
                  <span className="stitch-pill" style={{ background: 'rgba(46, 28, 20, 0.85)', color: '#FFFFFF', fontSize: '0.74rem', padding: '0.3rem 0.75rem', backdropFilter: 'blur(4px)', border: 'none' }}>
                    {currentHero.badge}
                  </span>
                  <span className="hero-img-lead-tag">
                    {currentHero.leadTime}
                  </span>
                </div>

                {/* Gradient Overlay for Text Readability */}
                <div className="hero-img-overlay">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#EAA888', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {currentHero.category}
                      </div>
                      <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: '700', margin: '3px 0 0 0', lineHeight: 1.25 }}>
                        {currentHero.title}
                      </h3>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFFFFF', lineHeight: 1.1 }}>
                        ₹{currentHero.price.toLocaleString('en-IN')}
                      </div>
                      {currentHero.origPrice && (
                        <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'line-through' }}>
                          ₹{currentHero.origPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.22)' }}>
                    <div className="hero-dots-indicator">
                      {heroSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSlide(idx);
                          }}
                          className={`hero-dot ${activeSlide === idx ? 'hero-dot-active' : ''}`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('product', { id: currentHero.id });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hero-explore-btn"
                    >
                      <span>Explore Creation</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Chubby Panda Cutie */}
              <div
                onClick={() => {
                  navigate('product', { id: 'prod-17' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hero-float-badge hero-float-badge-top cute-bob"
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src="/products/img-20260926-wa0038.jpg"
                    alt="Chubby Panda"
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = '/products/bloming-sunflower-bouquet-1249-.jpg';
                    }}
                  />
                  <span style={{ position: 'absolute', bottom: '-4px', right: '-4px', fontSize: '11px' }}>💖</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1.1 }}>
                    Chubby Panda
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--primary-terracotta)', fontWeight: '800' }}>
                    ₹300 • Handcrafted
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Slow Craft Atelier / Happy Homes */}
              <div className="hero-float-badge hero-float-badge-bottom cute-float">
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--primary-rose-light)',
                  color: 'var(--primary-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  🧶
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    Slow Craft Atelier ✨
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Over 5,000+ happy homes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Styles */}
      <style>{`
        .hero-section-wrap {
          position: relative;
          padding: clamp(3rem, 5vw, 4.5rem) 0 clamp(3.5rem, 6vw, 5rem) 0;
          overflow: hidden;
          background: linear-gradient(180deg, var(--bg-canvas) 0%, var(--bg-warm-tint) 100%);
        }

        .hero-stitch-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        .animated-stitch-path {
          animation: stitchPathDash 28s linear infinite;
        }

        @keyframes stitchPathDash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1000; }
        }

        /* 1. Category Stories Bar (Mobile Only) */
        .hero-story-bar {
          display: none;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .hero-story-bubbles-row {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          padding: 4px 4px 6px 4px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .hero-story-bubbles-row::-webkit-scrollbar {
          display: none;
        }

        .hero-story-bubble-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.2s ease;
          user-select: none;
        }

        .hero-story-bubble-item:hover {
          transform: translateY(-2px);
        }

        .hero-story-bubble-img-wrap {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          padding: 2px;
          border: 2px solid var(--primary-terracotta);
          background: #FAF7F2;
          box-shadow: 0 2px 8px rgba(200, 90, 50, 0.16);
          overflow: visible;
        }

        .hero-story-bubble-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .hero-story-bubble-emoji {
          position: absolute;
          bottom: -2px;
          right: -2px;
          font-size: 11px;
          background: #FFFFFF;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 4px rgba(0,0,0,0.22);
          border: 1px solid rgba(140, 88, 50, 0.15);
        }

        .hero-story-bubble-label {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--text-main);
          white-space: nowrap;
        }

        /* 2. Hero Grid (Desktop Expansive Layout) */
        .hero-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: clamp(2.5rem, 5vw, 4.5rem);
          align-items: center;
        }

        .hero-headline {
          font-family: var(--font-serif);
          color: var(--text-main);
          margin-bottom: 1.25rem;
          line-height: 1.15;
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
        }

        .hero-highlight-word {
          color: var(--primary-terracotta);
          font-style: italic;
          display: inline-block;
          position: relative;
        }

        .hero-underline-svg {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 14px;
          overflow: visible;
        }

        @keyframes drawUnderline {
          0% { stroke-dashoffset: 210; }
          100% { stroke-dashoffset: 0; }
        }

        .hero-subtext {
          font-size: clamp(1.05rem, 1.4vw, 1.2rem);
          color: var(--text-muted);
          margin-bottom: 2rem;
          line-height: 1.65;
          maxWidth: 520px;
        }

        .hero-cta-group {
          display: flex;
          gap: 0.85rem;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          font-size: 0.98rem;
          padding: 0.9rem 1.8rem;
          box-shadow: 0 8px 24px rgba(200, 90, 50, 0.3);
          border-radius: var(--radius-md);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
        }

        .hero-btn-secondary {
          font-size: 0.98rem;
          padding: 0.9rem 1.6rem;
          border-radius: var(--radius-md);
          border-color: var(--primary-terracotta);
          color: var(--primary-terracotta);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
        }

        .hero-btn-whatsapp {
          font-size: 0.92rem;
          padding: 0.85rem 1.35rem;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-md);
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
          font-weight: 700;
        }

        /* Trust Bar */
        .hero-trust-bar {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
        }

        .hero-trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-stars-row {
          display: flex;
          gap: 2px;
          color: var(--accent-gold);
        }

        /* Visual Showcase Column on Laptop */
        .hero-visual-col {
          position: relative;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          animation: gentleHeroFloat 6s ease-in-out infinite;
        }

        @keyframes gentleHeroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .hero-main-card {
          position: relative;
          padding: 0.85rem;
          border-radius: var(--radius-xl);
          box-shadow: 0 16px 40px rgba(46, 28, 20, 0.1);
          background: var(--bg-surface);
          border: 1px solid var(--border-card);
          transition: all 0.4s ease;
        }

        .hero-visual-col:hover .hero-main-card {
          box-shadow: 0 24px 60px rgba(200, 90, 50, 0.22), 0 0 20px rgba(234, 168, 136, 0.15);
        }

        .hero-img-box {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          padding-top: 100%;
          background: var(--bg-warm);
          cursor: pointer;
        }

        .hero-main-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: heroFadeZoom 0.5s ease-out;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-visual-col:hover .hero-main-img {
          transform: scale(1.06);
        }

        @keyframes heroFadeZoom {
          from { opacity: 0.4; transform: scale(1.04); }
          to { opacity: 1; transform: scale(1); }
        }

        .hero-img-top-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2;
        }

        .hero-img-lead-tag {
          background: rgba(250, 247, 242, 0.95);
          color: var(--primary-terracotta);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-full);
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }

        .hero-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem 1.25rem;
          background: linear-gradient(to top, rgba(20,15,12,0.92) 0%, rgba(20,15,12,0.45) 60%, transparent 100%);
          color: #FFFFFF;
          z-index: 2;
        }

        .hero-dots-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.45);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.25s ease;
        }

        .hero-dot-active {
          width: 22px;
          border-radius: 4px;
          background: var(--primary-peach);
        }

        .hero-explore-btn {
          background: #FFFFFF;
          color: var(--text-main);
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .hero-explore-btn:hover {
          background: #FAF7F2;
          transform: scale(1.05);
        }

        .hero-float-badge {
          position: absolute;
          background: var(--bg-surface);
          padding: 0.55rem 0.95rem;
          border-radius: var(--radius-lg);
          box-shadow: 0 8px 24px rgba(46, 28, 20, 0.14);
          border: 1.5px solid var(--primary-rose);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          z-index: 3;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hero-float-badge-top {
          top: -16px;
          right: -14px;
        }

        .hero-float-badge-bottom {
          bottom: -16px;
          left: -14px;
          border: 1.5px dashed var(--border-stitch);
        }

        .hero-float-badge:hover {
          transform: translateY(-4px) scale(1.06);
        }

        /* ==========================================================================
           MOBILE VIEWPORT ONLY REFINEMENTS (< 768px)
           Keeps all mobile phone optimizations 100% active on phone!
           ========================================================================== */
        @media (max-width: 768px) {
          .hero-section-wrap {
            padding: 0.75rem 0 1.5rem 0 !important;
            background: var(--bg-canvas) !important;
          }

          .hero-stitch-bg {
            opacity: 0.25 !important;
          }

          .hero-story-bar {
            display: block !important;
            margin-bottom: 0.85rem !important;
            padding-bottom: 0.65rem !important;
          }

          .hero-story-bubble-img-wrap {
            width: 50px !important;
            height: 50px !important;
          }

          .hero-story-bubble-label {
            font-size: 0.7rem !important;
          }

          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }

          .hero-headline {
            font-size: 1.65rem !important;
            margin-bottom: 0.45rem !important;
            line-height: 1.18 !important;
          }

          .hero-subtext {
            font-size: 0.82rem !important;
            margin-bottom: 0.85rem !important;
            line-height: 1.4 !important;
            max-width: 100% !important;
          }

          .hero-cta-group {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.45rem !important;
            margin-bottom: 0.85rem !important;
          }

          .hero-btn-primary, .hero-btn-secondary {
            width: 100% !important;
            padding: 0.55rem 0.5rem !important;
            font-size: 0.78rem !important;
            justify-content: center !important;
            box-shadow: none !important;
          }

          .hero-trust-bar {
            padding-top: 0.6rem !important;
            gap: 0.5rem !important;
            justify-content: flex-start !important;
          }

          .hero-trust-txt {
            font-size: 0.72rem !important;
          }

          .hero-visual-col {
            max-width: 100% !important;
            animation: none !important;
          }

          .hero-main-card {
            padding: 0.45rem !important;
            border-radius: var(--radius-xs) !important;
          }

          .hero-img-box {
            padding-top: 75% !important;
            border-radius: var(--radius-xs) !important;
          }

          .hero-img-overlay {
            padding: 1rem 0.75rem 0.65rem 0.75rem !important;
          }

          .hero-img-overlay h3 {
            font-size: 0.98rem !important;
          }

          .hero-float-badge-top,
          .hero-float-badge-bottom {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
