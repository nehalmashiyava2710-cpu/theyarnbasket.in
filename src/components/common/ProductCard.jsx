import React, { useState, useRef } from 'react';
import { Heart, Eye, Sparkles, ShoppingBag } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useStore } from '../../context/StoreContext';
import { StarRating } from './StarRating';
import { triggerFlyingYarn } from './FlyingYarnCart';

export const ProductCard = ({ product, navigate, isListView = false }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    directWhatsAppChat, 
    setQuickViewProduct, 
    addToCart,
    showToast
  } = useStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heartBurst, setHeartBurst] = useState(false);
  const liveVideoRef = useRef(null);

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    const msg = `Hi Saloni ma'am! 🌸 I would like to order the handcrafted "${product.name}" (Price: ₹${product.price}, SKU: ${product.sku}). Could you please share availability and customization details?`;
    directWhatsAppChat(msg, product.name);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerFlyingYarn(x, y);
    addToCart(product, 1, {
      selectedColor: product.availableColors?.[0]?.name || 'Standard',
      selectedSize: product.availableSizes?.[0] || 'Standard'
    });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    const willWishlist = !isWishlisted;
    toggleWishlist(product.id);
    if (willWishlist) {
      setHeartBurst(true);
      setTimeout(() => setHeartBurst(false), 850);
      showToast('Saved with love to your wishlist ♡', 'info', '🌸');
    }
  };

  const handleCardClick = () => {
    navigate('product', { id: product.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isListView) {
    return (
      <div
        className="glass-card"
        onClick={handleCardClick}
        style={{
          cursor: 'pointer',
          display: 'grid',
          gridTemplateColumns: '160px 1fr auto',
          gap: '1.25rem',
          padding: '1rem',
          borderRadius: 'var(--radius-xs)',
          alignItems: 'center',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '1px solid var(--border-card)',
          position: 'relative',
          background: 'var(--bg-surface)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(200, 90, 50, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
      >
        {/* List View Image */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '85%',
          borderRadius: 'var(--radius-xs)',
          overflow: 'hidden',
          background: 'var(--bg-warm)'
        }}>
          <img
            src={product.images[0]}
            alt={product.name}
            onError={(e) => { e.currentTarget.src = '/products/bloming-sunflower-bouquet-1249-.jpg'; }}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover'
            }}
          />
          {product.isBestseller ? (
            <span className="stitch-pill stitch-pill-bestseller" style={{ position: 'absolute', top: '6px', left: '6px', fontSize: '0.66rem', padding: '0.12rem 0.45rem' }}>
              ★ Bestseller
            </span>
          ) : discountPercent > 0 ? (
            <span className="stitch-pill stitch-pill-gold" style={{ position: 'absolute', top: '6px', left: '6px', fontSize: '0.66rem', padding: '0.12rem 0.45rem' }}>
              {discountPercent}% OFF
            </span>
          ) : null}
        </div>

        {/* List View Middle Details */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-terracotta)', letterSpacing: '0.04em' }}>
              {product.categoryName}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.78rem' }}>
              <span style={{ color: '#E5B448' }}>★</span>
              <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{product.rating}</span>
              <span style={{ color: 'var(--text-light)', fontSize: '0.72rem' }}>({product.reviewCount})</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.35rem', lineHeight: 1.25 }}>
            {product.name}
          </h3>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.6rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
            {product.shortDescription}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.82rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* List View Right Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={handleToggleWishlist}
              className={`btn-icon ${isWishlisted ? 'cute-heart-beat' : ''}`}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-xs)',
                background: isWishlisted ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                color: isWishlisted ? 'var(--primary-terracotta)' : 'inherit',
                borderColor: isWishlisted ? 'var(--primary-terracotta)' : 'var(--border-subtle)'
              }}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart size={15} fill={isWishlisted ? 'var(--primary-terracotta)' : 'none'} />
              {heartBurst && <span className="floating-heart-particle">♡</span>}
            </button>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-xs)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: '700'
              }}
              title="Add to Bag"
            >
              <ShoppingBag size={14} />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => {
        if (product.images.length > 1) {
          setCurrentImageIndex(1);
        }
        if (liveVideoRef.current) {
          liveVideoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        setCurrentImageIndex(0);
        if (liveVideoRef.current) {
          liveVideoRef.current.pause();
          liveVideoRef.current.currentTime = 0;
        }
      }}
    >
      {/* Product Image Box */}
      <div className="product-image-wrap">
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = '/products/bloming-sunflower-bouquet-1249-.jpg'; }}
        />
        {product.videoUrl && (
          <video
            ref={liveVideoRef}
            className="product-live-video"
            src={product.videoUrl}
            poster={product.images[0]}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}

        {/* Single Priority Badge - Never Stacks Multiple Big Blocks! */}
        <div className="product-badge-float">
          {product.isBestseller ? (
            <span className="stitch-pill stitch-pill-bestseller">
              ★ Bestseller
            </span>
          ) : discountPercent > 0 ? (
            <span className="stitch-pill stitch-pill-gold">
              {discountPercent}% OFF
            </span>
          ) : product.isNew ? (
            <span className="stitch-pill stitch-pill-sage">
              New
            </span>
          ) : null}
        </div>

        {/* Floating Wishlist Heart Button - Perfectly Positioned */}
        <div className="product-actions-float">
          <button
            onClick={handleToggleWishlist}
            className={`btn-icon product-wishlist-btn ${isWishlisted ? 'cute-heart-beat' : ''}`}
            style={{
              width: '30px',
              height: '30px',
              position: 'relative',
              background: isWishlisted ? 'var(--primary-rose-light)' : 'rgba(255,255,255,0.92)',
              borderColor: isWishlisted ? 'var(--primary-terracotta)' : 'rgba(140,88,50,0.18)',
              color: isWishlisted ? 'var(--primary-terracotta)' : 'var(--text-main)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
            aria-label="Save to Wishlist"
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={13} fill={isWishlisted ? 'var(--primary-terracotta)' : 'none'} />
            {heartBurst && <span className="floating-heart-particle">♡</span>}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-info">
        {/* Category & Rating Meta Row */}
        <div className="product-meta-row">
          <span className="product-cat-label">
            {product.categoryName}
          </span>
          <div className="product-rating-badge">
            <span style={{ color: '#E5B448', fontSize: '0.78rem' }}>★</span>
            <span style={{ fontWeight: '700', fontSize: '0.74rem', color: 'var(--text-main)' }}>{product.rating}</span>
            <span className="d-mobile-hidden" style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title Heading */}
        <h3 className="product-title-heading">
          {product.name}
        </h3>

        {/* Color Swatches if available */}
        {product.availableColors && product.availableColors.length > 0 && (
          <div className="product-color-dots">
            {product.availableColors.slice(0, 3).map((c, i) => (
              <span
                key={i}
                title={c.name}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-xs)',
                  background: c.hex,
                  border: '1px solid rgba(0,0,0,0.18)',
                  display: 'inline-block'
                }}
              />
            ))}
            {product.availableColors.length > 3 && (
              <span style={{ fontSize: '0.62rem', color: 'var(--text-light)', fontWeight: '600' }}>
                +{product.availableColors.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price & Add to Bag Footer Row */}
        <div className="product-footer-row">
          <div className="product-price-box">
            <span className="product-current-price">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="product-orig-price d-mobile-hidden">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="product-btn-group">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary product-card-cta"
              aria-label="Add to Bag"
              title="Add to Craft Bag"
            >
              <ShoppingBag size={12} />
              <span>Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
