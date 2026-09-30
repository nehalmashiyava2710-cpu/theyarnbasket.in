import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  MessageCircle, 
  Phone, 
  ShoppingBag, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Tag, 
  Flower2, 
  Layers, 
  RotateCcw,
  Palette
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const FLOWER_OPTIONS = [
  {
    id: 'sunflower-grand',
    name: 'Grand Golden Sunflower',
    category: 'Bouquet',
    basePrice: 899,
    image: '/products/bloming-sunflower-bouquet-1249-.jpg',
    palette: 'Sunshine Yellow, Olive & Walnut',
    craftDays: '2-3 Days'
  },
  {
    id: 'thai-rose',
    name: 'Romantic Thai Rose Posy',
    category: 'Bouquet',
    basePrice: 749,
    image: '/products/thai-rose-450-1-.jpg',
    palette: 'Blush Coral, Rose Quartz & Moss',
    craftDays: '2-3 Days'
  },
  {
    id: 'white-lilies',
    name: 'Pastel White Lily & Daisy',
    category: 'Bouquet',
    basePrice: 650,
    image: '/products/white-lilys-bouquet-650-.jpg',
    palette: 'Milk White, Daisy Gold & Sage',
    craftDays: '2-4 Days'
  },
  {
    id: 'van-gogh',
    name: 'Van Gogh Impressionist Bloom',
    category: 'Bouquet',
    basePrice: 599,
    image: '/products/van-gogh-bought-599-.jpg',
    palette: 'Deep Ochre, Rust & Sky Blue',
    craftDays: '1-2 Days'
  },
  {
    id: 'pink-forest',
    name: 'Pink Forest 3D Flower Blanket',
    category: 'Heirloom',
    basePrice: 2200,
    image: '/products/pink-forest-2200-.jpg',
    palette: 'Rose Ombré, Cream & Dusty Lilac',
    craftDays: '5-7 Days'
  }
];

const SIZE_OPTIONS = [
  { id: 'petite', label: 'Petite Arrangement (3 Stems)', priceMod: 0, tag: 'Standard' },
  { id: 'deluxe', label: 'Deluxe Atelier (5 Stems + Ferns)', priceMod: 250, tag: 'Most Popular' },
  { id: 'grand', label: 'Grand Celebration (8 Stems + Eucalyptus)', priceMod: 550, tag: 'Showstopper' }
];

const WRAP_STYLES = [
  { id: 'kraft', name: 'Vintage Eco Kraft & Twine', color: '#D2B48C', tag: 'Rustic Classic' },
  { id: 'blush', name: 'Rose Blush Silk & Pearl Pin', color: '#FAD2E1', tag: 'Romantic' },
  { id: 'sage', name: 'Botanical Sage & Cream Twill', color: '#CCD5AE', tag: 'Minimalist' },
  { id: 'gold-box', name: 'Luxury Hamper Gift Box (+₹120)', color: '#D4AF37', extraPrice: 120, tag: 'Festive Luxury' }
];

const ADDONS = [
  { id: 'panda-charm', name: 'Hand-stitched Panda / Bunny Charm Keyring', price: 180, image: '/products/img-20260926-wa0038.jpg' },
  { id: 'initial-tag', name: 'Laser-Engraved Wooden Initials Charm Tag', price: 60 },
  { id: 'fragrance', name: 'French Lavender & Vanilla Yarn Fragrance Infusion', price: 0, tag: 'Complimentary' },
  { id: 'letter', name: 'Handwritten Calligraphy Card with Wax Seal', price: 0, tag: 'Complimentary' }
];

