// Gallery Modal Functions
let currentProductName = '';

function showProductInfo(element) {
  const productData = element.querySelector('.product-data');
  const image = element.querySelector('img');
  const modal = document.getElementById('productModal');
  
  if (productData && image && modal) {
    // Get product information from data attributes
    const name = productData.dataset.name;
    const description = productData.dataset.description;
    const category = productData.dataset.category;
    const price = productData.dataset.price;
    const imageSrc = image.src;
    
    // Store current product name for WhatsApp
    currentProductName = name;
    
    // Update modal content
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalCategory').textContent = category;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalPrice').textContent = price;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('productModal');
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Reveal sections on scroll
window.addEventListener('scroll', () => {
  document.querySelectorAll('section').forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
      sec.classList.add('show');
    }
  });
});

// WhatsApp send message
function contactWhatsApp(item) {
  const productName = item || currentProductName || 'your products';
  const msg = encodeURIComponent(`Hello! I'd like more details about ${productName}.`);
  window.open(`https://wa.me/919030301893?text=${msg}`, '_blank');
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const menuOverlay = document.getElementById('menuOverlay');
  
  if (menuToggle && mainNav && menuOverlay) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when overlay is clicked
    menuOverlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // Close menu when a navigation link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const cameraBtn = document.getElementById('cameraBtn');
  const imageSearch = document.getElementById('imageSearch');
  const searchResultsSection = document.getElementById('searchResults');
  const searchResultsContainer = document.querySelector('.search-results-container');
  const searchQueryDisplay = document.querySelector('.search-query');
  const clearSearchBtn = document.getElementById('clearSearch');
  const servicesSection = document.getElementById('services');
  const gallerySection = document.getElementById('gallery');

  if (!searchInput || !searchBtn || !searchResultsSection) {
    console.error('Search elements not found');
    return;
  }

  if (!servicesSection || !gallerySection) {
    console.error('Services or Gallery section not found');
    return;
  }

  console.log('Search initialized successfully');

  // Camera button functionality for image search
  if (cameraBtn && imageSearch) {
    cameraBtn.addEventListener('click', function() {
      imageSearch.click();
    });

    // Handle image selection
    imageSearch.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        console.log('Image selected:', file.name);
        
        // Clear text search input
        searchInput.value = '';
        searchResultsSection.style.display = 'block';
        servicesSection.style.display = 'none';
        gallerySection.style.display = 'none';
        
        // Create a preview of the uploaded image
        const reader = new FileReader();
        reader.onload = function(event) {
          const imagePreview = `<div style="display: inline-block; margin: 10px; padding: 10px; border: 2px solid #4b2e2e; border-radius: 8px; background: white;">
            <img src="${event.target.result}" alt="Search Image" style="max-width: 200px; max-height: 200px; border-radius: 4px; display: block; margin-bottom: 10px;">
            <p style="margin: 0; color: #666; font-size: 14px; text-align: center;">Uploaded Image</p>
          </div>`;
          
          searchQueryDisplay.innerHTML = `<span style="color: #4b2e2e;">🔍 Searching by image...</span><br>${imagePreview}<br><small style="color: #666;">Showing similar furniture and interiors</small>`;
        };
        reader.readAsDataURL(file);
        
        // Clear previous results
        searchResultsContainer.innerHTML = '';
        
        // For now, show all products when image is uploaded
        // In a real implementation, this would use AI/ML to match the image
        const serviceCards = servicesSection ? servicesSection.querySelectorAll('.card') : [];
        const galleryCards = gallerySection ? gallerySection.querySelectorAll('.card') : [];
        const allCards = [...serviceCards, ...galleryCards];
        
        allCards.forEach(card => {
          const resultCard = card.cloneNode(true);
          const links = resultCard.querySelectorAll('.card-link');
          links.forEach(link => link.remove());
          searchResultsContainer.appendChild(resultCard);
        });
        
        // Update count after a brief delay to ensure image loads
        setTimeout(() => {
          if (allCards.length > 0) {
            searchQueryDisplay.innerHTML += `<br><span style="color: #4b2e2e; font-size: 16px; font-weight: bold;">Found ${allCards.length} matching items</span>`;
          }
        }, 100);
      }
    });
  }

  function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  console.log('Search term:', searchTerm);
  
  // If search is empty, show original sections
  if (searchTerm === '') {
    clearSearch();
    return;
  }

  // Hide original sections
  if (servicesSection) servicesSection.style.display = 'none';
  if (gallerySection) gallerySection.style.display = 'none';
  
  // Show search results section
  searchResultsSection.style.display = 'block';
  searchQueryDisplay.textContent = `Showing results for: "${searchTerm}"`;
  
  // Clear previous results
  searchResultsContainer.innerHTML = '';
  
  // Get all cards from services and gallery
  const serviceCards = servicesSection ? servicesSection.querySelectorAll('.card') : [];
  const galleryCards = gallerySection ? gallerySection.querySelectorAll('.card') : [];
  const allCards = [...serviceCards, ...galleryCards];
  
  console.log('Found cards:', allCards.length);
  
  let matchCount = 0;
  
  // Filter and display matching cards
  allCards.forEach(card => {
    const heading = card.querySelector('h3');
    const img = card.querySelector('img');
    const cardContent = card.querySelector('.card-content');
    
    if (heading) {
      const text = heading.textContent.toLowerCase();
      const altText = img ? img.alt.toLowerCase() : '';
      
      if (text.includes(searchTerm) || altText.includes(searchTerm)) {
        matchCount++;
        
        // Clone the card for search results
        const resultCard = card.cloneNode(true);
        
        // Highlight matching text
        const resultHeading = resultCard.querySelector('h3');
        if (resultHeading) {
          const originalText = resultHeading.textContent;
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          resultHeading.innerHTML = originalText.replace(regex, '<mark>$1</mark>');
        }
        
        // Remove "Learn More" links from search results
        const links = resultCard.querySelectorAll('.card-link');
        links.forEach(link => link.remove());
        
        searchResultsContainer.appendChild(resultCard);
      }
    }
  });
  
  // Show no results message if needed
  if (matchCount === 0) {
    searchResultsContainer.innerHTML = `
      <div class="no-results">
        <p>No results found for "${searchTerm}"</p>
        <p>Try searching for: Home Interior, Kitchen, Bedroom, Sofa, Dining, Beds</p>
      </div>
    `;
  } else {
    searchQueryDisplay.textContent = `Found ${matchCount} result${matchCount > 1 ? 's' : ''} for: "${searchTerm}"`;
  }
  
  console.log('Search complete. Matches:', matchCount);
}

