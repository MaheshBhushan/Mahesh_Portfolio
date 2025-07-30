/**
 * Smooth Animations Library - Framer Motion Style for HTML Portfolio
 * Author: AI Assistant for Mahesh Koduri
 * Version: 1.0.0
 */

class SmoothAnimations {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (this.isInitialized) return;

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.setupAnimations(),
      );
    } else {
      this.setupAnimations();
    }

    this.isInitialized = true;
  }

  setupAnimations() {
    // Add smooth CSS classes
    this.injectSmoothCSS();

    // Setup intersection observer for scroll animations
    this.setupScrollAnimations();

    // Setup hover animations
    this.setupHoverAnimations();

    // Setup stagger animations
    this.setupStaggerAnimations();

    // Setup page load animations
    this.setupPageLoadAnimations();

    // Setup smooth scrolling
    this.setupSmoothScrolling();

    // Setup parallax effects
    this.setupParallaxEffects();

    // Update age automatically
    this.updateAge();
  }

  injectSmoothCSS() {
    const style = document.createElement("style");
    style.id = "smooth-animations-css";
    style.textContent = `
            /* Smooth Animation Base Styles */
            :root {
                --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
                --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
                --ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275);
                --duration-fast: 0.2s;
                --duration-normal: 0.3s;
                --duration-slow: 0.5s;
                --duration-page: 0.8s;
            }

            /* Smooth scrolling for entire page */
            html {
                scroll-behavior: smooth;
                scroll-padding-top: 80px;
            }

            /* Base animation styles */
            .animate-fadeIn {
                opacity: 0;
                transform: translateY(30px);
                transition: all var(--duration-page) var(--ease-smooth);
            }

            .animate-fadeIn.visible {
                opacity: 1;
                transform: translateY(0);
            }

            .animate-slideInLeft {
                opacity: 0;
                transform: translateX(-50px);
                transition: all var(--duration-page) var(--ease-smooth);
            }

            .animate-slideInLeft.visible {
                opacity: 1;
                transform: translateX(0);
            }

            .animate-slideInRight {
                opacity: 0;
                transform: translateX(50px);
                transition: all var(--duration-page) var(--ease-smooth);
            }

            .animate-slideInRight.visible {
                opacity: 1;
                transform: translateX(0);
            }

            .animate-scaleIn {
                opacity: 0;
                transform: scale(0.8);
                transition: all var(--duration-page) var(--ease-bounce);
            }

            .animate-scaleIn.visible {
                opacity: 1;
                transform: scale(1);
            }

            .animate-rotateIn {
                opacity: 0;
                transform: rotate(-10deg) scale(0.9);
                transition: all var(--duration-page) var(--ease-elastic);
            }

            .animate-rotateIn.visible {
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }

            /* Smooth hover effects */
            .smooth-hover {
                transition: all var(--duration-normal) var(--ease-smooth);
            }

            .smooth-hover:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
            }

            .smooth-hover-scale {
                transition: all var(--duration-normal) var(--ease-smooth);
            }

            .smooth-hover-scale:hover {
                transform: scale(1.05);
            }

            .smooth-hover-glow {
                transition: all var(--duration-normal) var(--ease-smooth);
                position: relative;
                overflow: hidden;
            }

            .smooth-hover-glow::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left var(--duration-slow) var(--ease-smooth);
            }

            .smooth-hover-glow:hover::before {
                left: 100%;
            }

            /* Button animations */
            .btn-smooth {
                transition: all var(--duration-normal) var(--ease-smooth);
                position: relative;
                overflow: hidden;
            }

            .btn-smooth:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .btn-smooth:active {
                transform: translateY(0);
            }

            /* Image animations */
            .img-smooth {
                transition: all var(--duration-normal) var(--ease-smooth);
            }

            .img-smooth:hover {
                transform: scale(1.1) rotate(2deg);
            }

            /* Card animations */
            .card-smooth {
                transition: all var(--duration-normal) var(--ease-smooth);
                transform-style: preserve-3d;
            }

            .card-smooth:hover {
                transform: translateY(-10px) rotateX(5deg);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            }

            /* Navigation animations */
            .nav-link-smooth {
                position: relative;
                transition: all var(--duration-normal) var(--ease-smooth);
            }

            .nav-link-smooth::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background: currentColor;
                transition: width var(--duration-normal) var(--ease-smooth);
            }

            .nav-link-smooth:hover::after,
            .nav-link-smooth.active::after {
                width: 100%;
            }

            /* Stagger animation delays */
            .stagger-1 { transition-delay: 0.1s; }
            .stagger-2 { transition-delay: 0.2s; }
            .stagger-3 { transition-delay: 0.3s; }
            .stagger-4 { transition-delay: 0.4s; }
            .stagger-5 { transition-delay: 0.5s; }
            .stagger-6 { transition-delay: 0.6s; }

            /* Loading animations */
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.8; }
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .animate-shimmer::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                animation: shimmer 2s infinite;
            }

            .animate-pulse {
                animation: pulse 2s infinite;
            }

            .animate-float {
                animation: float 3s ease-in-out infinite;
            }

            /* Smooth transitions for all interactive elements */
            a, button, .btn, .card, .nav-link, img, .social-links a {
                transition: all var(--duration-normal) var(--ease-smooth);
            }

            /* Reduce motion for accessibility */
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            }
        `;

    document.head.appendChild(style);
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            this.animatedElements.add(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    // Add animation classes to elements
    this.addScrollAnimations(observer);
    this.observers.set("scroll", observer);
  }

  addScrollAnimations(observer) {
    // Make all sections visible immediately
    const allSections = document.querySelectorAll("section");
    allSections.forEach((section) => {
      section.classList.add("visible");
    });

    // Hero section
    const heroElements = document.querySelectorAll(
      "#hero h1, #hero p, #hero .btn",
    );
    heroElements.forEach((el, index) => {
      el.classList.add("animate-fadeIn", `stagger-${index + 1}`);
      observer.observe(el);
    });

    // Section titles
    const sectionTitles = document.querySelectorAll(
      ".section-title h2, .section-title p",
    );
    sectionTitles.forEach((el) => {
      el.classList.add("animate-slideInLeft");
      observer.observe(el);
    });

    // Cards and content
    const cards = document.querySelectorAll(
      ".card, .education-card, .skill-item, .project-item, .info-item",
    );
    cards.forEach((el, index) => {
      el.classList.add("animate-scaleIn", `stagger-${(index % 6) + 1}`);
      observer.observe(el);
    });

    // Images
    const images = document.querySelectorAll("img:not(.profile img)");
    images.forEach((el) => {
      el.classList.add("animate-fadeIn");
      observer.observe(el);
    });

    // Lists and text content
    const textElements = document.querySelectorAll("p, li, .info-content");
    textElements.forEach((el, index) => {
      if (!el.closest(".animate-fadeIn")) {
        el.classList.add("animate-fadeIn", `stagger-${(index % 3) + 1}`);
        observer.observe(el);
      }
    });
  }

  setupHoverAnimations() {
    // Add hover effects to interactive elements
    const hoverElements = document.querySelectorAll(
      ".btn, .card, .social-links a, .nav-link",
    );
    hoverElements.forEach((el) => {
      el.classList.add("smooth-hover");
    });

    // Add scale hover to images
    const images = document.querySelectorAll(
      ".profile img, .about img, .portfolio img",
    );
    images.forEach((el) => {
      el.classList.add("img-smooth");
    });

    // Add glow effect to buttons
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((el) => {
      el.classList.add("smooth-hover-glow", "btn-smooth");
    });

    // Add card effects
    const cards = document.querySelectorAll(
      ".card, .education-card, .project-item",
    );
    cards.forEach((el) => {
      el.classList.add("card-smooth");
    });

    // Add navigation effects
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((el) => {
      el.classList.add("nav-link-smooth");
    });
  }

  setupStaggerAnimations() {
    // Stagger animations for skill bars
    const skillBars = document.querySelectorAll(".skill-bar, .progress-bar");
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.transform = "scaleX(1)";
      }, index * 100);
    });

    // Stagger social links
    const socialLinks = document.querySelectorAll(".social-links a");
    socialLinks.forEach((link, index) => {
      link.style.transitionDelay = `${index * 0.1}s`;
    });
  }

  setupPageLoadAnimations() {
    // Ensure all sections are visible on page load
    const allSections = document.querySelectorAll("section");
    allSections.forEach((section) => {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    });

    // Animate profile on load
    setTimeout(() => {
      const profile = document.querySelector(".profile");
      if (profile) {
        profile.classList.add("animate-fadeIn", "visible");
      }
    }, 500);

    // Animate navigation
    setTimeout(() => {
      const navItems = document.querySelectorAll(".nav-link");
      navItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate-slideInLeft", "visible");
        }, index * 100);
      });
    }, 800);

    // Add loading shimmer to images
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.classList.add("animate-shimmer");
        img.addEventListener("load", () => {
          img.classList.remove("animate-shimmer");
        });
      }
    });
  }

  setupSmoothScrolling() {
    // Enhanced smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Add scroll indicator animations
    this.setupScrollIndicators();
  }

  setupScrollIndicators() {
    const scrollProgress = document.createElement("div");
    scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #228b22, #27ae60);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
    document.body.appendChild(scrollProgress);

    window.addEventListener("scroll", () => {
      const scrolled =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      scrollProgress.style.width = `${scrolled}%`;
    });
  }

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll(".hero");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  updateAge() {
    const birthDate = new Date("2003-08-27");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    const ageElement = document.getElementById("age");
    if (ageElement) {
      ageElement.textContent = age;
    }
  }

  // Public methods for dynamic animations
  animateElement(element, animation = "fadeIn", delay = 0) {
    setTimeout(() => {
      element.classList.add(`animate-${animation}`, "visible");
    }, delay);
  }

  staggerElements(elements, animation = "fadeIn", staggerDelay = 100) {
    elements.forEach((element, index) => {
      this.animateElement(element, animation, index * staggerDelay);
    });
  }

  addFloatingAnimation(element) {
    element.classList.add("animate-float");
  }

  addPulseAnimation(element) {
    element.classList.add("animate-pulse");
  }

  // Initialize typing effect for hero
  initTypingEffect() {
    const typedElement = document.querySelector(".typed");
    if (typedElement && window.Typed) {
      new Typed(".typed", {
        strings: ["Developer", "Data Scientist", "AI Engineer", "ML Engineer"],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: "|",
        smartBackspace: true,
      });
    }
  }

  // Clean up observers
  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();

    const style = document.getElementById("smooth-animations-css");
    if (style) style.remove();
  }
}

// Initialize smooth animations
const smoothAnimations = new SmoothAnimations();

// Export for use in other scripts
window.SmoothAnimations = SmoothAnimations;
window.smoothAnimations = smoothAnimations;

// Additional utility functions
window.animateOnScroll = (selector, animation = "fadeIn") => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    smoothAnimations.animateElement(el, animation);
  });
};

window.staggerAnimate = (selector, animation = "fadeIn", delay = 100) => {
  const elements = document.querySelectorAll(selector);
  smoothAnimations.staggerElements(elements, animation, delay);
};

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    console.log(
      "🎨 Smooth Animations Library Loaded - Your portfolio is now buttery smooth!",
    );
  });
} else {
  console.log(
    "🎨 Smooth Animations Library Loaded - Your portfolio is now buttery smooth!",
  );
}
