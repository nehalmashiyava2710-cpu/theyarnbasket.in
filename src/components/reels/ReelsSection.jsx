import React, { useState, useRef, useEffect } from 'react';
import { Play, Sparkles, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const LiveReelCard = ({ reel, setActiveReel }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const playSafe = () => video.play().catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playSafe();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(card);
    playSafe();
    return () => observer.disconnect();
  }, [reel.videoUrl]);

  return (
    <div
      ref={cardRef}
      className="cute-reel-card"
      onClick={() => setActiveReel(reel)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Real Unobstructed Autoplaying Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.thumbnail}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={(e) => e.target.play().catch(() => {})}
        className="cute-reel-video"
      />

      {/* Ambient Vignette Overlay */}
      <div className="cute-reel-vignette" />

      {/* Bottom Floating Craft Info */}
      <div className="cute-reel-bottom-scrim">
        <div className="cute-reel-title">{reel.title}</div>
        <div className="cute-reel-sub">
          <span>🌸 Handcrafted by Saloni</span>
        </div>
      </div>
    </div>
  );
};

export const ReelsSection = ({ navigate }) => {
  const { reels, setActiveReel } = useStore();
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  // Duplicate reels for continuous infinite seamless auto-moving loop
  const infiniteReels = [...reels, ...reels, ...reels];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-canvas)', position: 'relative', overflow: 'hidden' }}>
      {/* Floating Sparkles Background */}
      <div className="cute-float" style={{ position: 'absolute', top: '8%', left: '4%', fontSize: '1.8rem', opacity: 0.45, pointerEvents: 'none' }}>
        🌸
      </div>
      <div className="cute-bob" style={{ position: 'absolute', top: '15%', right: '5%', fontSize: '1.8rem', opacity: 0.45, pointerEvents: 'none' }}>
        ✨
      </div>
      <div className="cute-float" style={{ position: 'absolute', bottom: '10%', left: '6%', fontSize: '1.6rem', opacity: 0.45, pointerEvents: 'none' }}>
        🧶
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '1.75rem'
        }}>
          <div>
            <span className="cute-tag-pill cute-bob" style={{ marginBottom: '0.4rem', fontSize: '0.78rem' }}>
              <Sparkles size={12} className="cute-sparkle-anim" /> Handcrafted Studio Reels & Stories 🌸
            </span>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
              color: 'var(--text-main)',
              marginTop: '0.25rem',
              lineHeight: 1.15
            }}>
              Watch Creations Come to Life 🌸
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '540px', lineHeight: 1.5, margin: '0.25rem 0 0 0' }}>
              Crafted stitch-by-stitch with pure handmade love by Saloni Ma’am. Tap any clip to play with sound and explore the making story.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {/* Scroll Control Arrows */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={scrollLeft}
                className="btn-icon cute-wiggle-hover"
                style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}
                aria-label="Scroll left"
                title="Previous Reels"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={scrollRight}
                className="btn-icon cute-wiggle-hover"
                style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}
                aria-label="Scroll right"
                title="Next Reels"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Follow Instagram Button */}
            <a
              href="https://www.instagram.com/theyarnbasket.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                fontSize: '0.82rem',
                padding: '0.45rem 0.95rem',
                borderColor: 'var(--primary-rose)',
                color: 'var(--primary-terracotta)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>Follow @theyarnbasket.in</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Continuous Cute Auto-Moving Reel Strip */}
        <div
          className="cute-reel-marquee-wrap"
          ref={scrollContainerRef}
          style={{
            position: 'relative',
            width: '100%',
            overflowX: 'auto',
            paddingBottom: '1rem',
            paddingTop: '0.35rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="cute-reel-track">
            {infiniteReels.map((reel, index) => (
              <LiveReelCard
                key={`${reel.id}-${index}`}
                reel={reel}
                setActiveReel={setActiveReel}
              />
            ))}
          </div>
        </div>

        {/* Bottom Helper Note */}
        <div style={{
          textAlign: 'center',
          marginTop: '0.85rem',
          fontSize: '0.78rem',
          color: 'var(--text-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px'
        }}>
          <span>✨</span>
          <span>Reels glide automatically • Tap any clip to play with sound & order</span>
        </div>
      </div>

      {/* Embedded High-Aesthetic Keyframe Animations & Responsive Rules */}
      <style>{`
        .cute-reel-card {
          position: relative;
          flex: 0 0 auto;
          width: 210px;
          height: 360px;
          border-radius: var(--radius-xs);
          overflow: hidden;
          background: #1A1412;
          box-shadow: 0 4px 16px rgba(0,0,0,0.14);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          border: 1px solid var(--border-card);
          user-select: none;
        }

        .cute-reel-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px rgba(200, 90, 50, 0.25);
          border-color: var(--primary-terracotta);
        }

        .cute-reel-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cute-reel-card:hover .cute-reel-video {
          transform: scale(1.05);
        }

        .cute-reel-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(14,10,8,0.85) 0%, rgba(14,10,8,0.2) 45%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        .cute-reel-bottom-scrim {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          z-index: 3;
          pointer-events: none;
        }

        .cute-reel-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.25;
          margin-bottom: 2px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-shadow: 0 1px 4px rgba(0,0,0,0.6);
        }

        .cute-reel-sub {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.85);
          font-weight: 600;
        }

        /* Smooth continuous auto-moving marquee track */
        .cute-reel-track {
          display: flex;
          gap: 1.15rem;
          width: max-content;
          animation: smoothGlidingReels 60s linear infinite;
          will-change: transform;
        }

        .cute-reel-marquee-wrap:hover .cute-reel-track,
        .cute-reel-marquee-wrap:active .cute-reel-track {
          animation-play-state: paused;
        }

        @keyframes smoothGlidingReels {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }

        .cute-reel-marquee-wrap::-webkit-scrollbar {
          display: none;
        }

        /* Responsive Mobile Dimensions */
        @media (max-width: 768px) {
          .cute-reel-card {
            width: 148px !important;
            height: 255px !important;
          }
          .cute-reel-track {
            gap: 0.75rem !important;
          }
          .cute-reel-title {
            font-size: 0.74rem !important;
            -webkit-line-clamp: 1 !important;
          }
          .cute-reel-sub {
            font-size: 0.62rem !important;
          }
        }

        @media (max-width: 380px) {
          .cute-reel-card {
            width: 136px !important;
            height: 235px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ReelsSection;
