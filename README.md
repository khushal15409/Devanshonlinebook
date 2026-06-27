# ElitePlay — Premium Sports Gaming Platform

> World-Class Fantasy Sports & Online Gaming Landing Page

---

## Project Overview

**ElitePlay** is a premium, luxury-themed sports gaming / fantasy sports landing page built with a focus on:
- Ultra-premium dark gold aesthetic
- GSAP + CSS animations throughout
- Full glassmorphism design system
- 17 fully-designed sections
- Production-ready, responsive code

---

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic markup |
| Tailwind CSS (CDN) | Utility-first layout |
| Custom CSS | Premium design system, animations |
| GSAP 3.12 + ScrollTrigger | Hero & scroll animations |
| AOS 2.3 | Section reveal animations |
| Swiper 11 | Testimonials & Sports carousels |
| Font Awesome 6.5 | Icons |
| Google Fonts | Orbitron, Rajdhani, Inter |
| Canvas API | Particle background system |

---

## File Structure

```
Devanshonlinebook/
├── index.html          — Main landing page (all 17 sections)
├── css/
│   └── style.css       — Complete design system (1000+ lines)
├── js/
│   └── main.js         — All animations & interactions (700+ lines)
├── assets/
│   ├── images/         — Place custom images here
│   ├── icons/          — Custom icon assets
│   ├── videos/         — Local video files (optional)
│   └── animations/     — Lottie JSON files (optional)
└── README.md
```

---

## Sections Included

1. **Loading Screen** — Animated rings, progress bar
2. **Navbar** — Sticky, glassmorphism, responsive hamburger menu
3. **Hero** — Split layout, particle background, floating badges, animated rings
4. **Trusted By** — Dual infinite marquee strips
5. **About Platform** — Timeline animation, floating stat cards
6. **Why Choose Us** — 6 tilt-card grid with accent colors
7. **Live Features** — Feature list with left accent bars
8. **Featured Sports** — Swiper carousel, 7 sports with real images
9. **Statistics** — Counter animations, progress bars
10. **Video Section** — YouTube embed with animated play overlay
11. **Gallery** — Masonry-style grid with hover effects
12. **Testimonials** — Swiper with 5 glass testimonial cards
13. **Achievements** — Award cards + trust badge grid
14. **Latest News** — 3-column blog card grid
15. **FAQ** — Animated accordion with 7 questions
16. **Download App** — Phone mockup, app store badges, QR placeholder
17. **Newsletter** — Email subscribe with validation
18. **Footer** — 5-column layout, social icons, legal disclaimer

---

## Configuration

### YouTube Video
Replace the `data-src` attribute in the video section:

```html
<iframe
  id="yt-iframe"
  data-src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  ...
```

Find a sports-related YouTube video ID and replace `YOUR_VIDEO_ID`.

### Images
All images use Unsplash placeholder URLs. Replace with your own:
- Hero player photo
- Sports card images
- Gallery images
- Testimonial avatars
- News thumbnails

### Brand Name
Search and replace `ElitePlay` throughout `index.html` with your actual brand name.

### Colors
Modify CSS variables in `css/style.css` under `:root {}`:

```css
:root {
  --gold-200: #FFC107;   /* Primary accent */
  --purple:   #8B5CF6;   /* Secondary accent */
  --dark-400: #080808;   /* Background */
}
```

---

## Animation Inventory

| Animation | Implementation |
|---|---|
| Loading screen rings | CSS `@keyframes spin-cw` |
| Scroll progress bar | JavaScript + CSS |
| Particle background | HTML5 Canvas API |
| Mouse glow follow | JavaScript requestAnimationFrame |
| Hero entrance | GSAP timeline |
| Text split animation | GSAP word stagger |
| Hero parallax | GSAP ScrollTrigger scrub |
| Section reveals | AOS + custom IntersectionObserver |
| Card 3D tilt | JavaScript mouse tracking |
| Magnetic buttons | JavaScript mouse tracking |
| Button ripple | JavaScript dynamic DOM |
| Infinite marquee | CSS `@keyframes marquee` |
| Counter count-up | JavaScript rAF loop |
| Progress bars | CSS width transition |
| Sport card hover | GSAP + CSS transforms |
| Video play reveal | CSS opacity transition |
| Gallery zoom | CSS transform |
| Testimonials slider | Swiper.js |
| Sports carousel | Swiper.js |
| FAQ accordion | CSS max-height + JavaScript |
| Floating coins | JavaScript + CSS `@keyframes coin-toss` |
| Light streaks | CSS `@keyframes streak` |
| Glassmorphism | CSS `backdrop-filter: blur()` |
| Gold shimmer text | CSS `@keyframes shimmer` |

---

## Performance

- Images use `loading="lazy"` for lazy loading
- Critical hero image uses `loading="eager"`
- CSS custom properties for efficient theming
- All scripts loaded via CDN with `defer`
- Particles use requestAnimationFrame (GPU-accelerated)
- Smooth scroll uses native CSS `scroll-behavior`

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full (`-webkit-backdrop-filter`) |
| Edge 90+ | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |

---

## Customization Guide

### Adding a New Sport Card
```html
<div class="swiper-slide">
  <div class="sport-card">
    <img src="YOUR_IMAGE_URL" alt="Sport Name" loading="lazy" />
    <div class="sport-overlay">
      <div class="sport-ico">🏈</div>
      <div class="sport-name">Sport Name</div>
      <div class="sport-meta">X,XXX active contests</div>
    </div>
    <div class="sport-glow-border"></div>
    <div class="sport-pin"><i class="fas fa-arrow-right"></i></div>
  </div>
</div>
```

### Adding a Why Choose Us Card
```html
<div class="why-card tilt-wrap" style="--accent-color:#COLOR;" data-aos="fade-up">
  <div data-tilt-inner>
    <div class="wi" style="background:rgba(R,G,B,0.1);color:#COLOR;">
      <i class="fas fa-icon-name"></i>
    </div>
    <div class="wt">Card Title</div>
    <div class="wd">Card description text.</div>
  </div>
</div>
```

---

*Built with passion. Designed for champions.*
