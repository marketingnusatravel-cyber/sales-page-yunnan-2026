const revealItems = document.querySelectorAll(".reveal");
const faqItems = document.querySelectorAll(".faq-item");
const scrollButtons = document.querySelectorAll(".js-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-q");
  button.addEventListener("click", () => {
    faqItems.forEach((other) => {
      if (other !== item) other.classList.remove("open");
    });
    item.classList.toggle("open");
  });
});

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