function clearSearch() {
  searchInput.value = '';
  if (imageSearch) imageSearch.value = '';
  searchResultsSection.style.display = 'none';
  if (servicesSection) servicesSection.style.display = 'block';
  if (gallerySection) gallerySection.style.display = 'block';
  searchResultsContainer.innerHTML = '';
  console.log('Search cleared');
}

  // Search on button click
  if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Search button clicked');
      performSearch();
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', clearSearch);
  }

  // Search on Enter key or as user types
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
    
    // Optional: Live search with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(performSearch, 300);
    });
  }
});

// Auto slider for hero section
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? '1' : '0';
  });
}

if (slides.length > 0) {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

/* ==============================
   Cart & Wishlist Functionality
============================== */

// Initialize cart and wishlist from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Save to localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Update badge counts
function updateBadges() {
  const cartCount = document.getElementById('cartCount');
  const wishlistCount = document.getElementById('wishlistCount');
  
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
  
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
  }
}

// Get current product data from modal
function getCurrentProductData() {
  return {
    name: document.getElementById('modalTitle')?.textContent || '',
    category: document.getElementById('modalCategory')?.textContent || '',
    description: document.getElementById('modalDescription')?.textContent || '',
    price: document.getElementById('modalPrice')?.textContent || 'Contact for quote',
    image: document.getElementById('modalImage')?.src || ''
  };
}

// Add to wishlist from modal
function addToWishlistFromModal() {
  const product = getCurrentProductData();
  
  // Check if already in wishlist
  const existingIndex = wishlist.findIndex(item => item.name === product.name);
  
  if (existingIndex === -1) {
    wishlist.push(product);
    saveToStorage();
    updateBadges();
    renderWishlist();
    showNotification('Added to wishlist! ❤️');
  } else {
    showNotification('Already in wishlist!');
  }
}

