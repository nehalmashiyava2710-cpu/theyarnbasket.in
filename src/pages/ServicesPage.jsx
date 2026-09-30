import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Clock, 
  Flower2, 
  Smile, 
  Home, 
  Gift, 
  Scissors, 
  Phone,
  ShoppingBag,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { SERVICES } from '../data/services';
import { useStore } from '../context/StoreContext';

const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'Flower2': return <Flower2 size={24} />;
    case 'Smile': return <Smile size={24} />;
    case 'Home': return <Home size={24} />;
    case 'Gift': return <Gift size={24} />;
    case 'Scissors': return <Scissors size={24} />;
    default: return <Sparkles size={24} />;
  }
};

export const ServicesPage = ({ navigate }) => {
  const { showToast, openServiceModal, directWhatsAppChat } = useStore();

  const handleInquireWhatsApp = (service) => {
    const message = `Hi Saloni ma'am! I'm inquiring about the service: "${service.title}" from The Yarn Basket. Could you share booking details, pricing, and available timeline?`;
    directWhatsAppChat(message, service.title);
  };

  const handleRequestCallback = (service) => {
    openServiceModal(service);
  };

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Editorial Header Banner */}
      <div style={{
        background: 'var(--bg-warm)',
        padding: 'clamp(3.5rem, 6vw, 5rem) 0 3rem 0',
        borderBottom: '1px solid var(--border-subtle)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <span className="stitch-pill" style={{ marginBottom: '1rem', borderRadius: 'var(--radius-xs)' }}>
            <Sparkles size={13} /> Artisanal Craft Studio & Commission Offerings
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
            Craft Services by Saloni Ma’am
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            Looking for bespoke floral bouquets, adorable plushies, heirloom blankets, wedding hampers, or crochet workshop classes? Connect directly with Saloni for custom orders and consultations.
          </p>

          {/* Quick Hero Service Actions */}
          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button
              onClick={() => openServiceModal()}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem', borderRadius: 'var(--radius-xs)' }}
            >
              <Phone size={17} />
              <span>⚡ Request Instant Callback</span>
            </button>
            <button
              onClick={() => directWhatsAppChat()}
              className="btn"
              style={{
                padding: '0.85rem 1.6rem',
                fontSize: '0.95rem',
                background: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '700'
              }}
            >
              <WhatsAppIcon size={18} color="#FFFFFF" />
              <span>Direct WhatsApp Inquiry</span>
            </button>
            <button
              onClick={() => {
                navigate('custom-order');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.4rem', fontSize: '0.95rem', borderRadius: 'var(--radius-xs)' }}
            >
              <span>Custom Order Form</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>⚡ <strong>15-Min</strong> Callback Response</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🌸 <strong>100%</strong> Handcrafted with Love</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🌿 <strong>Direct</strong> Artist Consultation</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3.5rem' }}>
        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2.5rem',
          marginBottom: '4.5rem'
        }}>
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                border: '1px solid var(--border-card)',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              {/* Service Visual Preview */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '60%',
                overflow: 'hidden',
                background: 'var(--bg-warm)'
              }}>
                <img
                  src={service.image}
                  alt={service.title}
                  onError={(e) => {
                    e.currentTarget.src = '/products/bloming-sunflower-bouquet-1249-.jpg';
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-terracotta)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {getServiceIcon(service.icon)}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: '#2E1C14',
                  color: '#FFFFFF',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.8rem',
                  fontWeight: '700'
                }}>
                  From {service.startingPrice}
                </div>
              </div>

              {/* Body Content */}
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {service.leadTime}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: '600',
                  color: 'var(--text-main)',
                  marginBottom: '0.35rem',
                  lineHeight: '1.25'
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontSize: '0.86rem',
                  color: 'var(--primary-terracotta)',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  {service.subtitle}
                </p>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                  marginBottom: '1.25rem'
                }}>
                  {service.description}
                </p>

                {/* Popular For Tags */}
                {service.popularFor && (
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {service.popularFor.map((tag, idx) => (
                      <span key={idx} style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--bg-warm)',
                        color: 'var(--text-muted)',
                        fontWeight: '600'
                      }}>
                        • {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Features Checklist */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  marginBottom: '1.75rem',
                  padding: '1rem',
                  background: 'var(--bg-warm-tint)',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  {service.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-main)' }}>
                      <Check size={15} style={{ color: 'var(--accent-sage)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '0.65rem',
                  marginTop: 'auto',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => handleInquireWhatsApp(service)}
                    className="btn"
                    style={{
                      flex: 1,
                      minWidth: '140px',
                      padding: '0.75rem 0.95rem',
                      fontSize: '0.86rem',
                      background: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 'var(--radius-xs)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      fontWeight: '700'
                    }}
                  >
                    <WhatsAppIcon size={16} color="#FFFFFF" />
                    <span>WhatsApp Inquiry</span>
                  </button>

                  <button
                    onClick={() => handleRequestCallback(service)}
                    className="btn btn-primary"
                    style={{
                      flex: 1,
                      minWidth: '140px',
                      padding: '0.75rem 0.95rem',
                      fontSize: '0.86rem',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    <Phone size={14} />
                    <span>Request Callback ⚡</span>
                  </button>

                  {service.category !== 'learning' && service.category !== 'custom' ? (
                    <button
                      onClick={() => {
                        navigate('shop', { category: service.category });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-secondary"
                      style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.84rem', borderRadius: 'var(--radius-xs)' }}
                    >
                      <ShoppingBag size={14} />
                      <span>Browse Ready Designs ({service.startingPrice}+)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate('custom-order');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-secondary"
                      style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.84rem', borderRadius: 'var(--radius-xs)' }}
                    >
                      <span>Open Custom Commission Form</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Craft Guarantee */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          background: 'var(--bg-warm)',
          borderRadius: 'var(--radius-xs)',
          padding: '2.5rem',
          border: '1px solid var(--border-card)'
        }}>
          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <ShieldCheck size={28} style={{ color: 'var(--primary-terracotta)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>100% Handcrafted</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Every piece is made loop-by-loop by master Indian artisans with no automated machine shortcuts.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <Heart size={28} style={{ color: 'var(--primary-peach)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>Personalized Touch</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Direct collaboration with Saloni, progress previews, and handwritten gift notes in every package.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.85rem' }}>
            <Sparkles size={28} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem' }}>Safe Tracked Delivery</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Carefully protected eco packaging shipped securely with express courier tracking pan-India.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
