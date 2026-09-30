import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  MessageCircle, 
  ShoppingBag, 
  Clock, 
  Tag, 
  Flower2, 
  Smile, 
  Home, 
  Gift, 
  Scissors,
  Phone
} from 'lucide-react';
import { SERVICES } from '../../data/services';
import { useStore } from '../../context/StoreContext';

const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'Flower2': return <Flower2 size={22} />;
    case 'Smile': return <Smile size={22} />;
    case 'Home': return <Home size={22} />;
    case 'Gift': return <Gift size={22} />;
    case 'Scissors': return <Scissors size={22} />;
    default: return <Sparkles size={22} />;
  }
};

export const ServicesSection = ({ navigate }) => {
  const { showToast, openServiceModal, directWhatsAppChat } = useStore();
  const [selectedService, setSelectedService] = useState(null);

  const handleInquireWhatsApp = (service) => {
    const message = `Hi Saloni ma'am! I'm interested in the service: "${service.title}" from The Yarn Basket website. Could you share more details on booking and pricing?`;
    directWhatsAppChat(message, service.title);
  };

  const handleRequestCallback = (service) => {
    openServiceModal(service);
  };

  return (
    <section 
      id="services-section" 
      className="section-padding" 
      style={{ 
        background: 'var(--bg-canvas)',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <span className="stitch-pill" style={{ marginBottom: '0.65rem', borderRadius: 'var(--radius-xs)' }}>
            <Sparkles size={13} /> Craft Services & Offerings
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', 
            color: 'var(--text-main)', 
            marginBottom: '0.85rem' 
          }}>
            Services by Saloni Ma’am
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.6' }}>
            From bespoke floral bouquets and amigurumi plushies to heirloom blankets, wedding hampers, and custom crochet commissions.
          </p>
        </div>

        {/* 6 Core Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
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
                transition: 'var(--transition-smooth)',
                position: 'relative',
                background: 'var(--bg-surface)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'rgba(200, 90, 50, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--border-card)';
              }}
            >
              {/* Service Top Image Preview */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '58%',
                overflow: 'hidden',
                background: 'var(--bg-warm)'
              }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Service Icon Badge */}
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  width: '38px',
                  height: '38px',
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

                {/* Starting Price Pill */}
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: '#2E1C14',
                  color: '#FFFFFF',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.78rem',
                  fontWeight: '700'
                }}>
                  From {service.startingPrice}
                </div>
              </div>

              {/* Service Details */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--accent-sage)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {service.leadTime}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  fontWeight: '600',
                  color: 'var(--text-main)',
                  marginBottom: '0.35rem',
                  lineHeight: '1.25'
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontSize: '0.84rem',
                  color: 'var(--primary-terracotta)',
                  fontWeight: '600',
                  marginBottom: '0.85rem'
                }}>
                  {service.subtitle}
                </p>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.55',
                  marginBottom: '1.25rem'
                }}>
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  marginBottom: '1.5rem',
                  padding: '0.9rem',
                  background: 'var(--bg-warm-tint)',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  {service.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                      <Check size={14} style={{ color: 'var(--accent-sage)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '0.65rem',
                  marginTop: 'auto',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => handleInquireWhatsApp(service)}
                    className="btn"
                    style={{
                      flex: 1,
                      minWidth: '130px',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.82rem',
                      background: '#25D366',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleRequestCallback(service)}
                    className="btn btn-primary"
                    style={{
                      flex: 1,
                      minWidth: '130px',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.82rem',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    <Phone size={13} />
                    <span>Callback ⚡</span>
                  </button>

                  {service.category !== 'learning' && service.category !== 'custom' ? (
                    <button
                      onClick={() => {
                        navigate('shop', { category: service.category });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-secondary"
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        fontSize: '0.82rem',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      <ShoppingBag size={13} />
                      <span>Shop Items ({service.startingPrice})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate('custom-order');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-secondary"
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.85rem',
                        fontSize: '0.82rem',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      <span>Custom Form</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Direct Custom Requests */}
        <div style={{
          marginTop: '3.5rem',
          background: 'var(--bg-warm)',
          borderRadius: 'var(--radius-xs)',
          padding: '2rem clamp(1.25rem, 4vw, 3rem)',
          border: '1.5px dashed var(--border-stitch)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <span className="stitch-pill stitch-pill-sage" style={{ marginBottom: '0.4rem', borderRadius: 'var(--radius-xs)' }}>
              🌿 Direct Artist Consultation
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
              Need a Custom Craft Commission or Bulk Service?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Request an instant phone callback from Saloni Ma’am or start an immediate WhatsApp design conversation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => openServiceModal()}
              className="btn btn-primary"
              style={{ fontSize: '0.9rem', borderRadius: 'var(--radius-xs)' }}
            >
              <Phone size={15} />
              <span>⚡ Request Instant Callback</span>
            </button>
            <button
              onClick={() => directWhatsAppChat("Hi Saloni ma'am! I would like to consult with you regarding a custom craft service & order.")}
              className="btn"
              style={{ fontSize: '0.9rem', background: '#25D366', color: '#FFFFFF', borderRadius: 'var(--radius-xs)' }}
            >
              <MessageCircle size={15} />
              <span>WhatsApp Saloni</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
