// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ── Active nav highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link:not(.btn-nav)');

const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => observerNav.observe(sec));

// ── Scroll fade-in animations ──
const fadeEls = document.querySelectorAll(
  '.card, .testimonial-card, .pillar, .channel, .methodology-banner, .cert-badge, .trust-bar, .hero-stats'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observerFade = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observerFade.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observerFade.observe(el));

// ── Service tag toggle ──
function toggleTag(el) {
  el.classList.toggle('active');
}

// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('.btn-text');
  const orig = btn.textContent;

  btn.textContent = 'Sending...';

  setTimeout(() => {
    e.target.reset();
    document.querySelectorAll('.stag.active').forEach(t => t.classList.remove('active'));
    btn.textContent = orig;
    const success = document.getElementById('formSuccess');
    success.style.display = 'block';
    setTimeout(() => success.style.display = 'none', 6000);
  }, 1200);
}

// ── Stat counter animation ──
function animateCounter(el, target, duration = 1500) {
  const isDecimal = target.toString().includes('.');
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal
      ? (eased * parseFloat(target)).toFixed(1)
      : Math.floor(eased * parseInt(target));
    el.textContent = current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num, .trust-num');
const observerStats = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el  = entry.target;
      const raw = el.textContent.replace(/[^0-9.]/g, '');
      const suffix = el.textContent.replace(/[0-9.]/g, '');
      el.dataset.suffix = suffix;
      if (raw) animateCounter(el, raw);
      observerStats.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => observerStats.observe(el));

// ── Smooth active nav style ──
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--gold) !important; }`;
document.head.appendChild(style);
