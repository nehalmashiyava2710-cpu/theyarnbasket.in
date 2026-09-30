import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BestSellers } from '../components/home/BestSellers';
import { ReelsSection } from '../components/reels/ReelsSection';

export const HomePage = ({ navigate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. Hero Section: Brand Identity, Made with Yarn. Made with Love. */}
      <HeroSection navigate={navigate} />

      {/* 2. Featured Products / All Products with Category Tabs */}
      <BestSellers navigate={navigate} />

      {/* 3. 12 Handcrafted Studio Videos & Reels Showcase */}
      <ReelsSection navigate={navigate} />
    </div>
  );
};

export default HomePage;

