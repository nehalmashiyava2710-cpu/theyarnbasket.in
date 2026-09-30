import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Share2, 
  Check, 
  Truck, 
  ShieldCheck, 
  Leaf, 
  RotateCcw, 
  Scissors, 
  Clock, 
  Star, 
  Plus, 
  Minus, 
  MessageSquareQuote,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Film,
  Phone,
  Play,
  ShoppingBag
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useStore } from '../context/StoreContext';
import { StarRating } from '../components/common/StarRating';
import { ProductCard } from '../components/common/ProductCard';
import { triggerFlyingYarn } from '../components/common/FlyingYarnCart';

export const ProductDetailPage = ({ productId, navigate }) => {
  const { 
    products, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    showToast,
    openServiceModal,
    directWhatsAppChat,
    reels,
    setActiveReel
  } = useStore();

  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.availableColors?.[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'materials' | 'process' | 'shipping' | 'reviews'
  const [isAdded, setIsAdded] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  // Review Form Modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [customReviews, setCustomReviews] = useState([]);

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerFlyingYarn(x, y);
    addToCart(product, quantity, {
      selectedColor: selectedColor || 'Standard',
      selectedSize: selectedSize || 'Standard'
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    const willWishlist = !isWishlisted;
    toggleWishlist(product.id);
    if (willWishlist) {
      setHeartBurst(true);
      setTimeout(() => setHeartBurst(false), 850);
      showToast('Saved with love to your wishlist ♡', 'info', '🌸');
    }
  };

  const handleWhatsAppOrder = () => {
    const msg = `Hi Saloni ma'am! 🌸 I would like to order the handcrafted creation:
• Product: ${product.name} (SKU: ${product.sku})
• Unit Price: ₹${product.price}
• Quantity: ${quantity}
• Total: ₹${(product.price * quantity).toLocaleString('en-IN')}
• Selected Color: ${selectedColor || 'Standard'}
• Sizing / Option: ${selectedSize || 'Standard'}

Could you please confirm the delivery timeline and UPI/payment details? Thank you! ✨`;
    directWhatsAppChat(msg, product.name);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard! Share the craft love 🌸', 'success');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      showToast('Please fill in your name and review', 'error');
      return;
    }
    const newRev = {
      author: reviewAuthor,
      rating: reviewRating,
      comment: reviewComment,
      date: 'Just now',
      verified: true
    };
    setCustomReviews((prev) => [newRev, ...prev]);
    setIsReviewModalOpen(false);
    setReviewAuthor('');
    setReviewComment('');
    showToast('Thank you for reviewing! Your feedback warms our atelier.', 'success', '💖');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ background: 'var(--bg-canvas)', paddingBottom: '6rem' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          <span onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>Home</span>
          <span>/</span>
          <span onClick={() => navigate('shop', { category: product.category })} style={{ cursor: 'pointer' }}>{product.categoryName}</span>
          <span>/</span>
          <span style={{ color: 'var(--primary-terracotta)', fontWeight: '600' }}>{product.name}</span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Main Product Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(1.5rem, 4vw, 3.5rem)',
          marginBottom: '3.5rem',
          alignItems: 'flex-start'
        }}>
          {/* Gallery Column */}
          <div>
            <div style={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: 'var(--bg-warm)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-card)',
              marginBottom: '1rem'
            }}>
              {selectedImage === 'video' && product.videoUrl ? (
                <div style={{ position: 'absolute', inset: 0, background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <video
                    src={product.videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
              )}

              {/* Badges */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 10 }}>
                <span className="stitch-pill" style={{ fontSize: '0.78rem' }}>
                  <Sparkles size={12} /> 100% Handcrafted
                </span>
                {discountPercent > 0 && (
                  <span className="stitch-pill stitch-pill-gold" style={{ fontSize: '0.78rem' }}>
                    Save {discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '4px' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: selectedImage === idx ? '2.5px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                    boxShadow: selectedImage === idx ? 'var(--shadow-sm)' : 'none',
                    padding: 0,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}

              {product.videoUrl && (
                <button
                  onClick={() => setSelectedImage('video')}
                  style={{
                    position: 'relative',
                    width: '76px',
                    height: '76px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: selectedImage === 'video' ? '2.5px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                    boxShadow: selectedImage === 'video' ? '0 0 12px rgba(217,107,79,0.35)' : 'none',
                    background: '#1A1614',
                    padding: 0,
                    cursor: 'pointer',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                  title="Watch Crafting Video"
                >
                  <video
                    src={product.videoUrl}
                    muted
                    playsInline
                    autoPlay
                    loop
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
                  />
                  <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={14} fill="#FFFFFF" style={{ marginLeft: '1px' }} />
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: '800' }}>Video</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Product Info & Purchase Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="stitch-pill">{product.categoryName}</span>
              <button
                onClick={handleShare}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              >
                <Share2 size={15} />
                <span>Share</span>
              </button>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: 'var(--text-main)', marginBottom: '0.75rem', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Star Rating & SKU */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <StarRating rating={product.rating} reviewCount={product.reviewCount + customReviews.length} size={16} />
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-light)', fontWeight: '600' }}>
                SKU: {product.sku}
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--accent-sage)', fontWeight: '700' }}>
                ⚡ {product.leadTimeDays}
              </span>
            </div>

            {/* Watch Reel Badge if exists */}
            {reels.find((r) => r.taggedProductId === product.id) && (
              <div style={{ marginBottom: '1.25rem' }}>
                <button
                  onClick={() => setActiveReel(reels.find((r) => r.taggedProductId === product.id))}
                  className="btn btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.95rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    background: 'var(--primary-rose-light)',
                    borderColor: 'var(--primary-terracotta)',
                    color: 'var(--primary-terracotta)',
                    fontWeight: '700',
                    boxShadow: '0 2px 8px rgba(217,107,79,0.15)'
                  }}
                >
                  <Film size={15} />
                  <span>Watch Making-of Reel 🎬</span>
                </button>
              </div>
            )}

            {/* Price Showcase */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              background: 'var(--bg-warm)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '1.5rem',
              border: '1px solid var(--border-subtle)'
            }}>
              <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="price-original" style={{ fontSize: '1.2rem' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="price-discount" style={{ fontSize: '0.85rem' }}>
                  {discountPercent}% OFF (Inclusive of all taxes)
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '1.75rem' }}>
              {product.fullDescription}
            </p>

            {/* Color Swatch Selector */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: '600' }}>
                  <span>Select Color: <strong style={{ color: 'var(--primary-terracotta)' }}>{selectedColor}</strong></span>
                </div>
                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  {product.availableColors.map((c, idx) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(c.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.45rem 0.95rem',
                          borderRadius: 'var(--radius-xs)',
                          border: isSelected ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                          fontSize: '0.84rem',
                          fontWeight: isSelected ? '700' : '500',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ width: '14px', height: '14px', borderRadius: 'var(--radius-xs)', background: c.hex, border: '1px solid rgba(0,0,0,0.1)' }} />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size / Dimensions Selector */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: '600' }}>
                  Select Sizing / Option:
                </div>
                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  {product.availableSizes.map((s, idx) => {
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          padding: '0.55rem 1.15rem',
                          borderRadius: 'var(--radius-xs)',
                          border: isSelected ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                          color: isSelected ? 'var(--primary-terracotta)' : 'var(--text-main)',
                          fontSize: '0.86rem',
                          fontWeight: isSelected ? '700' : '500',
                          cursor: 'pointer'
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Counter & Direct WhatsApp Order Action */}
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {/* Stepper */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--bg-surface)',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '38px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span style={{ width: '36px', textAlign: 'center', fontSize: '0.95rem', fontWeight: '700' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '38px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to Craft Bag Primary CTA */}
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{
                  flex: '1 1 180px',
                  padding: '0.85rem 1.4rem',
                  fontSize: '0.96rem',
                  borderRadius: 'var(--radius-xs)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <ShoppingBag size={18} />
                <span>{isAdded ? 'Added with love ♡' : 'Add to Craft Bag'}</span>
              </button>

              {/* Order via WhatsApp Primary Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="btn"
                style={{
                  flex: '1 1 180px',
                  padding: '0.85rem 1.4rem',
                  fontSize: '0.96rem',
                  borderRadius: 'var(--radius-xs)',
                  background: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <WhatsAppIcon size={20} color="#FFFFFF" />
                <span>Order on WhatsApp</span>
              </button>

              {/* Custom Order Request Button */}
              <button
                onClick={() => {
                  navigate('custom-order', {
                    initialPrompt: `Hi Saloni, I'd like a custom version of ${product.name} (SKU: ${product.sku}) in ${selectedColor || 'custom color'}`
                  });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn btn-secondary"
                style={{
                  padding: '0.85rem 1.25rem',
                  fontSize: '0.92rem',
                  borderColor: 'var(--primary-terracotta)',
                  color: 'var(--primary-terracotta)',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                <Sparkles size={15} />
                <span>Custom</span>
              </button>

              {/* Wishlist Button with Heart Pop */}
              <button
                onClick={handleToggleWishlist}
                className={`btn-icon ${isWishlisted ? 'cute-heart-beat' : ''}`}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-xs)',
                  position: 'relative',
                  background: isWishlisted ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                  color: isWishlisted ? 'var(--primary-terracotta)' : 'inherit',
                  borderColor: isWishlisted ? 'var(--primary-terracotta)' : 'var(--border-subtle)'
                }}
                aria-label="Wishlist"
                title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={18} fill={isWishlisted ? 'var(--primary-terracotta)' : 'none'} />
                {heartBurst && <span className="floating-heart-particle">♡</span>}
              </button>
            </div>

            {/* Direct Service & Customization Consultation Card */}
            <div style={{
              padding: '1.1rem',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--bg-warm)',
              border: '1.5px dashed var(--border-stitch)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span className="stitch-pill stitch-pill-sage" style={{ fontSize: '0.74rem', borderRadius: 'var(--radius-xs)' }}>
                  🌸 Custom Craft Service Available
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-sage)', fontWeight: '700' }}>
                  ⚡ Free Color / Size Advice
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                Want this in a different color palette, personalized embroidered name, or as bulk event favors? Connect directly with Saloni:
              </p>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    const msg = `Hi Saloni ma'am! I'm looking at "${product.name}" (SKU: ${product.sku}) on your website. Can we customize this design (color: ${selectedColor || 'Custom'}, size: ${selectedSize || 'Custom'})?`;
                    directWhatsAppChat(msg);
                  }}
                  className="btn"
                  style={{
                    flex: 1,
                    minWidth: '150px',
                    padding: '0.65rem 1rem',
                    fontSize: '0.84rem',
                    background: '#25D366',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-xs)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <WhatsAppIcon size={16} color="#FFFFFF" />
                  <span>Ask Saloni on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => openServiceModal({
                    serviceTitle: `Customization for ${product.name}`,
                    note: `Inquiry for product: ${product.name} (SKU: ${product.sku}). Selected Color: ${selectedColor}, Size: ${selectedSize}.`
                  })}
                  className="btn btn-secondary"
                  style={{
                    flex: 1,
                    minWidth: '140px',
                    padding: '0.65rem 1rem',
                    fontSize: '0.84rem',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  <Phone size={14} />
                  <span>Request Callback ⚡</span>
                </button>
              </div>
            </div>

            {/* Quick Atelier Guarantees */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              padding: '1.15rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-warm-tint)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <Truck size={16} style={{ color: 'var(--primary-terracotta)' }} />
                <span>Free shipping over ₹999</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <Leaf size={16} style={{ color: 'var(--accent-sage)' }} />
                <span>Eco-friendly gift packaging</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <Scissors size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>Crafted by master artisans</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <ShieldCheck size={16} style={{ color: 'var(--primary-rose)' }} />
                <span>100% Happiness guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="glass-card" style={{
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem clamp(1.25rem, 4vw, 2.5rem)',
          border: '1px solid var(--border-card)',
          marginBottom: '4rem'
        }}>
          {/* Tabs Navigation */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.75rem',
            overflowX: 'auto',
            marginBottom: '2rem'
          }}>
            {[
              { id: 'description', label: 'Craft Description' },
              { id: 'materials', label: 'Materials & Care' },
              { id: 'process', label: 'Handmaking Process' },
              { id: 'shipping', label: 'Shipping & Delivery' },
              { id: 'reviews', label: `Reviews (${product.reviewCount + customReviews.length})` }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.94rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--primary-terracotta)' : 'var(--text-muted)',
                    borderBottom: isActive ? '2px solid var(--primary-terracotta)' : '2px solid transparent',
                    background: 'transparent',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Contents */}
          {activeTab === 'description' && (
            <div style={{ lineHeight: '1.7', color: 'var(--text-muted)', fontSize: '0.96rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                About this Handcrafted Creation
              </h3>
              <p style={{ marginBottom: '1rem' }}>{product.fullDescription}</p>
              <p>
                Every knot and loop is carefully calibrated for balanced tension and longevity. Whether displayed on a desk, gifted for a milestone anniversary, or used to add warm boho warmth to your home, this piece brings natural charm into everyday moments.
              </p>
            </div>
          )}

          {activeTab === 'materials' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div>
                <h4 style={{ fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Materials Used</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{product.materials}</p>
                <h4 style={{ fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Dimensions & Scale</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{product.dimensions}</p>
              </div>
              <div>
                <h4 style={{ fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Care & Washing Instructions</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{product.careInstructions}</p>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                Mindful Slow Craft Production
              </h3>
              <p style={{ marginBottom: '0.75rem' }}>
                Handcrafted at our boutique studio by master artisans using premium needle gauges and ergonomic wooden hooks. Each product takes between 2 to 14 focused hours depending on stitch complexity.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <span className="stitch-pill stitch-pill-sage">✨ 100% Hand-Stitched</span>
                <span className="stitch-pill stitch-pill-gold">🌿 Eco-Clean Yarns</span>
                <span className="stitch-pill">🔒 Double-Knotted Tension</span>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                Delivery & Gifting Info
              </h3>
              <p style={{ marginBottom: '0.75rem' }}>
                • <strong>Dispatch Time:</strong> In-stock pieces dispatch within 24-48 hours. Custom orders craft within 3-5 days.<br />
                • <strong>Delivery Time:</strong> 3-6 business days pan-India via express tracked courier.<br />
                • <strong>Shipping Charges:</strong> FREE for all orders above ₹999 (Standard ₹79 for orders below ₹999).<br />
                • <strong>Gift Packaging:</strong> Every order arrives lovingly gift-wrapped with a handwritten card.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>{product.rating}</span>
                    <div>
                      <StarRating rating={product.rating} size={16} showText={false} />
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Based on {product.reviewCount + customReviews.length} verified reviews</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="btn btn-primary"
                  style={{ fontSize: '0.88rem', padding: '0.65rem 1.35rem' }}
                >
                  <MessageSquareQuote size={16} />
                  <span>Write a Review</span>
                </button>
              </div>

              {/* Reviews List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {customReviews.map((cr, idx) => (
                  <div key={idx} style={{ padding: '1.25rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.95rem' }}>{cr.author} (You)</div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{cr.date}</span>
                    </div>
                    <StarRating rating={cr.rating} size={13} showText={false} />
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.5' }}>{cr.comment}</p>
                  </div>
                ))}

                <div style={{ padding: '1.25rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.95rem' }}>Pooja Kulkarni</span>
                      <span className="stitch-pill stitch-pill-sage" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>Verified Buyer</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>1 week ago</span>
                  </div>
                  <StarRating rating={5} size={13} showText={false} />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.5' }}>
                    "The photos do not do this justice! The colors are so rich and the yarn texture is buttery soft. You can tell real passion went into crafting this."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="stitch-pill" style={{ marginBottom: '0.5rem' }}>
                <Sparkles size={12} /> Studio Pairings
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', fontSize: '1.8rem' }}>
                Pairs Beautifully With
              </h2>
            </div>
            <div className="grid-products">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsReviewModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '500px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
              Write a Review for {product.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Share your thoughts on the yarn texture, craftsmanship, and unboxing joy!
            </p>

            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label className="form-label">Overall Rating</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      style={{ background: 'transparent', padding: '2px', cursor: 'pointer' }}
                    >
                      <Star size={24} fill={star <= reviewRating ? '#E5B448' : 'none'} stroke="#E5B448" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Pooja K."
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Review</label>
                <textarea
                  rows="4"
                  placeholder="How did you like the handmade details, finish, and feel?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="form-textarea"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Submit Review ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart Footer Bar */}
      <div
        className="d-mobile-only"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '56px',
          left: 0,
          right: 0,
          zIndex: 890,
          background: 'rgba(250, 247, 242, 0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '0.55rem 1rem calc(0.55rem + env(safe-area-inset-bottom, 0px)) 1rem',
          boxShadow: '0 -4px 16px rgba(46, 28, 20, 0.08)',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.66rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: '700' }}>Price</div>
          <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.45rem', flex: 1, justifyContent: 'flex-end' }}>
          <button
            onClick={handleWhatsAppOrder}
            className="btn"
            style={{
              padding: '0.55rem 1.25rem',
              fontSize: '0.86rem',
              height: '40px',
              borderRadius: 'var(--radius-xs)',
              background: '#25D366',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <WhatsAppIcon size={17} color="#FFFFFF" />
            <span>Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
