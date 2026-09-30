import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  ArrowRight, 
  Heart, 
  MessageCircle, 
  Phone, 
  ShoppingBag, 
  CheckCircle2, 
  Filter, 
  Clock, 
  Smile, 
  Flower2 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const OCCASIONS = [
  { id: 'anniversary', name: 'Anniversary & Romance 🌹', icon: 'Heart', desc: 'Everlasting floral bouquets and heirloom blankets that never wilt.' },
  { id: 'birthday', name: 'Birthday & Besties 🎂', icon: 'Smile', desc: 'Adorable amigurumi pocket companions, cute keyrings, and posies.' },
  { id: 'festive', name: 'Diwali & Puja Décor 🪔', icon: 'Flower2', desc: 'Traditional Thalposh mandalas, festive torans, and temple accents.' },
  { id: 'wedding-bulk', name: 'Wedding & Bulk Favors 🎁', icon: 'Gift', desc: 'Bespoke mini pouches, personalized initial charms for guests.' },
  { id: 'housewarming', name: 'New Home & Cozy Spaces 🏡', icon: 'Sparkles', desc: 'Cozy boho couch throws and 3D floral accent pieces.' }
];

const GIFT_ITEMS = [
  {
    id: 'gift-1',
    name: 'Everlasting Golden Sunflower Handtied Bouquet',
    price: 1249,
    originalPrice: 1499,
    image: '/products/bloming-sunflower-bouquet-1249-.jpg',
    occasions: ['anniversary', 'birthday', 'housewarming'],
    budgetTier: 'mid',
    craftDays: '2-3 Days',
    highlight: 'Includes 5 blooms, silk wrap & handwritten letter',
    bestFor: 'Symbol of eternal sunshine & happiness'
  },
  {
    id: 'gift-2',
    name: 'Chubby Panda & Baby Chick Amigurumi Charm',
    price: 280,
    originalPrice: 350,
    image: '/products/img-20260926-wa0038.jpg',
    occasions: ['birthday', 'wedding-bulk'],
    budgetTier: 'pocket',
    craftDays: '1-2 Days',
    highlight: 'Soft milk cotton with hypoallergenic stuffing',
    bestFor: 'Pocket companion for bags & car rearview mirrors'
  },
  {
    id: 'gift-3',
    name: 'Heirloom Pink Forest 3D Rose Blanket (50-inch)',
    price: 2200,
    originalPrice: 2800,
    image: '/products/pink-forest-2200-.jpg',
    occasions: ['anniversary', 'housewarming'],
    budgetTier: 'luxury',
    craftDays: '5-7 Days',
    highlight: 'Over 8,000 stitches steam-blocked with organic wash',
    bestFor: 'Unforgettable anniversary & housewarming centerpiece'
  },
  {
    id: 'gift-4',
    name: 'Traditional 30-inch Intricate Thalposh Mandala',
    price: 1200,
    originalPrice: 1500,
    image: '/products/thal-posh-2800-30-inch.jpg',
    occasions: ['festive', 'housewarming'],
    budgetTier: 'mid',
    craftDays: '3-4 Days',
    highlight: 'Detailed golden motif border for puja thalis',
    bestFor: 'Diwali mandir decor & auspicious blessings'
  },
  {
    id: 'gift-5',
    name: 'Bespoke Sunflower Mini Pouches (Bulk Favors)',
    price: 280,
    originalPrice: 350,
    image: '/products/mini-sunflower-purse-280-.jpg',
    occasions: ['wedding-bulk', 'birthday'],
    budgetTier: 'pocket',
    craftDays: '5-10 Days (Bulk)',
    highlight: 'Discounted bulk rates with custom name tags',
    bestFor: 'Mehendi favors, bridal showers & return gifts'
  },
  {
    id: 'gift-6',
    name: 'Romantic Thai Rose Posy with Ceramic Vase',
    price: 749,
    originalPrice: 899,
    image: '/products/thai-rose-450-1-.jpg',
    occasions: ['anniversary', 'birthday', 'festive'],
    budgetTier: 'mid',
    craftDays: '2 Days',
    highlight: '3 hand-crocheted blooming roses with eucalyptus',
    bestFor: 'Bedside table & work desk elegance'
  }
];

