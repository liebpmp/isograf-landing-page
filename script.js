/* ========================================
   ISOGRAF Landing Page — script.js
   Sticky Nav, Smooth Scroll, Mobile Menu,
   Scroll Animations, CTA Behavior, Counter Animation
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. STICKY NAV WITH SCROLL DETECTION
  // =========================================
  // Add class "scrolled" (or "navbar--scrolled") to the navbar
  // when the user scrolls past 50px. Remove when back at top.
  // Supports both [layer-name="NavBar"] (builder export) and #navbar (BEM version).

  const navbar = document.querySelector('[layer-name="NavBar"]') || document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    const isScrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', isScrolled);
    navbar.classList.toggle('navbar--scrolled', isScrolled);
  }

  if (navbar) {
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    // Run once on load in case page is already scrolled (e.g. after browser refresh)
    handleNavbarScroll();
  }


  // =========================================
  // 2. SMOOTH SCROLL FOR NAV LINKS
  // =========================================
  // Map nav link text to target section selectors.
  // Supports both [layer-name="Link"] elements (builder export)
  // and .navbar__link elements (BEM version).

  const HEADER_OFFSET = 80; // px offset for sticky header when scrolling

  const sectionMap = {
    'Leistungen':  '[layer-name="4 Coloumns"], #leistungen',
    'Über uns':    '[layer-name="Introduction"], #ueber-uns',
    'Ergebnisse':  '[layer-name="Routes / References"], #ergebnisse',
    'Ressourcen':  '[layer-name="5 Methods"], #ressourcen',
    'Karriere':    '.team-section, #karriere'
  };

  // Collect nav links from both builder-export and BEM structures
  const navLinkSelectors = [
    '[layer-name="Link"]',
    '.navbar__link'
  ];

  let navLinks = [];
  if (navbar) {
    navLinkSelectors.forEach(selector => {
      const found = navbar.querySelectorAll(selector);
      if (found.length > 0) {
        navLinks = navLinks.concat(Array.from(found));
      }
    });
  }

  // Remove duplicates (in case both selectors match the same element)
  navLinks = [...new Set(navLinks)];

  navLinks.forEach(link => {
    link.style.cursor = 'pointer';
    link.addEventListener('click', (e) => {
      const text = link.textContent.trim();
      const selectorString = sectionMap[text];

      if (selectorString) {
        // selectorString may contain multiple selectors separated by commas
        // Try each one until we find a match
        const selectors = selectorString.split(',').map(s => s.trim());
        let target = null;

        for (const sel of selectors) {
          target = document.querySelector(sel);
          if (target) break;
        }

        if (target) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : HEADER_OFFSET;
          const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }

      // Close mobile menu if open (defined in section 3)
      closeMobileMenu();
    });
  });

  // Also handle generic anchor links (#href) via event delegation
  // This covers footer links, CTA buttons with href="#kontakt", etc.
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId === '') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const navHeight = navbar ? navbar.offsetHeight : HEADER_OFFSET;
    const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top: targetPos,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    closeMobileMenu();
  });


  // =========================================
  // 3. MOBILE HAMBURGER MENU
  // =========================================
  // Toggle .active on .hamburger and .mobile-menu-overlay when clicked.
  // Also supports the BEM .navbar__hamburger / .navbar--open pattern.

  const hamburger = document.querySelector('.hamburger')
                 || document.querySelector('.navbar__hamburger')
                 || document.getElementById('hamburger');

  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const navMenu = document.getElementById('navMenu');

  function isMobileMenuOpen() {
    if (mobileOverlay && mobileOverlay.classList.contains('active')) return true;
    if (navbar && navbar.classList.contains('navbar--open')) return true;
    return false;
  }

  function openMobileMenu() {
    if (hamburger) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    if (mobileOverlay) mobileOverlay.classList.add('active');
    if (navbar) navbar.classList.add('navbar--open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (navbar) navbar.classList.remove('navbar--open');
    document.body.style.overflow = ''; // Restore scrolling
  }

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMobileMenuOpen()) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close mobile menu when clicking a link inside the mobile overlay
  if (mobileOverlay) {
    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Close mobile menu when clicking a nav link inside navMenu (BEM version)
  if (navMenu) {
    navMenu.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && isMobileMenuOpen()) {
        closeMobileMenu();
      }
    });
  }

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen()) {
      closeMobileMenu();
      if (hamburger) hamburger.focus(); // Return focus to hamburger for accessibility
    }
  });

  // Close mobile menu when clicking outside the navbar
  document.addEventListener('click', (e) => {
    if (!isMobileMenuOpen()) return;
    if (navbar && !navbar.contains(e.target)) {
      closeMobileMenu();
    }
  });


  // =========================================
  // 4. INTERSECTION OBSERVER — SCROLL ANIMATIONS
  // =========================================
  // Add .fade-in class to major sections, then observe them
  // and add .visible when they enter the viewport (threshold: 0.1).
  // Works with both [layer-name] selectors and BEM class selectors.

  const fadeInSelectors = [
    // Builder export layer-name selectors
    '[layer-name="References"]',
    '[layer-name="Introduction"]',
    '[layer-name="Certificate"]',
    '[layer-name="Growth"]',
    '[layer-name="5 Methods"]',
    '[layer-name="Contact Banner"]',
    // BEM class selectors (index.html)
    '.stats',
    '.leistungen',
    '.warum',
    '.certificate',
    '.wachstum',
    '.growth',
    '.contact-banner',
    '.ergebnisse',
    '.phasen',
    '.faq',
    '.final-cta'
  ];

  // Collect all matching sections and add .fade-in
  const sectionsToAnimate = [];
  fadeInSelectors.forEach(selector => {
    const el = document.querySelector(selector);
    if (el && !sectionsToAnimate.includes(el)) {
      el.classList.add('fade-in');
      sectionsToAnimate.push(el);
    }
  });

  // Also pick up any elements already marked with .fade-in or .animate-on-scroll
  document.querySelectorAll('.fade-in, .animate-on-scroll').forEach(el => {
    if (!sectionsToAnimate.includes(el)) {
      el.classList.add('fade-in');
      sectionsToAnimate.push(el);
    }
  });

  if (sectionsToAnimate.length > 0 && 'IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.add('is-visible'); // Support both class names
          scrollObserver.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px' // Trigger slightly before fully visible
    });

    sectionsToAnimate.forEach(el => scrollObserver.observe(el));
  } else {
    // Fallback: make everything visible immediately if IntersectionObserver not supported
    sectionsToAnimate.forEach(el => {
      el.classList.add('visible');
      el.classList.add('is-visible');
    });
  }


  // =========================================
  // 5. CTA BUTTON BEHAVIOR
  // =========================================
  // All buttons with CTA text ("Jetzt loslegen", "Jetzt kostenloses Erstgespräch sichern",
  // "Jetzt starten") should smooth scroll to the contact section.
  // Supports both [layer-name="Button"] (builder export) and .btn / .hero__cta (BEM).

  const ctaTexts = ['Jetzt loslegen', 'Jetzt kostenloses Erstgespräch sichern', 'Jetzt starten'];

  // Collect CTA elements from both builder-export and BEM structures
  const ctaSelectors = [
    '[layer-name="Button"]',
    '.btn--gold',
    '.hero__cta',
    '.navbar__cta-btn',
    '.certificate__card-btn'
  ];

  const ctaElements = [];
  ctaSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(btn => {
      if (!ctaElements.includes(btn)) {
        ctaElements.push(btn);
      }
    });
  });

  ctaElements.forEach(btn => {
    const text = btn.textContent.trim();
    const isCta = ctaTexts.some(ctaText => text.includes(ctaText))
               || text.includes('Jetzt')
               || text.includes('loslegen')
               || text.includes('Erstgespräch')
               || text.includes('starten');

    if (isCta) {
      btn.style.cursor = 'pointer';

      // Only add scroll behavior if the button does NOT already have a meaningful href
      // (anchor links like #kontakt are handled by the generic anchor handler in section 2)
      const href = btn.getAttribute('href');
      if (!href || href === '#') {
        btn.addEventListener('click', (e) => {
          e.preventDefault();

          // Try to find the contact section
          const contactTarget =
            document.querySelector('[layer-name="Contact Banner"]')
            || document.querySelector('.contact-banner')
            || document.getElementById('kontakt');

          if (contactTarget) {
            const navHeight = navbar ? navbar.offsetHeight : HEADER_OFFSET;
            const top = contactTarget.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        });
      }
    }
  });


  // =========================================
  // 6. COUNTER ANIMATION FOR STATS
  // =========================================
  // When the stats/References section enters the viewport,
  // animate the numbers from 0 to their target value.
  // Uses requestAnimationFrame for smooth 60fps counting.

  const statsSection =
    document.querySelector('[layer-name="References"]')
    || document.querySelector('.stats')
    || document.getElementById('stats');

  if (statsSection && 'IntersectionObserver' in window) {
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  /**
   * Animate all stat number elements from 0 to their target value.
   * Supports formats like: +800, +20, +1.200
   * Detects the original formatting (plus sign, dots as thousands separator)
   * and restores the exact original text at the end.
   */
  function animateCounters() {
    // Try builder-export selector first, then BEM selector
    let statElements = document.querySelectorAll('[layer-name="References"] [style*="font-size:66px"]');

    if (statElements.length === 0) {
      statElements = document.querySelectorAll('.stats__number');
    }

    if (statElements.length === 0) return;

    statElements.forEach(el => {
      const originalText = el.textContent.trim();
      const match = originalText.match(/^\+?([\d.,]+)/);

      if (!match) return;

      const targetText = match[0];
      const hasPlus = originalText.startsWith('+');

      // Parse the numeric value:
      // German format uses dots as thousands separators (e.g. 1.200 = 1200)
      const hasDot = match[1].includes('.');
      const hasComma = match[1].includes(',');
      const numericStr = match[1].replace(/[.,]/g, '');
      const targetNum = parseInt(numericStr, 10);

      if (isNaN(targetNum) || targetNum === 0) return;

      const duration = 2000; // 2 seconds for full animation
      const startTime = performance.now();

      // Set initial display value
      el.textContent = hasPlus ? '+0' : '0';

      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Cubic ease-out for a satisfying deceleration effect
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(targetNum * eased);

        // Format the number with German locale (dots as thousands separators)
        let display = current.toString();
        if ((hasDot || hasComma) && current >= 1000) {
          display = current.toLocaleString('de-DE');
        }
        if (hasPlus) display = '+' + display;

        el.textContent = display;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Restore the exact original text to preserve any suffix or formatting
          el.textContent = originalText;
        }
      }

      requestAnimationFrame(animate);
    });
  }


  // =========================================
  // 7. FAQ ACCORDION
  // =========================================
  // Only one FAQ item open at a time. Clicking an open item closes it.

  const faqList = document.querySelector('.faq__list');

  if (faqList) {
    faqList.addEventListener('click', (e) => {
      const questionBtn = e.target.closest('.faq__question');
      if (!questionBtn) return;

      const clickedItem = questionBtn.closest('.faq__item');
      if (!clickedItem) return;

      const isAlreadyOpen = clickedItem.classList.contains('faq__item--open');

      // Close all items first
      const allItems = faqList.querySelectorAll('.faq__item');
      allItems.forEach(item => {
        item.classList.remove('faq__item--open');
        const btn = item.querySelector('.faq__question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // If the clicked item was NOT already open, open it
      if (!isAlreadyOpen) {
        clickedItem.classList.add('faq__item--open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }


  // =========================================
  // 8. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
  // =========================================
  // Highlight the nav link corresponding to the currently visible section.

  const sections = document.querySelectorAll('section[id]');
  const navLinksForHighlight = navbar ? navbar.querySelectorAll('.navbar__link') : [];

  function updateActiveNavLink() {
    if (sections.length === 0 || navLinksForHighlight.length === 0) return;

    const navHeight = navbar ? navbar.offsetHeight : HEADER_OFFSET;
    const scrollPos = window.scrollY + navHeight + 100; // offset to trigger slightly early

    let currentSectionId = '';

    // Walk through sections top-to-bottom; the last one whose top we've passed wins
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // If scrolled near the bottom of the page, activate the last section
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        currentSectionId = lastSection.getAttribute('id');
      }
    }

    navLinksForHighlight.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + currentSectionId) {
        link.classList.add('navbar__link--active');
      } else {
        link.classList.remove('navbar__link--active');
      }
    });
  }

  if (navLinksForHighlight.length > 0) {
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    // Run once on load
    updateActiveNavLink();
  }

});