// Add to cart from modal
function addToCartFromModal() {
  const product = getCurrentProductData();
  
  // Check if already in cart
  const existingIndex = cart.findIndex(item => item.name === product.name);
  
  if (existingIndex !== -1) {
    // Increase quantity if already in cart
    cart[existingIndex].quantity += 1;
  } else {
    // Add new item with quantity 1
    product.quantity = 1;
    cart.push(product);
  }
  
  saveToStorage();
  updateBadges();
  renderCart();
  showNotification('Added to cart! 🛒');
}

// Remove from wishlist
function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  saveToStorage();
  updateBadges();
  renderWishlist();
  showNotification('Removed from wishlist');
}

// Move from wishlist to cart
function moveToCart(index) {
  const item = wishlist[index];
  
  // Check if already in cart
  const existingIndex = cart.findIndex(cartItem => cartItem.name === item.name);
  
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }
  
  // Remove from wishlist
  wishlist.splice(index, 1);
  
  saveToStorage();
  updateBadges();
  renderWishlist();
  renderCart();
  showNotification('Moved to cart! 🛒');
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveToStorage();
  updateBadges();
  renderCart();
  showNotification('Removed from cart');
}

// Update cart item quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;
  
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    saveToStorage();
    renderCart();
    updateBadges();
  }
}

// Render wishlist
function renderWishlist() {
  const wishlistContent = document.getElementById('wishlistContent');
  
  if (!wishlistContent) return;
  
  if (wishlist.length === 0) {
    wishlistContent.innerHTML = '<p class="empty-message">Your wishlist is empty</p>';
    return;
  }
  
  wishlistContent.innerHTML = wishlist.map((item, index) => `
    <div class="panel-item">
      <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='images/service-furniture.jpg'">
      <div class="item-details">
        <h4 class="item-name">${item.name}</h4>
        <p class="item-category">${item.category}</p>
        <p class="item-price">${item.price}</p>
        <div class="item-actions">
          <button class="item-btn move-to-cart-btn" onclick="moveToCart(${index})">
            🛒 Add to Cart
          </button>
          <button class="item-btn remove-btn" onclick="removeFromWishlist(${index})">
            ✕ Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render cart
function renderCart() {
  const cartContent = document.getElementById('cartContent');
  const cartFooter = document.getElementById('cartFooter');
  
  if (!cartContent) return;
  
  if (cart.length === 0) {
    cartContent.innerHTML = '<p class="empty-message">Your cart is empty</p>';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }
  
  cartContent.innerHTML = cart.map((item, index) => `
    <div class="panel-item">
      <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='images/service-furniture.jpg'">
      <div class="item-details">
        <h4 class="item-name">${item.name}</h4>
        <p class="item-category">${item.category}</p>
        <p class="item-price">${item.price}</p>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
          <button class="item-btn remove-btn" onclick="removeFromCart(${index})">
            ✕ Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');
  
  if (cartFooter) cartFooter.style.display = 'block';
}

// Show notification
function showNotification(message) {
  // Remove existing notification if any
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'notification-toast';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: #4b2e2e;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-size: 15px;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Add notification animations to page
if (!document.getElementById('notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Panel controls
function openPanel(panelId) {
  const panel = document.getElementById(panelId);
  const overlay = document.getElementById('panelOverlay');
  
  if (panel && overlay) {
    panel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePanel(panelId) {
  const panel = document.getElementById(panelId);
  const overlay = document.getElementById('panelOverlay');
  
  if (panel && overlay) {
    panel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize cart and wishlist on page load
document.addEventListener('DOMContentLoaded', function() {
  // Update badges
  updateBadges();
  
  // Cart button
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      renderCart();
      openPanel('cartPanel');
    });
  }
  
  // Wishlist button
  const wishlistBtn = document.getElementById('wishlistBtn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
      renderWishlist();
      openPanel('wishlistPanel');
    });
  }
  
  // Close cart panel
  const closeCart = document.getElementById('closeCart');
  if (closeCart) {
    closeCart.addEventListener('click', function() {
      closePanel('cartPanel');
    });
  }
  
  // Close wishlist panel
  const closeWishlist = document.getElementById('closeWishlist');
  if (closeWishlist) {
    closeWishlist.addEventListener('click', function() {
      closePanel('wishlistPanel');
    });
  }
  
  // Close panels when clicking overlay
  const panelOverlay = document.getElementById('panelOverlay');
  if (panelOverlay) {
    panelOverlay.addEventListener('click', function() {
      closePanel('cartPanel');
      closePanel('wishlistPanel');
    });
  }
  
  // Close panels on Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closePanel('cartPanel');
      closePanel('wishlistPanel');
    }
  });
});

