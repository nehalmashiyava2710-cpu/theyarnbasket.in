import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../../data/reviews';
import { StarRating } from '../common/StarRating';

export const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const review = REVIEWS[currentIndex];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-canvas)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem auto' }}>
          <span className="stitch-pill" style={{ marginBottom: '0.6rem' }}>
            <Sparkles size={13} /> Customer Love & Stories
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            What Our Patrons Say
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Real words from homes and hearts graced by our handmade yarn pieces.
          </p>
        </div>

        {/* Testimonial Showcase Box */}
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative' }}>
          <div
            className="glass-card"
            style={{
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              borderRadius: 'var(--radius-xl)',
              border: '1.5px dashed var(--border-stitch)',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            {/* Top Quote Icon */}
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--primary-rose-light)',
              color: 'var(--primary-terracotta)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Quote size={24} />
            </div>

            {/* Rating Stars */}
            <div style={{ marginBottom: '1.25rem' }}>
              <StarRating rating={review.rating} size={18} showText={false} />
            </div>

            {/* Testimonial Quote */}
            <blockquote style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
              color: 'var(--text-main)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              fontStyle: 'italic'
            }}>
              "{review.comment}"
            </blockquote>

            {/* Author & Product Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <img
                src={review.avatar}
                alt={review.author}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--text-main)' }}>{review.author}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-sage)', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                    <CheckCircle2 size={13} /> Verified Patron ({review.city})
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--primary-terracotta)', fontWeight: '600' }}>
                  Purchased: {review.productName}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button
              onClick={prevSlide}
              className="btn-icon"
              aria-label="Previous review"
              style={{ width: '44px', height: '44px' }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Indicators */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: currentIndex === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: currentIndex === idx ? 'var(--primary-terracotta)' : 'var(--border-card)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="btn-icon"
              aria-label="Next review"
              style={{ width: '44px', height: '44px' }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
