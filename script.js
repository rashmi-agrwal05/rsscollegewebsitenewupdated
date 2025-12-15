/* =====================================================
   HERO SLIDER (AUTO FADE)
===================================================== */
(function () {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    let current = 0;

    slides.forEach((slide, index) => {
        slide.style.position = "absolute";
        slide.style.inset = "0";
        slide.style.opacity = index === 0 ? "1" : "0";
        slide.style.transition = "opacity 1.2s ease-in-out";
    });

    setInterval(() => {
        slides[current].style.opacity = "0";
        current = (current + 1) % slides.length;
        slides[current].style.opacity = "1";
    }, 5000);
})();

/* =====================================================
   MOBILE NAV TOGGLE
===================================================== */
(function () {
    const menuBtn = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".primary-nav");

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("nav-open");
    });
})();

/* =====================================================
   MOBILE DROPDOWN (CLICK BASED)
===================================================== */
(function () {
    const dropdownLinks = document.querySelectorAll(".has-dropdown > a");

    dropdownLinks.forEach(link => {
        link.addEventListener("click", e => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = link.nextElementSibling;
                dropdown.classList.toggle("dropdown-open");
            }
        });
    });
})();

/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */
(function () {
    const revealItems = document.querySelectorAll(
        ".highlight-card, .about-box, .course-card, .faculty-card, .blog-card, .gallery-item"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach(item => {
        item.classList.add("reveal-hidden");
        observer.observe(item);
    });
})();

/* =====================================================
   GALLERY MODAL (LIGHTBOX)
===================================================== */
(function () {
    const images = document.querySelectorAll(".gallery-item img");
    if (!images.length) return;

    const modal = document.createElement("div");
    modal.className = "gallery-modal";
    modal.innerHTML = `
        <span class="gallery-close">&times;</span>
        <img class="gallery-modal-img" />
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector(".gallery-modal-img");
    const closeBtn = modal.querySelector(".gallery-close");

    images.forEach(img => {
        img.addEventListener("click", () => {
            modal.classList.add("open");
            modalImg.src = img.src;
            document.body.style.overflow = "hidden";
        });
    });

    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
    });
})();

/* =====================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
===================================================== */
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
})();

/* =====================================================
   BUTTON MICRO INTERACTIONS
===================================================== */
(function () {
    const buttons = document.querySelectorAll(
        ".btn-primary, .btn-outline, .course-card, .blog-card"
    );

    buttons.forEach(el => {
        el.addEventListener("mouseenter", () => {
            el.style.transform = "translateY(-4px)";
        });

        el.addEventListener("mouseleave", () => {
            el.style.transform = "translateY(0)";
        });
    });
})();

/* =====================================================
   FOOTER ICON INTERACTION
===================================================== */
(function () {
    document.querySelectorAll(".footer-social i").forEach(icon => {
        icon.addEventListener("mouseenter", () => {
            icon.style.transform = "scale(1.2)";
        });

        icon.addEventListener("mouseleave", () => {
            icon.style.transform = "scale(1)";
        });
    });
})();



/* ===============================
   GALLERY SLIDER LOGIC
================================ */
(function () {
    const track = document.querySelector(".gallery-track");
    const prevBtn = document.querySelector(".gallery-btn.prev");
    const nextBtn = document.querySelector(".gallery-btn.next");

    if (!track || !prevBtn || !nextBtn) return;

    const itemWidth = 300; // item width + gap
    let position = 0;

    nextBtn.addEventListener("click", () => {
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        position = Math.min(position + itemWidth, maxScroll);
        track.style.transform = `translateX(-${position}px)`;
    });

    prevBtn.addEventListener("click", () => {
        position = Math.max(position - itemWidth, 0);
        track.style.transform = `translateX(-${position}px)`;
    });
})();