/* ==============================
   Customer Review System
============================== */

// Initialize reviews from localStorage
let customerReviews = JSON.parse(localStorage.getItem('customerReviews')) || [];
let currentReviewPage = 1;
const reviewsPerPage = 6;
let selectedRating = 0;
let uploadedPhotos = [];
let uploadedVideo = null;

// File size limits (in bytes)
const MAX_PHOTO_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_PHOTOS = 3;

// Open review modal
function openReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    resetReviewForm();
  }
}

// Close review modal
function closeReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    resetReviewForm();
  }
}

// Reset review form
function resetReviewForm() {
  const form = document.getElementById('reviewForm');
  if (form) {
    form.reset();
  }
  
  selectedRating = 0;
  uploadedPhotos = [];
  uploadedVideo = null;
  
  document.getElementById('reviewRating').value = '';
  document.getElementById('ratingText').textContent = 'Select a rating';
  
  // Reset stars
  const stars = document.querySelectorAll('.star-rating .star');
  stars.forEach(star => star.classList.remove('active'));
  
  // Reset character count
  const charCount = document.getElementById('charCount');
  if (charCount) {
    charCount.textContent = '0/500';
  }
  
  // Clear file previews
  const photoPreview = document.getElementById('photoPreview');
  const videoPreview = document.getElementById('videoPreview');
  if (photoPreview) photoPreview.innerHTML = '';
  if (videoPreview) videoPreview.innerHTML = '';
}

// Star rating functionality
document.addEventListener('DOMContentLoaded', function() {
  // Star rating interaction
  const stars = document.querySelectorAll('.star-rating .star');
  const ratingInput = document.getElementById('reviewRating');
  const ratingText = document.getElementById('ratingText');
  
  stars.forEach(star => {
    star.addEventListener('click', function() {
      selectedRating = parseInt(this.dataset.rating);
      
      if (ratingInput) {
        ratingInput.value = selectedRating;
      }
      
      // Update star display
      stars.forEach((s, index) => {
        if (index < selectedRating) {
          s.classList.add('active');
          s.textContent = '★';
        } else {
          s.classList.remove('active');
          s.textContent = '☆';
        }
      });
      
      // Update rating text
      const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
      if (ratingText && selectedRating > 0) {
        ratingText.textContent = ratingLabels[selectedRating];
        ratingText.style.color = '#4b2e2e';
        ratingText.style.fontWeight = '600';
      }
    });
    
    // Hover effect
    star.addEventListener('mouseenter', function() {
      const hoverRating = parseInt(this.dataset.rating);
      stars.forEach((s, index) => {
        if (index < hoverRating) {
          s.textContent = '★';
          s.style.color = '#ffc107';
        } else {
          s.textContent = '☆';
          s.style.color = '#ddd';
        }
      });
    });
  });
  
  // Reset stars on mouse leave
  const starRating = document.querySelector('.star-rating');
  if (starRating) {
    starRating.addEventListener('mouseleave', function() {
      stars.forEach((s, index) => {
        if (index < selectedRating) {
          s.textContent = '★';
          s.classList.add('active');
        } else {
          s.textContent = '☆';
          s.classList.remove('active');
        }
      });
    });
  }
  
  // Character count for review text
  const reviewText = document.getElementById('reviewText');
  const charCount = document.getElementById('charCount');
  
  if (reviewText && charCount) {
    reviewText.addEventListener('input', function() {
      const length = this.value.length;
      charCount.textContent = `${length}/500`;
      
      if (length > 450) {
        charCount.style.color = '#ff4444';
      } else {
        charCount.style.color = '#999';
      }
    });
  }
  
  // Write review button
  const writeReviewBtn = document.getElementById('writeReviewBtn');
  if (writeReviewBtn) {
    writeReviewBtn.addEventListener('click', openReviewModal);
  }
  
  // Close modal when clicking outside
  const reviewModal = document.getElementById('reviewModal');
  if (reviewModal) {
    reviewModal.addEventListener('click', function(event) {
      if (event.target === reviewModal) {
        closeReviewModal();
      }
    });
  }
  
  // Display reviews on page load
  displayReviews();
  
  // File upload handlers
  const photoInput = document.getElementById('reviewPhotos');
  const videoInput = document.getElementById('reviewVideo');
  
  if (photoInput) {
    photoInput.addEventListener('change', handlePhotoUpload);
  }
  
  if (videoInput) {
    videoInput.addEventListener('change', handleVideoUpload);
  }
  
  // Pagination buttons
  const prevBtn = document.getElementById('prevReviews');
  const nextBtn = document.getElementById('nextReviews');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentReviewPage > 1) {
        currentReviewPage--;
        displayReviews();
        scrollToReviews();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      const totalPages = Math.ceil(customerReviews.length / reviewsPerPage);
      if (currentReviewPage < totalPages) {
        currentReviewPage++;
        displayReviews();
        scrollToReviews();
      }
    });
  }
});

