import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Tag, 
  Heart, 
  ShieldCheck,
  Gift
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage = ({ navigate }) => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    appliedCoupon, 
    couponDiscount, 
    shippingFee, 
    cartTotal, 
    freeShippingRemaining, 
    applyCoupon, 
    removeCoupon,
    toggleWishlist 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [giftNote, setGiftNote] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div style={{ background: 'var(--bg-canvas)', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
        <div className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '3.5rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem', animation: 'gentleFloat 3s ease-in-out infinite' }}>
            🧶
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Your Craft Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Looks like you haven’t added any handcrafted creations to your bag yet. Explore our bestselling blooms, blankets, and amigurumi plushies!
          </p>
          <button onClick={() => navigate('shop')} className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
            <span>Explore Collections</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-warm)', padding: '2.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
            Review your handcrafted items, apply studio discounts, and add a personalized gift note.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        {/* Free Shipping Alert Bar */}
        <div style={{
          background: 'var(--bg-warm)',
          borderRadius: 'var(--radius-xs)',
          padding: '1.25rem 1.5rem',
          border: '1px solid var(--border-card)',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '0.94rem', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
            <Truck size={20} style={{ color: freeShippingRemaining === 0 ? 'var(--accent-sage)' : 'var(--primary-terracotta)' }} />
            {freeShippingRemaining === 0 ? (
              <span style={{ color: 'var(--accent-sage)' }}>🎉 You have unlocked FREE Pan-India craft delivery!</span>
            ) : (
              <span>Add <strong>₹{freeShippingRemaining}</strong> more of handcrafted goodness to enjoy <strong>FREE Shipping</strong>!</span>
            )}
          </div>
          <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, ((999 - freeShippingRemaining) / 999) * 100)}%`,
              background: freeShippingRemaining === 0 ? 'var(--accent-sage)' : 'var(--primary-terracotta)',
              borderRadius: 'var(--radius-xs)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }} className="cart-grid">
          {/* Left: Items List */}
          <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '90px 1fr auto',
                    gap: '1.25rem',
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', background: 'var(--bg-warm)' }}
                  />

                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--primary-terracotta)', fontWeight: '700', textTransform: 'uppercase' }}>
                      {item.product.categoryName}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      {item.product.name}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                      {item.selectedSize !== 'Standard' && <span> • Size: <strong>{item.selectedSize}</strong></span>}
                    </div>

                    {/* Stepper & Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--bg-warm)'
                      }}>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ width: '30px', textAlign: 'center', fontSize: '0.88rem', fontWeight: '700' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => toggleWishlist(item.product.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--text-muted)', background: 'transparent' }}
                      >
                        <Heart size={14} />
                        <span>Save to Wishlist</span>
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#D9534F', background: 'transparent' }}
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Total for item */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      ₹{item.unitPrice.toLocaleString('en-IN')} each
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Handwritten Gift Note Section */}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.92rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                <Gift size={17} style={{ color: 'var(--primary-terracotta)' }} />
                <span>Add a Free Handwritten Gift Card Note</span>
              </div>
              <textarea
                rows="2"
                placeholder="Write your custom gift message here (e.g. 'Happy Birthday Ria! Craft love from Tara')..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="form-textarea"
                style={{ fontSize: '0.86rem', borderRadius: 'var(--radius-xs)' }}
              />
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              Order Summary
            </h3>

            {/* Coupon Code Section */}
            <div style={{ marginBottom: '1.25rem' }}>
              {appliedCoupon ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--accent-sage-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem',
                  color: 'var(--accent-sage)',
                  fontWeight: '600'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Tag size={15} />
                    <span>Coupon {appliedCoupon.code} (-₹{couponDiscount})</span>
                  </div>
                  <button onClick={removeCoupon} style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textDecoration: 'underline' }}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Coupon (HANDMADE10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.85rem', padding: '0.55rem 0.85rem' }}
                  />
                  <button type="submit" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}>
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Totals Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-sage)', fontWeight: '600' }}>
                  <span>Coupon Discount</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--accent-sage)' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '800',
                fontSize: '1.3rem',
                color: 'var(--text-main)',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-subtle)',
                marginTop: '0.25rem'
              }}>
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                navigate('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginBottom: '1rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate('shop')}
              style={{ width: '100%', textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-muted)', fontWeight: '600' }}
            >
              ← Continue Browsing Pieces
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
