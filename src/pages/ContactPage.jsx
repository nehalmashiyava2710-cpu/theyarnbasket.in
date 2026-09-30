import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useStore } from '../context/StoreContext';

export const ContactPage = () => {
  const { showToast, openServiceModal, directWhatsAppChat } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const FAQS = [
    {
      q: 'How long does a handmade creation take to arrive?',
      a: 'Ready-to-ship items dispatch within 24–48 hours. Made-to-order creations (like 50" blankets or grand floral bouquets) take 3 to 6 crafting days before dispatch via tracked express courier (3–5 transit days pan-India).'
    },
    {
      q: 'How do I care for and wash my crochet & knitted items?',
      a: 'We recommend gentle spot cleaning or hand washing in cold water with mild shampoo or wool detergent. Reshape gently while damp and dry flat in shade. Avoid machine wringing or hot water.'
    },
    {
      q: 'Can I request custom flower colors or personalized name tags?',
      a: 'Absolutely! You can use our Custom Order Studio page or WhatsApp our studio directly. We love customizing bouquets, initial tags, and specific color palettes for weddings and anniversaries.'
    },
    {
      q: 'Do you offer bulk or wedding favor gifting?',
      a: 'Yes! We craft custom mini sunflower pouches, personalized keychains, and floral posies for bridal showers, corporate hampers, and festive Diwali gifting with special artisan pricing.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    setIsSent(true);
    showToast('Your message has reached our atelier! We will respond within 24 hours. 💌', 'success');
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
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="stitch-pill" style={{ marginBottom: '0.75rem', borderRadius: 'var(--radius-xs)' }}>
            <Mail size={13} /> We'd Love to Hear From You
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Connect with The Yarn Basket Studio
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Need craft advice, custom commission consultation, or urgent festive gifts? Connect with Saloni directly.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openServiceModal()}
              className="btn btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-xs)' }}
            >
              <Phone size={15} />
              <span>Request Instant Callback ⚡</span>
            </button>
            <button
              onClick={() => directWhatsAppChat()}
              className="btn"
              style={{ fontSize: '0.9rem', padding: '0.75rem 1.4rem', background: '#25D366', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-xs)', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700' }}
            >
              <WhatsAppIcon size={16} color="#FFFFFF" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          marginBottom: '5rem',
          alignItems: 'flex-start'
        }}>
          {/* Contact Details Column */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              Atelier Information
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Our makers are based in India, handcrafting with pure patience. Feel free to message or email us for prompt guidance.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', background: 'var(--primary-rose-light)', color: 'var(--primary-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: '700' }}>Email Us</div>
                  <a href="mailto:hello@theyarnbasket.in" style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                    hello@theyarnbasket.in
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', background: 'var(--accent-sage-light)', color: 'var(--accent-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: '700' }}>Call & WhatsApp</div>
                  <a href="tel:+919510666234" style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                    +91 95106 66234
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', background: 'var(--accent-gold-light)', color: '#B5851C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: '700' }}>Studio Hours</div>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                    Mon – Sat: 10:00 AM – 7:00 PM IST
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions (WhatsApp & Instagram) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ padding: '1.25rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <WhatsAppIcon size={24} color="#25D366" />
                  <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>Chat with Us on WhatsApp</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Get instant stock updates or share your custom order reference photos directly.
                </p>
                <a
                  href="https://wa.me/919510666234"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem', color: '#1B8A46', borderColor: '#25D366', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', borderRadius: 'var(--radius-xs)' }}
                >
                  <WhatsAppIcon size={16} color="#1B8A46" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--primary-rose-light)', borderRadius: 'var(--radius-xs)', border: '1px dashed var(--border-stitch)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)' }}>Follow Our Instagram</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Watch daily making reels, new drops, and behind-the-scenes craft stories at <strong>@theyarnbasket.in</strong>
                </p>
                <a
                  href="https://www.instagram.com/theyarnbasket.in?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-xs)' }}
                >
                  Visit @theyarnbasket.in 📸
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              Send an Atelier Note
            </h3>

            {isSent ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <CheckCircle2 size={44} style={{ color: 'var(--accent-sage)', marginBottom: '0.75rem' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Thank You, {name}!</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  We've received your note and will get back to you with all answers shortly.
                </p>
                <button onClick={() => setIsSent(false)} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Meera Iyer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 95106 66234"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-select"
                  >
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Order Tracking">Order Status & Tracking</option>
                    <option value="Custom Order Question">Custom Order Question</option>
                    <option value="Bulk Wedding / Corporate Gifting">Bulk Wedding / Corporate Gifting</option>
                    <option value="Care & Wash Guide">Care & Wash Guide</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message *</label>
                  <textarea
                    rows="4"
                    placeholder="How can our crochet studio assist you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-textarea"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', fontSize: '0.98rem', marginTop: '0.5rem' }}
                >
                  <Send size={16} />
                  <span>Send Message to Atelier</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="stitch-pill" style={{ marginBottom: '0.5rem' }}>
              <Sparkles size={12} /> Got Questions?
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-main)' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-card)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '1rem',
                      color: 'var(--text-main)',
                      background: isOpen ? 'var(--bg-warm)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s ease',
                        color: 'var(--primary-terracotta)'
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.7', background: 'var(--bg-surface)' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
