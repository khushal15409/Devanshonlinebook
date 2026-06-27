/**
 * ElitePlay — Premium Sports Gaming Platform
 * main.js — Complete Animation & Interaction Layer v2.0
 * ============================================================
 * Stack: GSAP + ScrollTrigger | AOS | Swiper | CountUp | Canvas Particles
 */

'use strict';

/* ============================================================
   1. LOADING SCREEN
   ============================================================ */
const loader = document.getElementById('loader');
const loaderFill = document.querySelector('.loader-fill');
const loaderPct = document.querySelector('.loader-pct');

let progress = 0;
const loaderInterval = setInterval(() => {
  progress += Math.random() * 18 + 6;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      initAll();
    }, 250);
  }
  if (loaderFill) loaderFill.style.width = progress + '%';
  if (loaderPct) loaderPct.textContent = Math.floor(progress) + '%';
}, 40);

document.body.style.overflow = 'hidden';

/* ============================================================
   2. PARTICLE CANVAS
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const particles = [];
  const PARTICLE_COUNT = 80;
  const colors = [
    'rgba(255,193,7,',
    'rgba(139,92,246,',
    'rgba(6,182,212,',
    'rgba(249,115,22,',
    'rgba(255,255,255,'
  ];

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = -(Math.random() * 0.8 + 0.3);
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = 0;
      this.alphaSpeed = Math.random() * 0.01 + 0.004;
      this.maxAlpha = Math.random() * 0.35 + 0.08;
      this.fadeIn = true;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.life < this.maxLife * 0.15) {
        this.alpha = Math.min(this.alpha + this.alphaSpeed, this.maxAlpha);
      } else if (this.life > this.maxLife * 0.75) {
        this.alpha = Math.max(this.alpha - this.alphaSpeed * 0.6, 0);
      }
      if (this.life >= this.maxLife || this.y < -20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color + '0.6)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ============================================================
   3. MOUSE GLOW
   ============================================================ */
function initMouseGlow() {
  const glow = document.getElementById('mouse-glow');
  if (!glow) return;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
  }, { passive: true });

  function animate() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

/* ============================================================
   4. SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / max) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ============================================================
   5. NAVBAR
   ============================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }
}

/* ============================================================
   6. GSAP HERO ANIMATIONS
   ============================================================ */
function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({ delay: 0.2 });

  // Hero elements — snappy entrance
  tl.from('.hero-badge', {
    opacity: 0, y: 15, duration: 0.45, ease: 'power3.out'
  })
  .from('.hero-h1 .inner', {
    opacity: 0, y: 45, stagger: 0.1, duration: 0.65, ease: 'power4.out'
  }, '-=0.2')
  .from('.hero-sub', {
    opacity: 0, y: 18, duration: 0.5, ease: 'power3.out'
  }, '-=0.3')
  .from('.hero-ctas .btn-primary, .hero-ctas .btn-secondary', {
    opacity: 0, y: 15, stagger: 0.1, duration: 0.45, ease: 'back.out(1.5)'
  }, '-=0.25')
  .from('.hero-stats .hero-stat-item', {
    opacity: 0, y: 15, stagger: 0.08, duration: 0.45, ease: 'power3.out'
  }, '-=0.15')
  .from('.hero-photo', {
    opacity: 0, scale: 0.88, duration: 0.75, ease: 'power3.out'
  }, '-=0.75')
  .from('.ring-outer, .ring-mid, .ring-inner', {
    opacity: 0, scale: 0.75, duration: 0.7, stagger: 0.1, ease: 'power2.out'
  }, '-=0.6')
  .from('.float-el', {
    opacity: 0, scale: 0.65, stagger: 0.1, duration: 0.5, ease: 'back.out(1.8)'
  }, '-=0.4');

  // Scroll-triggered animations
  gsap.from('.about-img-main', {
    scrollTrigger: { trigger: '.about-img-main', start: 'top 80%' },
    opacity: 0, x: -50, duration: 1, ease: 'power3.out'
  });

  // Stats counter trigger (handled separately)
  ScrollTrigger.create({
    trigger: '#stats',
    start: 'top 75%',
    once: true,
    onEnter: () => animateCounters()
  });

  // Parallax on hero image
  gsap.to('.hero-photo', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 60, ease: 'none'
  });

  // Parallax on hero text
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 40, ease: 'none'
  });
}

/* ============================================================
   7. AOS (Animate on Scroll)
   ============================================================ */
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 550,
    easing: 'ease-out-cubic',
    once: true,
    offset: 0,
    delay: 0,
    throttleDelay: 50,
    disableMutationObserver: false,
  });
  // DOMContentLoaded has already fired (called after loader), force a scan
  requestAnimationFrame(() => {
    AOS.refreshHard();
  });
}

