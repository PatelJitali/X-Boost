document.addEventListener('DOMContentLoaded', function () {
  let isUpdatingCart = false;

  // Global event delegation for add to cart buttons
  document.body.addEventListener('click', function(event) {
    const addToCartButton = event.target.closest('.cc_cart_button_upsell');
    if (addToCartButton) {
      event.preventDefault();
      handleAddToCart(addToCartButton);
    }
  });

  // Global event delegation for variant dropdowns
  document.body.addEventListener('change', function(event) {
    const dropdown = event.target.closest('.variant-dropdown');
    if (dropdown) {
      handleVariantChange(dropdown);
    }
  });

  // Check if all collection products are in cart
  function checkAllProductsInCart() {
    const collectionSection = document.querySelector('.xboost-collection-item');
    if (!collectionSection) return;

    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length === 0) {
      // If no products left to display, hide the entire collection section
      collectionSection.style.display = 'none';
      
      // Optional: Remove the element completely after animation
      setTimeout(() => {
        collectionSection.remove();
      }, 300); // Adjust timing if you have CSS transitions
    }
  }

  // Handle add to cart functionality
  async function handleAddToCart(button) {
    if (isUpdatingCart) return;

    const variantId = button.getAttribute('data-variant-id');
    if (!variantId) {
      console.error('No variant ID found on button');
      return;
    }

    // Disable button and set updating flag
    isUpdatingCart = true;
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Add to Cart';

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Remove the product card from upsell section
      const productCard = button.closest('.product-card');
      if (productCard) {
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          productCard.remove();
          // Check if this was the last product
          checkAllProductsInCart();
        }, 300); // Match your CSS transition duration
      }

      // Update cart drawer
      await updateCartDrawer();

    } catch (error) {
      console.error('Error:', error);
      button.textContent = 'Error - Try Again';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    } finally {
      // Reset button and updating flag
      button.disabled = false;
      isUpdatingCart = false;
      button.textContent = originalText;
    }
  }

  // Handle variant changes
  function handleVariantChange(dropdown) {
    const productId = dropdown.dataset.productId;
    const selectedVariantId = dropdown.value;
    const selectedOption = dropdown.options[dropdown.selectedIndex];

    if (!productId || !selectedVariantId) {
      console.error('Missing product ID or variant ID');
      return;
    }

    // Update product image
    updateProductImage(productId, selectedOption);

    // Update product price
    updateProductPrice(productId, selectedOption);

    // Update add to cart button
    updateAddToCartButton(productId, selectedVariantId);
  }

  // Update product image
  function updateProductImage(productId, selectedOption) {
    const imageElement = document.getElementById(`product-image-${productId}`);
    if (!imageElement) return;

    const imageUrl = selectedOption.dataset.image;
    
    // Only update if there's a new image URL
    if (imageUrl) {
      // Store original image URL if not already stored
      if (!imageElement.getAttribute('data-original-src')) {
        imageElement.setAttribute('data-original-src', imageElement.src);
      }
      imageElement.src = imageUrl;
    } else {
      // Revert to original image if no variant image
      const originalSrc = imageElement.getAttribute('data-original-src');
      if (originalSrc) {
        imageElement.src = originalSrc;
      }
    }
  }

  // Update product price
  function updateProductPrice(productId, selectedOption) {
    const priceElement = document.getElementById(`product-price-${productId}`);
    if (!priceElement) return;

    const price = selectedOption.dataset.price;
    const comparePrice = selectedOption.dataset.comparePrice;

    let priceHtml = `<span class="xboost-current-price-cart-collection">${price}</span>`;
    if (comparePrice && comparePrice !== '' && comparePrice !== price) {
      priceHtml += `<span class="compare-price-cart-collection">${comparePrice}</span>`;
    }

    priceElement.innerHTML = priceHtml;
  }

  // Update add to cart button
  function updateAddToCartButton(productId, variantId) {
    const productCard = document.getElementById(`product-card-${productId}`);
    if (!productCard) return;

    const addToCartButton = productCard.querySelector('.cc_cart_button_upsell');
    if (addToCartButton) {
      addToCartButton.setAttribute('data-variant-id', variantId);
      
      // Reset button text if it was in an error state
      if (addToCartButton.textContent === 'Error - Try Again') {
        addToCartButton.textContent = 'Add to Cart';
      }
    }
  }

  // Update cart drawer
  async function updateCartDrawer() {
    const cartForm = document.getElementById('CartDrawer-Form');
    if (!cartForm) {
      console.error('Cart drawer form not found');
      return;
    }

    try {
      const response = await fetch(`${window.location.pathname}?section_id=cart-drawer`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newForm = doc.getElementById('CartDrawer-Form');

      if (newForm) {
        cartForm.innerHTML = newForm.innerHTML;
        
        // Refresh upsell section if it exists in the new content
        const upsellSection = doc.querySelector('.xboost-collection-inner-data-cart');
        const currentUpsellSection = document.querySelector('.xboost-collection-inner-data-cart');
        
        if (upsellSection && currentUpsellSection) {
          currentUpsellSection.innerHTML = upsellSection.innerHTML;
          initializeProductOrder();
          // Check if we should hide the section after updating
          checkAllProductsInCart();
        }
      } else {
        throw new Error('New cart form content not found in response');
      }
    } catch (error) {
      console.error('Error updating cart drawer:', error);
    }
  }

  // Initialize product order randomization
  function initializeProductOrder() {
    const container = document.querySelector('.xboost-collection-inner-data-cart');
    if (!container) return;

    try {
      const products = Array.from(container.children);
      for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.appendChild(products[j]);
      }
    } catch (error) {
      console.error('Error randomizing products:', error);
    }
  }

  // Run initial setup
  initializeProductOrder();
  checkAllProductsInCart(); // Check initial state
});