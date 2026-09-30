import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';

export const BestSellers = ({ navigate }) => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Featured & Bestsellers' },
    { id: 'crochet', label: '🌻 Crochet Blooms' },
    { id: 'knitted', label: '🧸 Plushies & Knit' },
    { id: 'bags', label: '👜 Handcrafted Bags' },
    { id: 'home-decor', label: '🏡 Home Décor' },
    { id: 'accessories', label: '🌸 Charms & Pins' },
    { id: 'custom', label: '✨ Custom Creations' }
  ];

  const displayedProducts = products
    .filter((p) => {
      if (activeTab === 'all') return p.isBestseller || p.isFeatured;
      return p.category === activeTab;
    })
    .slice(0, 8);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-warm-tint)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="bestsellers-header-row">
          <div>
            <span className="stitch-pill cute-bob" style={{ marginBottom: '0.4rem', fontSize: '0.78rem' }}>
              <Sparkles size={12} /> Hand-Crocheted With Love
            </span>
            <h2 className="bestsellers-heading">
              Featured & Trending Creations
            </h2>
            <p className="bestsellers-subheading">
              Cherished handcrafted designs made with premium skin-soft yarns and adored across India.
            </p>
          </div>

          <button
            onClick={() => {
              navigate('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-secondary bestsellers-top-btn d-mobile-hidden"
            style={{ fontSize: '0.86rem', padding: '0.55rem 1.15rem' }}
          >
            <span>View All ({products.length})</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="bestsellers-tabs-row">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`bestsellers-tab-btn ${isActive ? 'bestsellers-tab-btn-active' : ''}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid with Clean 2-Column Mobile & Multi-Column Desktop */}
        <div className="grid-products">
          {displayedProducts.map((product) => (
            <div key={product.id} style={{ animation: 'reelFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
              <ProductCard product={product} navigate={navigate} />
            </div>
          ))}
        </div>

        {/* Bottom "View All Products" CTA Button */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(1.75rem, 4vw, 3rem)' }}>
          <button
            onClick={() => {
              navigate('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-primary"
            style={{
              padding: '0.75rem 1.85rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.92rem',
              fontWeight: '700'
            }}
          >
            <span>Explore All {products.length}+ Handcrafted Pieces</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .bestsellers-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .bestsellers-heading {
          font-family: var(--font-serif);
          color: var(--text-main);
          margin-top: 0.25rem;
          font-size: clamp(1.45rem, 3vw, 2.2rem);
          line-height: 1.2;
        }

        .bestsellers-subheading {
          color: var(--text-muted);
          font-size: 0.88rem;
          margin-top: 0.25rem;
          max-width: 540px;
        }

        .bestsellers-tabs-row {
          display: flex;
          gap: 0.45rem;
          overflow-x: auto;
          padding-bottom: 0.65rem;
          margin-bottom: 1.5rem;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .bestsellers-tabs-row::-webkit-scrollbar {
          display: none;
        }

        .bestsellers-tab-btn {
          padding: 0.45rem 0.9rem;
          border-radius: var(--radius-xs);
          font-size: 0.82rem;
          font-weight: 600;
          background: var(--bg-surface);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .bestsellers-tab-btn-active {
          background: var(--primary-terracotta) !important;
          color: #FFFFFF !important;
          border-color: var(--primary-terracotta) !important;
          box-shadow: 0 2px 8px rgba(200, 90, 50, 0.25);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .bestsellers-header-row {
            margin-bottom: 1rem !important;
          }
          .bestsellers-heading {
            font-size: 1.35rem !important;
          }
          .bestsellers-subheading {
            font-size: 0.8rem !important;
          }
          .bestsellers-tabs-row {
            margin-bottom: 1rem !important;
          }
          .bestsellers-tab-btn {
            padding: 0.38rem 0.75rem !important;
            font-size: 0.78rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BestSellers;
