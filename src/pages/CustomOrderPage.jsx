import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Scissors, 
  Upload, 
  Calendar, 
  DollarSign, 
  Check, 
  Heart, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Send,
  Phone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomOrderPage = ({ navigate }) => {
  const { submitCustomRequest, currentUser, showToast } = useStore();

  const [itemType, setItemType] = useState('Custom Floral Bouquet');
  const [colorPalette, setColorPalette] = useState('Warm Terracotta & Mustard');
  const [yarnMaterial, setYarnMaterial] = useState('100% Milk Cotton Yarn');
  const [personalizedText, setPersonalizedText] = useState('');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹1,000 - ₹2,000');
  const [neededByDate, setNeededByDate] = useState('');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedReqId, setSubmittedReqId] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const ITEM_TYPES = [
    { name: 'Custom Floral Bouquet', desc: 'Everlasting wedding, birthday, or desk bouquets', icon: '💐' },
    { name: 'Pet Replica Amigurumi', desc: 'Hand-crocheted likeness of your beloved dog/cat', icon: '🐾' },
    { name: 'Personalized Blanket / Throw', desc: 'Custom size, rose patterns, and family initials', icon: '🧶' },
    { name: 'Custom Car / Bag Charm', desc: 'Initial keychains, evil eyes, and morpankh charms', icon: '✨' },
    { name: 'Traditional Thalposh & Pooja Decor', desc: 'Mandala geometries and festive color schemes', icon: '🪔' }
  ];

  const COLOR_PALETTES = [
    { name: 'Warm Terracotta & Mustard', colors: ['#D96B4F', '#F4A261', '#E5B448'] },
    { name: 'Botanical Sage & Ivory', colors: ['#7DA691', '#FDFBF7', '#81B29A'] },
    { name: 'Romantic Blush & Lilac', colors: ['#D98880', '#FBEAE8', '#A895BE'] },
    { name: 'Aegean Blue & Gold', colors: ['#0077B6', '#90E0EF', '#E5B448'] },
    { name: 'Custom Color Palette (Describe in Notes)', colors: ['#D96B4F', '#7DA691', '#A895BE'] }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      showToast('Please fill all required contact and specification fields', 'error');
      return;
    }

    const payload = {
      itemType,
      colorPalette,
      yarnMaterial,
      personalizedText,
      description,
      budget: budgetRange,
      neededBy: neededByDate || 'Within 2 weeks',
      customerName,
      customerPhone,
      customerEmail
    };

    const req = submitCustomRequest(payload);

    setSubmittedReqId(req.id);
    setSubmittedData(payload);
    setIsSubmitted(true);
    showToast(`Inquiry #${req.id} confirmed & copy sent to ${customerEmail}`, 'success', '📧');
  };

  const handleOpenEmailClient = () => {
    const subject = encodeURIComponent(`The Yarn Basket - Custom Request #${submittedReqId} Confirmation`);
    const body = encodeURIComponent(
      `Hello ${customerName},\n\nThank you for submitting your custom crochet inquiry with The Yarn Basket!\n\n` +
      `Request ID: #${submittedReqId}\n` +
      `Item: ${itemType}\n` +
      `Color Palette: ${colorPalette}\n` +
      `Estimated Budget: ${budgetRange}\n` +
      `Needed By: ${neededByDate || 'Flexible'}\n` +
      `Contact: ${customerPhone} / ${customerEmail}\n\n` +
      `Details:\n"${description}"\n\n` +
      `Artist Saloni is reviewing your specifications and will connect with you within 24 hours on WhatsApp!\n\n` +
      `Warm regards,\nThe Yarn Basket Studio`
    );
    window.open(`mailto:${customerEmail}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Banner */}
      <div style={{
        background: 'var(--bg-warm)',
        padding: '3.5rem 0 2rem 0',
        borderBottom: '1px solid var(--border-subtle)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <span className="stitch-pill" style={{ marginBottom: '0.75rem', borderRadius: 'var(--radius-xs)' }}>
            <Sparkles size={13} /> Bespoke Commission Studio
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Bespoke Custom Creations
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
            Have a special design, unique wedding palette, or personalized initial in mind? Tell Saloni and our atelier will stitch your vision to life.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem', maxWidth: '850px' }}>
        {isSubmitted ? (
          <div className="glass-card" style={{ padding: '3.5rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-xs)', border: '1.5px dashed var(--border-stitch)' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--accent-sage-light)',
              color: 'var(--accent-sage)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <CheckCircle2 size={38} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span className="stitch-pill stitch-pill-sage" style={{ borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}>
                Request ID: #{submittedReqId}
              </span>
              <span className="stitch-pill stitch-pill-gold" style={{ borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}>
                <Mail size={13} /> Email Dispatched
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Your Custom Request is Received!
            </h2>

            {/* Email Dispatch Confirmation Card */}
            <div style={{
              background: 'var(--bg-warm)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xs)',
              padding: '1.25rem 1.5rem',
              maxWidth: '560px',
              margin: '0 auto 1.5rem auto',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-terracotta)', fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                <Mail size={16} />
                <span>Confirmation Email Sent to:</span>
              </div>
              <div style={{ fontWeight: '800', fontSize: '1.02rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {customerEmail}
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                We have emailed you a formal copy of inquiry <strong>#{submittedReqId}</strong>. Artist Saloni will also connect directly on WhatsApp <strong>({customerPhone})</strong> within 24 hours.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('account')} className="btn btn-primary" style={{ borderRadius: 'var(--radius-xs)' }}>
                <span>View in My Account</span>
                <ArrowRight size={17} />
              </button>

              <button 
                onClick={handleOpenEmailClient}
                className="btn btn-secondary" 
                style={{ borderRadius: 'var(--radius-xs)', gap: '0.45rem' }}
                title="Send receipt or open email draft"
              >
                <Mail size={15} />
                <span>Open Email Copy</span>
              </button>

              <button onClick={() => navigate('shop')} className="btn" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)' }}>
                <span>Browse Ready Creations</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
            {/* Step 1: Item Type */}
            <div style={{ marginBottom: '2.25rem' }}>
              <label className="form-label" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                1. What kind of handcrafted piece would you like to create?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                {ITEM_TYPES.map((t) => {
                  const isSelected = itemType === t.name;
                  return (
                    <div
                      key={t.name}
                      onClick={() => setItemType(t.name)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-xs)',
                        border: `1.5px solid ${isSelected ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                        background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{t.icon}</div>
                      <div style={{ fontWeight: '700', fontSize: '0.92rem', color: isSelected ? 'var(--primary-terracotta)' : 'var(--text-main)', marginBottom: '0.2rem' }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {t.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Color Palette */}
            <div style={{ marginBottom: '2.25rem' }}>
              <label className="form-label" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                2. Preferred Color Palette
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                {COLOR_PALETTES.map((pal) => {
                  const isSelected = colorPalette === pal.name;
                  return (
                    <div
                      key={pal.name}
                      onClick={() => setColorPalette(pal.name)}
                      style={{
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-xs)',
                        border: `1.5px solid ${isSelected ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                        background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '0.5rem' }}>
                        {pal.colors.map((c, i) => (
                          <div
                            key={i}
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '50%',
                              background: c,
                              border: '1.5px solid rgba(0,0,0,0.1)'
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ fontWeight: '700', fontSize: '0.86rem', color: isSelected ? 'var(--primary-terracotta)' : 'var(--text-main)' }}>
                        {pal.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Specifics & Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.25rem' }}>
              <div className="form-group">
                <label className="form-label">3. Personalization & Inscription (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Laser-engraved initial 'S&R' or specific flower names"
                  value={personalizedText}
                  onChange={(e) => setPersonalizedText(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">4. Detailed Description of your Idea *</label>
                <textarea
                  rows="4"
                  placeholder="Describe dimensions, intended recipient, specific reference details, or any special requests..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-textarea"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Estimated Budget Range</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="form-select"
                  >
                    <option value="Under ₹1,000">Under ₹1,000</option>
                    <option value="₹1,000 - ₹2,500">₹1,000 - ₹2,500</option>
                    <option value="₹2,500 - ₹5,000">₹2,500 - ₹5,000</option>
                    <option value="₹5,000+ (Grand Heirloom Throws)">₹5,000+ (Grand Heirloom Throws)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Needed By Date (Optional)</label>
                  <input
                    type="date"
                    value={neededByDate}
                    onChange={(e) => setNeededByDate(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Contact Information */}
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
              <label className="form-label" style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>
                5. Your Contact Information (For Email Confirmation & WhatsApp Sketches)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    placeholder="Saloni / Ananya"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    placeholder="+91 95106 66234"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address (For Order Receipts & Updates) *</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', boxShadow: '0 8px 25px rgba(217,107,79,0.4)' }}
            >
              <Sparkles size={18} />
              <span>Submit Custom Order Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomOrderPage;