// Handle photo uploads
function handlePhotoUpload(event) {
  const files = Array.from(event.target.files);
  const photoPreview = document.getElementById('photoPreview');
  
  if (files.length + uploadedPhotos.length > MAX_PHOTOS) {
    showNotification(`Maximum ${MAX_PHOTOS} photos allowed!`);
    event.target.value = '';
    return;
  }
  
  files.forEach(file => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification('Please upload only image files!');
      return;
    }
    
    // Validate file size
    if (file.size > MAX_PHOTO_SIZE) {
      showNotification(`Photo "${file.name}" is too large. Max 2MB per photo.`);
      return;
    }
    
    // Read and preview file
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedPhotos.push(e.target.result);
      
      // Add preview
      const previewItem = document.createElement('div');
      previewItem.className = 'preview-item';
      previewItem.innerHTML = `
        <img src="${e.target.result}" alt="Preview">
        <button class="preview-remove" onclick="removePhoto(${uploadedPhotos.length - 1})" type="button">×</button>
      `;
      photoPreview.appendChild(previewItem);
    };
    reader.readAsDataURL(file);
  });
  
  event.target.value = '';
}

// Handle video upload
function handleVideoUpload(event) {
  const file = event.target.files[0];
  const videoPreview = document.getElementById('videoPreview');
  
  if (!file) return;
  
  // Validate file type
  if (!file.type.startsWith('video/')) {
    showNotification('Please upload only video files!');
    event.target.value = '';
    return;
  }
  
  // Validate file size
  if (file.size > MAX_VIDEO_SIZE) {
    showNotification('Video is too large. Max 10MB.');
    event.target.value = '';
    return;
  }
  
  // Read and preview file
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedVideo = e.target.result;
    
    // Add preview
    videoPreview.innerHTML = `
      <div class="preview-item" style="width: 200px; height: auto;">
        <video src="${e.target.result}" controls style="width: 100%; height: auto;"></video>
        <button class="preview-remove" onclick="removeVideo()" type="button">×</button>
      </div>
    `;
  };
  reader.readAsDataURL(file);
}

// Remove photo from upload
function removePhoto(index) {
  uploadedPhotos.splice(index, 1);
  
  // Refresh preview
  const photoPreview = document.getElementById('photoPreview');
  photoPreview.innerHTML = '';
  
  uploadedPhotos.forEach((photo, i) => {
    const previewItem = document.createElement('div');
    previewItem.className = 'preview-item';
    previewItem.innerHTML = `
      <img src="${photo}" alt="Preview">
      <button class="preview-remove" onclick="removePhoto(${i})" type="button">×</button>
    `;
    photoPreview.appendChild(previewItem);
  });
}

// Remove video from upload
function removeVideo() {
  uploadedVideo = null;
  const videoPreview = document.getElementById('videoPreview');
  videoPreview.innerHTML = '';
  document.getElementById('reviewVideo').value = '';
}

