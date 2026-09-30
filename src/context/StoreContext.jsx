import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { INITIAL_REELS } from '../data/reels';
import confetti from 'canvas-confetti';
import { sendCustomOrderEmail } from '../services/emailService';

const StoreContext = createContext();

const STORAGE_KEYS = {
  PRODUCTS: 'yarn_basket_products_v2',
  CART: 'sutram_cart_v1',
  WISHLIST: 'sutram_wishlist_v1',
  USER: 'sutram_user_v1',
  ORDERS: 'sutram_orders_v1',
  ADDRESSES: 'sutram_addresses_v1',
  CUSTOM_REQUESTS: 'sutram_custom_reqs_v1',
  CALLBACKS: 'sutram_callbacks_v1',
  REELS: 'sutram_reels_v4',
  THEME: 'sutram_theme_v1'
};

export const STUDIO_CONTACT = {
  phone: '+91 95106 66234',
  phoneClean: '919510666234',
  whatsappUrl: 'https://wa.me/919510666234',
  artistName: 'Saloni Ma’am',
  studioName: 'The Yarn Basket Atelier',
  location: 'Indiranagar, Bengaluru / Pan-India Delivery',
  availableHours: '9:30 AM - 8:30 PM (Mon-Sun)'
};

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Ananya Sharma',
    type: 'Home',
    street: 'Flat 402, Lotus Blossom Enclave, Indiranagar',
    apartment: 'Block B, 4th Floor',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    phone: '+91 98765 43210',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Ananya Studio',
    type: 'Studio / Office',
    street: 'Artisan Haven, 12th Main Road, Bandra West',
    apartment: 'Suite 101',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    phone: '+91 98765 43210',
    isDefault: false
  }
];

const INITIAL_ORDERS = [
  {
    id: 'SLN-84291',
    date: '2026-09-24',
    status: 'Crafting in Studio',
    statusStep: 2, // 1: Placed, 2: Crafting, 3: Quality Check, 4: Dispatched, 5: Delivered
    estimatedDelivery: 'Oct 02, 2026',
    items: [
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Warm Sunshine Gold',
        selectedSize: 'Standard Bouquet (5 Blooms)',
        unitPrice: 1249
      },
      {
        product: PRODUCTS[4],
        quantity: 1,
        selectedColor: 'Baby Blossom Pink',
        selectedSize: 'Mini (7.5 cm)',
        unitPrice: 249
      }
    ],
    subtotal: 1498,
    discount: 150,
    shipping: 0,
    total: 1348,
    paymentMethod: 'UPI (Google Pay / PhonePe)',
    address: DEFAULT_ADDRESSES[0],
    trackingCode: 'DTDC-IND-7789421'
  }
];

