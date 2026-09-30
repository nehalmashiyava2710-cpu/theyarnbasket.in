import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';

export const Header = ({ currentRoute, navigate }) => {
  const { 
    openServiceModal, 
    directWhatsAppChat 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', route: 'home' },
    { name: 'Creations', route: 'shop', hasDropdown: true },
    { name: 'Reels 🌸', route: 'reels' },
    { name: 'Services', route: 'services' },
    { name: 'Custom Orders', route: 'custom-order' },
    { name: 'About', route: 'about' },
    { name: 'Contact', route: 'contact' }
  ];

  const handleNavClick = (route, params = null) => {
    navigate(route, params);
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: isScrolled ? 'rgba(250, 247, 242, 0.98)' : 'rgba(250, 247, 242, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(140, 88, 50, 0.12)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isScrolled ? '0 4px 20px rgba(46, 28, 20, 0.07)' : 'none'
        }}
      >
        <div className="container header-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: isScrolled ? '0.5rem' : '0.75rem',
          paddingBottom: isScrolled ? '0.5rem' : '0.75rem',
          transition: 'padding 0.3s ease',
          gap: '0.75rem'
        }}>
          {/* Left: Mobile Toggle + Official Brand Logo & Identity */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: 0,
            flexShrink: 1
          }}>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-icon d-mobile-only"
              aria-label="Toggle menu"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '6px',
                cursor: 'pointer',
                color: 'var(--text-main)',
                width: '36px',
                height: '36px',
                flexShrink: 0
              }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo & Atelier Title */}
            <div 
              onClick={() => handleNavClick('home')}
              style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.55rem',
                userSelect: 'none',
                minWidth: 0
              }}
            >
              <img
                src="/logo.png"
                alt="The Yarn Basket"
                className="header-brand-logo"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(140, 88, 50, 0.35)',
                  boxShadow: '0 3px 10px rgba(140, 88, 50, 0.16)',
                  background: '#FAF7F2',
                  flexShrink: 0,
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08) rotate(2deg)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span className="header-brand-title" style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.18rem',
                  fontWeight: '700',
                  letterSpacing: '0.01em',
                  color: 'var(--text-main)',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  The Yarn Basket
                </span>
                <span className="header-brand-sub" style={{
                  fontSize: '0.62rem',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  color: 'var(--primary-terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  whiteSpace: 'nowrap',
                  marginTop: '1px'
                }}>
                  HANDMADE WITH <span style={{ color: 'var(--primary-rose)' }}>♥</span> BY SALONI
                </span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav 
            className="d-desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;

              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.route}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                    onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick(item.route)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.88rem',
                        fontWeight: isActive ? '700' : '600',
                        color: isActive ? 'var(--primary-terracotta)' : 'var(--text-main)',
                        padding: '0.45rem 0.85rem',
                        borderRadius: 'var(--radius-xs)',
                        background: isActive ? 'var(--primary-rose-light)' : 'transparent',
                        border: isActive ? '1px solid rgba(200, 90, 50, 0.25)' : '1px solid transparent',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'var(--bg-warm)';
                          e.currentTarget.style.color = 'var(--primary-terracotta)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text-main)';
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={13} style={{ opacity: 0.7 }} />
                    </button>

                    {/* Dropdown Menu for Categories */}
                    {isCategoryDropdownOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 4px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '290px',
                          background: 'var(--bg-surface)',
                          borderRadius: 'var(--radius-sm)',
                          boxShadow: 'var(--shadow-lg)',
                          border: '1px solid var(--border-card)',
                          padding: '0.65rem',
                          zIndex: 200,
                          animation: 'fadeIn 0.2s ease-out'
                        }}
                      >
                        <div style={{
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--text-light)',
                          padding: '0.35rem 0.5rem',
                          borderBottom: '1px solid var(--border-subtle)',
                          marginBottom: '0.35rem'
                        }}>
                          Browse by Category
                        </div>
                        {CATEGORIES.map((cat) => (
                          <div
                            key={cat.id}
                            onClick={() => handleNavClick('shop', { category: cat.id })}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.65rem',
                              padding: '0.5rem',
                              borderRadius: 'var(--radius-xs)',
                              cursor: 'pointer',
                              transition: 'background 0.2s ease'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-warm)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            <img
                              src={cat.image}
                              alt={cat.name}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: 'var(--radius-xs)',
                                objectFit: 'cover'
                              }}
                            />
                            <div>
                              <div style={{ fontSize: '0.84rem', fontWeight: '600', color: 'var(--text-main)' }}>
                                {cat.name}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                {cat.itemCount} items
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: isActive ? '700' : '600',
                    color: isActive ? 'var(--primary-terracotta)' : 'var(--text-main)',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    background: isActive ? 'var(--primary-rose-light)' : 'transparent',
                    border: isActive ? '1px solid rgba(200, 90, 50, 0.25)' : '1px solid transparent',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--bg-warm)';
                      e.currentTarget.style.color = 'var(--primary-terracotta)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-main)';
                    }
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Right: Direct WhatsApp Order Action */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexShrink: 0
          }}>
            <button
              onClick={() => directWhatsAppChat('Hi Saloni ma\'am! I am visiting The Yarn Basket website and would like to inquire about handcrafted creations & custom orders.')}
              className="btn header-whatsapp-btn"
              style={{
                padding: '0.48rem 1rem',
                fontSize: '0.84rem',
                borderRadius: 'var(--radius-xs)',
                background: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: '700',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#20BA59';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#25D366';
                e.currentTarget.style.transform = 'none';
              }}
              title="Chat with Saloni on WhatsApp"
            >
              <WhatsAppIcon size={16} color="#FFFFFF" />
              <span className="header-whatsapp-label">WhatsApp Order</span>
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 991px) {
            .d-desktop-nav {
              display: none !important;
            }
            .d-mobile-only {
              display: inline-flex !important;
            }
          }
          @media (max-width: 540px) {
            .header-brand-logo {
              width: 36px !important;
              height: 36px !important;
            }
            .header-brand-title {
              font-size: 1.05rem !important;
            }
            .header-brand-sub {
              font-size: 0.55rem !important;
              letter-spacing: 0.04em !important;
            }
            .header-whatsapp-btn {
              padding: 0.42rem 0.75rem !important;
              font-size: 0.78rem !important;
            }
          }
          @media (max-width: 380px) {
            .header-brand-sub {
              display: none !important;
            }
            .header-whatsapp-label {
              display: none !important;
            }
            .header-whatsapp-btn {
              padding: 0.42rem !important;
              border-radius: 50% !important;
              width: 34px !important;
              height: 34px !important;
              justify-content: center !important;
            }
          }
        `}</style>
      </header>

      {/* Full-Screen Mobile Navigation Portal Drawer */}
      {isMobileMenuOpen && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'var(--bg-canvas)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          {/* Drawer Top Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1rem',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}>
            <div 
              onClick={() => handleNavClick('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer' }}
            >
              <img
                src="/logo.png"
                alt="The Yarn Basket"
                style={{ width: '38px', height: '38px', borderRadius: '50%', border: '2px solid rgba(140,88,50,0.35)' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.1 }}>
                  The Yarn Basket
                </span>
                <span style={{ fontSize: '0.62rem', fontWeight: '700', color: 'var(--primary-terracotta)', letterSpacing: '0.04em' }}>
                  ARTISANAL HANDMADE STUDIO
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-icon"
              aria-label="Close menu"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--bg-warm)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Items List */}
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  style={{
                    textAlign: 'left',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    background: isActive ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                    color: isActive ? 'var(--primary-terracotta)' : 'var(--text-main)',
                    fontWeight: isActive ? '700' : '600',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: `1px solid ${isActive ? 'rgba(200,90,50,0.25)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{item.name}</span>
                  <ArrowRight size={15} style={{ opacity: isActive ? 1 : 0.4 }} />
                </button>
              );
            })}
          </div>

          {/* Quick Direct Actions */}
          <div style={{ padding: '0 1rem 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <button
              onClick={() => {
                directWhatsAppChat();
                setIsMobileMenuOpen(false);
              }}
              className="btn"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.85rem',
                background: '#25D366',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xs)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.94rem',
                fontWeight: '700',
                boxShadow: '0 2px 10px rgba(37, 211, 102, 0.25)'
              }}
            >
              <WhatsAppIcon size={18} color="#FFFFFF" />
              <span>WhatsApp Artist Saloni</span>
            </button>

            <button
              onClick={() => {
                openServiceModal();
                setIsMobileMenuOpen(false);
              }}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.92rem', borderRadius: 'var(--radius-xs)' }}
            >
              <Phone size={16} />
              <span>Request Instant Callback ⚡</span>
            </button>
          </div>

          {/* Shop By Category Section */}
          <div style={{
            margin: '0 1rem 2.5rem 1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem'
          }}>
            <div style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Explore By Category
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleNavClick('shop', { category: c.id })}
                  style={{
                    padding: '0.65rem 0.75rem',
                    background: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-xs)',
                    textAlign: 'left',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    style={{ width: '22px', height: '22px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
