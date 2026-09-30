import React from 'react';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  Phone,
  ArrowRight,
  Gift,
  Package
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';

export const Footer = ({ navigate }) => {
  const { directWhatsAppChat, openServiceModal } = useStore();

  return (
    <footer className="footer-wrap">
      {/* Top Decorative Stitch Accent */}
      <div style={{ height: '3px', background: 'var(--primary-terracotta)' }} />

      {/* 1. 4 QUALITY & TRUST PILLARS BAR */}
      <div className="footer-trust-bar">
        <div className="container">
          <div className="footer-trust-grid">
            <div className="footer-trust-card">
              <div className="footer-trust-icon-box" style={{ background: 'var(--primary-rose-light)', color: 'var(--primary-terracotta)' }}>
                <Heart size={18} />
              </div>
              <div>
                <div className="footer-trust-h">100% Handcrafted</div>
                <div className="footer-trust-p">Made stitch-by-stitch with love</div>
              </div>
            </div>

            <div className="footer-trust-card">
              <div className="footer-trust-icon-box" style={{ background: 'var(--accent-sage-light)', color: 'var(--accent-sage)' }}>
                <Leaf size={18} />
              </div>
              <div>
                <div className="footer-trust-h">Skin-Safe Yarns</div>
                <div className="footer-trust-p">Pure milk cotton & baby wool</div>
              </div>
            </div>

            <div className="footer-trust-card">
              <div className="footer-trust-icon-box" style={{ background: 'var(--accent-gold-light)', color: '#8C5832' }}>
                <Truck size={18} />
              </div>
              <div>
                <div className="footer-trust-h">Pan-India Delivery</div>
                <div className="footer-trust-p">Sturdy gift box packaging</div>
              </div>
            </div>

            <div className="footer-trust-card">
              <div className="footer-trust-icon-box" style={{ background: 'var(--primary-rose-light)', color: 'var(--primary-terracotta)' }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="footer-trust-h">Verified Studio</div>
                <div className="footer-trust-p">Direct WhatsApp artist support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER DIRECTORY */}
      <div className="container footer-main-container">
        <div className="footer-columns-grid">
          {/* Column 1: Brand Bio & Direct Social Actions */}
          <div className="footer-col-brand">
            <div 
              onClick={() => {
                navigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="footer-brand-header"
            >
              <img
                src="/logo.png"
                alt="The Yarn Basket Logo"
                className="footer-brand-logo-img"
              />
              <div>
                <span className="footer-brand-title-text">
                  The Yarn Basket
                </span>
                <span className="footer-brand-subtitle-text">
                  HANDMADE WITH ♥ BY ARTIST SALONI
                </span>
              </div>
            </div>

            <p className="footer-brand-bio">
              Weaving everlasting crochet flower bouquets, cuddly bespoke plushies, and heirloom knitwear with pure slow-craft magic.
            </p>

            {/* Symmetrical Social & Direct Contact Action Chips */}
            <div className="footer-social-chips-row">
              <a 
                href="https://www.instagram.com/theyarnbasket.in" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-action-chip"
                title="Instagram @theyarnbasket.in"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <span>Instagram</span>
              </a>

              <button
                onClick={() => directWhatsAppChat("Hi Saloni ma'am! 🌸 I am reaching out from your website footer.")}
                className="footer-action-chip footer-action-wa"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon size={14} color="#128C7E" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={openServiceModal}
                className="footer-action-chip"
                title="Request Instant Callback"
              >
                <Phone size={13} style={{ color: 'var(--primary-terracotta)' }} />
                <span>Call Us</span>
              </button>
            </div>
          </div>

          {/* Column 2: Popular Collections */}
          <div className="footer-col-nav">
            <h4 className="footer-col-heading">
              Popular Crafts
            </h4>
            <ul className="footer-nav-list">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      navigate('shop', { category: cat.id });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="footer-nav-item"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    navigate('custom-order');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="footer-nav-item footer-nav-item-highlight"
                >
                  ✨ Custom Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio & Services */}
          <div className="footer-col-nav">
            <h4 className="footer-col-heading">
              Studio & Help
            </h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => { navigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-nav-item">
                  🌸 Studio Services
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('reels'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-nav-item">
                  🎬 Craft Video Reels
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-nav-item">
                  Our Artisan Story
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('wishlist'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-nav-item">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-nav-item">
                  Contact Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Orders & Care */}
          <div className="footer-col-nav d-mobile-hidden">
            <h4 className="footer-col-heading">
              Orders & Care
            </h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => { navigate('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-nav-item">
                  📦 All Handcrafted Pieces
                </button>
              </li>
              <li>
                <button onClick={() => { directWhatsAppChat("Hi Saloni ma'am! 🌸 How do I care for and wash my crochet creations?"); }} className="footer-nav-item">
                  🧼 Yarn Care Instructions
                </button>
              </li>
              <li>
                <button onClick={() => { directWhatsAppChat("Hi Saloni ma'am! 🌸 I would like to inquire about corporate gifting / bulk orders."); }} className="footer-nav-item">
                  🎁 Bulk & Corporate Gifting
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('custom-order'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-nav-item">
                  ✨ Bespoke Commission
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. BOTTOM COPYRIGHT & TRUST CHIPS (Centered, Clean, Safe Bottom Nav Padding) */}
        <div className="footer-bottom-bar-wrap">
          <div className="footer-copyright-line">
            © {new Date().getFullYear()} The Yarn Basket • Made with <Heart size={12} fill="var(--primary-terracotta)" style={{ color: 'var(--primary-terracotta)', display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> by Saloni
          </div>
          <div className="footer-trust-chips-row">
            <span className="footer-trust-chip">✨ 100% Slow Craft</span>
            <span className="footer-trust-chip">🌿 Eco Packaging</span>
            <span className="footer-trust-chip">🚚 Pan-India Delivery</span>
          </div>
        </div>
      </div>

      {/* High-End Styling */}
      <style>{`
        .footer-wrap {
          background: #FAF7F2;
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        /* 1. Trust Pillars Bar */
        .footer-trust-bar {
          background: #F4EDE2;
          border-bottom: 1px solid rgba(140, 88, 50, 0.12);
          padding: 1.25rem 0;
        }

        .footer-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .footer-trust-card {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .footer-trust-icon-box {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .footer-trust-h {
          font-weight: 700;
          font-size: 0.84rem;
          color: var(--text-main);
          line-height: 1.2;
        }

        .footer-trust-p {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* 2. Main Footer Directory */
        .footer-main-container {
          padding-top: 2.5rem;
          padding-bottom: calc(85px + env(safe-area-inset-bottom, 0px));
        }

        .footer-columns-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 2.25rem;
          align-items: flex-start;
        }

        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.75rem;
          cursor: pointer;
          user-select: none;
        }

        .footer-brand-logo-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(200, 90, 50, 0.35);
          background: #FAF7F2;
          box-shadow: 0 2px 8px rgba(140,88,50,0.12);
        }

        .footer-brand-title-text {
          font-family: var(--font-serif);
          font-size: 1.22rem;
          font-weight: 700;
          color: var(--text-main);
          display: block;
          line-height: 1.15;
        }

        .footer-brand-subtitle-text {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--primary-terracotta);
          display: block;
        }

        .footer-brand-bio {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.1rem;
          max-width: 320px;
        }

        .footer-social-chips-row {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .footer-action-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0.42rem 0.75rem;
          border-radius: var(--radius-xs);
          background: #F4EDE2;
          color: var(--text-main);
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid rgba(140, 88, 50, 0.15);
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .footer-action-chip:hover {
          background: var(--primary-rose-light);
          color: var(--primary-terracotta);
          border-color: var(--primary-terracotta);
        }

        .footer-action-wa {
          background: #EAF8EE;
          color: #128C7E;
          border-color: rgba(37, 211, 102, 0.3);
        }

        .footer-action-wa:hover {
          background: #25D366;
          color: #FFFFFF;
          border-color: #25D366;
        }

        .footer-col-heading {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.85rem;
          letter-spacing: 0.01em;
        }

        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 0;
          margin: 0;
        }

        .footer-nav-item {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.84rem;
          color: var(--text-muted);
          cursor: pointer;
          text-align: left;
          transition: color 0.2s ease;
          font-weight: 500;
        }

        .footer-nav-item:hover {
          color: var(--primary-terracotta);
        }

        .footer-nav-item-highlight {
          color: var(--primary-terracotta);
          font-weight: 700;
        }

        /* 3. Bottom Copyright & Trust Chips Bar */
        .footer-bottom-bar-wrap {
          margin-top: 2rem;
          padding-top: 1.15rem;
          border-top: 1px solid rgba(140, 88, 50, 0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .footer-copyright-line {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .footer-trust-chips-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .footer-trust-chip {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
          background: rgba(140, 88, 50, 0.07);
          padding: 0.22rem 0.55rem;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(140, 88, 50, 0.12);
          display: inline-flex;
          align-items: center;
          gap: 3px;
          white-space: nowrap;
        }

        /* Mobile Viewport Refinements */
        @media (max-width: 900px) {
          .footer-columns-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.75rem !important;
          }

          .footer-col-brand {
            grid-column: span 2;
          }

          .footer-trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
        }

        @media (max-width: 580px) {
          .footer-trust-bar {
            padding: 1.1rem 0 !important;
            background: #FAF7F2 !important;
            border-bottom: 1px solid rgba(140, 88, 50, 0.1) !important;
          }

          .footer-trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem !important;
          }

          .footer-trust-card {
            background: var(--bg-surface) !important;
            padding: 0.65rem 0.75rem !important;
            border-radius: var(--radius-xs) !important;
            border: 1px solid rgba(140, 88, 50, 0.1) !important;
            box-shadow: 0 1px 4px rgba(46, 28, 20, 0.03) !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.6rem !important;
          }

          .footer-trust-icon-box {
            width: 32px !important;
            height: 32px !important;
            border-radius: var(--radius-xs) !important;
            flex-shrink: 0 !important;
          }

          .footer-trust-icon-box svg {
            width: 15px !important;
            height: 15px !important;
          }

          .footer-trust-h {
            font-size: 0.76rem !important;
            font-weight: 700 !important;
            color: var(--text-main) !important;
            line-height: 1.15 !important;
          }

          .footer-trust-p {
            font-size: 0.64rem !important;
            color: var(--text-muted) !important;
            margin-top: 2px !important;
            line-height: 1.25 !important;
          }

          .footer-main-container {
            padding-top: 2rem !important;
            padding-bottom: calc(90px + env(safe-area-inset-bottom, 0px)) !important;
          }

          .footer-columns-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem 1.25rem !important;
          }

          .footer-col-brand {
            grid-column: span 2;
            margin-bottom: 0.5rem !important;
          }

          .footer-brand-header {
            gap: 0.75rem !important;
            margin-bottom: 0.85rem !important;
          }

          .footer-brand-logo-img {
            width: 42px !important;
            height: 42px !important;
          }

          .footer-brand-title-text {
            font-size: 1.18rem !important;
          }

          .footer-brand-bio {
            font-size: 0.84rem !important;
            line-height: 1.6 !important;
            margin-bottom: 1.15rem !important;
            max-width: 100% !important;
          }

          .footer-social-chips-row {
            gap: 0.5rem !important;
            margin-bottom: 0.5rem !important;
          }

          .footer-action-chip {
            padding: 0.42rem 0.8rem !important;
            font-size: 0.78rem !important;
            gap: 6px !important;
          }

          .footer-col-heading {
            font-size: 1.02rem !important;
            margin-bottom: 0.85rem !important;
          }

          .footer-nav-list {
            gap: 0.65rem !important;
          }

          .footer-nav-item {
            font-size: 0.86rem !important;
            line-height: 1.35 !important;
          }

          /* Centered & Perfectly Balanced Mobile Bottom Bar */
          .footer-bottom-bar-wrap {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 0.85rem !important;
            margin-top: 2.25rem !important;
            padding-top: 1.25rem !important;
          }

          .footer-copyright-line {
            text-align: center !important;
            font-size: 0.78rem !important;
            line-height: 1.4 !important;
          }

          .footer-trust-chips-row {
            justify-content: center !important;
            gap: 0.45rem !important;
          }

          .footer-trust-chip {
            font-size: 0.68rem !important;
            padding: 0.22rem 0.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
