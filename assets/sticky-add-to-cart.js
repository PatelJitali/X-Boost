document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".sticky-bar-close")
    .addEventListener("click", function () {
      const stikcyForm = document.getElementById("cc-sticky-bar");
      stikcyForm.classList.add("visibility-hidden");
    });

  const cartButton = document.querySelector("product-form.product-form");
  const stikcyBar = document.getElementById("cc-sticky-bar");
  const stikcyQty = document.querySelector(".cc-quantity_container");

  const html = stikcyQty.innerHTML;

  const checkVisibility = () => {
    const targetPosition = cartButton.getBoundingClientRect();
    console.log("targetPosition", targetPosition.top);
    if (targetPosition.top >= 0) {
      stikcyBar.style.display = "none";
      if (html) {
        stikcyQty.innerHTML = "";
      }
    } else {
      stikcyBar.style.display = "block";
      if (html) {
        stikcyQty.innerHTML = html;
      }
    }
  };
  checkVisibility();
  window.addEventListener("scroll", checkVisibility);
});
