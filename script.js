/* ========================================
   ISOGRAF Landing Page — script.js
   Navigation, Carousel, Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
      // Animate hamburger lines
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ---- Sticky Nav Shadow on Scroll ----
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
      } else {
        nav.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // ---- 3D Carousel (Done-4-You) ----
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const carouselDots = document.getElementById('carouselDots');

  if (carouselTrack) {
    const cards = carouselTrack.querySelectorAll('.carousel-card');
    const dots = carouselDots ? carouselDots.querySelectorAll('.carousel-dot') : [];
    let currentIndex = 2; // Start at ZFU (index 2) as shown in reference
    const total = cards.length;

    function updateCarousel() {
      cards.forEach((card, i) => {
        card.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');

        if (i === currentIndex) {
          card.classList.add('active');
        } else if (i === (currentIndex - 1 + total) % total) {
          card.classList.add('prev');
        } else if (i === (currentIndex + 1) % total) {
          card.classList.add('next');
        } else {
          // Determine if it's left or right of current
          const diff = i - currentIndex;
          if (diff < 0 || diff > total / 2) {
            card.classList.add('hidden-left');
          } else {
            card.classList.add('hidden-right');
          }
        }
      });

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % total;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + total) % total;
      updateCarousel();
    }

    if (carouselNext) carouselNext.addEventListener('click', nextSlide);
    if (carouselPrev) carouselPrev.addEventListener('click', prevSlide);

    // Dot click
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index);
        updateCarousel();
      });
    });

    // Card click to navigate
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index);
        if (idx !== currentIndex) {
          currentIndex = idx;
          updateCarousel();
        }
      });
    });

    // Initialize
    updateCarousel();

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });

    // Auto-advance every 5s
    let autoPlay = setInterval(nextSlide, 5000);

    // Pause on hover
    carouselTrack.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carouselTrack.addEventListener('mouseleave', () => {
      autoPlay = setInterval(nextSlide, 5000);
    });
  }

  // ---- Scroll Animations (Intersection Observer) ----
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 88;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      const navHeight = nav ? nav.offsetHeight : 88;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // ---- Animate progress bars on scroll ----
  const progressBars = document.querySelectorAll('.ergebnis-progress-bar');
  if (progressBars.length > 0 && 'IntersectionObserver' in window) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          bar.style.width = '0%';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              bar.style.width = width;
            });
          });
          progressObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
  }

  // ---- Counter animation for stat numbers ----
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          // Parse number from text like "+800", "+20", "+1.200"
          const match = text.match(/^\+?([\d.]+)/);
          if (match) {
            const targetText = text;
            const numericStr = match[1].replace(/\./g, '');
            const targetNum = parseInt(numericStr);
            const prefix = text.startsWith('+') ? '+' : '';
            const hasDot = match[1].includes('.');
            const duration = 1500;
            const start = performance.now();

            function animate(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(targetNum * eased);

              let formatted = current.toString();
              if (hasDot && current >= 1000) {
                formatted = current.toLocaleString('de-DE');
              }

              el.textContent = prefix + formatted;

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                el.textContent = targetText;
              }
            }

            el.textContent = prefix + '0';
            requestAnimationFrame(animate);
          }
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

});
