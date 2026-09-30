import React, { useState } from 'react';
import { X, Heart, Sparkles, ArrowRight, Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useStore } from '../../context/StoreContext';
import { StarRating } from './StarRating';

export const QuickViewModal = ({ navigate }) => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist,
    openServiceModal,
    directWhatsAppChat
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);
  const currentColor = selectedColor || product.availableColors?.[0]?.name || 'Standard';
  const currentSize = selectedSize || product.availableSizes?.[0] || 'Standard';

  const handleWhatsAppOrder = () => {
    const msg = `Hi Saloni ma'am! 🌸 I would like to order:
• Product: ${product.name} (SKU: ${product.sku})
• Price: ₹${product.price}
• Quantity: ${quantity}
• Total: ₹${(product.price * quantity).toLocaleString('en-IN')}
• Color: ${currentColor}
• Size: ${currentSize}

Could you please confirm availability and customization details? Thank you! ✨`;
    setQuickViewProduct(null);
    directWhatsAppChat(msg, product.name);
  };

  const handleViewFullPage = () => {
    setQuickViewProduct(null);
    navigate('product', { id: product.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', padding: '0', overflow: 'hidden' }}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="btn-icon"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 10,
            background: 'var(--bg-surface)'
          }}
        >
          <X size={18} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
        }}>
          {/* Left: Gallery */}
          <div style={{ padding: '1.5rem', background: 'var(--bg-warm)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{
              width: '100%',
              paddingTop: '100%',
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'var(--bg-surface)'
            }}>
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: selectedImage === i ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Options */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="stitch-pill">{product.categoryName}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '600' }}>
                SKU: {product.sku}
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              <span style={{ color: 'var(--border-subtle)' }}>•</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--accent-sage)', fontWeight: '600' }}>
                {product.leadTimeDays}
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-main)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="price-original" style={{ fontSize: '1.05rem' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.originalPrice && (
                <span className="price-discount">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              {product.shortDescription}
            </p>

            {/* Color Selection */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Color: <span style={{ color: 'var(--primary-terracotta)' }}>{currentColor}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.availableColors.map((c, i) => {
                    const isSelected = currentColor === c.name;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: 'var(--radius-xs)',
                          border: isSelected ? '1.5px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                          fontSize: '0.78rem',
                          fontWeight: isSelected ? '700' : '500',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ width: '12px', height: '12px', borderRadius: 'var(--radius-xs)', background: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Size / Option:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.availableSizes.map((s, i) => {
                    const isSelected = currentSize === s;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          padding: '0.4rem 0.85rem',
                          borderRadius: 'var(--radius-xs)',
                          border: isSelected ? '1.5px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                          fontSize: '0.8rem',
                          fontWeight: isSelected ? '700' : '500',
                          color: isSelected ? 'var(--primary-terracotta)' : 'var(--text-main)',
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

            {/* Quantity & CTA Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              {/* Quantity Counter */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '34px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}
                >
                  -
                </button>
                <span style={{ width: '32px', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '34px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}
                >
                  +
                </button>
              </div>

              {/* Order via WhatsApp */}
              <button
                onClick={handleWhatsAppOrder}
                className="btn"
                style={{
                  flex: 1,
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.9rem',
                  borderRadius: 'var(--radius-xs)',
                  background: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <WhatsAppIcon size={17} color="#FFFFFF" />
                <span>Order on WhatsApp</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="btn-icon"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-xs)',
                  background: isWishlisted ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                  color: isWishlisted ? 'var(--primary-terracotta)' : 'inherit',
                  borderColor: isWishlisted ? 'var(--primary-terracotta)' : 'var(--border-subtle)'
                }}
              >
                <Heart size={18} fill={isWishlisted ? 'var(--primary-terracotta)' : 'none'} />
              </button>
            </div>

            {/* Customization & Inquiry Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button
                onClick={() => {
                  const msg = `Hi Saloni ma'am! I'm looking at "${product.name}" (₹${product.price}) on your website. Could you tell me more about customizing this?`;
                  directWhatsAppChat(msg);
                }}
                className="btn"
                style={{
                  flex: 1,
                  padding: '0.55rem 0.75rem',
                  fontSize: '0.8rem',
                  background: '#25D366',
                  color: '#FFFFFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <WhatsAppIcon size={15} color="#FFFFFF" />
                <span>WhatsApp Saloni</span>
              </button>
              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  openServiceModal({
                    serviceTitle: `Inquiry for ${product.name}`,
                    note: `Inquiry for ${product.name} (SKU: ${product.sku})`
                  });
                }}
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  padding: '0.55rem 0.75rem',
                  fontSize: '0.8rem'
                }}
              >
                <Phone size={13} />
                <span>Callback ⚡</span>
              </button>
            </div>

            {/* View Full Product Details Link */}
            <button
              onClick={handleViewFullPage}
              style={{
                marginTop: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: 'var(--primary-terracotta)',
                background: 'transparent'
              }}
            >
              <span>View full craftsmanship & care details</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
