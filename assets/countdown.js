$(window).on("scroll", function () {
  $(".promo-container").each(function () {
    if (
      $(this).offset().top <
      $(window).scrollTop() + $(window).height() - 100
    ) {
      $(this).find(".promo-image").addClass("active");
      $(this).find(".countdown-section").addClass("active");
      $(this).find(".product-container").addClass("active");
    }
  });
});

$(window).trigger("scroll");

document.addEventListener("DOMContentLoaded", function () {
  const countdownElements = document.querySelectorAll(".countdown-digits");

  countdownElements.forEach(function (element) {
    const endDate = new Date(element.dataset.endDate).getTime();
    const daysEl = element.querySelector("[data-days]");
    const hoursEl = element.querySelector("[data-hours]");
    const minutesEl = element.querySelector("[data-minutes]");
    const secondsEl = element.querySelector("[data-seconds]");
    const timeoutMessage = element.querySelector(".timeout-message");

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        if (timeoutMessage) {
          element.querySelector("#countdown-timer").style.display = "none";
          timeoutMessage.style.display = "block";
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
});