import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
   * 1. Theme Toggle
   * ============================================= */
  const themeToggle = document.getElementById('theme-toggle');

  const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle?.classList.toggle('theme-toggle--light', theme === 'light');
  };

  setTheme(getPreferredTheme());

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* =============================================
   * 2. Navigation Scroll Effect
   * ============================================= */
  const nav = document.getElementById('nav');
  let ticking = false;

  const updateNav = () => {
    if (window.scrollY > 50) {
      nav?.classList.add('nav--scrolled');
    } else {
      nav?.classList.remove('nav--scrolled');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  updateNav();

  /* =============================================
   * 3. Mobile Navigation
   * ============================================= */
  const navToggle = document.getElementById('nav-toggle');

  navToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    nav?.classList.toggle('nav--open');
    document.body.style.overflow = nav?.classList.contains('nav--open') ? 'hidden' : '';
  });

  // Close on outside click or link click
  document.addEventListener('click', (e) => {
    if (nav?.classList.contains('nav--open')) {
      if (!nav.contains(e.target) || e.target.closest('.nav__link')) {
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
      }
    }
  });

  /* =============================================
   * 4. Smooth Scroll Navigation
   * ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* =============================================
   * 5. Scroll Reveal Animations
   * ============================================= */
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children in grids
        const delay = entry.target.closest('.skills__grid, .projects__grid, .about__stats')
          ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
          : 0;
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* =============================================
   * 6. Active Section Highlighting
   * ============================================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-20% 0px -60% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  /* =============================================
   * 7. Typewriter Effect
   * ============================================= */
  const subtitleEl = document.querySelector('.hero__subtitle');
  if (subtitleEl) {
    const texts = ['Software Engineer', 'Backend Developer', 'Distributed Systems', 'System Design'];
    let textIdx = 0, charIdx = 0, isDeleting = false;

    const type = () => {
      const current = texts[textIdx];

      if (isDeleting) {
        charIdx--;
        subtitleEl.textContent = current.substring(0, charIdx);
      } else {
        charIdx++;
        subtitleEl.textContent = current.substring(0, charIdx);
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        textIdx = (textIdx + 1) % texts.length;
        speed = 500;
      }

      setTimeout(type, speed);
    };

    type();
  }

  /* =============================================
   * 8. Back to Top
   * ============================================= */
  document.querySelector('.footer__top-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =============================================
   * 9. Cursor Follower (Desktop Only)
   * ============================================= */
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-follower');
    document.body.appendChild(cursor);

    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    const animate = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // Scale on interactive elements
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-follower--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-follower--hover'));
    });
  }
});