export const GiftingConciergeSection = ({ navigate }) => {
  const { openServiceModal, directWhatsAppChat, addToCart, setQuickViewProduct, showToast } = useStore();
  const [activeOccasion, setActiveOccasion] = useState('anniversary');
  const [activeBudget, setActiveBudget] = useState('all'); // 'all' | 'pocket' | 'mid' | 'luxury'

  const filteredGifts = GIFT_ITEMS.filter((item) => {
    const matchesOccasion = activeOccasion === 'all' || item.occasions.includes(activeOccasion);
    const matchesBudget = activeBudget === 'all' || item.budgetTier === activeBudget;
    return matchesOccasion && matchesBudget;
  });

  const handleOrderWhatsApp = (gift) => {
    const msg = `Hi Saloni ma'am! 🌸 I would like to order the curated gift: "${gift.name}" (₹${gift.price}) for an upcoming ${OCCASIONS.find(o => o.id === activeOccasion)?.name || 'celebration'}. Could you share delivery timelines?`;
    directWhatsAppChat(msg, gift.name);
  };

  const handleBulkInquiry = () => {
    openServiceModal({
      serviceTitle: 'Bulk Wedding & Event Hampers',
      note: `Bulk gifting inquiry for occasion: ${OCCASIONS.find(o => o.id === activeOccasion)?.name}. Requesting bulk quotes and sample preview.`
    });
  };

  return (
    <section className="section-padding" style={{
      background: 'var(--bg-canvas)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <span className="stitch-pill" style={{ marginBottom: '0.75rem' }}>
            <Gift size={13} /> Gifting Concierge & Milestone Finder
          </span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.1rem, 4vw, 3rem)',
            color: 'var(--text-main)',
            marginBottom: '0.85rem',
            lineHeight: 1.2
          }}>
            Find the Perfect Handcrafted Gift
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.65' }}>
            Select your special occasion and budget. Discover everlasting handmade gifts that express heartfelt love and slow craftsmanship.
          </p>
        </div>

        {/* Occasion Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.75rem',
          justifyContent: 'flex-start',
          scrollbarWidth: 'none'
        }}>
          {OCCASIONS.map((occ) => {
            const isSelected = activeOccasion === occ.id;
            return (
              <button
                key={occ.id}
                onClick={() => setActiveOccasion(occ.id)}
                style={{
                  padding: '0.65rem 1.15rem',
                  borderRadius: 'var(--radius-xs)',
                  border: isSelected ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-card)',
                  background: isSelected ? 'var(--primary-terracotta)' : 'var(--bg-surface)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: isSelected ? '700' : '600',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(200,90,50,0.25)' : 'none',
                  flexShrink: 0
                }}
              >
                {occ.name}
              </button>
            );
          })}
        </div>

        {/* Budget Filter Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'var(--bg-warm)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '700' }}>
            <Filter size={15} style={{ color: 'var(--primary-terracotta)' }} />
            <span>Filter by Budget:</span>
          </div>

          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Budgets' },
              { id: 'pocket', label: 'Pocket Delights (Under ₹500)' },
              { id: 'mid', label: 'Artisan Bouquets (₹500 - ₹1,500)' },
              { id: 'luxury', label: 'Heirloom Blankets (₹1,500+)' }
            ].map((tier) => {
              const isSelected = activeBudget === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setActiveBudget(tier.id)}
                  style={{
                    padding: '0.35rem 0.8rem',
                    borderRadius: 'var(--radius-xs)',
                    border: isSelected ? '1.5px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                    background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                    color: isSelected ? 'var(--primary-terracotta)' : 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: isSelected ? '700' : '500',
                    cursor: 'pointer'
                  }}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Curated Gifts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          {filteredGifts.length > 0 ? (
            filteredGifts.map((gift) => (
              <div
                key={gift.id}
                className="glass-card"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-md)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                {/* Image & Badges */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '60%',
                  overflow: 'hidden',
                  background: 'var(--bg-warm)'
                }}>
                  <img
                    src={gift.image}
                    alt={gift.name}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    color: 'var(--primary-terracotta)'
                  }}>
                    ✨ Free Gift Wrap
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(35, 25, 21, 0.85)',
                    color: '#FFFFFF',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.76rem',
                    fontWeight: '700'
                  }}>
                    ⚡ {gift.craftDays}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.76rem', color: 'var(--accent-sage)', fontWeight: '700', marginBottom: '0.35rem' }}>
                    • {gift.bestFor}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--text-main)',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3
                  }}>
                    {gift.name}
                  </h3>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                    {gift.highlight}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-terracotta)' }}>
                      ₹{gift.price}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                      ₹{gift.originalPrice}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-sage)', fontWeight: '700', marginLeft: 'auto' }}>
                      Save ₹{gift.originalPrice - gift.price}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.65rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      onClick={() => handleOrderWhatsApp(gift)}
                      className="btn"
                      style={{
                        flex: 1,
                        padding: '0.7rem 0.85rem',
                        fontSize: '0.82rem',
                        background: '#25D366',
                        color: '#FFFFFF',
                        borderColor: '#128C7E',
                        justifyContent: 'center'
                      }}
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp Order</span>
                    </button>

                    <button
                      onClick={() => {
                        openServiceModal({
                          serviceTitle: `Curated Gift: ${gift.name}`,
                          note: `Inquiry for ${gift.name} (₹${gift.price}) for ${activeOccasion} celebration.`
                        });
                      }}
                      className="btn btn-primary"
                      style={{ padding: '0.7rem 0.85rem', fontSize: '0.82rem', justifyContent: 'center' }}
                    >
                      <Phone size={14} />
                      <span>Callback ⚡</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ color: 'var(--text-muted)' }}>No items found for this specific filter combination.</p>
              <button onClick={() => { setActiveOccasion('all'); setActiveBudget('all'); }} className="btn btn-secondary" style={{ marginTop: '0.5rem' }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Wedding / Event Bulk Consultation CTA Banner */}
        <div style={{
          background: '#2E1C14',
          borderRadius: 'var(--radius-xs)',
          padding: '2.5rem clamp(1.5rem, 4vw, 3rem)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <span className="stitch-pill" style={{ background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.25)', marginBottom: '0.75rem', borderRadius: 'var(--radius-xs)' }}>
              💍 Wedding Favors & Bulk Corporate Gifting
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#FFFFFF', marginTop: '0.4rem', marginBottom: '0.5rem' }}>
              Planning 20+ Gifts for a Special Milestone?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.94rem', lineHeight: '1.6', margin: 0 }}>
              Get custom discounted pricing, personalized wooden initial tags, matching silk ribbons, and direct design coordination with Saloni Ma'am.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleBulkInquiry}
              className="btn btn-primary"
              style={{
                padding: '0.85rem 1.6rem',
                fontSize: '0.94rem',
                background: 'var(--primary-terracotta)',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <Phone size={16} />
              <span>Request Bulk Callback ⚡</span>
            </button>
            <button
              onClick={() => directWhatsAppChat("Hi Saloni ma'am! I would like to inquire about 20+ bulk wedding/event handmade gifts and get a custom quote.")}
              className="btn"
              style={{ padding: '0.85rem 1.6rem', fontSize: '0.94rem', background: '#25D366', color: '#FFFFFF', borderRadius: 'var(--radius-xs)' }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp Bulk Quote</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
