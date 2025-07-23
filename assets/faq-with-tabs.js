document.addEventListener("DOMContentLoaded", (event) => {
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");
  const tabLine = document.querySelector(".tab-line");

  const updateTabLinePosition = (link) => {
    const linkRect = link.getBoundingClientRect();
    const parentRect = link.parentNode.getBoundingClientRect();

    tabLine.style.width = `${linkRect.width}px`;
    tabLine.style.height = `${linkRect.height}px`;
    tabLine.style.transform = `translateX(${
      linkRect.left - parentRect.left
    }px)`;
    tabLine.style.top = `${linkRect.top - parentRect.top - 1}px`;
  };

  if (tabLinks.length > 1) {
    tabLinks.forEach((link) => {
      link.addEventListener("click", () => {
        tabContents.forEach((content) => (content.style.display = "none"));

        const tabId = link.getAttribute("data-tab");
        const activeTab = document.getElementById(tabId);
        activeTab.style.display = "block";

        tabLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        // Move the bottom line
        updateTabLinePosition(link);
      });
    });
  } else {
    tabContents.forEach((content) => (content.style.display = "block"));
  }

  if (tabLinks.length > 0) {
    tabLinks[0].click();
  }
});
