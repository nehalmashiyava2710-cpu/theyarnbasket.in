import React, { useState, useRef } from 'react';
import { X, Upload, Video, Sparkles, Tag, Check, Image as ImageIcon, Film } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UploadReelModal = () => {
  const { isUploadReelModalOpen, setIsUploadReelModalOpen, uploadReel, products, showToast } = useStore();

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [taggedProductId, setTaggedProductId] = useState(products[0]?.id || '');
  const [category, setCategory] = useState('process'); // 'process' | 'plushies' | 'decor' | 'unboxing'
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isUploadReelModalOpen) return null;

  const handleFileChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      showToast('Please select a valid video file (.mp4, .mov, .webm)', 'error');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoPreviewUrl(objectUrl);
    showToast('Video loaded! Complete the details and publish.', 'success', '🎬');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalUrl = videoPreviewUrl || customVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-hands-knitting-with-thick-wool-yarn-41484-large.mp4';
    
    if (!title.trim()) {
      showToast('Please add a title for your reel', 'error');
      return;
    }

    const taggedProd = products.find((p) => p.id === taggedProductId);

    uploadReel({
      title,
      caption,
      videoUrl: finalUrl,
      thumbnail: taggedProd?.images[0] || '/products/bloming-sunflower-bouquet-1249-.jpg',
      taggedProductId,
      category,
      duration: '0:30'
    });
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsUploadReelModalOpen(false)}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Close */}
        <button
          onClick={() => setIsUploadReelModalOpen(false)}
          className="btn-icon"
          style={{ position: 'absolute', top: '16px', right: '16px' }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--primary-terracotta)',
            color: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem',
            boxShadow: '0 4px 14px rgba(200,90,50,0.3)'
          }}>
            <Film size={24} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Upload Studio Craft Reel
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Share making-of videos, stitch techniques, unboxings, or tagged product demos.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Video Upload Drop Area */}
          <div>
            <label className="form-label" style={{ marginBottom: '0.5rem' }}>Video File</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragging ? 'var(--primary-terracotta)' : 'var(--border-stitch)'}`,
                borderRadius: 'var(--radius-xs)',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                background: isDragging ? 'var(--primary-rose-light)' : 'var(--bg-warm)',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                position: 'relative'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/mov"
                onChange={(e) => handleFileChange(e.target.files[0])}
                style={{ display: 'none' }}
              />

              {videoPreviewUrl ? (
                <div>
                  <video
                    src={videoPreviewUrl}
                    controls
                    style={{
                      maxHeight: '220px',
                      borderRadius: 'var(--radius-xs)',
                      width: '100%',
                      objectFit: 'contain',
                      background: '#000000',
                      marginBottom: '0.75rem'
                    }}
                  />
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-sage)', fontWeight: '700' }}>
                    ✓ Video selected ({videoFile?.name || 'Uploaded Video'}). Click to change.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--bg-surface)',
                    color: 'var(--primary-terracotta)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <Upload size={20} />
                  </div>
                  <div>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      Drag & Drop your Reel video here
                    </span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Supports MP4, MOV, WebM (Vertical 9:16 looks best)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Or Video URL */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Or Paste Direct Video URL (Optional)</label>
            <input
              type="url"
              placeholder="https://example.com/craft-video.mp4"
              value={customVideoUrl}
              onChange={(e) => setCustomVideoUrl(e.target.value)}
              className="form-input"
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          {/* Title */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Reel Title *</label>
            <input
              type="text"
              placeholder="e.g. Stitching Giant Peony Petals in Atelier 🌸"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Caption */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Caption & Hashtags</label>
            <textarea
              rows="3"
              placeholder="Tell the story behind this piece, stitches used, or tips... #Handmade #Crochet"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* Tagged Product Selector */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Tag size={15} style={{ color: 'var(--primary-terracotta)' }} />
              <span>Tag a Handcrafted Product in this Reel (Instant Buy Link)</span>
            </label>
            <select
              value={taggedProductId}
              onChange={(e) => setTaggedProductId(e.target.value)}
              className="form-select"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (₹{p.price.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Reel Theme / Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="process">Stitching & Making Process</option>
              <option value="plushies">Amigurumi & Cute Characters</option>
              <option value="decor">Home Décor & Blanket Moments</option>
              <option value="unboxing">Customer Unboxing & Reactions</option>
            </select>
          </div>

          {/* Action */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', marginTop: '0.5rem', boxShadow: '0 6px 20px rgba(217,107,79,0.35)' }}
          >
            <Sparkles size={18} />
            <span>Publish Reel to Studio</span>
          </button>
        </form>
      </div>
    </div>
  );
};
