import React from 'react';
import { 
  Sparkles, 
  Clock, 
  Heart, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Scissors, 
  Calendar,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const StudioLiveTimeline = ({ navigate }) => {
  const { openServiceModal, directWhatsAppChat } = useStore();

  const handleBookWorkshop = () => {
    openServiceModal({
      serviceTitle: 'Crochet Workshop & 1-on-1 Mentorship with Saloni',
      note: 'Interested in booking upcoming weekend crochet workshop or 1-on-1 stitch mentorship session.'
    });
  };

  return (
    <section className="section-padding" style={{
      background: 'var(--bg-canvas)',
      position: 'relative',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Live Studio Header Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1rem 1.5rem',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '3.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: 'var(--radius-xs)',
              background: '#22c55e',
              display: 'inline-block'
            }} />
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)' }}>
              Studio Status: <strong>Crafting Live Today</strong>
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              • Handcrafting made-to-order commissions in Indiranagar, Bengaluru
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={() => openServiceModal()}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary-terracotta)',
                fontSize: '0.82rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Phone size={13} />
              <span>Talk to Saloni ⚡</span>
            </button>
          </div>
        </div>

        {/* 4 Atelier Craft Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          <div className="glass-card" style={{
            padding: '1.75rem',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--primary-rose-light)',
              color: 'var(--primary-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <Scissors size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1, marginBottom: '0.35rem' }}>
              45,000+
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary-terracotta)', marginBottom: '0.25rem' }}>
              Yarn Loops Hand-stitched
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Zero machines. Pure slow artisan craft loop-by-loop.
            </p>
          </div>

          <div className="glass-card" style={{
            padding: '1.75rem',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--accent-sage-light)',
              color: 'var(--accent-sage)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <Heart size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1, marginBottom: '0.35rem' }}>
              2,400+
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--accent-sage)', marginBottom: '0.25rem' }}>
              Everlasting Creations Delivered
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Bringing warmth to homes and loved ones pan-India.
            </p>
          </div>

          <div className="glass-card" style={{
            padding: '1.75rem',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-xs)',
              background: 'rgba(37, 211, 102, 0.15)',
              color: '#128C7E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <Clock size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1, marginBottom: '0.35rem' }}>
              &lt; 15 Mins
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#128C7E', marginBottom: '0.25rem' }}>
              Average Response Time
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Direct consultation with artist Saloni on WhatsApp.
            </p>
          </div>

          <div className="glass-card" style={{
            padding: '1.75rem',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--accent-gold-light)',
              color: '#B5851C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1, marginBottom: '0.35rem' }}>
              100%
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#B5851C', marginBottom: '0.25rem' }}>
              Skin-Safe Milk Cotton Yarns
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Hypoallergenic, ultra-soft, washable & durable.
            </p>
          </div>
        </div>

        {/* Masterclass & Stitch Workshop Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          background: 'var(--bg-surface)',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <span className="stitch-pill" style={{ marginBottom: '0.85rem', borderRadius: 'var(--radius-xs)' }}>
              <Sparkles size={13} /> Master Artisan Workshop
            </span>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              color: 'var(--text-main)',
              marginBottom: '0.75rem',
              lineHeight: 1.2
            }}>
              Learn the Art of Slow Craft with Saloni Ma’am
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              Join our interactive weekend masterclasses for beginners and crochet enthusiasts. Master basic stitches, amigurumi character shaping, color switching, and yarn care in intimate 1-on-1 guidance sessions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-sage)', flexShrink: 0 }} />
                <span>Beginner-friendly: Learn single crochet, magic ring, and flower petals</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-sage)', flexShrink: 0 }} />
                <span>Complete DIY Craft Starter Kit shipped to your doorstep before session</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--accent-sage)', flexShrink: 0 }} />
                <span>Live Q&A, pattern PDFs, and lifetime student community access</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleBookWorkshop}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.6rem', fontSize: '0.94rem', borderRadius: 'var(--radius-xs)' }}
              >
                <Calendar size={16} />
                <span>Book Workshop Seat (₹499)</span>
              </button>
              <button
                onClick={() => directWhatsAppChat("Hi Saloni ma'am! I'm interested in joining your upcoming crochet workshop / 1-on-1 stitch class. Could you share dates and syllabus?")}
                className="btn"
                style={{ padding: '0.85rem 1.5rem', fontSize: '0.94rem', background: '#25D366', color: '#FFFFFF', borderRadius: 'var(--radius-xs)' }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Workshop Inquiry</span>
              </button>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-card)',
              position: 'relative'
            }}>
              <img
                src="/products/180-pairs-2-.jpg"
                alt="Crochet Workshop Stitches"
                style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.25rem',
                background: 'rgba(25,20,18,0.85)',
                color: '#FFFFFF'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--primary-peach)' }}>
                  NEXT BATCH • THIS SATURDAY
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>
                  Beginner Amigurumi & Flower Bouquet Masterclass
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
