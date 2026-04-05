import { setLanguage, getCurrentLang } from './i18n.js';

// ===== Initialize Language =====
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language
  setLanguage(getCurrentLang());

  // Language toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // Mobile language toggle (inside mobile menu)
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initParallax();
  initLoader();
  initContactForm();
});

// ===== Navbar Scroll Effect =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== Scroll Reveal Animations =====
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay based on position
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== Parallax Effect for Hero =====
function initParallax() {
  const heroBg = document.querySelector('.hero-bg img');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;

    if (scrolled < heroHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.4}px) scale(1.1)`;
    }
  }, { passive: true });
}

// ===== Loader =====
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 800);
  });

  // Fallback — remove loader after 3 seconds max
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2000);
}

// ===== Contact Form =====
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Build WhatsApp message
    const waMessage = encodeURIComponent(
      `Bonjour LuxJardin! 🌿\n\nNom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`
    );
    const waUrl = `https://wa.me/212650389121?text=${waMessage}`;
    window.open(waUrl, '_blank');

    // Reset form
    form.reset();
  });
}

// ===== Counter Animation for Stats =====
function animateCounters() {
  const counters = document.querySelectorAll('.about-stat-number');
  
  counters.forEach(counter => {
    const target = counter.textContent;
    const hasPlus = target.includes('+');
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const current = Math.round(num * eased);

      counter.textContent = current + (hasPlus ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterObserver.observe(aboutSection);
}
