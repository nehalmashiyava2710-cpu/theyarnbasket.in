import React from 'react';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage = ({ navigate }) => {
  const { wishlist, products, directWhatsAppChat, showToast } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleInquireAllWhatsApp = () => {
    if (wishlistedProducts.length === 0) return;
    const itemsSummary = wishlistedProducts
      .map((p, idx) => `${idx + 1}. ${p.name} - ₹${p.price}`)
      .join('\n');
    const msg = `Hi Saloni ma'am! 🌸 I'm interested in ordering/inquiring about my saved favorite creations:\n\n${itemsSummary}\n\nCould you please let me know total availability and delivery details?`;
    directWhatsAppChat(msg, 'Wishlist Inquiries');
    showToast('Opening WhatsApp with your saved creations! 💬', 'success');
  };

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-warm)', padding: '3rem 0 2rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="stitch-pill" style={{ marginBottom: '0.5rem', borderRadius: 'var(--radius-xs)' }}>
                <Heart size={13} fill="var(--primary-terracotta)" /> Saved Keepsakes
              </span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--text-main)', marginTop: '0.35rem' }}>
                My Saved Creations ({wishlistedProducts.length} items)
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
                Creations you've fallen in love with. Connect directly with Saloni on WhatsApp to place your order or customize colors.
              </p>
            </div>

            {wishlistedProducts.length > 0 && (
              <button
                onClick={handleInquireAllWhatsApp}
                className="btn"
                style={{
                  fontSize: '0.9rem',
                  padding: '0.75rem 1.5rem',
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
                <span>Inquire All on WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {wishlistedProducts.length > 0 ? (
          <div className="grid-products">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        ) : (
          <div
            className="glass-card"
            style={{
              maxWidth: '540px',
              margin: '3rem auto',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              borderRadius: 'var(--radius-xs)',
              border: '1.5px dashed var(--border-stitch)'
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--primary-rose-light)',
              color: 'var(--primary-terracotta)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Heart size={32} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Your Saved List is Empty
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '2rem' }}>
              Tap the heart icon on any handcrafted bloom, plushie, or woolen blanket to save it here and inquire easily later.
            </p>
            <button
              onClick={() => navigate('shop')}
              className="btn btn-primary"
              style={{ padding: '0.85rem 2rem', borderRadius: 'var(--radius-xs)' }}
            >
              <span>Explore Creations</span>
              <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
