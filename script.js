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

// WhatsApp Form Setup (WhatsForm mimic)
const waForm = document.getElementById("waForm");
if (waForm) {
  const agents = [
    { name: "Ustaz Faiz", phone: "60162879202" },
    { name: "Lin", phone: "601125612847" },
    { name: "Shiema", phone: "601116339202" },
    { name: "Ain", phone: "60143259202" },
    { name: "Naja", phone: "60149679202" },
    { name: "Fatin", phone: "60149379202" },
    { name: "Alif", phone: "60109149202" },
    { name: "MK", phone: "60107669202" }
  ];

  waForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("waName").value;
    const phone = document.getElementById("waPhone").value;
    const date = document.getElementById("waDate").value;
    const adult = document.getElementById("waAdult").value;
    const child = document.getElementById("waChild").value || 0;

    const btn = document.querySelector(".btn-submit-form");
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mencari Konsultan...';
    btn.disabled = true;

    // Pick random agent
    const randomIndex = Math.floor(Math.random() * agents.length);
    const selectedAgent = agents[randomIndex];

    const message = `Hai Nusa Travel! ✈️ Saya ${name} berminat nak tahu lebih lanjut tentang Pakej Yunnan 7H5M.

*Maklumat Semakan Tiket:*
📅 Tarikh Cadangan: ${date}
👥 Bil. Pax: ${adult} Dewasa, ${child} Kanak-kanak
📞 No. Tel WhatsApp: ${phone}

Boleh **${selectedAgent.name}** tolong semakkan kalau "Seat" pada tarikh ini masih available tak?`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${selectedAgent.phone}?text=${encodedMessage}`;

    setTimeout(() => {
      // Open in same tab or new tab
      window.location.href = waUrl;
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1200);
  });
}
