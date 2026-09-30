import React from 'react';
import { X, Package, CheckCircle2, Clock, Truck, Sparkles, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OrderTrackerModal = () => {
  const { trackingOrder, setTrackingOrder } = useStore();

  if (!trackingOrder) return null;

  const order = trackingOrder;

  const STEPS = [
    { title: 'Order Confirmed', desc: 'Craft specification verified', icon: CheckCircle2, stepNum: 1 },
    { title: 'Yarn Selection & Setup', desc: 'Organic wool & milk cotton chosen', icon: Sparkles, stepNum: 2 },
    { title: 'Handcrafted in Studio', desc: 'Stitched loop by loop by artisans', icon: Clock, stepNum: 3 },
    { title: 'Quality Check & Packing', desc: 'Gentle steaming & gift wrapping', icon: Package, stepNum: 4 },
    { title: 'Dispatched & On the Way', desc: 'Courier partner transit', icon: Truck, stepNum: 5 }
  ];

  const currentStep = order.statusStep || 3;

  return (
    <div className="modal-backdrop" onClick={() => setTrackingOrder(null)}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '620px', padding: '2rem' }}
      >
        <button
          onClick={() => setTrackingOrder(null)}
          className="btn-icon"
          style={{ position: 'absolute', top: '16px', right: '16px' }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="stitch-pill" style={{ marginBottom: '0.5rem' }}>
            <Sparkles size={12} /> Live Studio Tracker
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '600', color: 'var(--text-main)', marginTop: '0.35rem' }}>
            Order #{order.id}
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>Placed on: <strong>{order.date}</strong></span>
            <span>•</span>
            <span>Est. Delivery: <strong style={{ color: 'var(--primary-terracotta)' }}>{order.estimatedDelivery}</strong></span>
          </div>
        </div>

        {/* Step Tracker Timeline */}
        <div style={{
          background: 'var(--bg-warm)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
            {/* Timeline Line */}
            <div
              style={{
                position: 'absolute',
                left: '18px',
                top: '15px',
                bottom: '15px',
                width: '3px',
                background: 'var(--border-subtle)',
                zIndex: 0
              }}
            />

            {STEPS.map((s, idx) => {
              const isCompleted = s.stepNum <= currentStep;
              const isCurrent = s.stepNum === currentStep;
              const IconComp = s.icon;

              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: isCompleted ? 'var(--primary-terracotta)' : 'var(--bg-surface)',
                      color: isCompleted ? '#FFFFFF' : 'var(--text-light)',
                      border: isCompleted ? 'none' : '2px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(217, 107, 79, 0.2)' : 'none',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <IconComp size={18} />
                  </div>
                  <div>
                    <div style={{
                      fontWeight: isCurrent ? '700' : '600',
                      fontSize: '0.94rem',
                      color: isCurrent ? 'var(--primary-terracotta)' : (isCompleted ? 'var(--text-main)' : 'var(--text-light)')
                    }}>
                      {s.title} {isCurrent && <span style={{ fontSize: '0.74rem', background: 'var(--primary-rose-light)', padding: '0.1rem 0.4rem', borderRadius: '4px', marginLeft: '6px' }}>Current State</span>}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courier Details */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-card)',
          marginBottom: '1.25rem'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: '600' }}>
              Courier Tracking Code
            </div>
            <div style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {order.trackingCode || 'DTDC-IND-994821'}
            </div>
          </div>
          <span className="stitch-pill stitch-pill-sage">
            {order.status || 'In Progress'}
          </span>
        </div>

        {/* Delivery Address */}
        {order.address && (
          <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <MapPin size={16} style={{ color: 'var(--primary-terracotta)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Delivering to:</strong> {order.address.name} — {order.address.street}, {order.address.city}, {order.address.pincode}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
