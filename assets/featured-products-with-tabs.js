document.addEventListener("DOMContentLoaded", function () {
  const collectionTabs = document.querySelectorAll(".collection-tab");
  const productContainers = document.querySelectorAll(
    ".collection-products, .product-slider"
  );

  if (collectionTabs.length > 0 && productContainers.length > 0) {
    collectionTabs.forEach((tab, index) => {
      const coll_url = tab.dataset.url;
      if (index === 0) {
        tab.classList.add("active");
        const more_btn = document.querySelector(".collection-button a");
        if (more_btn) {
          more_btn.setAttribute("href", coll_url);
        }

        if (productContainers[index].classList.contains("product-slider")) {
          productContainers[index].style.display = "block";
          initializeSlider(productContainers[index]);
        } else if (
          productContainers[index].classList.contains("collection-products")
        ) {
          productContainers[index].style.display = "grid";
        }
        productContainers[index].classList.add("fade-in");
      } else {
        tab.classList.remove("active");
        productContainers[index].style.display = "none";
      }
    });
  }

  collectionTabs.forEach((tab, index) => {
    const coll_url = tab.dataset.url;
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class and hide containers
      collectionTabs.forEach((t) => t.classList.remove("active"));
      productContainers.forEach((container) => {
        if ($(container).hasClass("slick-initialized")) {
          $(container).slick("unslick");
        }
        container.style.display = "none";
        container.classList.remove("fade-in");
      });

      // Add active class to the clicked tab
      tab.classList.add("active");

      const more_btn = document.querySelector(".collection-button a");
      if (more_btn) {
        more_btn.setAttribute("href", coll_url);
      }

      // Show the corresponding product container
      if (productContainers[index]) {
        if (productContainers[index].classList.contains("product-slider")) {
          productContainers[index].style.display = "block";
          initializeSlider(productContainers[index]);
        } else if (
          productContainers[index].classList.contains("collection-products")
        ) {
          productContainers[index].style.display = "grid";
        }

        // Add the fade-in class for animation
        productContainers[index].classList.add("fade-in");

        // Remove the class after the animation ends
        productContainers[index].addEventListener(
          "animationend",
          function () {
            productContainers[index].classList.remove("fade-in");
          },
          { once: true }
        );
      }

      tab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    });
  });

  function initializeSlider(container) {
    if (container.classList.contains("product-slider")) {
      $(container).slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 3,
        dots: false,
        arrows: true,
        prevArrow:
          '<button class="slick-left-arrow"><span><i class="fa fa-angle-left"></i></span></button>',
        nextArrow:
          '<button class="slick-right-arrow"><span><i class="fa fa-angle-right"</i></span></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 430,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }
  }
});
