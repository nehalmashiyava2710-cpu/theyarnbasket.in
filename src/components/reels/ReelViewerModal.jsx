import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Share2, 
  Volume2, 
  VolumeX, 
  ShoppingBag, 
  ChevronUp, 
  ChevronDown, 
  Play, 
  Pause, 
  Sparkles,
  Send,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useStore } from '../../context/StoreContext';

export const ReelViewerModal = ({ navigate }) => {
  const { 
    reels, 
    activeReel, 
    setActiveReel, 
    likeReel, 
    addReelComment, 
    products, 
    addToCart, 
    directWhatsAppChat,
    showToast 
  } = useStore();

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [heartAnim, setHeartAnim] = useState(false);
  const [viewMode, setViewMode] = useState('studio'); // 'studio' or 'instagram'
  const videoRef = useRef(null);

  if (!activeReel) return null;

  const currentReelIndex = reels.findIndex((r) => r.id === activeReel.id);
  const currentReel = currentReelIndex > -1 ? reels[currentReelIndex] : activeReel;
  const taggedProduct = currentReel.taggedProductId 
    ? products.find((p) => p.id === currentReel.taggedProductId) 
    : null;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // If unmuted autoplay is blocked by browser, mute and retry
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
    }
  }, [currentReel?.id, currentReel?.videoUrl]);

  const handleNextReel = () => {
    const nextIdx = (currentReelIndex + 1) % reels.length;
    setActiveReel(reels[nextIdx]);
    setShowComments(false);
  };

  const handlePrevReel = () => {
    const prevIdx = (currentReelIndex - 1 + reels.length) % reels.length;
    setActiveReel(reels[prevIdx]);
    setShowComments(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDoubleTap = () => {
    if (!currentReel.isLiked) {
      likeReel(currentReel.id);
    }
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 900);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentReel.instagramUrl || window.location.href);
      showToast('Reel link copied! Share with your loved ones 🌸', 'success');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addReelComment(currentReel.id, commentInput);
    setCommentInput('');
    showToast('Sweet comment added! 🧶✨', 'success');
  };

  const handleQuickAddProduct = (e) => {
    e.stopPropagation();
    if (taggedProduct) {
      addToCart(taggedProduct, 1);
      showToast(`Added ${taggedProduct.name} to your bag! 🛍️`, 'success');
    }
  };

  const handleViewProductPage = (e) => {
    e.stopPropagation();
    if (taggedProduct) {
      setActiveReel(null);
      navigate('product', { id: taggedProduct.id });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveReel(null)} style={{ background: 'rgba(10, 8, 7, 0.92)', zIndex: 1000 }}>
      <div
        className="reel-player-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '430px',
          height: '92vh',
          maxHeight: '840px',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          background: '#1A1614',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(200, 90, 50, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(255,255,255,0.15)'
        }}
      >
        {/* Top Floating Action Bar */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          zIndex: 40,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Author Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(8px)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-xs)'
          }}>
            <img
              src="/logo.png"
              alt="The Yarn Basket"
              style={{ width: '26px', height: '26px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--primary-peach)' }}
            />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '0.78rem' }}>
                The Yarn Basket
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.66rem' }}>
                @theyarnbasket.in
              </div>
            </div>
          </div>

          {/* Right Top Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Instagram Official Post Link */}
            <a
              href={currentReel.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'var(--primary-terracotta)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-xs)',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(200, 90, 50, 0.4)'
              }}
              title="Open Official Instagram Reel"
            >
              <span>Instagram</span>
              <ExternalLink size={12} />
            </a>

            {/* Close Modal Button */}
            <button
              onClick={() => setActiveReel(null)}
              className="btn-icon"
              style={{
                width: '32px',
                height: '32px',
                background: 'rgba(0,0,0,0.65)',
                color: '#FFFFFF',
                border: 'none',
                backdropFilter: 'blur(6px)',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Player Box */}
        <div
          style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}
          onClick={togglePlay}
          onDoubleClick={handleDoubleTap}
        >
          {viewMode === 'instagram' ? (
            <iframe
              src={currentReel.embedUrl}
              title={currentReel.title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: '#000000'
              }}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              key={currentReel.id + '-' + currentReel.videoUrl}
              src={currentReel.videoUrl}
              poster={currentReel.thumbnail}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}

          {/* Pause Indicator */}
          {viewMode === 'studio' && !isPlaying && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.4)',
              zIndex: 10
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Play size={32} fill="#FFFFFF" />
              </div>
            </div>
          )}

          {/* Double-tap animated heart */}
          {heartAnim && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 25,
              pointerEvents: 'none',
              animation: 'modalScale 0.4s ease-out'
            }}>
              <Heart size={95} fill="#FF4D6D" stroke="#FFFFFF" strokeWidth={2} />
            </div>
          )}

          {/* Right Floating Actions (Like, Comment, Share, Mute, Mode) */}
          <div style={{
            position: 'absolute',
            right: '12px',
            bottom: taggedProduct ? '175px' : '110px',
            zIndex: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            {/* Like */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                likeReel(currentReel.id);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                background: 'transparent',
                border: 'none',
                color: currentReel.isLiked ? '#FF4D6D' : '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-xs)',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart size={20} fill={currentReel.isLiked ? '#FF4D6D' : 'none'} />
              </div>
              <span style={{ fontSize: '0.74rem', fontWeight: '800', textShadow: '0 1px 4px rgba(0,0,0,0.9)', color: '#FFFFFF' }}>
                {currentReel.likes}
              </span>
            </button>

            {/* Comment */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowComments(!showComments);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-xs)',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageCircle size={20} />
              </div>
              <span style={{ fontSize: '0.74rem', fontWeight: '800', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                {currentReel.comments?.length || 0}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-xs)',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Share2 size={18} />
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: '700', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                Share
              </span>
            </button>

            {/* Sound Mute/Unmute */}
            {viewMode === 'studio' && (
              <button
                onClick={toggleMute}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            )}
          </div>

          {/* Bottom Caption and Tagged Product Card */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.25rem 1rem 1.1rem 1rem',
            background: 'linear-gradient(to top, rgba(12,8,6,0.96) 0%, rgba(12,8,6,0.7) 65%, transparent 100%)',
            zIndex: 20,
            color: '#FFFFFF'
          }}>
            {/* Cute Tag Pill */}
            {currentReel.cuteTag && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255,255,255,0.92)',
                color: '#1A1614',
                fontSize: '0.7rem',
                fontWeight: '800',
                padding: '0.15rem 0.55rem',
                borderRadius: 'var(--radius-xs)',
                marginBottom: '0.4rem'
              }}>
                {currentReel.cuteTag}
              </div>
            )}

            <h3 style={{ fontSize: '0.96rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.3rem', textShadow: '0 1px 4px rgba(0,0,0,0.9)', lineHeight: 1.25 }}>
              {currentReel.title}
            </h3>

            <p style={{
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: '1.35',
              marginBottom: taggedProduct ? '0.75rem' : '0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {currentReel.caption}
            </p>

            {/* Tagged Product Box with Direct WhatsApp & Bag Button */}
            {taggedProduct && (
              <div
                onClick={handleViewProductPage}
                style={{
                  background: 'rgba(255,255,255,0.96)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.55rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.65rem',
                  color: 'var(--text-main)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={taggedProduct.images[0]}
                  alt={taggedProduct.name}
                  style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {taggedProduct.name}
                  </div>
                  <div style={{ fontSize: '0.84rem', fontWeight: '800', color: 'var(--primary-terracotta)' }}>
                    ₹{taggedProduct.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                  {/* Direct WhatsApp Order */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const msg = `Hi Saloni ma'am! 🌸 I saw your reel for "${taggedProduct.name}" (${currentReel.title}). I would love to order this! (Price: ₹${taggedProduct.price})`;
                      directWhatsAppChat(msg, taggedProduct.name);
                    }}
                    style={{
                      background: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 'var(--radius-xs)',
                      padding: '0.4rem 0.65rem',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                    title="Order directly on WhatsApp"
                  >
                    <WhatsAppIcon size={13} color="#FFFFFF" />
                    <span>Order</span>
                  </button>

                  {/* Add to Bag */}
                  <button
                    onClick={handleQuickAddProduct}
                    className="btn btn-primary"
                    style={{
                      padding: '0.4rem 0.65rem',
                      fontSize: '0.72rem',
                      borderRadius: 'var(--radius-xs)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <ShoppingBag size={12} />
                    <span>Bag</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comment Drawer Overlay */}
        {showComments && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '58%',
              background: 'var(--bg-surface)',
              borderTopLeftRadius: 'var(--radius-sm)',
              borderTopRightRadius: 'var(--radius-sm)',
              zIndex: 35,
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 -10px 30px rgba(0,0,0,0.5)',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                Comments ({currentReel.comments?.length || 0}) 🌸
              </span>
              <button onClick={() => setShowComments(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            {/* Comments List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.75rem' }}>
              {currentReel.comments && currentReel.comments.length > 0 ? (
                currentReel.comments.map((c, i) => (
                  <div key={i} style={{ fontSize: '0.84rem', background: 'var(--bg-warm)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-xs)' }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{c.author}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: '400' }}>{c.time}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>{c.text}</div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '2rem' }}>
                  No comments yet. Leave a sweet note for Saloni! 🌸
                </div>
              )}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Write a sweet craft note..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="form-input"
                style={{ padding: '0.5rem 0.85rem', fontSize: '0.84rem', borderRadius: 'var(--radius-xs)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 0.95rem', borderRadius: 'var(--radius-xs)' }}>
                <Send size={14} />
              </button>
            </form>
          </div>
        )}

        {/* Up / Down Navigation Controls for Desktop */}
        <div style={{
          position: 'absolute',
          right: '-55px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }} className="d-desktop-nav">
          <button
            onClick={handlePrevReel}
            className="btn-icon"
            style={{ background: 'var(--bg-surface)', color: 'var(--text-main)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-card)' }}
            title="Previous Reel"
          >
            <ChevronUp size={22} />
          </button>
          <button
            onClick={handleNextReel}
            className="btn-icon"
            style={{ background: 'var(--bg-surface)', color: 'var(--text-main)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-card)' }}
            title="Next Reel"
          >
            <ChevronDown size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelViewerModal;

