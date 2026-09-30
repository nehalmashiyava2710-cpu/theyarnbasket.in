import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Lock, 
  Check, 
  MapPin, 
  Plus, 
  User, 
  Mail, 
  Phone, 
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutPage = ({ navigate }) => {
  const { 
    cart, 
    cartSubtotal, 
    couponDiscount, 
    appliedCoupon, 
    shippingFee, 
    cartTotal, 
    currentUser, 
    addresses, 
    addAddress, 
    placeOrder,
    showToast 
  } = useStore();

  const [step, setStep] = useState(1); // 1: Customer & Address, 2: Payment & Review

  // Customer details
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');

  // Address selection / form
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || 'new');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(addresses.length === 0);
  const [newStreet, setNewStreet] = useState('');
  const [newApartment, setNewApartment] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [newAddressType, setNewAddressType] = useState('Home');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' | 'express'

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod' | 'netbanking'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('shop')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Explore Creations
        </button>
      </div>
    );
  }

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      showToast('Please fill in your contact information', 'error');
      return;
    }

    if (isAddingNewAddress || selectedAddressId === 'new') {
      if (!newStreet || !newCity || !newState || !newPincode) {
        showToast('Please fill in complete address fields', 'error');
        return;
      }
      addAddress({
        name: customerName,
        street: newStreet,
        apartment: newApartment,
        city: newCity,
        state: newState,
        pincode: newPincode,
        phone: customerPhone,
        type: newAddressType,
        isDefault: false
      });
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    const activeAddress = selectedAddressId !== 'new'
      ? addresses.find((a) => a.id === selectedAddressId)
      : {
          name: customerName,
          street: newStreet,
          apartment: newApartment,
          city: newCity,
          state: newState,
          pincode: newPincode,
          phone: customerPhone,
          type: newAddressType
        };

    const paymentLabel = 
      paymentMethod === 'upi' ? `UPI / QR Code (${upiId || 'Direct Studio QR'})` :
      paymentMethod === 'card' ? `Credit/Debit Card (ending in ${cardNumber.slice(-4) || '8842'})` :
      paymentMethod === 'cod' ? 'Cash on Delivery (Handcrafted Package)' : 'Net Banking';

    setTimeout(() => {
      const order = placeOrder({
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: activeAddress,
        paymentMethod: paymentLabel
      });

      setIsProcessing(false);
      navigate('order-success', { orderId: order.id });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const finalDeliveryCharge = shippingMethod === 'express' ? shippingFee + 99 : shippingFee;
  const finalPayableTotal = cartTotal + (shippingMethod === 'express' ? 99 : 0);

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Checkout Steps Progress Bar */}
      <div style={{ background: 'var(--bg-warm)', padding: '2rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            Artisan Studio Checkout
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: step >= 1 ? 'var(--primary-terracotta)' : 'var(--text-light)',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}>
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: step >= 1 ? 'var(--primary-terracotta)' : 'var(--bg-tertiary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}>
                1
              </span>
              <span>Delivery Address</span>
            </div>

            <div style={{ width: '40px', height: '2px', background: step >= 2 ? 'var(--primary-terracotta)' : 'var(--border-subtle)' }} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: step >= 2 ? 'var(--primary-terracotta)' : 'var(--text-light)',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}>
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: step >= 2 ? 'var(--primary-terracotta)' : 'var(--bg-tertiary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}>
                2
              </span>
              <span>Payment & Review</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }} className="checkout-grid">
          {/* Main Step Content Area */}
          <div>
            {step === 1 && (
              <form onSubmit={handleNextToPayment} className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
                {/* 1. Customer Information */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <User size={18} style={{ color: 'var(--primary-terracotta)' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                      1. Contact Information
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Ananya Sharma"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        placeholder="e.g. ananya@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        placeholder="+91 95106 66234"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address */}
                <div style={{ marginBottom: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={18} style={{ color: 'var(--primary-terracotta)' }} />
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                        2. Delivery Address
                      </h3>
                    </div>

                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                        style={{ fontSize: '0.82rem', color: 'var(--primary-terracotta)', fontWeight: '600' }}
                      >
                        {isAddingNewAddress ? 'Use Saved Address' : '+ Add New Address'}
                      </button>
                    )}
                  </div>

                  {/* Saved Addresses Picker */}
                  {!isAddingNewAddress && addresses.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            style={{
                              padding: '1rem',
                              borderRadius: 'var(--radius-md)',
                              border: `1.5px solid ${isSelected ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                              background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem'
                            }}
                          >
                            <input
                              type="radio"
                              name="savedAddress"
                              checked={isSelected}
                              onChange={() => setSelectedAddressId(addr.id)}
                              style={{ marginTop: '3px', accentColor: 'var(--primary-terracotta)' }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                <strong>{addr.name}</strong>
                                <span className="stitch-pill" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>{addr.type}</span>
                              </div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                {addr.street}, {addr.apartment && `${addr.apartment}, `}{addr.city}, {addr.state} - {addr.pincode}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '2px' }}>
                                Phone: {addr.phone}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* New Address Form */}
                  {(isAddingNewAddress || addresses.length === 0) && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <div className="form-group">
                        <label className="form-label">Street Address & Landmark *</label>
                        <input
                          type="text"
                          placeholder="House/Flat No., Building Name, Street"
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Apartment / Floor / Suite</label>
                        <input
                          type="text"
                          placeholder="e.g. Flat 402, 4th Floor"
                          value={newApartment}
                          onChange={(e) => setNewApartment(e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                        <div className="form-group">
                          <label className="form-label">City *</label>
                          <input
                            type="text"
                            placeholder="e.g. Bengaluru"
                            value={newCity}
                            onChange={(e) => setNewCity(e.target.value)}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">State *</label>
                          <input
                            type="text"
                            placeholder="e.g. Karnataka"
                            value={newState}
                            onChange={(e) => setNewState(e.target.value)}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">PIN Code *</label>
                          <input
                            type="text"
                            placeholder="e.g. 560038"
                            value={newPincode}
                            onChange={(e) => setNewPincode(e.target.value)}
                            className="form-input"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Shipping Speed */}
                <div style={{ marginBottom: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Truck size={18} style={{ color: 'var(--primary-terracotta)' }} />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                      3. Shipping Method
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div
                      onClick={() => setShippingMethod('standard')}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${shippingMethod === 'standard' ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                        background: shippingMethod === 'standard' ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <strong>Standard Craft Delivery</strong>
                        <span style={{ fontWeight: '700', color: shippingFee === 0 ? 'var(--accent-sage)' : 'var(--text-main)' }}>
                          {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        3-5 business days across India
                      </div>
                    </div>

                    <div
                      onClick={() => setShippingMethod('express')}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${shippingMethod === 'express' ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                        background: shippingMethod === 'express' ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                        <strong>Express Air Courier ⚡</strong>
                        <span style={{ fontWeight: '700' }}>+₹99</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        1-2 business days priority dispatch
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.95rem', fontSize: '1rem' }}
                >
                  <span>Continue to Payment & Review</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                    Select Secure Payment Method
                  </h3>
                  <button
                    onClick={() => setStep(1)}
                    style={{ fontSize: '0.84rem', color: 'var(--primary-terracotta)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <ArrowLeft size={14} /> Back to Address
                  </button>
                </div>

                {/* Payment Option Tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                  {/* UPI */}
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${paymentMethod === 'upi' ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                      background: paymentMethod === 'upi' ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <QrCode size={20} style={{ color: 'var(--primary-terracotta)' }} />
                        <strong>Instant UPI & QR Code (GPay, PhonePe, Paytm)</strong>
                      </div>
                      <span className="stitch-pill stitch-pill-sage" style={{ fontSize: '0.7rem' }}>Fast & Zero Fee</span>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                        <label className="form-label">Enter UPI ID (e.g. mobile@upi)</label>
                        <input
                          type="text"
                          placeholder="yourname@okaxis"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="form-input"
                          style={{ maxWidth: '300px' }}
                        />
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                          ⚡ A payment request notification will be sent to your UPI app.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cards */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${paymentMethod === 'card' ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                      background: paymentMethod === 'card' ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                      <CreditCard size={20} style={{ color: 'var(--primary-terracotta)' }} />
                      <strong>Credit / Debit Card (Visa, Mastercard, RuPay)</strong>
                    </div>
                    {paymentMethod === 'card' && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div className="form-group">
                          <label className="form-label">Card Number</label>
                          <input
                            type="text"
                            placeholder="4532 •••• •••• 8842"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="form-input"
                          />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                          <div className="form-group">
                            <label className="form-label">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              placeholder="12/28"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="form-input"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">CVV</label>
                            <input
                              type="password"
                              placeholder="•••"
                              maxLength="4"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="form-input"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${paymentMethod === 'cod' ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                      background: paymentMethod === 'cod' ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Banknote size={20} style={{ color: 'var(--primary-terracotta)' }} />
                      <div>
                        <strong>Cash on Delivery (Pay at Doorstep)</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Inspect your lovingly handmade package upon arrival.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Order Confirmation CTA */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '1.05rem',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 25px rgba(217,107,79,0.45)'
                  }}
                >
                  {isProcessing ? (
                    <span>Weaving your order in studio... 🧶</span>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Place Order • ₹{finalPayableTotal.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              Your Handcrafted Items
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '240px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '4px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', lineHeight: '1.3' }}>
                      {item.product.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} • {item.selectedColor}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-sage)', fontWeight: '600' }}>
                  <span>Coupon {appliedCoupon.code}</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Shipping ({shippingMethod === 'express' ? 'Express Air' : 'Standard'})</span>
                <span>{finalDeliveryCharge === 0 ? <strong style={{ color: 'var(--accent-sage)' }}>FREE</strong> : `₹${finalDeliveryCharge}`}</span>
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
                <span>Total Due</span>
                <span>₹{finalPayableTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-light)' }}>
              <ShieldCheck size={16} style={{ color: 'var(--accent-sage)' }} />
              <span>256-bit SSL encrypted & bank-grade safe checkout</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
