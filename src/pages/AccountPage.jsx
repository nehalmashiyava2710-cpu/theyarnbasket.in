import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Sparkles, 
  LogOut, 
  Truck, 
  Edit3, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage = ({ navigate }) => {
  const { 
    currentUser, 
    logoutUser, 
    openAuthModal, 
    orders, 
    addresses, 
    addAddress, 
    deleteAddress, 
    setDefaultAddress, 
    customRequests, 
    updateProfile, 
    setTrackingOrder,
    addToCart,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses' | 'custom'

  // Profile Edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileBio, setProfileBio] = useState(currentUser?.bio || '');

  // Add Address Form modal/state
  const [isAddingAddr, setIsAddingAddr] = useState(false);
  const [addrName, setAddrName] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPincode, setAddrPincode] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrType, setAddrType] = useState('Home');

  if (!currentUser) {
    return (
      <div style={{ background: 'var(--bg-canvas)', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
        <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '3.5rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--primary-rose-light)',
            color: 'var(--primary-terracotta)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            <User size={30} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Sign In to Your Studio Account
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '2rem' }}>
            Access your orders, track real-time craft progress, manage saved delivery addresses, and view your custom commission requests.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => openAuthModal('login')} className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
              <span>Sign In</span>
            </button>
            <button onClick={() => openAuthModal('signup')} className="btn btn-secondary" style={{ padding: '0.85rem 2rem' }}>
              <span>Create Account</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone,
      bio: profileBio
    });
    setIsEditingProfile(false);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addrStreet || !addrCity || !addrPincode) {
      showToast('Please fill all required address fields', 'error');
      return;
    }
    addAddress({
      name: addrName || currentUser.name,
      street: addrStreet,
      city: addrCity,
      state: addrState,
      pincode: addrPincode,
      phone: addrPhone || currentUser.phone,
      type: addrType,
      isDefault: addresses.length === 0
    });
    setIsAddingAddr(false);
    setAddrStreet('');
    setAddrCity('');
    setAddrState('');
    setAddrPincode('');
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity, {
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      });
    });
    showToast(`Items from Order #${order.id} added to cart!`, 'success');
    navigate('cart');
  };

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Account Profile Header */}
      <div style={{
        background: 'var(--bg-warm)',
        padding: '3rem 0 2rem 0',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: 'var(--radius-xs)',
                  objectFit: 'cover',
                  border: '2px solid var(--border-card)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              />
              <div>
                <span className="stitch-pill" style={{ marginBottom: '0.35rem', fontSize: '0.72rem' }}>
                  <Sparkles size={11} /> Atelier Patron Member
                </span>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-main)', margin: 0 }}>
                  {currentUser.name}
                </h1>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {currentUser.email} • {currentUser.phone}
                </div>
              </div>
            </div>

            <button
              onClick={logoutUser}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.55rem 1.15rem' }}
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }} className="account-grid">
          {/* Navigation Sidebar */}
          <aside className="glass-card" style={{
            padding: '1rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border-card)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <button
                onClick={() => setActiveTab('orders')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  background: activeTab === 'orders' ? 'var(--primary-rose-light)' : 'transparent',
                  color: activeTab === 'orders' ? 'var(--primary-terracotta)' : 'var(--text-main)',
                  fontWeight: activeTab === 'orders' ? '700' : '500',
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                <Package size={18} />
                <span>My Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('custom')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  background: activeTab === 'custom' ? 'var(--primary-rose-light)' : 'transparent',
                  color: activeTab === 'custom' ? 'var(--primary-terracotta)' : 'var(--text-main)',
                  fontWeight: activeTab === 'custom' ? '700' : '500',
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                <Palette size={18} />
                <span>Custom Requests ({customRequests.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  background: activeTab === 'addresses' ? 'var(--primary-rose-light)' : 'transparent',
                  color: activeTab === 'addresses' ? 'var(--primary-terracotta)' : 'var(--text-main)',
                  fontWeight: activeTab === 'addresses' ? '700' : '500',
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                <MapPin size={18} />
                <span>Saved Addresses ({addresses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  background: activeTab === 'profile' ? 'var(--primary-rose-light)' : 'transparent',
                  color: activeTab === 'profile' ? 'var(--primary-terracotta)' : 'var(--text-main)',
                  fontWeight: activeTab === 'profile' ? '700' : '500',
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                <User size={18} />
                <span>Profile Details</span>
              </button>

              <button
                onClick={() => navigate('wishlist')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-muted)',
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                <Heart size={18} />
                <span>Wishlist Shortcut</span>
              </button>
            </div>
          </aside>

          {/* Main Tab Content */}
          <div>
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                  My Craft Orders
                </h2>

                {orders.length === 0 ? (
                  <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-xs)' }}>
                    <Package size={40} style={{ color: 'var(--text-light)', marginBottom: '0.75rem' }} />
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No orders placed yet.</p>
                    <button onClick={() => navigate('shop')} className="btn btn-primary">
                      Shop Handmade Collection
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="glass-card"
                        style={{
                          padding: '1.75rem',
                          borderRadius: 'var(--radius-xs)',
                          border: '1px solid var(--border-card)'
                        }}
                      >
                        {/* Order Header */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          paddingBottom: '1rem',
                          borderBottom: '1px solid var(--border-subtle)',
                          marginBottom: '1.25rem'
                        }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                                Order #{order.id}
                              </h3>
                              <span className="stitch-pill stitch-pill-sage" style={{ fontSize: '0.72rem' }}>
                                {order.status}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                              Placed on {order.date} • Paid via {order.paymentMethod.split(' ')[0]}
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => setTrackingOrder(order)}
                              className="btn btn-primary"
                              style={{ padding: '0.5rem 1.15rem', fontSize: '0.84rem' }}
                            >
                              <Truck size={15} />
                              <span>Track Live Status</span>
                            </button>
                            <button
                              onClick={() => handleReorder(order)}
                              className="btn btn-secondary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.84rem' }}
                            >
                              <ShoppingBag size={15} />
                              <span>Reorder</span>
                            </button>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  style={{ width: '54px', height: '54px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }}
                                />
                                <div>
                                  <div style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-main)' }}>
                                    {item.product.name}
                                  </div>
                                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                    Qty: {item.quantity} • Color: {item.selectedColor}
                                  </div>
                                </div>
                              </div>
                              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                                ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid var(--border-subtle)',
                          fontSize: '0.88rem',
                          color: 'var(--text-muted)'
                        }}>
                          <div>
                            Est. Delivery: <strong style={{ color: 'var(--text-main)' }}>{order.estimatedDelivery}</strong>
                          </div>
                          <div>
                            Total Paid: <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>₹{order.total.toLocaleString('en-IN')}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Custom Requests Tab */}
            {activeTab === 'custom' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-main)', margin: 0 }}>
                    Bespoke Custom Requests
                  </h2>
                  <button
                    onClick={() => navigate('custom-order')}
                    className="btn btn-primary"
                    style={{ fontSize: '0.85rem', padding: '0.55rem 1.15rem' }}
                  >
                    <Plus size={15} />
                    <span>New Custom Request</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {customRequests.map((req) => (
                    <div
                      key={req.id}
                      className="glass-card"
                      style={{ padding: '1.5rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                              {req.itemType}
                            </span>
                            <span className="stitch-pill" style={{ fontSize: '0.72rem' }}>
                              #{req.id}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Submitted on {req.date} • Needed by: {req.neededBy}
                          </div>
                        </div>

                        <span className="stitch-pill stitch-pill-gold" style={{ fontSize: '0.78rem' }}>
                          <Clock size={12} /> {req.status}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
                        {req.description}
                      </p>

                      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.84rem', color: 'var(--text-main)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', flexWrap: 'wrap' }}>
                        <span>Color Palette: <strong>{req.colorPalette}</strong></span>
                        <span>Estimated Budget: <strong>{req.budget}</strong></span>
                        <span>✉️ Confirmation sent to: <strong>{req.customerEmail || currentUser?.email || 'Registered Email'}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-main)', margin: 0 }}>
                    Saved Delivery Addresses
                  </h2>
                  <button
                    onClick={() => setIsAddingAddr(!isAddingAddr)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.85rem', padding: '0.55rem 1.15rem' }}
                  >
                    <Plus size={15} />
                    <span>Add New Address</span>
                  </button>
                </div>

                {isAddingAddr && (
                  <form onSubmit={handleSaveAddress} className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xs)', marginBottom: '1.5rem', border: '1px solid var(--border-stitch)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>New Address Details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" placeholder="Name" value={addrName} onChange={(e) => setAddrName(e.target.value)} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Street Address *</label>
                        <input type="text" placeholder="Street / House No" value={addrStreet} onChange={(e) => setAddrStreet(e.target.value)} className="form-input" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">City *</label>
                        <input type="text" placeholder="City" value={addrCity} onChange={(e) => setAddrCity(e.target.value)} className="form-input" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">State *</label>
                        <input type="text" placeholder="State" value={addrState} onChange={(e) => setAddrState(e.target.value)} className="form-input" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">PIN Code *</label>
                        <input type="text" placeholder="PIN Code" value={addrPincode} onChange={(e) => setAddrPincode(e.target.value)} className="form-input" required />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button type="submit" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>Save Address</button>
                      <button type="button" onClick={() => setIsAddingAddr(false)} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="glass-card"
                      style={{
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-xs)',
                        border: `1.5px solid ${addr.isDefault ? 'var(--primary-terracotta)' : 'var(--border-card)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span className="stitch-pill" style={{ fontSize: '0.72rem' }}>{addr.type}</span>
                          {addr.isDefault && (
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-terracotta)' }}>Default</span>
                          )}
                        </div>
                        <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                          {addr.name}
                        </h4>
                        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '0.5rem' }}>
                          {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                          Phone: {addr.phone}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            style={{ fontSize: '0.78rem', color: 'var(--primary-terracotta)', fontWeight: '600' }}
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          style={{ fontSize: '0.78rem', color: '#D9534F', fontWeight: '600', marginLeft: 'auto' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                  Profile Information
                </h2>

                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '500px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email (Read Only)</label>
                    <input
                      type="email"
                      value={currentUser.email}
                      disabled
                      className="form-input"
                      style={{ background: 'var(--bg-warm)', opacity: 0.7 }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Craft Bio / Preferences</label>
                    <textarea
                      rows="3"
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 1.75rem' }}>
                    Save Profile Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .account-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
