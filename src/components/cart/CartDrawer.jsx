import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Tag, 
  CheckCircle2 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer = ({ navigate }) => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartCount, 
    appliedCoupon, 
    couponDiscount, 
    shippingFee, 
    cartTotal, 
    freeShippingRemaining, 
    applyCoupon, 
    removeCoupon 
  } = useStore();

  const [couponCode, setCouponCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) setCouponCode('');
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigate('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCartPage = () => {
    setIsCartOpen(false);
    navigate('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)} />
      <div className="drawer-panel" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-warm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--primary-terracotta)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
              Your Craft Cart
            </h3>
            <span style={{
              background: 'var(--primary-rose-light)',
              color: 'var(--primary-terracotta)',
              fontSize: '0.78rem',
              fontWeight: '700',
              padding: '0.15rem 0.55rem',
              borderRadius: 'var(--radius-full)'
            }}>
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          padding: '0.85rem 1.5rem',
          background: 'var(--bg-canvas)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            <Truck size={16} style={{ color: freeShippingRemaining === 0 ? 'var(--accent-sage)' : 'var(--primary-terracotta)' }} />
            {freeShippingRemaining === 0 ? (
              <span style={{ color: 'var(--accent-sage)' }}>🎉 You’ve unlocked FREE Pan-India shipping!</span>
            ) : (
              <span>Add <strong>₹{freeShippingRemaining}</strong> more for <strong>FREE shipping</strong>!</span>
            )}
          </div>
          <div style={{
            height: '5px',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-xs)',
            overflow: 'hidden'
          }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, ((999 - freeShippingRemaining) / 999) * 100)}%`,
                background: freeShippingRemaining === 0
                  ? 'var(--accent-sage)'
                  : 'var(--primary-terracotta)',
                borderRadius: 'var(--radius-xs)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'gentleFloat 3s ease-in-out infinite' }}>
                🧶
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Discover our handcrafted bouquets, cute plushies, and cozy woolen blankets.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('shop');
                }}
                className="btn btn-primary"
                style={{ fontSize: '0.88rem', padding: '0.75rem 1.5rem' }}
              >
                Explore Collections 🌸
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    paddingBottom: '1.1rem',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-xs)',
                      objectFit: 'cover',
                      background: 'var(--bg-warm)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.2rem', lineHeight: '1.3' }}>
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'transparent',
                          color: 'var(--text-light)',
                          cursor: 'pointer',
                          padding: '2px'
                        }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                      {item.selectedSize !== 'Standard' && <span> • Size: <strong>{item.selectedSize}</strong></span>}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Stepper */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--bg-warm)'
                      }}>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          style={{ width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ width: '24px', textAlign: 'center', fontSize: '0.82rem', fontWeight: '600' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          style={{ width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ fontWeight: '700', fontSize: '0.98rem', color: 'var(--text-main)' }}>
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout) */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-warm)'
          }}>
            {/* Coupon Code Box */}
            {appliedCoupon ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.55rem 0.85rem',
                background: 'var(--accent-sage-light)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1rem',
                fontSize: '0.82rem',
                color: 'var(--accent-sage)',
                fontWeight: '600'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Tag size={14} />
                  <span>Coupon {appliedCoupon.code} applied (-₹{couponDiscount})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textDecoration: 'underline' }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Coupon code (e.g. HANDMADE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.5rem 0.85rem', fontSize: '0.82rem' }}
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 0.95rem', fontSize: '0.82rem' }}
                >
                  Apply
                </button>
              </form>
            )}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-sage)', fontWeight: '600' }}>
                  <span>Discount</span>
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
                fontWeight: '700',
                fontSize: '1.15rem',
                color: 'var(--text-main)',
                paddingTop: '0.5rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedCheckout}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.98rem',
                marginBottom: '0.65rem'
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={handleViewCartPage}
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}
            >
              View Full Cart & Add Gift Note
            </button>
          </div>
        )}
      </div>
    </>
  );
};