// Submit review
function submitReview(event) {
  event.preventDefault();
  
  const name = document.getElementById('reviewerName').value.trim();
  const rating = parseInt(document.getElementById('reviewRating').value);
  const product = document.getElementById('reviewProduct').value.trim();
  const text = document.getElementById('reviewText').value.trim();
  
  // Validation
  if (!name || !rating || !text) {
    showNotification('Please fill in all required fields!');
    return;
  }
  
  if (rating < 1 || rating > 5) {
    showNotification('Please select a rating!');
    return;
  }
  
  // Create review object
  const review = {
    id: Date.now(),
    name: name,
    rating: rating,
    product: product,
    text: text,
    photos: [...uploadedPhotos],
    video: uploadedVideo,
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  };
  
  // Add to beginning of reviews array (newest first)
  customerReviews.unshift(review);
  
  // Save to localStorage
  try {
    localStorage.setItem('customerReviews', JSON.stringify(customerReviews));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      showNotification('Storage limit exceeded. Try uploading smaller files.');
      customerReviews.shift(); // Remove the review we just added
      return;
    }
  }
  
  // Close modal and display reviews
  closeReviewModal();
  displayReviews();
  
  // Show success message
  showNotification('Thank you for your review! ⭐');
  
  // Scroll to reviews section
  setTimeout(scrollToReviews, 300);
}

// Display reviews
function displayReviews() {
  const container = document.getElementById('reviewsContainer');
  const pagination = document.getElementById('reviewsPagination');
  const pageInfo = document.getElementById('pageInfo');
  const prevBtn = document.getElementById('prevReviews');
  const nextBtn = document.getElementById('nextReviews');
  
  if (!container) return;
  
  // Check if there are reviews
  if (customerReviews.length === 0) {
    container.innerHTML = '<p class="empty-message">No customer reviews yet. Be the first to share your experience!</p>';
    if (pagination) pagination.style.display = 'none';
    return;
  }
  
  // Calculate pagination
  const totalPages = Math.ceil(customerReviews.length / reviewsPerPage);
  const startIndex = (currentReviewPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const reviewsToShow = customerReviews.slice(startIndex, endIndex);
  
  // Generate review cards
  container.innerHTML = reviewsToShow.map(review => {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const productBadge = review.product 
      ? `<div class="review-product">${review.product}</div>` 
      : '';
    
    // Generate photo gallery HTML
    let photosHtml = '';
    if (review.photos && review.photos.length > 0) {
      photosHtml = `
        <div class="review-media">
          <div class="review-photos">
            ${review.photos.map((photo, index) => `
              <img src="${photo}" alt="Customer photo" class="review-photo" onclick="openLightbox('${photo}')" loading="lazy">
            `).join('')}
          </div>
          <span class="media-badge">📷 ${review.photos.length} photo${review.photos.length > 1 ? 's' : ''}</span>
        </div>
      `;
    }
    
    // Generate video HTML
    let videoHtml = '';
    if (review.video) {
      videoHtml = `
        <div class="review-media">
          <video src="${review.video}" class="review-video" controls preload="metadata"></video>
          <span class="media-badge">🎥 Unboxing video</span>
        </div>
      `;
    }
    
    return `
      <div class="review-card">
        <div class="review-header">
          <div class="reviewer-info">
            <h4 class="reviewer-name">${review.name}</h4>
            ${productBadge}
            <p class="review-date">${review.date}</p>
          </div>
          <div class="review-stars">${stars}</div>
        </div>
        <p class="review-text-content">${review.text}</p>
        ${photosHtml}
        ${videoHtml}
      </div>
    `;
  }).join('');
  
  // Update pagination
  if (totalPages > 1) {
    if (pagination) pagination.style.display = 'flex';
    if (pageInfo) pageInfo.textContent = `Page ${currentReviewPage} of ${totalPages}`;
    if (prevBtn) prevBtn.disabled = currentReviewPage === 1;
    if (nextBtn) nextBtn.disabled = currentReviewPage === totalPages;
  } else {
    if (pagination) pagination.style.display = 'none';
  }
}

// Scroll to reviews section
function scrollToReviews() {
  const reviewsSection = document.getElementById('customerReviews');
  if (reviewsSection) {
    reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Close review modal on Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeReviewModal();
    closeLightbox();
  }
});

// Media Lightbox functionality
function openLightbox(imageSrc) {
  // Create lightbox if it doesn't exist
  let lightbox = document.getElementById('mediaLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'mediaLightbox';
    lightbox.className = 'media-lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="close-lightbox" onclick="closeLightbox()">×</button>
        <img id="lightboxImage" src="" alt="Full size image">
      </div>
    `;
    document.body.appendChild(lightbox);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  
  // Set image and show lightbox
  document.getElementById('lightboxImage').src = imageSrc;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('mediaLightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}