/* ============================================================
   8. INTERSECTION OBSERVER REVEALS
   ============================================================ */
function initRevealObserver() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.revealDelay || 0;
        setTimeout(() => e.target.classList.add('is-visible'), parseInt(delay));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ============================================================
   9. COUNTER ANIMATIONS
   ============================================================ */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 2200;
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const value = target * ease;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

/* ============================================================
   10. HERO STAT COUNTERS (quick animation)
   ============================================================ */
function initHeroCounters() {
  const counters = document.querySelectorAll('[data-hero-count]');
  counters.forEach(el => {
    const target = parseFloat(el.dataset.heroCount);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const dur = 1800;
    let s = null;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        function step(ts) {
          if (!s) s = ts;
          const p = Math.min((ts - s) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + (target * e).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}

/* ============================================================
   11. PROGRESS BAR ANIMATIONS
   ============================================================ */
function initProgressBars() {
  const bars = document.querySelectorAll('.prog-fill[data-width]');
  if (!bars.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const width = e.target.dataset.width;
        setTimeout(() => { e.target.style.width = width; }, 200);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ============================================================
   12. SWIPER CAROUSELS
   ============================================================ */
function initSwipers() {
  if (typeof Swiper === 'undefined') return;

  // Testimonials
  if (document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.testimonials-swiper .swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.testimonials-swiper .swiper-button-next',
        prevEl: '.testimonials-swiper .swiper-button-prev'
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      },
      grabCursor: true,
    });
  }

  // Sports Swiper (mobile)
  if (document.querySelector('.sports-swiper')) {
    new Swiper('.sports-swiper', {
      slidesPerView: 1.4,
      spaceBetween: 14,
      loop: false,
      grabCursor: true,
      breakpoints: {
        480: { slidesPerView: 2.2 },
        640: { slidesPerView: 3 },
        900: { slidesPerView: 4 },
        1100: { slidesPerView: 5 },
      }
    });
  }
}

/* ============================================================
   13. FAQ ACCORDION
   ============================================================ */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(it => it.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ============================================================
   14. VIDEO — src is hardcoded in HTML, nothing to do in JS
   ============================================================ */
function initVideo() {
  // YouTube iframe src is set directly in HTML with autoplay=1&mute=1.
  // No JS injection needed — the iframe loads and plays on its own.
}

/* ============================================================
   15. 3D TILT EFFECT
   ============================================================ */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-wrap');
  cards.forEach(card => {
    const inner = card.querySelector('[data-tilt-inner]') || card;
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const maxTilt = parseFloat(card.dataset.tiltMax || 10);
      inner.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    });
  });
}

/* ============================================================
   16. MAGNETIC BUTTONS
   ============================================================ */
function initMagneticBtns() {
  const btns = document.querySelectorAll('.magnetic');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
}

/* ============================================================
   17. RIPPLE EFFECT ON BUTTONS
   ============================================================ */
function initRipple() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:8px; height:8px; background:rgba(255,255,255,0.35);
        left:${x}px; top:${y}px;
        transform:translate(-50%,-50%) scale(0);
        animation:ripple-out 0.6s ease-out forwards;
      `;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  // Inject ripple keyframe if not in CSS
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple-out {
        0%{transform:translate(-50%,-50%) scale(0);opacity:0.8}
        100%{transform:translate(-50%,-50%) scale(40);opacity:0}
      }
    `;
    document.head.appendChild(style);
  }
}

/* ============================================================
   18. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 78; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   19. INFINITE COIN SPAWNER (Hero)
   ============================================================ */
function spawnHeroCoins() {
  const wrap = document.querySelector('.hero-img-wrap');
  if (!wrap) return;
  const symbols = ['₹', '$', '★', '⚡'];

  setInterval(() => {
    if (wrap.querySelectorAll('.floating-coin').length >= 5) return;
    const coin = document.createElement('div');
    coin.className = 'floating-coin';
    coin.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = Math.random() * 360;
    const r = 200 + Math.random() * 60;
    const x = 50 + r * Math.cos(angle * Math.PI / 180) / 3;
    const y = 50 + r * Math.sin(angle * Math.PI / 180) / 3;
    coin.style.left = x + '%';
    coin.style.top = y + '%';
    coin.style.animationDelay = (Math.random() * 2) + 's';
    coin.style.animationDuration = (3 + Math.random() * 3) + 's';
    wrap.appendChild(coin);
    setTimeout(() => coin.remove(), 6000);
  }, 1500);
}

