import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, reviewCount = null, size = 15, showText = true }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            fill={star <= Math.round(rating) ? '#E5B448' : 'none'}
            stroke={star <= Math.round(rating) ? '#E5B448' : '#C5B5A5'}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showText && (
        <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-muted)' }}>
          {rating.toFixed(1)} {reviewCount !== null && `(${reviewCount})`}
        </span>
      )}
    </div>
  );
};
