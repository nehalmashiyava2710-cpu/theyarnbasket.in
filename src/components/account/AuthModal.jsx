import React, { useState } from 'react';
import { X, Eye, EyeOff, Sparkles, Heart, Check, Lock, Mail, User, Phone } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, loginUser, signupUser, showToast } = useStore();

  const [mode, setMode] = useState(authModalMode || 'login'); // 'login' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  if (!isAuthModalOpen) return null;

  const validate = () => {
    const err = {};
    if (!email || !email.includes('@')) err.email = 'Please enter a valid email';
    if (!password || password.length < 6) err.password = 'Password must be at least 6 characters';
    if (mode === 'signup') {
      if (!name.trim()) err.name = 'Please enter your name';
      if (password !== confirmPassword) err.confirmPassword = 'Passwords do not match';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'forgot') {
      showToast('Password reset link sent to your email! 💌', 'success');
      setMode('login');
      return;
    }

    if (!validate()) return;

    if (mode === 'login') {
      loginUser(email, password);
    } else {
      signupUser({ name, email, phone, password });
    }
  };

  const handleDemoFill = () => {
    setEmail('ananya.sharma@example.com');
    setPassword('craftlove123');
    setName('Ananya Sharma');
    setPhone('+91 98765 43210');
    setErrors({});
  };

  return (
    <div className="modal-backdrop" onClick={closeAuthModal}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', padding: '2rem' }}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="btn-icon"
          style={{ position: 'absolute', top: '16px', right: '16px' }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-xs)',
            background: 'var(--primary-terracotta)',
            color: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={24} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: '600', color: 'var(--text-main)' }}>
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Join the Craft Circle'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {mode === 'login' && 'Sign in to access your orders, wishlist & craft profile.'}
            {mode === 'signup' && 'Create an account to track orders and save bespoke designs.'}
            {mode === 'forgot' && 'Enter your email to receive a recovery link.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                />
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              </div>
              {errors.name && <span style={{ fontSize: '0.75rem', color: '#D9534F' }}>{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px' }}
              />
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
            {errors.email && <span style={{ fontSize: '0.75rem', color: '#D9534F' }}>{errors.email}</span>}
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Phone Number (Optional)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                />
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              </div>
            </div>
          )}

          {mode !== 'forgot' && (
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    style={{ fontSize: '0.78rem', color: 'var(--primary-terracotta)', fontWeight: '600' }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px', paddingRight: '38px' }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    color: 'var(--text-light)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span style={{ fontSize: '0.75rem', color: '#D9534F' }}>{errors.password}</span>}
            </div>
          )}

          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              </div>
              {errors.confirmPassword && <span style={{ fontSize: '0.75rem', color: '#D9534F' }}>{errors.confirmPassword}</span>}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.75rem', fontSize: '0.95rem' }}
          >
            {mode === 'login' && 'Sign In to Studio'}
            {mode === 'signup' && 'Create My Account'}
            {mode === 'forgot' && 'Send Reset Link'}
          </button>
        </form>

        {/* Demo Quick Fill Button */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={handleDemoFill}
            style={{
              fontSize: '0.78rem',
              color: 'var(--accent-sage)',
              fontWeight: '600',
              textDecoration: 'underline',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            ⚡ Auto-fill Demo Account Details
          </button>
        </div>

        {/* Switch Mode Footer */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          {mode === 'login' && (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrors({});
                }}
                style={{ color: 'var(--primary-terracotta)', fontWeight: '700' }}
              >
                Sign Up Now
              </button>
            </span>
          )}
          {mode === 'signup' && (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrors({});
                }}
                style={{ color: 'var(--primary-terracotta)', fontWeight: '700' }}
              >
                Sign In
              </button>
            </span>
          )}
          {mode === 'forgot' && (
            <button
              type="button"
              onClick={() => setMode('login')}
              style={{ color: 'var(--primary-terracotta)', fontWeight: '700' }}
            >
              ← Back to Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
