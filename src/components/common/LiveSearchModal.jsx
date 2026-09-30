import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/categories';

export const LiveSearchModal = ({ navigate }) => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  const POPULAR_SEARCHES = [
    'Sunflower Bouquet',
    'Chubby Panda',
    '50" Rose Blanket',
    'Thalposh',
    'Winter Muffler',
    'Car Charm',
    'Custom Initial',
    'Pink Whale'
  ];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.materials.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query))
        );
      })
    : [];

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    navigate('product', { id: product.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryId) => {
    setIsSearchOpen(false);
    navigate('shop', { category: categoryId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          padding: '1.75rem',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Search Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={20} style={{ position: 'absolute', left: '14px', color: 'var(--primary-terracotta)' }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search handcrafted bouquets, plushies, blankets, mufflers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '44px',
                paddingRight: searchTerm ? '36px' : '14px',
                fontSize: '1rem',
                borderRadius: 'var(--radius-full)'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-light)',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="btn-icon"
            style={{ width: '40px', height: '40px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
          {searchTerm.trim() ? (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
              }}>
                <span>
                  Found <strong>{filteredProducts.length}</strong> creations for "{searchTerm}"
                </span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('shop', { search: searchTerm });
                    }}
                    style={{ color: 'var(--primary-terracotta)', fontWeight: '600', fontSize: '0.82rem' }}
                  >
                    View in Shop Grid →
                  </button>
                )}
              </div>

              {filteredProducts.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-warm)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-warm)')}
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-terracotta)', fontWeight: '600', textTransform: 'uppercase' }}>
                          {p.categoryName}
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {p.materials}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                        {p.originalPrice && (
                          <div style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'var(--text-light)' }}>
                            ₹{p.originalPrice.toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧶</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                    No matching creations found
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    We couldn't find anything matching "{searchTerm}". Try browsing our popular categories or submitting a custom order!
                  </p>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('custom-order');
                    }}
                    className="btn btn-primary"
                    style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
                  >
                    Request Custom Order ✨
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Popular Searches */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-light)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
                  <span>Trending Craft Searches</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchTerm(item)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--bg-warm)',
                        color: 'var(--text-main)',
                        fontSize: '0.82rem',
                        fontWeight: '500',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-terracotta)';
                        e.currentTarget.style.color = 'var(--primary-terracotta)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.color = 'var(--text-main)';
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse Categories Chips */}
              <div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-light)',
                  marginBottom: '0.75rem'
                }}>
                  Explore by Category
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        padding: '0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-warm)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-warm)')}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div style={{ fontSize: '0.84rem', fontWeight: '600', color: 'var(--text-main)' }}>
                        {cat.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
