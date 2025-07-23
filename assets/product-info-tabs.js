document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".tabs li.tablinks");
  var contents = document.querySelectorAll(".tabs-content li.tabcontent");

  var activeIndex = Array.from(tabs).findIndex((tab) =>
    tab.classList.contains("active-tab")
  );
  if (activeIndex >= 0) {
    contents[activeIndex].style.display = "block";
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active-tab"));
      contents.forEach((c) => (c.style.display = "none"));

      tab.classList.add("active-tab");
      contents[index].style.display = "block";

      tab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    });
  });
});
