$(document).ready(function () {
  const countdownContainer = $(".xboost-announcement-countdown-digits");
  const endDateStr = countdownContainer.attr("data-end-date");
  const timeoutMessage = $(".xboost-timeout-message");
  const countdownTimer = $(".xboost-countdown-box");
  const shopall = $(".xboost-countdown-button");

  if (endDateStr) {
    const endDate = new Date(endDateStr);

    const countdownInterval = setInterval(function () {
      const now = new Date();
      const timeLeft = endDate - now;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        countdownTimer.hide();
        // shopall.hide();
        timeoutMessage.show();
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownContainer
          .find("[data-days]")
          .text(days.toString().padStart(2, "0"));
        countdownContainer
          .find("[data-hours]")
          .text(hours.toString().padStart(2, "0"));
        countdownContainer
          .find("[data-minutes]")
          .text(minutes.toString().padStart(2, "0"));
        countdownContainer
          .find("[data-seconds]")
          .text(seconds.toString().padStart(2, "0"));
      }
    }, 1000);
  }
});
