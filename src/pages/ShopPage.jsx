import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  X, 
  SlidersHorizontal, 
  Grid3X3, 
  LayoutList, 
  Sparkles, 
  RotateCcw,
  ArrowUpDown,
  Check
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';

export const ShopPage = ({ navigate, initialCategory = null, initialSearch = '' }) => {
  const { products } = useStore();

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all'); // 'all' | 'in-stock' | 'made-to-order'
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available Filter Colors
  const colorOptions = [
    { id: 'all', label: 'All Colors', hex: 'transparent' },
    { id: 'gold', label: 'Warm Gold / Yellow', hex: '#F4A261' },
    { id: 'rose', label: 'Pastel Rose / Pink', hex: '#E8A598' },
    { id: 'sage', label: 'Sage Green', hex: '#6B9080' },
    { id: 'cream', label: 'Cream / Ivory', hex: '#FAF7F2' },
    { id: 'terracotta', label: 'Terracotta Rust', hex: '#C86D51' },
    { id: 'lilac', label: 'Lilac / Purple', hex: '#C5A3CF' }
  ];

  // Materials list
  const materials = [
    { id: 'all', label: 'All Materials' },
    { id: 'cotton', label: 'Milk Cotton Yarn' },
    { id: 'wool', label: 'Organic Merino Wool' },
    { id: 'mercerized', label: 'Mercerized Cotton Thread' }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.materials.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matches) return false;
      }

      // Price filter
      if (p.price > maxPrice) {
        return false;
      }

      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = (p.availableColors || []).some((c) => {
          const colorName = (typeof c === 'string' ? c : c.name).toLowerCase();
          if (selectedColor === 'gold') return colorName.includes('gold') || colorName.includes('yellow') || colorName.includes('sunshine') || colorName.includes('ochre');
          if (selectedColor === 'rose') return colorName.includes('rose') || colorName.includes('pink') || colorName.includes('blush') || colorName.includes('petal');
          if (selectedColor === 'sage') return colorName.includes('sage') || colorName.includes('green') || colorName.includes('olive') || colorName.includes('forest');
          if (selectedColor === 'cream') return colorName.includes('cream') || colorName.includes('ivory') || colorName.includes('white') || colorName.includes('vanilla') || colorName.includes('oatmeal');
          if (selectedColor === 'terracotta') return colorName.includes('terracotta') || colorName.includes('rust') || colorName.includes('caramel') || colorName.includes('brown');
          if (selectedColor === 'lilac') return colorName.includes('lilac') || colorName.includes('purple') || colorName.includes('lavender');
          return false;
        });
        if (!hasColor) return false;
      }

      // Material filter
      if (selectedMaterial !== 'all') {
        if (selectedMaterial === 'cotton' && !p.materials.toLowerCase().includes('cotton')) return false;
        if (selectedMaterial === 'wool' && !p.materials.toLowerCase().includes('wool')) return false;
        if (selectedMaterial === 'mercerized' && !p.materials.toLowerCase().includes('mercerized')) return false;
      }

      // Availability filter
      if (selectedAvailability === 'in-stock' && !p.inStock) return false;
      if (selectedAvailability === 'made-to-order' && !p.leadTimeDays?.toLowerCase().includes('order')) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, maxPrice, selectedColor, selectedMaterial, selectedAvailability, sortBy]);

  const activeFilterCount = [
    selectedCategory !== 'all',
    searchQuery.trim() !== '',
    maxPrice < 5000,
    selectedColor !== 'all',
    selectedMaterial !== 'all',
    selectedAvailability !== 'all'
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(5000);
    setSelectedColor('all');
    setSelectedMaterial('all');
    setSelectedAvailability('all');
    setSortBy('featured');
  };

  const renderSidebarFilters = () => (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-main)' }}>
          <SlidersHorizontal size={17} style={{ color: 'var(--primary-terracotta)' }} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span style={{
              background: 'var(--primary-terracotta)',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--radius-full)'
            }}>
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={handleResetFilters}
            style={{ fontSize: '0.78rem', color: 'var(--primary-terracotta)', fontWeight: '700', textDecoration: 'underline' }}
          >
            Reset All
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label className="form-label" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.35rem' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.45rem 0.65rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.84rem',
              fontWeight: selectedCategory === 'all' ? '700' : '500',
              background: selectedCategory === 'all' ? 'var(--primary-rose-light)' : 'transparent',
              color: selectedCategory === 'all' ? 'var(--primary-terracotta)' : 'var(--text-main)',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            <span>All Creations</span>
            <span style={{ fontSize: '0.74rem', opacity: 0.65 }}>{products.length}</span>
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.84rem',
                  fontWeight: isSelected ? '700' : '500',
                  background: isSelected ? 'var(--primary-rose-light)' : 'transparent',
                  color: isSelected ? 'var(--primary-terracotta)' : 'var(--text-main)',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '0.74rem', opacity: 0.65 }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Slider */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <label className="form-label" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Max Price</label>
          <span style={{ fontWeight: '700', fontSize: '0.84rem', color: 'var(--primary-terracotta)' }}>₹{maxPrice}</span>
        </div>
        <input
          type="range"
          min="100"
          max="5000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--primary-terracotta)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '2px' }}>
          <span>₹100</span>
          <span>₹5,000</span>
        </div>
      </div>

      {/* Color Filter */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label className="form-label" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Color Tone</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '0.35rem' }}>
          {colorOptions.map((c) => {
            const isSelected = selectedColor === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedColor(c.id)}
                style={{
                  padding: '0.32rem 0.55rem',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.76rem',
                  fontWeight: isSelected ? '700' : '500',
                  background: isSelected ? 'var(--primary-terracotta)' : 'var(--bg-surface)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                  border: `1px solid ${isSelected ? 'var(--primary-terracotta)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer'
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Material Filter */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label className="form-label" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Yarn Material</label>
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          className="form-select"
          style={{ fontSize: '0.84rem' }}
        >
          {materials.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Availability Filter */}
      <div>
        <label className="form-label" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Availability</label>
        <select
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
          className="form-select"
          style={{ fontSize: '0.84rem' }}
        >
          <option value="all">All Creations</option>
          <option value="in-stock">Ready to Ship (In Stock)</option>
          <option value="made-to-order">Made to Order</option>
        </select>
      </div>
    </>
  );

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '80vh', paddingBottom: '4rem' }}>
      {/* Page Banner Header */}
      <div style={{
        background: 'var(--bg-warm)',
        padding: 'clamp(1.25rem, 3vw, 2.5rem) 0 1.25rem 0',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
            <span onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>Home</span>
            <span>/</span>
            <span style={{ color: 'var(--primary-terracotta)', fontWeight: '700' }}>Shop Catalog</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--text-main)', marginBottom: '0.35rem', lineHeight: 1.2 }}>
            Handmade Yarn & Wool Creations
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', fontSize: '0.88rem', lineHeight: 1.45 }}>
            Everlasting crochet bouquets, cozy heirloom blankets, whimsical amigurumi plushies, bags, and custom accessories.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '2rem',
          alignItems: 'flex-start'
        }} className="shop-layout">
          {/* Desktop Filter Sidebar */}
          <aside className="shop-sidebar glass-card" style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border-card)',
            position: 'sticky',
            top: '85px'
          }}>
            {renderSidebarFilters()}
          </aside>

          {/* Product Results Grid Area */}
          <div>
            {/* Top Toolbar (Sleek, Compact, Responsive) */}
            <div className="shop-toolbar-card">
              {/* Left: Product Count & Mobile Filter Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  Showing <strong style={{ color: 'var(--text-main)' }}>{filteredProducts.length}</strong> pieces
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="btn btn-secondary d-mobile-only"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', borderRadius: 'var(--radius-xs)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <Filter size={13} />
                  <span>Filter {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
                </button>
              </div>

              {/* Right: Sort By Dropdown & Grid / List Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span className="d-mobile-hidden" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select"
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', width: 'auto', borderRadius: 'var(--radius-xs)' }}
                  >
                    <option value="featured">Featured & Bestsellers</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">New Arrivals</option>
                  </select>
                </div>

                {/* Grid / List View Toggle */}
                <div style={{
                  display: 'flex',
                  background: 'var(--bg-warm)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '2px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <button
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                    style={{
                      padding: '4px 7px',
                      borderRadius: 'var(--radius-xs)',
                      background: viewMode === 'grid' ? 'var(--bg-surface)' : 'transparent',
                      color: viewMode === 'grid' ? 'var(--primary-terracotta)' : 'var(--text-muted)',
                      boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Grid3X3 size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    title="List View"
                    style={{
                      padding: '4px 7px',
                      borderRadius: 'var(--radius-xs)',
                      background: viewMode === 'list' ? 'var(--bg-surface)' : 'transparent',
                      color: viewMode === 'list' ? 'var(--primary-terracotta)' : 'var(--text-muted)',
                      boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <LayoutList size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: '700' }}>Active:</span>
                {selectedCategory !== 'all' && (
                  <span className="stitch-pill" style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}>
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                    <X size={11} onClick={() => setSelectedCategory('all')} style={{ cursor: 'pointer' }} />
                  </span>
                )}
                {searchQuery && (
                  <span className="stitch-pill" style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}>
                    "{searchQuery}"
                    <X size={11} onClick={() => setSearchQuery('')} style={{ cursor: 'pointer' }} />
                  </span>
                )}
                {maxPrice < 5000 && (
                  <span className="stitch-pill" style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}>
                    &lt; ₹{maxPrice}
                    <X size={11} onClick={() => setMaxPrice(5000)} style={{ cursor: 'pointer' }} />
                  </span>
                )}
                {selectedColor !== 'all' && (
                  <span className="stitch-pill" style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}>
                    {colorOptions.find((c) => c.id === selectedColor)?.label}
                    <X size={11} onClick={() => setSelectedColor('all')} style={{ cursor: 'pointer' }} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  style={{ fontSize: '0.74rem', color: 'var(--primary-terracotta)', fontWeight: '700', textDecoration: 'underline', border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid or List */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid-products' : 'list-products'} style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column', gap: '1rem' } : {}}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} navigate={navigate} isListView={viewMode === 'list'} />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '3.5rem 1.25rem',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xs)',
                border: '1.5px dashed var(--border-stitch)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem', animation: 'gentleFloat 3s ease-in-out infinite' }}>
                  🧶
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  No creations match your filters
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto 1.25rem auto' }}>
                  Try relaxing your price slider, clearing your search query, or custom ordering your specific dream piece!
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={handleResetFilters} className="btn btn-secondary" style={{ padding: '0.55rem 1rem', fontSize: '0.84rem' }}>
                    <RotateCcw size={15} />
                    <span>Reset Filters</span>
                  </button>
                  <button onClick={() => navigate('custom-order')} className="btn btn-primary" style={{ padding: '0.55rem 1rem', fontSize: '0.84rem' }}>
                    <Sparkles size={15} />
                    <span>Custom Order</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="modal-backdrop" onClick={() => setIsMobileFilterOpen(false)}>
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '450px', maxHeight: '85vh', overflowY: 'auto', padding: '1.5rem 1.25rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0 }}>Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="btn-icon">
                <X size={18} />
              </button>
            </div>
            {renderSidebarFilters()}
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.25rem', padding: '0.75rem' }}
            >
              Apply Filters ({filteredProducts.length} Items)
            </button>
          </div>
        </div>
      )}

      <style>{`
        .shop-toolbar-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding: 0.65rem 1rem;
          background: var(--bg-surface);
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-card);
        }

        @media (max-width: 900px) {
          .shop-layout {
            grid-template-columns: 1fr !important;
          }
          .shop-sidebar {
            display: none !important;
          }
          .d-mobile-only {
            display: inline-flex !important;
          }
        }

        @media (max-width: 540px) {
          .shop-toolbar-card {
            padding: 0.5rem 0.65rem !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ShopPage;
