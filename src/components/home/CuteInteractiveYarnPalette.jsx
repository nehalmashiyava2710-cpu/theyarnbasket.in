import React, { useState } from 'react';
import { Sparkles, Heart, Wand2, RefreshCw, Send, Check, Car, Key, Gift, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

const USAGE_IDEAS = [
  {
    id: 'bag-charm',
    title: 'Handbag & Backpack Charm',
    emoji: '🎒',
    desc: 'Clip onto your tote bag, purse, or backpack for a cute aesthetic flex.',
    badge: 'Most Popular'
  },
  {
    id: 'car-mirror',
    title: 'Car Mirror Hanging',
    emoji: '🚗',
    desc: 'Gentle swinging cozy companion for your car rearview mirror.',
    badge: 'Cozy Drive'
  },
  {
    id: 'keychain',
    title: 'Name Keychain Keepsake',
    emoji: '🔑',
    desc: 'Never lose your keys with an embroidered personalized name tag.',
    badge: 'Custom Name'
  },
  {
    id: 'phone-dangle',
    title: 'AirPod & Phone Dangle',
    emoji: '📱',
    desc: 'A soft mini yarn plushie that protects and beautifies your tech accessories.',
    badge: 'Everyday Cute'
  },
  {
    id: 'bestie-gift',
    title: 'Gift for Bestie / Loved One',
    emoji: '🎁',
    desc: 'Handmade with love, arrives with handmade ribbon & sweet gift box.',
    badge: 'Gift Ready'
  }
];

const PRESETS = [
  {
    name: 'Panda on Matcha',
    yarnId: 'matcha-sage',
    charmId: 'panda',
    tag: 'Saloni',
    usage: 'Handbag Charm 🎒',
    emoji: '🐼🍵'
  },
  {
    name: 'Blossom Daisy',
    yarnId: 'blush-pink',
    charmId: 'daisy',
    tag: 'Sweetie',
    usage: 'Car Mirror 🚗',
    emoji: '🌸🌼'
  },
  {
    name: 'Strawberry Milk',
    yarnId: 'creamy-milk',
    charmId: 'strawberry',
    tag: 'Berry Cute',
    usage: 'Key Keepsake 🔑',
    emoji: '🍓🥛'
  },
  {
    name: 'Sunny Buttercup',
    yarnId: 'sunshine-honey',
    charmId: 'sunflower',
    tag: 'Sunshine',
    usage: 'Desk Companion 🌻',
    emoji: '🍯🌻'
  },
  {
    name: 'Lavender Whale',
    yarnId: 'lavender-mist',
    charmId: 'whale',
    tag: 'Love',
    usage: 'Gift Bundle 🎁',
    emoji: '💜🐳'
  }
];

const YARN_COLORS = [
  { id: 'blush-pink', name: 'Cotton Pink', hex: '#F4A7B9', gradient: '#F4A7B9', emoji: '🌸' },
  { id: 'sunshine-honey', name: 'Honey Buttercup', hex: '#F6D365', gradient: '#F6D365', emoji: '🍯' },
  { id: 'matcha-sage', name: 'Matcha Sage', hex: '#688B74', gradient: '#688B74', emoji: '🍵' },
  { id: 'warm-terracotta', name: 'Atelier Rust', hex: '#C85A32', gradient: '#C85A32', emoji: '🧶' },
  { id: 'lavender-mist', name: 'Lavender Cloud', hex: '#A493B8', gradient: '#A493B8', emoji: '💜' },
  { id: 'sky-cloud', name: 'Baby Sky Blue', hex: '#7EB6D9', gradient: '#7EB6D9', emoji: '☁️' },
  { id: 'creamy-milk', name: 'Organic Milk', hex: '#F4EDE2', gradient: '#F4EDE2', emoji: '🥛' },
];

const CHARM_OPTIONS = [
  { id: 'panda', name: 'Chubby Panda', emoji: '🐼', desc: 'Hand-crocheted sweet bear' },
  { id: 'strawberry', name: 'Sweet Strawberry', emoji: '🍓', desc: 'Mini red berry stitch' },
  { id: 'daisy', name: 'Blooming Daisy', emoji: '🌼', desc: 'Handtied flower blossom' },
  { id: 'sunflower', name: 'Sunny Flower', emoji: '🌻', desc: 'Bright golden bloom' },
  { id: 'whale', name: 'Tiny Whale', emoji: '🐳', desc: 'Cozy ocean friend' },
  { id: 'bow', name: 'Silky Ribbon Bow', emoji: '🎀', desc: 'Artisanal gift loop' },
  { id: 'heart', name: 'Fluffy Heart', emoji: '💖', desc: 'Pure wool love' }
];

export const CuteInteractiveYarnPalette = ({ navigate }) => {
  const { directWhatsAppChat } = useStore();
  const [selectedYarn, setSelectedYarn] = useState(YARN_COLORS[0]);
  const [selectedCharm, setSelectedCharm] = useState(CHARM_OPTIONS[0]);
  const [selectedUsage, setSelectedUsage] = useState(USAGE_IDEAS[0]);
  const [customTag, setCustomTag] = useState('Saloni');
  const [isSparkling, setIsSparkling] = useState(false);

  const triggerMagicBurst = () => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 900);

    try {
      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.65 },
        colors: [selectedYarn.hex, '#DE8C82', '#688B74', '#E5B448', '#FFB7B2'],
        shapes: ['circle', 'square'],
        scalar: 1
      });
    } catch (e) {}
  };

  const applyPreset = (preset) => {
    const yarn = YARN_COLORS.find(y => y.id === preset.yarnId) || YARN_COLORS[0];
    const charm = CHARM_OPTIONS.find(c => c.id === preset.charmId) || CHARM_OPTIONS[0];
    setSelectedYarn(yarn);
    setSelectedCharm(charm);
    setCustomTag(preset.tag);
    triggerMagicBurst();
  };

  const handleShuffle = () => {
    const randomYarn = YARN_COLORS[Math.floor(Math.random() * YARN_COLORS.length)];
    const randomCharm = CHARM_OPTIONS[Math.floor(Math.random() * CHARM_OPTIONS.length)];
    const randomUsage = USAGE_IDEAS[Math.floor(Math.random() * USAGE_IDEAS.length)];
    setSelectedYarn(randomYarn);
    setSelectedCharm(randomCharm);
    setSelectedUsage(randomUsage);
    triggerMagicBurst();
  };

  const handleWhatsAppCustomOrder = () => {
    const tagText = customTag.trim() ? `with embroidered tag "${customTag.trim()}"` : 'without custom tag';
    const msg = `Hi Saloni ma'am! 🌸 I created a dream custom charm on your website!\n\n✨ Use Case: ${selectedUsage.emoji} ${selectedUsage.title}\n🧶 Wool Yarn Shade: ${selectedYarn.name} ${selectedYarn.emoji}\n🌸 Charm Buddy: ${selectedCharm.name} ${selectedCharm.emoji}\n🏷️ Embroidered Name: ${tagText}\n💵 Price: ₹299\n\nCan you please handmade this for me?`;
    directWhatsAppChat(msg, `Custom Charm: ${selectedYarn.name} + ${selectedCharm.name}`);
  };

  return (
    <section style={{
      position: 'relative',
      padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
      background: 'var(--bg-canvas)',
      overflow: 'hidden',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }}>
      {/* Decorative Cute Floating Sparkles & Emojis */}
      <div className="cute-float" style={{ position: 'absolute', top: '8%', left: '3%', fontSize: '2rem', opacity: 0.6, pointerEvents: 'none' }}>
        🌸
      </div>
      <div className="cute-bob" style={{ position: 'absolute', top: '12%', right: '4%', fontSize: '2.2rem', opacity: 0.6, pointerEvents: 'none' }}>
        ✨
      </div>
      <div className="cute-float" style={{ position: 'absolute', bottom: '10%', left: '5%', fontSize: '1.8rem', opacity: 0.5, pointerEvents: 'none' }}>
        🎀
      </div>
      <div className="cute-bob" style={{ position: 'absolute', bottom: '8%', right: '6%', fontSize: '2rem', opacity: 0.6, pointerEvents: 'none' }}>
        🧶
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header with Clear Explanation */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem' }}>
            <span className="cute-tag-pill cute-bob">
              <Sparkles size={13} className="cute-sparkle-anim" />
              Custom Atelier Craft Studio
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.9rem, 3.8vw, 2.6rem)',
            color: 'var(--text-main)',
            marginBottom: '0.75rem',
            lineHeight: 1.2
          }}>
            What is this for?{' '}
            <span style={{ color: 'var(--primary-terracotta)', fontStyle: 'italic' }}>
              Your Custom Cute Charm 🌸
            </span>
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Design your own <strong>crochet bag charm, car hanging, or personalized keychain</strong>! Pick your favorite yarn color, add a cute charm buddy, and embroider your name.
          </p>

          {/* Quick Cute Inspiration Presets Bar */}
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary-terracotta)' }}>
              ✨ Tap for cute ideas:
            </span>
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="cute-wiggle-hover"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1.5px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: 'var(--text-main)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer'
                }}
              >
                <span>{preset.emoji}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5 Real-World Tangible Cute Uses Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.85rem',
          marginBottom: '2.5rem'
        }}>
          {USAGE_IDEAS.map((item) => {
            const isSelected = selectedUsage.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedUsage(item);
                  triggerMagicBurst();
                }}
                className="cute-wiggle-hover"
                style={{
                  background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.9rem',
                  border: isSelected ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-card)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(200, 90, 50, 0.2)' : 'var(--shadow-sm)',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.6rem' }}>{item.emoji}</span>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-xs)',
                    background: isSelected ? 'var(--primary-terracotta)' : 'var(--bg-warm)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-muted)'
                  }}>
                    {item.badge}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)', margin: '4px 0 2px 0' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.35, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Customizer Workbench Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          alignItems: 'center',
          maxWidth: '1080px',
          margin: '0 auto'
        }}>
          {/* Left Column: Interactive Swatches & Customizer */}
          <div className="glass-card" style={{
            padding: 'clamp(1.25rem, 2.5vw, 2rem)',
            borderRadius: 'var(--radius-sm)',
            border: '1.5px dashed var(--border-stitch)',
            background: 'var(--bg-surface)'
          }}>
            {/* Step 1: Choose Yarn Color */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>1. Choose Wool Yarn Color</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-terracotta)' }}>({selectedYarn.name} {selectedYarn.emoji})</span>
                </label>
                <button
                  onClick={handleShuffle}
                  style={{
                    background: 'var(--bg-warm)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                  title="Randomize Cute Combo"
                >
                  <RefreshCw size={11} />
                  <span>Surprise Me!</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                {YARN_COLORS.map((yarn) => {
                  const isSelected = selectedYarn.id === yarn.id;
                  return (
                    <button
                      key={yarn.id}
                      onClick={() => {
                        setSelectedYarn(yarn);
                        triggerMagicBurst();
                      }}
                      className="cute-wiggle-hover"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '0.45rem 0.8rem',
                        borderRadius: 'var(--radius-xs)',
                        border: isSelected ? '2px solid var(--primary-terracotta)' : '1.5px solid var(--border-subtle)',
                        background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-surface)',
                        boxShadow: isSelected ? '0 3px 10px rgba(200, 90, 50, 0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      <span
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '2px',
                          background: yarn.hex,
                          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
                          display: 'inline-block'
                        }}
                      />
                      <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? '800' : '600', color: 'var(--text-main)' }}>
                        {yarn.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Miniature Charm */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                2. Pick Your Miniature Charm Buddy 🌸
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.65rem' }}>
                {CHARM_OPTIONS.map((charm) => {
                  const isSelected = selectedCharm.id === charm.id;
                  return (
                    <button
                      key={charm.id}
                      onClick={() => {
                        setSelectedCharm(charm);
                        triggerMagicBurst();
                      }}
                      className="cute-wiggle-hover"
                      style={{
                        padding: '0.65rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        border: isSelected ? '2px solid var(--primary-terracotta)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--primary-rose-light)' : 'var(--bg-warm-tint)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 3px 8px rgba(200, 90, 50, 0.15)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '1.4rem', marginBottom: '2px' }}>{charm.emoji}</div>
                      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-main)' }}>{charm.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Embroider Name / Text */}
            <div>
              <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                3. Embroider Name or Initial <span style={{ fontWeight: '400', fontSize: '0.78rem', color: 'var(--text-light)' }}>(Appears on your charm ribbon!)</span>
              </label>
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="e.g. Saloni / Nehu / Sweetie / A"
                maxLength={18}
                className="form-input"
                style={{
                  fontSize: '0.88rem',
                  padding: '0.65rem 0.95rem',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-warm)',
                  border: '1.5px solid var(--border-subtle)'
                }}
              />
            </div>
          </div>

          {/* Right Column: Live Interactive Cute Preview Stage */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '430px',
                padding: '2rem 1.5rem',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
                position: 'relative',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-lg)',
                border: '1.5px solid var(--border-card)'
              }}
            >
              {/* Cute Live Indicator Badge */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span className="cute-tag-pill" style={{ background: '#E8F7EE', color: '#2D8A58', borderColor: '#A8D5BA', borderRadius: 'var(--radius-xs)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2D8A58', display: 'inline-block' }} />
                  Live Handmade Preview
                </span>
                <span className="cute-tag-pill" style={{ background: 'var(--primary-rose-light)', color: 'var(--primary-terracotta)', borderColor: 'var(--primary-rose)', borderRadius: 'var(--radius-xs)' }}>
                  {selectedUsage.emoji} {selectedUsage.title}
                </span>
              </div>

              {/* Realistic Animated Keychain Ring / Hanging Strap */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto -10px auto' }}>
                {/* Silver Metal Keychain Ring Loop */}
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: 'var(--radius-xs)',
                  border: '3px solid #D1D5DB',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                  marginBottom: '-6px',
                  zIndex: 2
                }} />
                {/* Woven Wool Hanging Thread */}
                <div style={{
                  width: '4px',
                  height: '22px',
                  background: selectedYarn.hex,
                  borderRadius: '2px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  zIndex: 1
                }} />
              </div>

              {/* Animated Cute Bobbing Yarn Box & Charm Preview */}
              <div
                style={{
                  position: 'relative',
                  width: '200px',
                  height: '190px',
                  margin: '0 auto 1.25rem auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Yarn Thread Loop SVG in background */}
                <svg
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '-15px',
                    width: '230px',
                    height: '230px',
                    pointerEvents: 'none',
                    animation: 'cuteSpinSlow 25s linear infinite'
                  }}
                  viewBox="0 0 200 200"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke={selectedYarn.hex}
                    strokeWidth="2.5"
                    strokeDasharray="6 8"
                    opacity="0.6"
                  />
                </svg>

                {/* Main Cute Animated Yarn Swatch */}
                <div
                  className={isSparkling ? 'cute-wiggle-hover' : 'cute-bob'}
                  onClick={triggerMagicBurst}
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedYarn.hex,
                    border: '4px solid #FFFFFF',
                    boxShadow: `0 8px 24px ${selectedYarn.hex}44`,
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  title="Tap me to sparkle!"
                >
                  {/* Cute Kawaii Face */}
                  <div style={{ position: 'relative', width: '50px', height: '35px' }}>
                    <div style={{ position: 'absolute', top: '8px', left: '8px', width: '7px', height: '9px', background: '#2E1C14', borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', top: '8px', right: '8px', width: '7px', height: '9px', background: '#2E1C14', borderRadius: '50%' }} />
                    {/* Blushing Cheeks */}
                    <div style={{ position: 'absolute', top: '16px', left: '2px', width: '10px', height: '6px', background: 'rgba(255, 90, 120, 0.65)', borderRadius: '2px' }} />
                    <div style={{ position: 'absolute', top: '16px', right: '2px', width: '10px', height: '6px', background: 'rgba(255, 90, 120, 0.65)', borderRadius: '2px' }} />
                    {/* Smiling mouth */}
                    <div style={{ position: 'absolute', top: '16px', left: '19px', width: '12px', height: '6px', borderBottom: '2.5px solid #2E1C14', borderRadius: '0 0 12px 12px' }} />
                  </div>

                  {/* Cute Floating Charm Attachment */}
                  <div
                    className="cute-bob"
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-8px',
                      fontSize: '32px',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                      lineHeight: 1
                    }}
                  >
                    {selectedCharm.emoji}
                  </div>

                  {/* Tiny Yarn Heart Attachment */}
                  <span
                    className="cute-heart-beat"
                    style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: '8px',
                      fontSize: '22px',
                      lineHeight: 1
                    }}
                  >
                    💖
                  </span>
                </div>
              </div>

              {/* Real Embroidered Ribbon Tag Below */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFF9E6',
                  border: '1.5px dashed #E5B448',
                  padding: '0.35rem 0.9rem',
                  borderRadius: 'var(--radius-xs)',
                  boxShadow: '0 2px 8px rgba(229, 180, 72, 0.25)',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '12px' }}>🏷️</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#8A5800', letterSpacing: '0.04em' }}>
                    {customTag.trim() ? customTag.trim() : 'Your Name Here'}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)', margin: '0.2rem 0' }}>
                  {selectedYarn.name} + {selectedCharm.name}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  Crafted by artist Saloni with 100% skin-safe milk cotton
                </p>
              </div>

              {/* Instant 1-Tap WhatsApp Custom Order Button */}
              <button
                onClick={handleWhatsAppCustomOrder}
                className="btn btn-mobile-full"
                style={{
                  width: '100%',
                  padding: '0.95rem 1.25rem',
                  background: '#25D366',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-xs)',
                  border: 'none',
                  fontSize: '0.96rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.55rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
              >
                <WhatsAppIcon size={19} color="#FFFFFF" />
                <span>Order Custom Charm (₹299)</span>
              </button>

              <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Check size={12} color="var(--accent-sage)" />
                <span>Includes Metal Keychain Ring & Gift Ribbon • Ships in 2-3 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuteInteractiveYarnPalette;
