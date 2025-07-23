document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("[data-section-id]");

  sections.forEach((section) => {
    const sectionId = section.dataset.sectionId;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      }
    );

    observer.observe(section);

    $(`#cc-tabination-image-change-${sectionId} .main-tab-contanier`)
      .off("click")
      .on("click", function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this).find(".tab-description").slideUp(300);
        } else {
          $(
            `#cc-tabination-image-change-${sectionId} .main-tab-contanier`
          ).removeClass("active");
          $(
            `#cc-tabination-image-change-${sectionId} .tab-description`
          ).slideUp(300);
          $(`#cc-tabination-image-change-${sectionId} .tab-image`).removeClass(
            "active"
          );

          $(this).addClass("active");
          $(this).find(".tab-description").slideDown(300);

          const tabNumber = $(this).data("tab");
          $(
            `#cc-tabination-image-change-${sectionId} .tab-image[data-tab="${tabNumber}"]`
          ).addClass("active");
        }
      });
  });
});