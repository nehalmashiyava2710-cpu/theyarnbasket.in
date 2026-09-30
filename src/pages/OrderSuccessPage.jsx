import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, Package, MapPin, Truck, ArrowRight, Download, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';

export const OrderSuccessPage = ({ orderId, navigate }) => {
  const { orders, setTrackingOrder } = useStore();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  useEffect(() => {
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#D96B4F', '#F4A261', '#7DA691', '#E5B448', '#D98880']
      });
    } catch (e) {
      console.log('Confetti effect');
    }
  }, []);

  const handleTrackOrder = () => {
    setTrackingOrder(order);
  };

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '85vh', padding: '4rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        className="glass-card"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          borderRadius: 'var(--radius-xs)',
          border: '1.5px dashed var(--border-stitch)',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Animated Celebration Yarn Ball Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-xs)',
          background: 'var(--primary-terracotta)',
          color: '#FFFFFF',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 16px rgba(200,90,50,0.3)',
          animation: 'gentleFloat 3s ease-in-out infinite'
        }}>
          <Package size={44} />
        </div>

        <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
          <span className="stitch-pill stitch-pill-sage">
            <CheckCircle2 size={13} /> Order Successfully Placed
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.6rem)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          Your handmade creation is on its way!
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 2rem auto' }}>
          Thank you for choosing slow craftsmanship. Our artisans have received your order details and are preparing your yarn pieces with deep love and care.
        </p>

        {/* Order Details Card */}
        {order && (
          <div style={{
            background: 'var(--bg-warm)',
            borderRadius: 'var(--radius-xs)',
            padding: '1.5rem',
            textAlign: 'left',
            marginBottom: '2rem',
            border: '1px solid var(--border-card)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: '700' }}>
                  Order Reference ID
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  #{order.id}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: '700' }}>
                  Estimated Delivery
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--accent-sage)' }}>
                  {order.estimatedDelivery || '5-7 business days'}
                </div>
              </div>
            </div>

            {/* Items Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span>{item.quantity}x {item.product.name} ({item.selectedColor})</span>
                  <span style={{ fontWeight: '700' }}>₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '0.75rem',
              fontWeight: '800',
              fontSize: '1.1rem',
              color: 'var(--text-main)'
            }}>
              <span>Total Paid via {order.paymentMethod.split(' ')[0]}</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleTrackOrder}
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.8rem', fontSize: '0.94rem' }}
          >
            <Truck size={17} />
            <span>Track Craft Status</span>
          </button>

          <button
            onClick={() => {
              navigate('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.8rem', fontSize: '0.94rem' }}
          >
            <span>Continue Shopping</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};
