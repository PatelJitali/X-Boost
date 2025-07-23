document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count-no");

  const animateCounter = (counter, start, end, duration) => {
    let startTimestamp = null;
    const originalText = counter.textContent;

    const prefix = originalText.match(/^[^0-9]*/)?.[0] || "";
    const suffix = originalText.match(/[^0-9]*$/)?.[0] || "";

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * (end - start));

      counter.textContent = prefix + currentCount + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "20px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const originalText = counter.textContent;

        const animate = counter.getAttribute("data-animate") === "true";
        const duration = parseFloat(counter.getAttribute("data-duration")) || 2;

        const targetValue = parseInt(originalText.replace(/[^0-9]/g, ""));

        if (!isNaN(targetValue)) {
          if (animate) {
            animateCounter(counter, 0, targetValue, duration * 1000);
          } else {
            counter.textContent =
              originalText.replace(/[^0-9]/g, "") +
                originalText.match(/[^0-9]*$/)?.[0] || "";
          }
          observer.unobserve(counter);
        }
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});



$(document).ready(function () {
  $(".pro_desc-wrapper").each(function () {
    const $descText = $(this).find(".pro_desc-text");
    const fullText = $descText.html().trim();
    const words = fullText.split(" ");

    if (words.length > 50) {
      const truncatedText = words.slice(0, 50).join(" ");
      $descText.attr("data-full-text", fullText);
      $descText.attr("data-truncated-text", truncatedText);
      $descText.html(`<span>${truncatedText}...</span>`);
      $(this).find(".toggle-desc-link").show();
    } else {
      $(this).find(".toggle-desc-link").hide();
    }
  });

  $(".toggle-desc-link").click(function () {
    const $descText = $(this).siblings(".pro_desc-text");
    const fullText = $descText.attr("data-full-text");
    const truncatedText = $descText.attr("data-truncated-text");
    const isExpanded = $descText.hasClass("expanded");
    const $wrapper = $(this).closest(".pro_desc-wrapper");

    if (isExpanded) {

      $("html, body").animate({
        scrollTop: $wrapper.offset().top - 20 
      }, 500);

      $descText.removeClass("expanded").html(`<span>${truncatedText}...</span>`);
      $(this).text("Show More");
    } else {

      $("html, body").animate({
        scrollTop: $wrapper.offset().top + $wrapper.height()
      }, 500);

      $descText.addClass("expanded").html(`<span>${fullText}</span>`);
      $(this).text("Show Less");
    }
  });
});