export const StoreProvider = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  });

  // Reactive Products State (with Admin CRUD support)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch (e) {
      return PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-01', 'prod-04'];
    } catch (e) {
      return ['prod-01', 'prod-04'];
    }
  });

  // User Auth - No dummy profile by default
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  // Addresses
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch (e) {
      return DEFAULT_ADDRESSES;
    }
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  });

  // Custom Requests
  const [customRequests, setCustomRequests] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_REQUESTS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'REQ-1042',
          itemType: 'Custom Bouquet',
          colorPalette: 'Pastel Lilac & Sage Green',
          description: 'A 7-flower bouquet with 3 white lilies, 2 purple tulips and 2 daisies with initials "A&R" embroidered tag.',
          budget: '₹1,500 - ₹2,000',
          neededBy: '2026-10-15',
          status: 'Under Review by Saloni',
          date: '2026-09-25'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Reels & Video Studio
  const [reels, setReels] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REELS);
      if (!saved) return INITIAL_REELS;
      const parsed = JSON.parse(saved);
      const freshById = Object.fromEntries(INITIAL_REELS.map((r) => [r.id, r]));
      const merged = parsed.map((r) => {
        const fresh = freshById[r.id];
        if (!fresh) return r;
        return {
          ...r,
          videoUrl: r.videoUrl || fresh.videoUrl,
          thumbnail: r.thumbnail || fresh.thumbnail,
          cuteTag: r.cuteTag || fresh.cuteTag
        };
      });
      const missing = INITIAL_REELS.filter((r) => !parsed.some((p) => p.id === r.id));
      return [...merged, ...missing];
    } catch (e) {
      return INITIAL_REELS;
    }
  });
  const [activeReel, setActiveReel] = useState(null);
  const [isUploadReelModalOpen, setIsUploadReelModalOpen] = useState(false);

  // Service Inquiry & Instant Callback System
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceModalData, setServiceModalData] = useState(null);
  const [callbackRequests, setCallbackRequests] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CALLBACKS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'CB-8012',
          name: 'Pooja Verma',
          phone: '+91 98451 22390',
          serviceName: 'Wedding, Festive & Bulk Gifting Hampers',
          serviceId: 'event-wedding-gifting',
          preferredTime: 'Within 15 minutes (Instant ⚡)',
          note: 'Need 35 sunflower mini hampers for sister’s Mehendi in Nov.',
          status: 'Scheduled',
          createdAt: '2026-09-27T14:30:00'
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // UI States: Search & Toasts & QuickView
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CALLBACKS, JSON.stringify(callbackRequests));
  }, [callbackRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REELS, JSON.stringify(reels));
  }, [reels]);

  // Toast helper
  const showToast = (message, type = 'success', icon = '✨') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    showToast(`Switched to ${theme === 'light' ? 'Night Studio' : 'Daylight Atelier'} mode`, 'info', '🧶');
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, options = {}) => {
    const color = options.selectedColor || (product.availableColors?.[0]?.name || 'Standard');
    const size = options.selectedSize || (product.availableSizes?.[0] || 'Standard');
    const cartItemId = `${product.id}_${color}_${size}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            productId: product.id,
            product,
            quantity,
            selectedColor: color,
            selectedSize: size,
            customNote: options.customNote || '',
            unitPrice: product.price
          }
        ];
      }
    });

    showToast('Added with love ♡', 'success', '🧶');
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info', '🗑️');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HANDMADE10') {
      setAppliedCoupon({ code: 'HANDMADE10', discountType: 'percent', value: 10, name: '10% Handmade Celebration' });
      showToast('🎉 Coupon HANDMADE10 applied! 10% discount added.', 'success');
      return true;
    } else if (clean === 'YARNLOVE') {
      setAppliedCoupon({ code: 'YARNLOVE', discountType: 'fixed', value: 150, name: '₹150 Studio Gift' });
      showToast('🎉 Coupon YARNLOVE applied! ₹150 off.', 'success');
      return true;
    } else if (clean === 'WELCOME50') {
      setAppliedCoupon({ code: 'WELCOME50', discountType: 'fixed', value: 50, name: '₹50 Welcome Stitch' });
      showToast('🎉 Coupon WELCOME50 applied! ₹50 off.', 'success');
      return true;
    } else {
      showToast('Invalid coupon code. Try HANDMADE10 or YARNLOVE', 'error', '⚠️');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      couponDiscount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      couponDiscount = appliedCoupon.value;
    }
  }

  // Free shipping threshold: ₹999
  const shippingFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 79;
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);
  const freeShippingThreshold = 999;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    const exists = wishlist.includes(productId);
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(`Removed "${prod?.name || 'Item'}" from wishlist`, 'info', '🤍');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(`Saved "${prod?.name || 'Item'}" to your wishlist!`, 'success', '💖');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Auth Operations
  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginUser = (email, password) => {
    // Simulated smooth authentication
    const user = {
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      phone: '+91 98765 43210',
      bio: 'Lover of handmade aesthetic & artisanal yarns 🧶',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setCurrentUser(user);
    closeAuthModal();
    showToast(`Welcome back, ${user.name}! 🌸`, 'success');
  };

  const signupUser = (userData) => {
    const user = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+91 98765 43210',
      bio: 'New crafter in Saloni’s studio family ✨',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    };
    setCurrentUser(user);
    closeAuthModal();
    showToast(`Account created! Welcome to Sūtram Studio, ${user.name}! 🧵`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out successfully. See you soon!', 'info');
  };

  const updateProfile = (data) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
    showToast('Profile details updated successfully! 🌿', 'success');
  };

  // Addresses Operations
  const addAddress = (addr) => {
    const newAddr = { ...addr, id: `addr-${Date.now()}` };
    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
    showToast('Delivery address saved!', 'success', '📍');
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    showToast('Default address updated', 'success');
  };

  // Checkout & Order Placement
  const placeOrder = (orderData) => {
    const orderId = `SLN-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString().split('T')[0];

    const newOrder = {
      id: orderId,
      date: now,
      status: 'Crafting in Studio',
      statusStep: 2,
      estimatedDelivery: '5-7 business days',
      items: [...cart],
      subtotal: cartSubtotal,
      discount: couponDiscount,
      shipping: shippingFee,
      total: cartTotal,
      paymentMethod: orderData.paymentMethod || 'UPI (Google Pay / PhonePe)',
      address: orderData.address || addresses.find((a) => a.isDefault) || addresses[0],
      customer: {
        name: orderData.name || currentUser?.name || 'Valued Crafter',
        email: orderData.email || currentUser?.email || 'customer@example.com',
        phone: orderData.phone || currentUser?.phone || '+91 98765 43210'
      },
      trackingCode: `EXP-IND-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D96B4F', '#F4A261', '#7DA691', '#E5B448', '#D98880']
      });
    } catch (e) {
      console.log('Confetti trigger');
    }

    return newOrder;
  };

  // Custom Order Submission with Automated Email Dispatch
  const submitCustomRequest = (data) => {
    const newReq = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Under Review by Saloni',
      ...data
    };
    setCustomRequests((prev) => [newReq, ...prev]);

    // Asynchronously dispatch formal email notification
    sendCustomOrderEmail(newReq).then((res) => {
      console.log('Email dispatched for custom inquiry:', res);
    }).catch((err) => {
      console.warn('Email dispatch warning:', err);
    });

    showToast(`Custom order #${newReq.id} submitted! Email copy sent to ${data.customerEmail || 'your email'}. 💌`, 'success', '💌');
    return newReq;
  };

  // Reels Operations
  const uploadReel = (reelData) => {
    const newReel = {
      id: `reel-${Date.now()}`,
      title: reelData.title || 'Untitled Studio Craft Reel',
      caption: reelData.caption || '',
      videoUrl: reelData.videoUrl,
      thumbnail: reelData.thumbnail || '/products/bloming-sunflower-bouquet-1249-.jpg',
      duration: reelData.duration || '0:30',
      views: '1',
      likes: 1,
      isLiked: false,
      category: reelData.category || 'process',
      taggedProductId: reelData.taggedProductId || null,
      author: {
        name: currentUser?.name || 'Saloni Crafter',
        handle: currentUser ? `@${currentUser.name.toLowerCase().replace(/\s+/g, '_')}` : '@saloni_maker',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      comments: []
    };

    setReels((prev) => [newReel, ...prev]);
    setIsUploadReelModalOpen(false);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D96B4F', '#F4A261', '#E5B448']
      });
    } catch (e) {}

    showToast('🎬 Your reel has been published to the Studio Gallery!', 'success', '✨');
    return newReel;
  };

  const likeReel = (reelId) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          const isLiked = !r.isLiked;
          const likes = isLiked ? r.likes + 1 : Math.max(0, r.likes - 1);
          return { ...r, isLiked, likes };
        }
        return r;
      })
    );
  };

  const addReelComment = (reelId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      author: currentUser?.name || 'Handmade Lover',
      text: commentText,
      time: 'Just now'
    };

    setReels((prev) =>
      prev.map((r) => {
        if (r.id === reelId) {
          return { ...r, comments: [newComment, ...(r.comments || [])] };
        }
        return r;
      })
    );
    showToast('Comment posted! 💬', 'success');
  };

  // Service Inquiry & Callback Operations
  const openServiceModal = (serviceData = null) => {
    setServiceModalData(serviceData);
    setIsServiceModalOpen(true);
  };

  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
    setServiceModalData(null);
  };

  const requestInstantCallback = (data) => {
    const callbackId = `CB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq = {
      id: callbackId,
      name: data.name || currentUser?.name || 'Visitor',
      phone: data.phone || currentUser?.phone || '',
      serviceName: data.serviceName || 'General Craft Inquiry / Custom Commission',
      serviceId: data.serviceId || 'bespoke-commission',
      preferredTime: data.preferredTime || 'Within 15 minutes (Instant ⚡)',
      note: data.note || '',
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    };

    setCallbackRequests((prev) => [newReq, ...prev]);
    closeServiceModal();

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D96B4F', '#7DA691', '#F4A261', '#E5B448']
      });
    } catch (e) {}

    showToast(`⚡ Callback request registered for ${newReq.phone}! Saloni will connect with you soon. 🌸`, 'success', '📞');
    return newReq;
  };

  const directWhatsAppChat = (message = '', serviceName = null) => {
    let finalMessage = message;
    if (!finalMessage) {
      if (serviceName) {
        finalMessage = `Hi Saloni ma'am! I'm inquiring about "${serviceName}" from The Yarn Basket. Could you share booking and customization details?`;
      } else {
        finalMessage = `Hi Saloni ma'am! I visited The Yarn Basket website and would love to consult about your handcrafted craft services & custom orders. 🌸`;
      }
    }
    const url = `https://wa.me/919510666234?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
    showToast('Opening WhatsApp with Saloni Ma’am... 💬', 'info', '🧶');
  };

  // Admin / Product & Order Management Operations
  const addProduct = (productData) => {
    const id = `prod-${Date.now()}`;
    const slug = (productData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct = {
      id,
      slug,
      sku: productData.sku || `SLN-CUST-${Math.floor(100 + Math.random() * 900)}`,
      name: productData.name || 'Untitled Yarn Creation',
      price: Number(productData.price) || 499,
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : Math.round(Number(productData.price || 499) * 1.25),
      category: productData.category || 'crochet',
      categoryName: productData.categoryName || 'Crochet Items',
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 1,
      inStock: productData.inStock !== false,
      stockQty: Number(productData.stockQty) || 10,
      leadTimeDays: productData.leadTimeDays || '2-3 crafting days',
      isBestseller: !!productData.isBestseller,
      isFeatured: !!productData.isFeatured,
      isNew: true,
      isCustomizable: productData.isCustomizable !== false,
      isHandmade: true,
      images: Array.isArray(productData.images) && productData.images.length > 0 
        ? productData.images 
        : [productData.image || '/products/bloming-sunflower-bouquet-1249-.jpg'],
      shortDescription: productData.shortDescription || 'Handcrafted yarn creation by Saloni.',
      fullDescription: productData.fullDescription || 'Lovingly hand-crocheted stitch-by-stitch in our atelier.',
      materials: productData.materials || '100% Premium Milk Cotton Yarn',
      dimensions: productData.dimensions || 'Standard Artisan Size',
      availableColors: productData.availableColors || [{ name: 'Warm Cream', hex: '#FAF7F2' }],
      availableSizes: productData.availableSizes || ['Standard'],
      tags: productData.tags || ['Handmade', 'Craft', 'Yarn']
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`🌸 "${newProduct.name}" added to shop catalog!`, 'success');
    return newProduct;
  };

  const updateProduct = (productId, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updatedFields } : p))
    );
    showToast('Product details updated successfully! 🌿', 'success');
  };

  const deleteProduct = (productId) => {
    const prod = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast(`Removed "${prod?.name || 'Item'}" from shop.`, 'info');
  };

  const updateOrderStatus = (orderId, newStatus, newStep) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            statusStep: newStep !== undefined ? newStep : ord.statusStep
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} updated to "${newStatus}" 📦`, 'success');
  };

  const updateCustomRequestStatus = (requestId, newStatus) => {
    setCustomRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req))
    );
    showToast(`Custom Request ${requestId} status updated! ✨`, 'success');
  };

  const resetProductsToDefault = () => {
    setProducts(PRODUCTS);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(PRODUCTS));
    showToast('Reset product catalog to default atelier collection! 🧶', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        studioContact: STUDIO_CONTACT,
        // Products & Admin CRUD
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        updateCustomRequestStatus,
        resetProductsToDefault,
        // Cart
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        appliedCoupon,
        couponDiscount,
        shippingFee,
        cartTotal,
        freeShippingRemaining,
        applyCoupon,
        removeCoupon,
        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        // Auth
        currentUser,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        loginUser,
        signupUser,
        logoutUser,
        updateProfile,
        // Addresses
        addresses,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        // Orders
        orders,
        placeOrder,
        trackingOrder,
        setTrackingOrder,
        // Custom Requests
        customRequests,
        submitCustomRequest,
        // Service Inquiry & Callbacks
        isServiceModalOpen,
        serviceModalData,
        openServiceModal,
        closeServiceModal,
        callbackRequests,
        requestInstantCallback,
        directWhatsAppChat,
        // Reels & Video Studio
        reels,
        activeReel,
        setActiveReel,
        isUploadReelModalOpen,
        setIsUploadReelModalOpen,
        uploadReel,
        likeReel,
        addReelComment,
        // UI
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