/* ============================================================
   20. LIGHT STREAKS
   ============================================================ */
function initLightStreaks() {
  const sections = document.querySelectorAll('.hero-section, .stats-section');
  sections.forEach(section => {
    for (let i = 0; i < 3; i++) {
      const streak = document.createElement('div');
      streak.className = 'light-streak';
      streak.style.cssText = `
        top:${20 + Math.random() * 60}%;
        width:${150 + Math.random() * 200}px;
        animation-delay:${Math.random() * 8}s;
        animation-duration:${7 + Math.random() * 5}s;
      `;
      section.style.position = 'relative';
      section.style.overflow = 'hidden';
      section.appendChild(streak);
    }
  });
}

/* ============================================================
   21. SPORT CARD HOVER SOUND (visual feedback only)
   ============================================================ */
function initSportCards() {
  document.querySelectorAll('.sport-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(card, { scale: 1.03, duration: 0.35, ease: 'power2.out' });
      }
    });
    card.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(card, { scale: 1, duration: 0.35, ease: 'power2.out' });
      }
    });
  });
}

/* ============================================================
   22. GSAP SCROLL ANIMATIONS FOR SECTIONS
   ============================================================ */
function initScrollAnimations() {
  if (typeof gsap === 'undefined') return;

  // Only animate elements that do NOT have data-aos (avoid AOS conflict)
  // Cards not covered by AOS — check first
  const cardGroups = [
    { selector: '.why-card', trigger: '#why-us' },
    { selector: '.feat-card', trigger: '#features' },
    { selector: '.ach-card', trigger: '#achievements' },
  ];

  cardGroups.forEach(({ selector, trigger }) => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    // Skip if already managed by AOS
    if (els[0] && els[0].hasAttribute('data-aos')) return;
    gsap.from(els, {
      scrollTrigger: { trigger: trigger || els[0], start: 'top 85%', once: true },
      opacity: 0, y: 30, stagger: 0.08, duration: 0.55, ease: 'power3.out'
    });
  });

  // Timeline items (no data-aos on .tl-item)
  document.querySelectorAll('.tl-item').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      opacity: 0, x: -25, duration: 0.55, delay: i * 0.07, ease: 'power3.out'
    });
  });
  // Note: .g-item and .news-card have data-aos — AOS handles them, no GSAP needed
}

/* ============================================================
   23. NEWSLETTER FORM
   ============================================================ */
function initNewsletter() {
  const form = document.getElementById('nl-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('.nl-input');
    const btn = form.querySelector('.nl-btn');
    if (!input || !input.value.trim()) return;
    btn.textContent = '✓ Subscribed!';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3000);
  });
}

/* ============================================================
   24. SPORT CARD HOVER SPARKLE
   ============================================================ */
function createSparkle(x, y, container) {
  const spark = document.createElement('div');
  spark.style.cssText = `
    position:absolute; width:4px; height:4px; border-radius:50%;
    background:var(--gold-200); pointer-events:none; z-index:10;
    left:${x}px; top:${y}px;
    animation:sparkle-out 0.5s ease forwards;
  `;
  container.appendChild(spark);
  setTimeout(() => spark.remove(), 550);
}

/* ============================================================
   25. SECTION BACKGROUND GRADIENT SHIFT (subtle)
   ============================================================ */
function initGradientShift() {
  let hue = 0;
  setInterval(() => {
    hue = (hue + 0.2) % 360;
    const el = document.querySelector('.hero-bg');
    if (el) {
      // Subtle hue shift on particle hue
    }
  }, 50);
}

/* ============================================================
   MAIN INIT
   ============================================================ */
function initAll() {
  initParticles();
  initMouseGlow();
  initScrollProgress();
  initNavbar();
  initAOS();
  initRevealObserver();
  initHeroGSAP();
  initScrollAnimations();
  initSwipers();
  initFAQ();
  initVideo();
  initTiltCards();
  initMagneticBtns();
  initRipple();
  initSmoothScroll();
  initProgressBars();
  initHeroCounters();
  initSportCards();
  spawnHeroCoins();
  initLightStreaks();
}

// Inject sparkle keyframe
document.addEventListener('DOMContentLoaded', () => {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes sparkle-out {
      0%{transform:scale(0) rotate(0deg);opacity:1}
      100%{transform:scale(3) rotate(90deg) translate(20px,-20px);opacity:0}
    }
    @keyframes ripple-out {
      0%{transform:translate(-50%,-50%) scale(0);opacity:0.8}
      100%{transform:translate(-50%,-50%) scale(45);opacity:0}
    }
  `;
  document.head.appendChild(s);
});
