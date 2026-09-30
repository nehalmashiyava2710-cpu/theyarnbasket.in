import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Flower2, 
  Gift, 
  Smile, 
  Home, 
  Scissors,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { SERVICES } from '../../data/services';

export const ServiceInquiryModal = () => {
  const { 
    isServiceModalOpen, 
    closeServiceModal, 
    serviceModalData, 
    requestInstantCallback, 
    directWhatsAppChat,
    currentUser 
  } = useStore();

  const [activeTab, setActiveTab] = useState('callback'); // 'callback' | 'whatsapp'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('custom-bouquets');
  const [preferredTime, setPreferredTime] = useState('Within 15 minutes (Instant ⚡)');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (serviceModalData) {
      if (serviceModalData.id) {
        setSelectedServiceId(serviceModalData.id);
      } else if (serviceModalData.serviceId) {
        setSelectedServiceId(serviceModalData.serviceId);
      }
      if (serviceModalData.presetMode) {
        setActiveTab(serviceModalData.presetMode);
      }
      if (serviceModalData.note) {
        setNote(serviceModalData.note);
      }
    }
    if (currentUser) {
      if (!name) setName(currentUser.name || '');
      if (!phone) setPhone(currentUser.phone || '');
    }
  }, [serviceModalData, currentUser, isServiceModalOpen]);

  if (!isServiceModalOpen) return null;

  const currentService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  const timeOptions = [
    'Within 15 minutes (Instant ⚡)',
    'Today Evening (4:00 PM - 7:30 PM)',
    'Tomorrow Morning (10:00 AM - 1:00 PM)',
    'Tomorrow Afternoon (2:00 PM - 6:00 PM)',
    'Only WhatsApp Chat (No Calls)'
  ];

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim() || phone.trim().length < 8) {
      alert('Please enter a valid mobile number for Saloni to call you back.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      requestInstantCallback({
        name: name.trim() || 'Visitor',
        phone: phone.trim(),
        serviceName: currentService?.title || 'Custom Service',
        serviceId: selectedServiceId,
        preferredTime,
        note: note.trim()
      });
      setIsSubmitting(false);
    }, 400);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const serviceName = currentService?.title || 'Custom Handmade Craft Service';
    let text = `Hi Saloni ma'am! 🌸\n\n`;
    text += `I visited The Yarn Basket website and would like to inquire about:\n*Service:* ${serviceName}\n`;
    if (name.trim()) text += `*My Name:* ${name.trim()}\n`;
    if (phone.trim()) text += `*Phone / Contact:* ${phone.trim()}\n`;
    if (preferredTime) text += `*Preferred Contact Time:* ${preferredTime}\n`;
    if (note.trim()) text += `*Details / Specific Request:* ${note.trim()}\n`;
    text += `\nCould you please share pricing estimate, customization options, and current slot availability? Thank you!`;

    directWhatsAppChat(text);
    closeServiceModal();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(25, 20, 18, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeServiceModal();
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-card)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Top Header */}
        <div style={{
          padding: '1.5rem 1.75rem 1.25rem 1.75rem',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative',
          background: 'var(--bg-warm)'
        }}>
          <button
            onClick={closeServiceModal}
            className="btn-icon"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xs)'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="stitch-pill stitch-pill-sage" style={{ fontSize: '0.78rem', borderRadius: 'var(--radius-xs)' }}>
              <Sparkles size={12} /> Direct Studio Connect
            </span>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              • Free Consultation
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            color: 'var(--text-main)',
            lineHeight: 1.25,
            margin: 0
          }}>
            Connect with Saloni Ma’am
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.35rem', marginBottom: 0 }}>
            Inquire about custom craft commissions, bulk hampers, workshops, or request an instant callback.
          </p>
        </div>

        {/* Tab Switcher: Instant Callback vs WhatsApp Chat */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          padding: '0.75rem 1.75rem 0.5rem 1.75rem',
          gap: '0.5rem',
          background: 'var(--bg-warm-tint)'
        }}>
          <button
            onClick={() => setActiveTab('callback')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.7rem 0.85rem',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'callback' ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
              background: activeTab === 'callback' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'callback' ? 'var(--primary-terracotta)' : 'var(--text-muted)',
              fontWeight: activeTab === 'callback' ? '700' : '500',
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'callback' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Phone size={16} />
            <span>Instant Callback ⚡</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.7rem 0.85rem',
              borderRadius: 'var(--radius-xs)',
              border: activeTab === 'whatsapp' ? '2px solid #25D366' : '1px solid var(--border-subtle)',
              background: activeTab === 'whatsapp' ? 'var(--bg-surface)' : 'transparent',
              color: activeTab === 'whatsapp' ? '#128C7E' : 'var(--text-muted)',
              fontWeight: activeTab === 'whatsapp' ? '700' : '500',
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'whatsapp' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <MessageCircle size={16} />
            <span>Direct WhatsApp 💬</span>
          </button>
        </div>

        {/* Modal Body Form */}
        <form
          onSubmit={activeTab === 'callback' ? handleCallbackSubmit : handleWhatsAppSubmit}
          style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Service Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Select Craft Service / Inquiry Type:
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="input-field"
              style={{ width: '100%', fontSize: '0.88rem', fontWeight: '600', borderRadius: 'var(--radius-xs)' }}
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.startingPrice})
                </option>
              ))}
              <option value="other-custom">Other Custom Crochet Inquiry / Quote</option>
            </select>
          </div>

          {/* Contact Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Your Full Name:
              </label>
              <input
                type="text"
                placeholder="e.g. Pooja Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                style={{ width: '100%', fontSize: '0.88rem', borderRadius: 'var(--radius-xs)' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Mobile / WhatsApp Number: <span style={{ color: 'var(--primary-terracotta)' }}>*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. +91 95106 66234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
                style={{ width: '100%', fontSize: '0.88rem', borderRadius: 'var(--radius-xs)' }}
                required
              />
            </div>
          </div>

          {/* Preferred Callback Time (Especially for Callback Tab) */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Preferred Time for Saloni to Connect:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {timeOptions.map((opt, i) => {
                const isSelected = preferredTime === opt;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPreferredTime(opt)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-xs)',
                      border: isSelected ? '1.5px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-warm)',
                      color: isSelected ? 'var(--primary-terracotta)' : 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontWeight: isSelected ? '700' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details & Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Project Notes / Color Palette / Event Date (Optional):
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Need 15 pieces in pastel lilac for wedding favors by 20th November..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-field"
              style={{ width: '100%', fontSize: '0.86rem', resize: 'vertical', borderRadius: 'var(--radius-xs)' }}
            />
          </div>

          {/* Reassurance Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.75rem',
            background: 'var(--bg-warm)',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}>
            <ShieldCheck size={18} style={{ color: 'var(--accent-sage)', flexShrink: 0 }} />
            <span>
              Direct personalized response from artist <strong>Saloni</strong>. Zero spam or bots. Free design consultation.
            </span>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            {activeTab === 'callback' ? (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.85rem 1.25rem', fontSize: '0.94rem', borderRadius: 'var(--radius-xs)' }}
              >
                <Phone size={16} />
                <span>{isSubmitting ? 'Scheduling Request...' : '⚡ Request Instant Callback'}</span>
              </button>
            ) : (
              <button
                type="submit"
                className="btn"
                style={{
                  flex: 1,
                  padding: '0.85rem 1.25rem',
                  fontSize: '0.94rem',
                  background: '#25D366',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                <MessageCircle size={16} />
                <span>💬 Open WhatsApp Chat Now</span>
              </button>
            )}

            <button
              type="button"
              onClick={closeServiceModal}
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.2rem', fontSize: '0.9rem', borderRadius: 'var(--radius-xs)' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
