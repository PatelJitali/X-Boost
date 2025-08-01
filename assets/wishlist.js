// wishlist js starts
function createWishlistToggleHandler() {
  function getProductDataFromElement(element) {
    return {
      productTitle: element.getAttribute("data-product-title"),
      productImg: element.getAttribute("data-product-img"),
      productPrice: element.getAttribute("data-product-price"),
      productUrl: element.getAttribute("data-product-url"),
      productId: element.getAttribute("data-product-id"),
    };
  }
  function toggleWishlistForProduct(wishlistButton) {
    const pdpData = getProductDataFromElement(wishlistButton);
    let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlistData.some(
      (item) => item.productTitle === pdpData.productTitle
    );

    if (!isAlreadyInWishlist) {
      wishlistData.push(pdpData);
      localStorage.setItem("wishlist", JSON.stringify(wishlistData));

      wishlistButton.innerHTML = `
        <svg class="heart-filled" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z" fill="currentColor"/>
        </svg>
        <p class="wishlist_text">Added To Wishlist</p>
      `;

      showSuccessMessage(`${pdpData.productTitle} added to your wishlist!`);
    } else {
      wishlistData = wishlistData.filter(
        (item) => item.productTitle !== pdpData.productTitle
      );
      localStorage.setItem("wishlist", JSON.stringify(wishlistData));

      wishlistButton.innerHTML = `
        <svg width="35px" height="35px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="currentColor" fill="none">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier">
            <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z"/>
            </g>
         </svg>
        <p class="wishlist_text">Add To Wishlist</p>
      `;
    }
    displayWishlist();
  }

  function showSuccessMessage(message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("wishlist-success-message");
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);
    setTimeout(() => {
      messageContainer.remove();
    }, 3000);
  }

  function removeFromWishlist(productTitle) {
    let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlistData = wishlistData.filter(
      (item) => item.productTitle !== productTitle
    );
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));
    displayWishlist();
    initWishlistButtons();
  }
  function displayWishlist() {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistCountBubble = document.querySelector(
      ".wishlist-count-bubble .wishlist-count"
    );

    wishlistCountBubble.innerHTML = wishlistData.length;

    console.log("wishlistData:::", wishlistData.length);
    const wishlistBlock = document.querySelector(".js-wishlistBlock");
    if (wishlistData.length === 0) {
      if (wishlistBlock) {
        wishlistBlock.innerHTML = `
                      <div class="empty-wishlist">
                          <p>Love it? Add to my wishlist</p> 
                          <a href="/collections ">
                              <button class="button">Continue Shopping</button>
                          </a>
                      </div>
                  `;
      }
      return;
    }
    const wishlistHtml = wishlistData
      .map(
        (item) => `
              <div class="wishlist-product__list">
                  <div class="c-product">
                      <a href="${item.productUrl}"> 
                          <img src="${item.productImg}" alt="${
          item.productTitle
        }">
                      </a>
                      <h3 class="c-product__title xboost-card__heading h5">
                          <a class="xboost-full-unstyled-link wishlist-product-title" href="${
                            item.productUrl
                          }">${item.productTitle}</a>
                        <span class="wishlist-tooltip">${
                          item.productTitle
                        }</span>
  
                      </h3>
                      <p>${item.productPrice}</p>
                          <button onclick="removeFromWishlist('${item.productTitle.replace(
                            /'/g,
                            "\\'"
                          )}')" class="wishlist-remove-btn"><span class="wishlist-close-btn">&times;</span></button>
                          <product-form data-section-id="template--23644041314582__product-grid"><form method="post" action="/cart/add" id="quick-add-template--23644041314582__product-grid9556926923030" accept-charset="UTF-8" class="form" enctype="multipart/form-data" novalidate="novalidate" data-type="add-to-cart-form"><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="id" value="${
                            item.productId
                          }" class="xboost-product-variant-id">
                      <button id="quick-add-template--23644041314582__product-grid9556926923030-submit" type="submit" name="add" class="xboost-quick-add__submit button button--full-width button--secondary wishlist-cart-btn" aria-haspopup="dialog" aria-labelledby="quick-add-template--23644041314582__product-grid9556926923030-submit title-template--23644041314582__product-grid-9556926923030" aria-live="polite" data-sold-out-message="true">
                      <span>Add to cart</span>             
                      <span class="sold-out-message hidden">Sold out</span>
                      <div class="loading__spinner hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" class="spinner" viewBox="0 0 66 66"><circle stroke-width="6" cx="33" cy="33" r="30" fill="none" class="path"></circle></svg>
                      </div>
                      </button><input type="hidden" name="product-id" value="${
                        item.productId
                      }"><input type="hidden" name="section-id" value="template--23644041314582__product-grid"></form></product-form>              
                  </div>
              </div>
          `
      )
      .join("");
    if (wishlistBlock) {
      wishlistBlock.innerHTML = wishlistHtml;
    } else {
      console.error('Element with class "js-wishlistBlock" not found');
    }
  }
  function initWishlistButtons() {
    const wishlistButtons = document.querySelectorAll(
      ".wishlist_button[data-product-title]"
    );
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlistButtons.forEach((button) => {
      const productTitle = button.getAttribute("data-product-title");
      const isAlreadyInWishlist = wishlistData.some(
        (item) => item.productTitle === productTitle
      );

      button.innerHTML = isAlreadyInWishlist
        ? `
                  <svg class="heart-filled" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                      <path d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z" fill="currentColor"/>
                  </svg>
                  <p class="wishlist_text">Added To Wishlist</p>
              `
        : `
                  <svg width="35px" height="35px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="currentColor" fill="none">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                    <path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z"/>
                    </g>
                   </svg>
                  <p class="wishlist_text">Add To Wishlist</p>
              `;

      button.removeEventListener("click", button._wishlistHandler);
      button._wishlistHandler = () => toggleWishlistForProduct(button);
      button.addEventListener("click", button._wishlistHandler);
    });
  }

  window.removeFromWishlist = removeFromWishlist;
  document.addEventListener("DOMContentLoaded", () => {
    initWishlistButtons();
    displayWishlist();
  });
}
createWishlistToggleHandler();
// wishlist js ends
