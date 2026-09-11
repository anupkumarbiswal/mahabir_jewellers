/**
 * Mahabir Jewellers - Main Application JavaScript
 * Store: Mahabir Jewellers, Kishorenagar, Angul
 * WhatsApp: +91 9938625057
 */

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  let currentCategory = "all";
  let searchQuery = "";
  let cart = JSON.parse(localStorage.getItem("mj_cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("mj_wishlist")) || [];
  let selectedKarat = 22;
  let activeCoupon = null;

  // DOM Elements
  const productsContainer = document.getElementById("productsGrid");
  const categoryPillsContainer = document.getElementById("categoryPills");
  const searchInput = document.getElementById("searchInput");
  const cartCountEl = document.getElementById("cartCount");
  const mobileCartCountEl = document.getElementById("mobileCartCount");
  const wishlistCountEl = document.getElementById("wishlistCount");
  const toastContainer = document.getElementById("toastContainer");

  // Drawers & Modals
  const modalBackdrop = document.getElementById("modalBackdrop");
  const cartDrawer = document.getElementById("cartDrawer");
  const wishlistDrawer = document.getElementById("wishlistDrawer");
  const quickViewModal = document.getElementById("quickViewModal");
  const checkoutModal = document.getElementById("checkoutModal");

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  function init() {
    renderCategoryPills();
    renderProducts();
    updateCartCount();
    updateWishlistCount();
    initRateCalculator();
    setupEventListeners();
  }

  // =========================================================================
  // CATEGORIES & PRODUCTS RENDERING
  // =========================================================================
  function renderCategoryPills() {
    if (!categoryPillsContainer) return;
    categoryPillsContainer.innerHTML = CATEGORIES.map(cat => `
      <button class="pill-btn ${cat.id === currentCategory ? 'active' : ''}" data-cat="${cat.id}">
        <i class="fas ${cat.icon}"></i> ${cat.name}
      </button>
    `).join("");

    categoryPillsContainer.querySelectorAll(".pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentCategory = btn.getAttribute("data-cat");
        document.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts();
      });
    });
  }

  function renderProducts() {
    if (!productsContainer) return;

    const filtered = PRODUCTS.filter(p => {
      const matchCategory = currentCategory === "all" || p.category === currentCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.purity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.metal.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      productsContainer.innerHTML = `
        <div class="empty-catalog">
          <i class="fas fa-gem"></i>
          <h3>No jewellery found</h3>
          <p>Try searching with another keyword or explore all collections.</p>
        </div>
      `;
      return;
    }

    productsContainer.innerHTML = filtered.map(p => {
      const isWishlisted = wishlist.includes(p.id);
      return `
        <div class="product-card" data-id="${p.id}">
          <div class="product-img-wrapper">
            <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy" />
            <span class="product-badge">${p.badge}</span>
            <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}" title="Add to Wishlist">
              <i class="${isWishlisted ? 'fas fa-heart' : 'far fa-heart'}"></i>
            </button>
            <button class="quick-view-overlay-btn" data-id="${p.id}">
              <i class="fas fa-eye"></i> Quick View
            </button>
          </div>
          <div class="product-info">
            <div class="product-specs">
              <span class="hallmark-tag"><i class="fas fa-certificate"></i> ${p.purity}</span>
              <span><i class="fas fa-weight-hanging"></i> ${p.weight}</span>
            </div>
            <h3 class="product-title" title="${p.name}">${p.name}</h3>
            <div class="product-pricing">
              <span class="current-price">₹${p.discountPrice.toLocaleString('en-IN')}</span>
              <span class="original-price">₹${p.basePrice.toLocaleString('en-IN')}</span>
            </div>
            <div class="card-actions">
              <button class="btn-add-cart" data-id="${p.id}">
                <i class="fas fa-shopping-bag"></i> Add to Bag
              </button>
              <button class="btn-direct-wa" data-id="${p.id}" title="Order via WhatsApp directly from Kishorenagar">
                <i class="fab fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    attachProductCardListeners();
  }

  function attachProductCardListeners() {
    // Quick View
    document.querySelectorAll(".quick-view-overlay-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = btn.getAttribute("data-id");
        openQuickView(id);
      });
    });

    // Add to Cart
    document.querySelectorAll(".btn-add-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        addToCart(id);
      });
    });

    // Direct WhatsApp Buy
    document.querySelectorAll(".btn-direct-wa").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        sendSingleProductWhatsApp(id);
      });
    });

    // Wishlist Toggle
    document.querySelectorAll(".wishlist-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        toggleWishlist(id);
      });
    });
  }

  // =========================================================================
  // CART FUNCTIONALITY
  // =========================================================================
  function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.discountPrice,
        weight: product.weight,
        purity: product.purity,
        image: product.image,
        qty: 1
      });
    }

    saveCart();
    showToast(`"${product.name}" added to your bag!`);
    renderCartDrawer();
  }

  function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
    saveCart();
    renderCartDrawer();
  }

  function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    renderCartDrawer();
    showToast("Item removed from bag.");
  }

  function saveCart() {
    localStorage.setItem("mj_cart", JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCountEl) cartCountEl.textContent = totalCount;
    if (mobileCartCountEl) mobileCartCountEl.textContent = totalCount;
  }

  function getCartFinancials() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let discount = 0;
    if (activeCoupon === "MAHABIR10") {
      discount = Math.round(subtotal * 0.10);
    } else if (activeCoupon === "WEDDING5") {
      discount = Math.round(subtotal * 0.05);
    }
    const taxableAmount = Math.max(0, subtotal - discount);
    const gst = Math.round(taxableAmount * 0.03); // 3% Gold GST
    const total = taxableAmount + gst;

    return { subtotal, discount, gst, total };
  }

  function renderCartDrawer() {
    const cartItemsList = document.getElementById("cartItemsList");
    const cartSubtotalEl = document.getElementById("cartSubtotal");
    const cartGstEl = document.getElementById("cartGst");
    const cartDiscountEl = document.getElementById("cartDiscount");
    const cartTotalEl = document.getElementById("cartTotal");

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
          <i class="fas fa-shopping-bag" style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 12px; display: block;"></i>
          <p>Your shopping bag is empty.</p>
          <button class="btn-primary-gold" style="margin-top: 16px; padding: 8px 20px;" onclick="document.getElementById('modalBackdrop').click()">Explore Jewellery</button>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = "₹0";
      if (cartGstEl) cartGstEl.textContent = "₹0";
      if (cartDiscountEl) cartDiscountEl.textContent = "-₹0";
      if (cartTotalEl) cartTotalEl.textContent = "₹0";
      return;
    }

    cartItemsList.innerHTML = cart.map(item => `
      <div class="drawer-item">
        <img src="${item.image}" alt="${item.name}" class="drawer-item-img" />
        <div class="drawer-item-details">
          <h4 class="drawer-item-title">${item.name}</h4>
          <div class="drawer-item-weight">${item.purity} • ${item.weight}</div>
          <div class="drawer-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
          <div class="drawer-item-controls">
            <button class="qty-btn" onclick="window.appUpdateCartQty('${item.id}', -1)">-</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="window.appUpdateCartQty('${item.id}', 1)">+</button>
            <button class="remove-item-btn" onclick="window.appRemoveFromCart('${item.id}')">
              <i class="fas fa-trash-alt"></i> Remove
            </button>
          </div>
        </div>
      </div>
    `).join("");

    const { subtotal, discount, gst, total } = getCartFinancials();
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (cartDiscountEl) cartDiscountEl.textContent = `-₹${discount.toLocaleString('en-IN')}`;
    if (cartGstEl) cartGstEl.textContent = `₹${gst.toLocaleString('en-IN')}`;
    if (cartTotalEl) cartTotalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  // Expose methods for inline handlers
  window.appUpdateCartQty = updateCartQty;
  window.appRemoveFromCart = removeFromCart;

  // =========================================================================
  // WISHLIST FUNCTIONALITY
  // =========================================================================
  function toggleWishlist(productId) {
    const idx = wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast("Removed from wishlist");
    } else {
      wishlist.push(productId);
      showToast(`Added "${product ? product.name : 'Jewellery'}" to wishlist`);
    }

    localStorage.setItem("mj_wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    renderProducts();
    renderWishlistDrawer();
  }

  function updateWishlistCount() {
    if (wishlistCountEl) wishlistCountEl.textContent = wishlist.length;
  }

  function renderWishlistDrawer() {
    const wishlistItemsList = document.getElementById("wishlistItemsList");
    if (!wishlistItemsList) return;

    const items = PRODUCTS.filter(p => wishlist.includes(p.id));

    if (items.length === 0) {
      wishlistItemsList.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
          <i class="far fa-heart" style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 12px; display: block;"></i>
          <p>No jewellery saved in your wishlist yet.</p>
        </div>
      `;
      return;
    }

    wishlistItemsList.innerHTML = items.map(p => `
      <div class="drawer-item">
        <img src="${p.image}" alt="${p.name}" class="drawer-item-img" />
        <div class="drawer-item-details">
          <h4 class="drawer-item-title">${p.name}</h4>
          <div class="drawer-item-weight">${p.purity} • ${p.weight}</div>
          <div class="drawer-item-price">₹${p.discountPrice.toLocaleString('en-IN')}</div>
          <div style="margin-top: 8px; display: flex; gap: 8px;">
            <button class="btn-primary-gold" style="padding: 4px 12px; font-size: 0.75rem;" onclick="window.appMoveToCart('${p.id}')">
              Move to Bag
            </button>
            <button class="remove-item-btn" onclick="window.appRemoveWishlist('${p.id}')">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  window.appMoveToCart = (id) => {
    addToCart(id);
    toggleWishlist(id);
  };
  window.appRemoveWishlist = (id) => {
    toggleWishlist(id);
  };

  // =========================================================================
  // WHATSAPP ORDER GENERATOR
  // =========================================================================
  function sendSingleProductWhatsApp(productId) {
    const p = PRODUCTS.find(prod => prod.id === productId);
    if (!p) return;

    const message = 
      `*Namaste Mahabir Jewellers, Kishorenagar!* 🙏\n\n` +
      `I would like to inquire/order this jewellery piece:\n` +
      `📌 *Item:* ${p.name}\n` +
      `🏷️ *Product Code:* ${p.id}\n` +
      `⚖️ *Weight:* ${p.weight}\n` +
      `✨ *Purity:* ${p.purity}\n` +
      `💰 *Price:* ₹${p.discountPrice.toLocaleString('en-IN')}\n\n` +
      `Please confirm availability, current hallmarking details, and delivery/store visit at Kishorenagar, Angul.\n` +
      `Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  }

  function sendCartWhatsApp() {
    if (cart.length === 0) {
      showToast("Your cart is empty! Add items first.");
      return;
    }

    const { subtotal, discount, gst, total } = getCartFinancials();
    
    let itemsText = cart.map((item, idx) => 
      `${idx + 1}. *${item.name}* (Qty: ${item.qty})\n   Purity: ${item.purity} | Weight: ${item.weight}\n   Price: ₹${(item.price * item.qty).toLocaleString('en-IN')}`
    ).join("\n\n");

    const message = 
      `*Namaste Mahabir Jewellers (Kishorenagar, Angul)!* 🙏\n\n` +
      `I would like to place an order for the following jewellery items:\n\n` +
      `${itemsText}\n\n` +
      `---------------------------\n` +
      `💰 *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n` +
      (discount > 0 ? `🎁 *Discount Applied:* -₹${discount.toLocaleString('en-IN')}\n` : '') +
      `🧾 *GST (3%):* ₹${gst.toLocaleString('en-IN')}\n` +
      `🌟 *Total Payable:* ₹${total.toLocaleString('en-IN')}\n` +
      `---------------------------\n\n` +
      `Please confirm my order and share payment/delivery options (Store Pickup at Kishorenagar / Home Delivery in Angul & Odisha).`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  }

  // =========================================================================
  // QUICK VIEW MODAL
  // =========================================================================
  function openQuickView(productId) {
    const p = PRODUCTS.find(prod => prod.id === productId);
    if (!p) return;

    document.getElementById("qvImage").src = p.image;
    document.getElementById("qvImage").alt = p.name;
    document.getElementById("qvTitle").textContent = p.name;
    document.getElementById("qvPurity").textContent = p.purity;
    document.getElementById("qvWeight").textContent = p.weight;
    document.getElementById("qvCurrentPrice").textContent = `₹${p.discountPrice.toLocaleString('en-IN')}`;
    document.getElementById("qvOriginalPrice").textContent = `₹${p.basePrice.toLocaleString('en-IN')}`;
    document.getElementById("qvDescription").textContent = p.description;
    document.getElementById("qvMakingCharge").textContent = p.makingCharge;

    const qvAddBtn = document.getElementById("qvAddToCartBtn");
    const qvWaBtn = document.getElementById("qvWhatsAppBtn");

    qvAddBtn.onclick = () => {
      addToCart(p.id);
      closeAllModals();
    };

    qvWaBtn.onclick = () => {
      sendSingleProductWhatsApp(p.id);
    };

    openModal(quickViewModal);
  }

  // =========================================================================
  // GOLD RATE CALCULATOR
  // =========================================================================
  function initRateCalculator() {
    const calcWeightInput = document.getElementById("calcWeight");
    const calcTotalEl = document.getElementById("calcTotalPrice");
    const calcGoldValueEl = document.getElementById("calcGoldValue");
    const calcMakingEl = document.getElementById("calcMakingEstimate");
    const karatBtns = document.querySelectorAll(".karat-btn");

    function calculate() {
      const grams = parseFloat(calcWeightInput.value) || 0;
      let ratePerGram = STORE_CONFIG.rates.gold22k;
      if (selectedKarat === 24) ratePerGram = STORE_CONFIG.rates.gold24k;
      if (selectedKarat === 18) ratePerGram = STORE_CONFIG.rates.gold18k;

      const baseGoldValue = Math.round(grams * ratePerGram);
      const estimatedMaking = Math.round(baseGoldValue * 0.10); // average 10% making
      const sub = baseGoldValue + estimatedMaking;
      const gst = Math.round(sub * 0.03); // 3% GST
      const grandTotal = sub + gst;

      if (calcGoldValueEl) calcGoldValueEl.textContent = `₹${baseGoldValue.toLocaleString('en-IN')}`;
      if (calcMakingEl) calcMakingEl.textContent = `₹${estimatedMaking.toLocaleString('en-IN')}`;
      if (calcTotalEl) calcTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
    }

    karatBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        karatBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedKarat = parseInt(btn.getAttribute("data-karat"));
        calculate();
      });
    });

    if (calcWeightInput) {
      calcWeightInput.addEventListener("input", calculate);
    }

    calculate();
  }

  // =========================================================================
  // MODAL & DRAWER CONTROLS
  // =========================================================================
  function openModal(modal) {
    closeAllModals();
    modalBackdrop.classList.add("open");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeAllModals() {
    modalBackdrop.classList.remove("open");
    if (cartDrawer) cartDrawer.classList.remove("open");
    if (wishlistDrawer) wishlistDrawer.classList.remove("open");
    if (quickViewModal) quickViewModal.classList.remove("open");
    if (checkoutModal) checkoutModal.classList.remove("open");
    const apptModal = document.getElementById("appointmentModal");
    if (apptModal) apptModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // =========================================================================
  // EVENT LISTENERS
  // =========================================================================
  function setupEventListeners() {
    // Backdrop click
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", closeAllModals);
    }

    // Close buttons
    document.querySelectorAll(".close-drawer-btn, .modal-close-icon").forEach(btn => {
      btn.addEventListener("click", closeAllModals);
    });

    // Cart Button Click
    const openCartBtn = document.getElementById("openCartBtn");
    const mobileOpenCartBtn = document.getElementById("mobileOpenCartBtn");
    if (openCartBtn) {
      openCartBtn.addEventListener("click", () => {
        renderCartDrawer();
        openModal(cartDrawer);
      });
    }
    if (mobileOpenCartBtn) {
      mobileOpenCartBtn.addEventListener("click", () => {
        renderCartDrawer();
        openModal(cartDrawer);
      });
    }

    // Wishlist Button Click
    const openWishlistBtn = document.getElementById("openWishlistBtn");
    if (openWishlistBtn) {
      openWishlistBtn.addEventListener("click", () => {
        renderWishlistDrawer();
        openModal(wishlistDrawer);
      });
    }

    // Search Input
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderProducts();
      });
    }

    // Cart Order via WhatsApp
    const cartWhatsAppBtn = document.getElementById("cartWhatsAppBtn");
    if (cartWhatsAppBtn) {
      cartWhatsAppBtn.addEventListener("click", sendCartWhatsApp);
    }

    // Proceed to Checkout
    const proceedCheckoutBtn = document.getElementById("proceedCheckoutBtn");
    if (proceedCheckoutBtn) {
      proceedCheckoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
          showToast("Your cart is empty.");
          return;
        }
        openCheckoutModal();
      });
    }

    // Coupon Code Apply
    const applyCouponBtn = document.getElementById("applyCouponBtn");
    const couponInput = document.getElementById("couponInput");
    if (applyCouponBtn && couponInput) {
      applyCouponBtn.addEventListener("click", () => {
        const code = couponInput.value.trim().toUpperCase();
        if (code === "MAHABIR10" || code === "WEDDING5") {
          activeCoupon = code;
          showToast(`Coupon "${code}" applied successfully!`);
          renderCartDrawer();
        } else {
          showToast("Invalid coupon code. Try MAHABIR10 or WEDDING5");
        }
      });
    }

    // Book Appointment Modal Triggers
    const bookApptNavBtn = document.getElementById("bookApptNavBtn");
    const bookApptHeroBtn = document.getElementById("bookApptHeroBtn");
    const appointmentModal = document.getElementById("appointmentModal");
    if (bookApptNavBtn && appointmentModal) {
      bookApptNavBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(appointmentModal);
      });
    }
    if (bookApptHeroBtn && appointmentModal) {
      bookApptHeroBtn.addEventListener("click", () => {
        openModal(appointmentModal);
      });
    }

    // Appointment Form Submit
    const appointmentForm = document.getElementById("appointmentForm");
    if (appointmentForm) {
      appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("apptName").value;
        const phone = document.getElementById("apptPhone").value;
        const date = document.getElementById("apptDate").value;
        const type = document.getElementById("apptType").value;

        const text = 
          `*Namaste Mahabir Jewellers!* 🙏\n` +
          `I would like to book a jewellery consultation appointment:\n` +
          `👤 *Name:* ${name}\n` +
          `📞 *Phone:* ${phone}\n` +
          `📅 *Preferred Date:* ${date}\n` +
          `📍 *Mode:* ${type}\n` +
          `Store Location: Kishorenagar, Angul`;

        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
        closeAllModals();
        showToast("Consultation appointment request submitted!");
      });
    }

    // Checkout Form Submit
    const checkoutForm = document.getElementById("checkoutForm");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("custName").value;
        const phone = document.getElementById("custPhone").value;
        const address = document.getElementById("custAddress").value;
        const payMode = document.querySelector('input[name="paymentMode"]:checked')?.value || "Store Pickup";

        const { subtotal, gst, total } = getCartFinancials();

        const itemsList = cart.map(i => `• ${i.name} (Qty: ${i.qty}) - ₹${(i.price * i.qty).toLocaleString('en-IN')}`).join("\n");

        const msg = 
          `*NEW ORDER - MAHABIR JEWELLERS* 🛍️\n\n` +
          `👤 *Customer:* ${name}\n` +
          `📱 *Mobile:* ${phone}\n` +
          `🏠 *Address:* ${address}\n` +
          `💳 *Payment Method:* ${payMode}\n\n` +
          `*Items Ordered:*\n${itemsList}\n\n` +
          `*Total Amount:* ₹${total.toLocaleString('en-IN')} (Incl. GST)\n\n` +
          `Please confirm this order.`;

        window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
        cart = [];
        saveCart();
        closeAllModals();
        showToast("Thank you! Order confirmed and sent to Mahabir Jewellers.");
      });
    }

    // Payment Mode Radio Switch
    const payModeRadios = document.querySelectorAll('input[name="paymentMode"]');
    const upiQrBox = document.getElementById("upiQrBox");
    payModeRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        if (radio.value === "UPI / QR Code") {
          upiQrBox.classList.add("show");
        } else {
          upiQrBox.classList.remove("show");
        }
      });
    });
  }

  function openCheckoutModal() {
    const { subtotal, discount, gst, total } = getCartFinancials();
    document.getElementById("checkoutSubtotal").textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById("checkoutGst").textContent = `₹${gst.toLocaleString('en-IN')}`;
    document.getElementById("checkoutDiscount").textContent = `-₹${discount.toLocaleString('en-IN')}`;
    document.getElementById("checkoutTotal").textContent = `₹${total.toLocaleString('en-IN')}`;
    openModal(checkoutModal);
  }

  // Toast System
  function showToast(msg) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--gold-primary);"></i> <span>${msg}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Launch app
  init();
});
