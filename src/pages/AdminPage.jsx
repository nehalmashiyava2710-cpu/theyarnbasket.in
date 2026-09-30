import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Filter, 
  Star, 
  Sparkles, 
  ArrowLeft, 
  MessageCircle, 
  Truck, 
  Clock, 
  CheckCircle2, 
  RefreshCw,
  Eye,
  Sliders,
  ShieldCheck,
  Mail
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';

export const AdminPage = ({ navigate }) => {
  const { 
    products, 
    orders, 
    customRequests, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    updateCustomRequestStatus,
    resetProductsToDefault,
    directWhatsAppChat,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'custom'
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderFilter, setOrderFilter] = useState('all');
  
  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'bouquets',
    categoryName: 'Crochet Bouquets & Flowers',
    stockQty: 10,
    inStock: true,
    isFeatured: false,
    isBestseller: false,
    leadTimeDays: '2-3 crafting days',
    image: '/products/bloming-sunflower-bouquet-1249-.jpg',
    shortDescription: '',
    fullDescription: '',
    materials: '100% Premium Milk Cotton Yarn',
    dimensions: 'Standard Handmade Size',
    colors: 'Warm Sunshine Gold, Pastel Buttercup',
    sizes: 'Standard Bouquet'
  });

  // Calculate KPIs
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStockProducts = products.filter(p => (p.stockQty || 0) <= 5);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          (p.sku && p.sku.toLowerCase().includes(productSearch.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status.toLowerCase().includes(orderFilter.toLowerCase());
  });

  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: 'bouquets',
      categoryName: 'Crochet Bouquets & Flowers',
      stockQty: 10,
      inStock: true,
      isFeatured: false,
      isBestseller: false,
      leadTimeDays: '2-3 crafting days',
      image: '/products/bloming-sunflower-bouquet-1249-.jpg',
      shortDescription: '',
      fullDescription: '',
      materials: '100% Premium Milk Cotton Yarn',
      dimensions: 'Standard Handmade Size',
      colors: 'Warm Cream, Pastel Blush',
      sizes: 'Standard'
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod) => {
    setEditingProductId(prod.id);
    setProductFormData({
      name: prod.name,
      price: prod.price,
      originalPrice: prod.originalPrice || '',
      category: prod.category || 'bouquets',
      categoryName: prod.categoryName || 'Crochet Bouquets & Flowers',
      stockQty: prod.stockQty || 10,
      inStock: prod.inStock !== false,
      isFeatured: !!prod.isFeatured,
      isBestseller: !!prod.isBestseller,
      leadTimeDays: prod.leadTimeDays || '2-3 crafting days',
      image: prod.images?.[0] || '/products/bloming-sunflower-bouquet-1249-.jpg',
      shortDescription: prod.shortDescription || '',
      fullDescription: prod.fullDescription || '',
      materials: prod.materials || '100% Premium Milk Cotton Yarn',
      dimensions: prod.dimensions || 'Standard',
      colors: (prod.availableColors || []).map(c => typeof c === 'string' ? c : c.name).join(', '),
      sizes: (prod.availableSizes || []).join(', ')
    });
    setIsProductModalOpen(true);
  };

  const handleProductFormSubmit = (e) => {
    e.preventDefault();
    if (!productFormData.name.trim() || !productFormData.price) {
      alert('Please fill product name and price');
      return;
    }

    const catObj = CATEGORIES.find(c => c.id === productFormData.category);
    const colorArray = productFormData.colors.split(',').map(s => ({ name: s.trim(), hex: '#D96B4F' })).filter(c => c.name);
    const sizeArray = productFormData.sizes.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      name: productFormData.name.trim(),
      price: Number(productFormData.price),
      originalPrice: productFormData.originalPrice ? Number(productFormData.originalPrice) : Math.round(Number(productFormData.price) * 1.25),
      category: productFormData.category,
      categoryName: catObj ? catObj.name : 'Crochet Items',
      stockQty: Number(productFormData.stockQty) || 0,
      inStock: productFormData.inStock,
      isFeatured: productFormData.isFeatured,
      isBestseller: productFormData.isBestseller,
      leadTimeDays: productFormData.leadTimeDays || '2-3 crafting days',
      images: [productFormData.image],
      shortDescription: productFormData.shortDescription || productFormData.name,
      fullDescription: productFormData.fullDescription || productFormData.shortDescription,
      materials: productFormData.materials,
      dimensions: productFormData.dimensions,
      availableColors: colorArray.length > 0 ? colorArray : [{ name: 'Standard', hex: '#FAF7F2' }],
      availableSizes: sizeArray.length > 0 ? sizeArray : ['Standard']
    };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
    } else {
      addProduct(payload);
    }
    setIsProductModalOpen(false);
  };

  const ORDER_STATUS_STEPS = {
    'New Order': 1,
    'Processing in Atelier': 1,
    'Handmade/Preparing (Crafting)': 2,
    'Quality Check Complete': 3,
    'Dispatched / Courier Transit': 4,
    'Delivered with Love': 5
  };

  return (
    <div style={{ background: 'var(--bg-canvas)', minHeight: '90vh', paddingBottom: '6rem' }}>
      {/* Admin Top Header Banner */}
      <div style={{
        background: 'var(--brand-dark)',
        color: '#FFFFFF',
        padding: '2.5rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src="/logo.png"
                alt="The Yarn Basket Logo"
                style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', objectFit: 'cover' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="stitch-pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '0.72rem' }}>
                    👑 Business Owner Atelier Portal
                  </span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: '#FFFFFF', margin: '0.25rem 0 0 0' }}>
                  The Yarn Basket Admin Studio
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.86rem', margin: 0 }}>
                  Manage store products, inventory, customer orders, and custom commission requests.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('home')}
                className="btn btn-secondary"
                style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)', fontSize: '0.85rem' }}
              >
                <ArrowLeft size={15} />
                <span>Return to Storefront</span>
              </button>
              <button
                onClick={openAddProductModal}
                className="btn btn-primary"
                style={{ fontSize: '0.88rem', background: 'var(--primary-terracotta)' }}
              >
                <Plus size={16} />
                <span>Add New Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: '📊 Dashboard Overview' },
            { id: 'products', label: `🧶 Products Catalog (${totalProducts})` },
            { id: 'orders', label: `📦 Customer Orders (${totalOrders})` },
            { id: 'custom', label: `✨ Custom Requests (${customRequests.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-xs)',
                border: activeTab === tab.id ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-card)',
                background: activeTab === tab.id ? 'var(--primary-terracotta)' : 'var(--bg-surface)',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-main)',
                fontWeight: activeTab === tab.id ? '700' : '600',
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & METRICS */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>TOTAL REVENUE</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--primary-rose-light)', color: 'var(--primary-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  ₹{totalSales.toLocaleString('en-IN')}
                </div>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-sage)', fontWeight: '700' }}>
                  ↑ Verified Atelier Checkout
                </span>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>TOTAL ORDERS</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--accent-sage-light)', color: 'var(--accent-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  {totalOrders}
                </div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Across Pan-India Deliveries
                </span>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>ACTIVE PRODUCTS</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--accent-gold-light)', color: '#B5851C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  {totalProducts}
                </div>
                <span style={{ fontSize: '0.74rem', color: 'var(--primary-terracotta)', fontWeight: '700' }}>
                  Across 6 Craft Categories
                </span>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>LOW STOCK ALERTS</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'rgba(239, 68, 68, 0.15)', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#DC2626' }}>
                  {lowStockProducts.length}
                </div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Items with &le; 5 units ready
                </span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Banner */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {/* Recent Orders Overview */}
              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface)', border: '1px solid var(--border-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
                    Recent Orders Feed
                  </h3>
                  <button onClick={() => setActiveTab('orders')} style={{ background: 'transparent', border: 'none', color: 'var(--primary-terracotta)', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>
                    View All Orders &rarr;
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {orders.slice(0, 4).map((ord) => (
                    <div key={ord.id} style={{ padding: '0.85rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-main)' }}>
                          {ord.id} • {ord.customer?.name || 'Customer'}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {ord.items?.length || 1} item(s) • ₹{ord.total} • {ord.date}
                        </div>
                      </div>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'var(--primary-rose-light)',
                        color: 'var(--primary-terracotta)'
                      }}>
                        {ord.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Studio Tools */}
              <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface)', border: '1px solid var(--border-card)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
                  Studio Management Shortcuts
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
                  Quickly add new seasonal drops, manage categories, or reset the catalog.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
                  <button onClick={openAddProductModal} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Plus size={16} />
                    <span>Create & Publish New Product</span>
                  </button>
                  <button onClick={() => setActiveTab('products')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Package size={16} />
                    <span>Manage Prices & Stock ({totalProducts} Products)</span>
                  </button>
                  <button onClick={resetProductsToDefault} className="btn" style={{ width: '100%', justifyContent: 'center', background: 'var(--bg-warm)', color: 'var(--text-muted)' }}>
                    <RefreshCw size={14} />
                    <span>Reset to Default Collection</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div>
            {/* Filter & Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="text"
                    placeholder="Search by name or SKU..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', paddingLeft: '2.4rem', fontSize: '0.86rem' }}
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.86rem', maxWidth: '200px' }}
                >
                  <option value="all">All Categories ({products.length})</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button onClick={openAddProductModal} className="btn btn-primary" style={{ fontSize: '0.88rem' }}>
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Table / Cards Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="glass-card"
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  {/* Left: Thumbnail & Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '260px' }}>
                    <img
                      src={prod.images?.[0] || '/products/bloming-sunflower-bouquet-1249-.jpg'}
                      alt={prod.name}
                      style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: '700' }}>
                          {prod.sku || 'SKU-001'}
                        </span>
                        {prod.isFeatured && (
                          <span style={{ fontSize: '0.68rem', background: 'var(--accent-gold-light)', color: '#B5851C', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-xs)', fontWeight: '700' }}>
                            ★ Featured
                          </span>
                        )}
                        {!prod.inStock && (
                          <span style={{ fontSize: '0.68rem', background: 'rgba(239, 68, 68, 0.15)', color: '#DC2626', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-xs)', fontWeight: '700' }}>
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--text-main)', margin: '0.15rem 0' }}>
                        {prod.name}
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {prod.categoryName || prod.category}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Price & Stock Quick Editors */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: '700' }}>
                        PRICE (₹)
                      </label>
                      <input
                        type="number"
                        value={prod.price}
                        onChange={(e) => updateProduct(prod.id, { price: Number(e.target.value) })}
                        className="input-field"
                        style={{ width: '90px', padding: '0.35rem 0.5rem', fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary-terracotta)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: '700' }}>
                        STOCK READY
                      </label>
                      <input
                        type="number"
                        value={prod.stockQty !== undefined ? prod.stockQty : 10}
                        onChange={(e) => updateProduct(prod.id, { stockQty: Number(e.target.value), inStock: Number(e.target.value) > 0 })}
                        className="input-field"
                        style={{ width: '70px', padding: '0.35rem 0.5rem', fontSize: '0.88rem', fontWeight: '700' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: '700' }}>
                        STATUS
                      </label>
                      <button
                        onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: 'var(--radius-xs)',
                          border: 'none',
                          background: prod.inStock ? 'var(--accent-sage-light)' : 'rgba(239, 68, 68, 0.15)',
                          color: prod.inStock ? 'var(--accent-sage)' : '#DC2626',
                          fontSize: '0.76rem',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        {prod.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                      </button>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => openEditProductModal(prod)}
                      className="btn-icon"
                      title="Edit Full Product Details"
                      style={{ width: '36px', height: '36px' }}
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to remove "${prod.name}" from catalog?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="btn-icon"
                      title="Delete Product"
                      style={{ width: '36px', height: '36px', color: '#DC2626' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div>
            {/* Status Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {['all', 'Crafting', 'Processing', 'Quality', 'Dispatched', 'Delivered'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-xs)',
                    border: orderFilter === st ? '1.5px solid var(--primary-terracotta)' : '1px solid var(--border-card)',
                    background: orderFilter === st ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                    color: orderFilter === st ? 'var(--primary-terracotta)' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {st === 'all' ? 'All Orders' : st}
                </button>
              ))}
            </div>

            {/* Orders List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-card)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* Top Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--primary-terracotta)' }}>
                        ORDER #{ord.id}
                      </span>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                        {ord.customer?.name || 'Customer'}
                      </div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Placed on {ord.date} • {ord.paymentMethod || 'UPI Payment'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-terracotta)' }}>
                          ₹{ord.total}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-sage)', fontWeight: '700' }}>
                          Paid Online
                        </span>
                      </div>

                      {/* Status Change Selector */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-light)', marginBottom: '2px' }}>
                          UPDATE STATUS:
                        </label>
                        <select
                          value={ord.status}
                          onChange={(e) => {
                            const newSt = e.target.value;
                            const newStep = ORDER_STATUS_STEPS[newSt] || 2;
                            updateOrderStatus(ord.id, newSt, newStep);
                          }}
                          className="input-field"
                          style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--primary-terracotta)', padding: '0.45rem 0.8rem' }}
                        >
                          <option value="New Order">New Order (Step 1)</option>
                          <option value="Crafting in Studio">Crafting in Studio (Step 2)</option>
                          <option value="Quality Check Complete">Quality Check (Step 3)</option>
                          <option value="Dispatched / Courier Transit">Dispatched (Step 4)</option>
                          <option value="Delivered with Love">Delivered (Step 5)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Customer Contact & Address */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <div>
                      <strong>Contact:</strong> {ord.customer?.phone || '+91 98765 43210'} • {ord.customer?.email || 'ananya@example.com'}
                    </div>
                    <div>
                      <strong>Delivery:</strong> {ord.address ? `${ord.address.street}, ${ord.address.city} (${ord.address.pincode})` : 'Indiranagar, Bengaluru'}
                    </div>
                  </div>

                  {/* Items List */}
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    {(ord.items || []).map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.4rem 0.75rem', background: 'var(--bg-warm)', borderRadius: 'var(--radius-xs)' }}>
                        <img
                          src={item.product?.images?.[0] || '/products/bloming-sunflower-bouquet-1249-.jpg'}
                          alt={item.product?.name || 'Item'}
                          style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }}
                        />
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-main)' }}>
                          {item.product?.name || 'Handmade Creation'} &times; {item.quantity}
                        </span>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        const msg = `Hi ${ord.customer?.name || 'Customer'}! 🌸 Updating you regarding your Yarn Basket Order #${ord.id}. Current status: "${ord.status}".`;
                        directWhatsAppChat(msg);
                      }}
                      className="btn"
                      style={{
                        marginLeft: 'auto',
                        padding: '0.35rem 0.85rem',
                        fontSize: '0.78rem',
                        background: '#25D366',
                        color: '#FFFFFF'
                      }}
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp Customer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOM COMMISSION REQUESTS */}
        {activeTab === 'custom' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {customRequests.map((req) => (
                <div
                  key={req.id}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-card)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.85rem' }}>
                    <div>
                      <span className="stitch-pill" style={{ fontSize: '0.74rem' }}>
                        Custom Inquiry #{req.id}
                      </span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)', margin: '0.25rem 0' }}>
                        {req.itemType || 'Custom Crochet Project'}
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Date: {req.date} • Budget: <strong>{req.budget || '₹1,500'}</strong> • Needed by: <strong>{req.neededBy || 'Flexible'}</strong>
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <select
                        value={req.status}
                        onChange={(e) => updateCustomRequestStatus(req.id, e.target.value)}
                        className="input-field"
                        style={{ fontSize: '0.84rem', fontWeight: '700', color: 'var(--primary-terracotta)' }}
                      >
                        <option value="Under Review by Saloni">Under Review</option>
                        <option value="Quote Shared with Client">Quote Shared</option>
                        <option value="In Studio Crafting">In Studio Crafting</option>
                        <option value="Completed & Delivered">Completed</option>
                      </select>

                      <button
                        onClick={() => directWhatsAppChat(`Hi! Saloni here from The Yarn Basket regarding your custom commission request #${req.id} (${req.itemType}). Let's discuss details!`)}
                        className="btn"
                        style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', background: '#25D366', color: '#FFFFFF' }}
                        title="Chat directly on WhatsApp"
                      >
                        <MessageCircle size={14} />
                        <span>Chat WhatsApp</span>
                      </button>

                      {req.customerEmail && (
                        <button
                          onClick={() => {
                            const subject = encodeURIComponent(`Regarding your Custom Crochet Inquiry #${req.id} - The Yarn Basket`);
                            const body = encodeURIComponent(`Hi ${req.customerName || 'there'},\n\nThank you for reaching out to The Yarn Basket studio regarding your custom piece (${req.itemType}).\n\nWarm regards,\nArtist Saloni`);
                            window.open(`mailto:${req.customerEmail}?subject=${subject}&body=${body}`, '_blank');
                          }}
                          className="btn btn-secondary"
                          style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', gap: '0.35rem' }}
                          title={`Email ${req.customerEmail}`}
                        >
                          <Mail size={14} />
                          <span>Email Client</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                    <span>Client: <strong style={{ color: 'var(--text-main)' }}>{req.customerName || 'Valued Client'}</strong></span>
                    <span>Phone: <strong style={{ color: 'var(--text-main)' }}>{req.customerPhone || 'N/A'}</strong></span>
                    <span>Email: <strong style={{ color: 'var(--text-main)' }}>{req.customerEmail || 'saloni.crafts@gmail.com'}</strong></span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', background: 'var(--bg-warm)', padding: '0.85rem', borderRadius: 'var(--radius-xs)', margin: 0 }}>
                    "{req.description || req.details || 'Custom bespoke inquiry.'}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Add / Edit Dialog Modal */}
      {isProductModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: 'rgba(20,15,12,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '620px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--text-main)', margin: 0 }}>
                {editingProductId ? 'Edit Product Details' : 'Add New Craft Creation'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProductFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productFormData.name}
                  onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                  placeholder="e.g. Blooming Pink Peony Bouquet"
                  className="input-field"
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={productFormData.price}
                    onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                    placeholder="e.g. 899"
                    className="input-field"
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={productFormData.originalPrice}
                    onChange={(e) => setProductFormData({ ...productFormData, originalPrice: e.target.value })}
                    placeholder="e.g. 1199"
                    className="input-field"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                    className="input-field"
                    style={{ width: '100%' }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                    Stock Quantity Ready
                  </label>
                  <input
                    type="number"
                    value={productFormData.stockQty}
                    onChange={(e) => setProductFormData({ ...productFormData, stockQty: e.target.value })}
                    className="input-field"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Image Asset Path / URL
                </label>
                <input
                  type="text"
                  value={productFormData.image}
                  onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                  placeholder="/products/bloming-sunflower-bouquet-1249-.jpg"
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Available Colors (comma separated)
                </label>
                <input
                  type="text"
                  value={productFormData.colors}
                  onChange={(e) => setProductFormData({ ...productFormData, colors: e.target.value })}
                  placeholder="Sunshine Gold, Pastel Rose, Mint Green"
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Short Description
                </label>
                <textarea
                  rows="2"
                  value={productFormData.shortDescription}
                  onChange={(e) => setProductFormData({ ...productFormData, shortDescription: e.target.value })}
                  placeholder="Short one-line story of this creation..."
                  className="input-field"
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={productFormData.isFeatured}
                    onChange={(e) => setProductFormData({ ...productFormData, isFeatured: e.target.checked })}
                  />
                  <span>Mark as Featured on Homepage</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={productFormData.inStock}
                    onChange={(e) => setProductFormData({ ...productFormData, inStock: e.target.checked })}
                  />
                  <span>In Stock / Ready to Ship</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Check size={16} />
                  <span>{editingProductId ? 'Save Product Changes' : 'Publish to Shop'}</span>
                </button>
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