export const InteractiveCraftStudio = ({ navigate }) => {
  const { openServiceModal, directWhatsAppChat, addToCart, showToast } = useStore();

  const [selectedFlower, setSelectedFlower] = useState(FLOWER_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[1]);
  const [selectedWrap, setSelectedWrap] = useState(WRAP_STYLES[1]);
  const [selectedAddons, setSelectedAddons] = useState(['fragrance', 'letter']);
  const [customInitials, setCustomInitials] = useState('S & A');
  const [customOccasion, setCustomOccasion] = useState('Birthday / Anniversary');

  // Calculate dynamic totalPrice
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const found = ADDONS.find(a => a.id === addonId);
    return sum + (found?.price || 0);
  }, 0);

  const wrapExtra = selectedWrap.extraPrice || 0;
  const totalPrice = selectedFlower.basePrice + selectedSize.priceMod + wrapExtra + addonsTotal;

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleWhatsAppOrder = () => {
    const addonNames = selectedAddons.map(id => ADDONS.find(a => a.id === id)?.name).join(', ');
    let msg = `Hi Saloni ma'am! 🌸\n\nI just designed a custom piece on The Yarn Basket Live Craft Studio:\n`;
    msg += `• *Creation:* ${selectedFlower.name}\n`;
    msg += `• *Arrangement Size:* ${selectedSize.label}\n`;
    msg += `• *Wrap Style:* ${selectedWrap.name}\n`;
    msg += `• *Add-ons:* ${addonNames || 'None'}\n`;
    if (selectedAddons.includes('initial-tag')) {
      msg += `• *Initials Tag:* "${customInitials}"\n`;
    }
    msg += `• *Occasion:* ${customOccasion}\n`;
    msg += `• *Calculated Estimate:* ₹${totalPrice}\n\n`;
    msg += `Could you confirm slot availability for this custom setup? Thank you! ✨`;

    directWhatsAppChat(msg, selectedFlower.name);
  };

  const handleCallbackRequest = () => {
    openServiceModal({
      serviceTitle: `Custom ${selectedFlower.name} (${selectedSize.label})`,
      note: `Live Customizer Setup: ${selectedFlower.name}, ${selectedSize.label}, ${selectedWrap.name}, Addons: ${selectedAddons.join(', ')}. Estimated ₹${totalPrice}. Initials: ${customInitials}.`
    });
  };

  const handleAddToCart = () => {
    const customProductObj = {
      id: `custom-${selectedFlower.id}-${Date.now()}`,
      name: `Custom Atelier: ${selectedFlower.name}`,
      category: 'bouquets',
      categoryName: 'Custom Craft Studio',
      price: totalPrice,
      originalPrice: Math.round(totalPrice * 1.2),
      rating: 5.0,
      reviewCount: 38,
      sku: `SLN-CUST-${Math.floor(100 + Math.random() * 900)}`,
      badge: 'Bespoke Craft',
      isNew: true,
      leadTimeDays: selectedFlower.craftDays,
      images: [selectedFlower.image],
      availableColors: [{ name: selectedFlower.palette, hex: '#D96B4F' }],
      availableSizes: [selectedSize.label],
      description: `Bespoke crafted by Saloni. Wrap: ${selectedWrap.name}. Add-ons: ${selectedAddons.join(', ')}.`
    };

    addToCart(customProductObj, 1, {
      selectedColor: selectedFlower.palette,
      selectedSize: selectedSize.label,
      customNote: `Wrap: ${selectedWrap.name} | Initials: ${customInitials} | Occasion: ${customOccasion}`
    });

    showToast(`Added your customized ${selectedFlower.name} setup to cart! 🌸`, 'success', '🧶');
  };

  return (
    <section className="section-padding" style={{
      background: 'var(--bg-canvas)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        {/* Section Headline */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <span className="stitch-pill stitch-pill-sage" style={{ marginBottom: '0.75rem', borderRadius: 'var(--radius-xs)' }}>
            <Sparkles size={13} /> Interactive Craft Studio
          </span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.1rem, 4vw, 3rem)',
            color: 'var(--text-main)',
            marginBottom: '0.85rem',
            lineHeight: 1.2
          }}>
            Customize Your Dream Handmade Creation
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.65' }}>
            Select your favorite floral theme, arrangement size, packaging ribbon, and personal charms. Watch your custom price calculate live in real-time!
          </p>
        </div>

        {/* Main Interactive Studio Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Interactive Controls */}
          <div className="glass-card" style={{
            padding: 'clamp(1.5rem, 3vw, 2.25rem)',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border-card)',
            background: 'var(--bg-surface)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* Step 1: Select Main Craft / Flower */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <label style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Flower2 size={16} style={{ color: 'var(--primary-terracotta)' }} />
                  <span>1. Choose Floral Theme:</span>
                </label>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-sage)', fontWeight: '700' }}>
                  Hand-crocheted
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.65rem' }}>
                {FLOWER_OPTIONS.map((flower) => {
                  const isSelected = selectedFlower.id === flower.id;
                  return (
                    <div
                      key={flower.id}
                      onClick={() => setSelectedFlower(flower)}
                      style={{
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-xs)',
                        border: isSelected ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-warm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                        position: 'relative'
                      }}
                    >
                      <div style={{ width: '100%', paddingTop: '70%', position: 'relative', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
                        <img
                          src={flower.image}
                          alt={flower.name}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {isSelected && (
                          <div style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '20px',
                            height: '20px',
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--primary-terracotta)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.2 }}>
                          {flower.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-terracotta)', fontWeight: '700', marginTop: '2px' }}>
                          From ₹{flower.basePrice}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Arrangement Size */}
            <div>
              <label style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.85rem' }}>
                <Layers size={16} style={{ color: 'var(--primary-terracotta)' }} />
                <span>2. Arrangement Volume:</span>
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {SIZE_OPTIONS.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  return (
                    <div
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-xs)',
                        border: isSelected ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-warm)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: 'var(--radius-xs)',
                          border: isSelected ? '5px solid var(--primary-terracotta)' : '2px solid var(--border-subtle)',
                          background: '#FFFFFF'
                        }} />
                        <span style={{ fontSize: '0.88rem', fontWeight: isSelected ? '700' : '500', color: 'var(--text-main)' }}>
                          {size.label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          fontSize: '0.74rem',
                          background: isSelected ? 'var(--primary-terracotta)' : 'var(--bg-canvas)',
                          color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-xs)',
                          fontWeight: '700'
                        }}>
                          {size.priceMod > 0 ? `+₹${size.priceMod}` : 'Included'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Wrap & Ribbons */}
            <div>
              <label style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.85rem' }}>
                <Palette size={16} style={{ color: 'var(--primary-terracotta)' }} />
                <span>3. Packaging & Wrap Style:</span>
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '0.6rem' }}>
                {WRAP_STYLES.map((wrap) => {
                  const isSelected = selectedWrap.id === wrap.id;
                  return (
                    <div
                      key={wrap.id}
                      onClick={() => setSelectedWrap(wrap)}
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-xs)',
                        border: isSelected ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-warm)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: 'var(--radius-xs)', background: wrap.color, border: '1px solid rgba(0,0,0,0.15)' }} />
                        <span style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--text-muted)' }}>{wrap.tag}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.2 }}>
                        {wrap.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Add-on Charms & Personalization */}
            <div>
              <label style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.85rem' }}>
                <Tag size={16} style={{ color: 'var(--primary-terracotta)' }} />
                <span>4. Personal Touch & Charms:</span>
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      style={{
                        padding: '0.65rem 0.95rem',
                        borderRadius: 'var(--radius-xs)',
                        border: isChecked ? '1.5px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                        background: isChecked ? 'var(--primary-rose-light)' : 'var(--bg-warm)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: 'var(--radius-xs)',
                          background: isChecked ? 'var(--primary-terracotta)' : '#FFFFFF',
                          border: isChecked ? 'none' : '1.5px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF'
                        }}>
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span style={{ fontSize: '0.84rem', color: 'var(--text-main)', fontWeight: isChecked ? '700' : '500' }}>
                          {addon.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: addon.price === 0 ? 'var(--accent-sage)' : 'var(--primary-terracotta)', flexShrink: 0 }}>
                        {addon.price === 0 ? 'FREE' : `+₹${addon.price}`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Custom Initials Input if enabled */}
              {selectedAddons.includes('initial-tag') && (
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--bg-warm-tint)', borderRadius: 'var(--radius-xs)', border: '1px dashed var(--border-stitch)' }}>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                    Embroidered / Carved Initials on Tag:
                  </label>
                  <input
                    type="text"
                    value={customInitials}
                    onChange={(e) => setCustomInitials(e.target.value)}
                    placeholder="e.g. S & A or Mom 🌸"
                    className="input-field"
                    style={{ width: '100%', fontSize: '0.85rem', borderRadius: 'var(--radius-xs)' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Visual Composite & Pricing Receipt */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div className="glass-card" style={{
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-card)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Studio Canvas Preview Visual */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '68%',
                background: 'var(--bg-warm)',
                overflow: 'hidden'
              }}>
                <img
                  src={selectedFlower.image}
                  alt={selectedFlower.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.4s ease'
                  }}
                />

                {/* Floating Tags Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <span className="stitch-pill" style={{ background: 'rgba(255,255,255,0.92)', fontSize: '0.74rem', borderRadius: 'var(--radius-xs)' }}>
                    🎨 {selectedFlower.category}
                  </span>
                  <span style={{
                    background: '#2E1C14',
                    color: '#FFFFFF',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.72rem',
                    fontWeight: '700'
                  }}>
                    {selectedSize.label.split('(')[0]}
                  </span>
                </div>

                {/* Wrap Style Pill */}
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  background: 'rgba(255,255,255,0.94)',
                  padding: '0.35rem 0.8rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.76rem',
                  fontWeight: '700',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: 'var(--radius-xs)', background: selectedWrap.color }} />
                  <span>Wrap: {selectedWrap.name.split('(')[0]}</span>
                </div>

                {selectedAddons.includes('initial-tag') && customInitials && (
                  <div style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    background: 'var(--accent-gold-light)',
                    color: '#8A6208',
                    border: '1px solid rgba(212,175,55,0.4)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.75rem',
                    fontWeight: '800'
                  }}>
                    🏷️ Tag: {customInitials}
                  </div>
                )}
              </div>

              {/* Dynamic Cost Summary & Receipt */}
              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {selectedFlower.name}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                      Customized Palette: <strong>{selectedFlower.palette}</strong>
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-terracotta)', lineHeight: 1 }}>
                      ₹{totalPrice}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-sage)', fontWeight: '700' }}>
                      All Customizations Incl.
                    </span>
                  </div>
                </div>

                {/* Studio Guarantee Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-warm-tint)',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} style={{ color: 'var(--accent-sage)' }} />
                    <span>Estimated Craft Time: <strong>{selectedFlower.craftDays}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-terracotta)', fontWeight: '700' }}>
                    <ShieldCheck size={14} />
                    <span>100% Hand-stitched</span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Primary: WhatsApp Order */}
                  <button
                    onClick={handleWhatsAppOrder}
                    className="btn"
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      fontSize: '0.95rem',
                      background: '#25D366',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-xs)',
                      justifyContent: 'center'
                    }}
                  >
                    <MessageCircle size={17} />
                    <span>Order This Custom Setup on WhatsApp</span>
                  </button>

                  {/* Secondary: Request Callback & Add to Cart */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                    <button
                      onClick={handleCallbackRequest}
                      className="btn btn-primary"
                      style={{ padding: '0.8rem 0.5rem', fontSize: '0.84rem', justifyContent: 'center', borderRadius: 'var(--radius-xs)' }}
                    >
                      <Phone size={14} />
                      <span>Request Callback ⚡</span>
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className="btn btn-secondary"
                      style={{ padding: '0.8rem 0.5rem', fontSize: '0.84rem', justifyContent: 'center', borderRadius: 'var(--radius-xs)' }}
                    >
                      <ShoppingBag size={14} />
                      <span>Add to Craft Cart</span>
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                  ✨ Direct personal consultation with Saloni before any yarn cut.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
