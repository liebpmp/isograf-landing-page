/* ============================================================
   ISOGRAF Landing Page — JavaScript
   Scroll animations, sticky navbar, hamburger menu, 3D carousel
   ============================================================ */

(function () {
    'use strict';

    // --- DOM Elements ---
    var navbar = document.getElementById('navbar');
    var navHamburger = document.getElementById('navHamburger');
    var navLinks = document.getElementById('navLinks');

    // --- Sticky Navbar with scroll effect ---
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // --- Mobile Hamburger Menu ---
    if (navHamburger && navLinks) {
        navHamburger.addEventListener('click', function () {
            navHamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navHamburger.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = navbar ? navbar.offsetHeight : 68;
                var targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Fade-in on Scroll (Intersection Observer) ---
    var fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        var fadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(function (el) {
            fadeObserver.observe(el);
        });
    } else {
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Active nav link on scroll ---
    var sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var top = section.offsetTop - 100;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            var link = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-links a').forEach(function (a) {
                        a.classList.remove('nav-link-active');
                    });
                    link.classList.add('nav-link-active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // --- Counter Animation for Stats ---
    function animateCounters() {
        var statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(function (el) {
            if (el.dataset.animated) return;

            var text = el.textContent.trim();
            var match = text.match(/^([+]?)([0-9.,]+)(.*)$/);
            if (!match) return;

            var prefix = match[1];
            var numStr = match[2];
            var suffix = match[3];
            var hasDot = numStr.indexOf('.') !== -1;
            var target = parseInt(numStr.replace(/\./g, ''), 10);

            el.dataset.animated = 'true';

            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.round(eased * target);

                var formatted = current.toString();
                if (hasDot && current >= 1000) {
                    formatted = current.toLocaleString('de-DE');
                }

                el.textContent = prefix + formatted + suffix;

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        });
    }

    var statsRow = document.querySelector('.stats-row');
    if (statsRow && 'IntersectionObserver' in window) {
        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsRow);
    }

    // --- 3D Carousel for Done-4-You ---
    var carousel = document.getElementById('done4youCarousel');
    if (carousel) {
        var track = carousel.querySelector('.done4you-track');
        var cards = carousel.querySelectorAll('.done4you-card');
        var prevBtn = carousel.querySelector('.carousel-prev');
        var nextBtn = carousel.querySelector('.carousel-next');
        var dots = carousel.querySelectorAll('.dot');
        var currentSlide = 2; // Start with ZFU centered (index 2)
        var totalCards = cards.length;

        function updateCarousel() {
            cards.forEach(function (card, index) {
                card.classList.remove('carousel-active', 'carousel-left', 'carousel-right', 'carousel-far-left', 'carousel-far-right', 'carousel-hidden');

                var diff = index - currentSlide;

                if (diff === 0) {
                    card.classList.add('carousel-active');
                } else if (diff === -1 || (diff === totalCards - 1)) {
                    card.classList.add('carousel-left');
                } else if (diff === 1 || (diff === -(totalCards - 1))) {
                    card.classList.add('carousel-right');
                } else {
                    card.classList.add('carousel-hidden');
                }
            });

            // Update dots
            dots.forEach(function (dot, index) {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                currentSlide = (currentSlide - 1 + totalCards) % totalCards;
                updateCarousel();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                currentSlide = (currentSlide + 1) % totalCards;
                updateCarousel();
            });
        }

        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                currentSlide = parseInt(this.dataset.slide, 10);
                updateCarousel();
            });
        });

        // Initialize
        updateCarousel();

        // Touch support
        var touchStartX = 0;
        var touchEndX = 0;

        track.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    currentSlide = (currentSlide + 1) % totalCards;
                } else {
                    currentSlide = (currentSlide - 1 + totalCards) % totalCards;
                }
                updateCarousel();
            }
        }, { passive: true });
    }

    // --- Staggered animation for card groups ---
    var cardGroups = document.querySelectorAll('.service-cards, .ergebnisse-cards, .team-grid');

    cardGroups.forEach(function (group) {
        var groupCards = group.children;
        Array.from(groupCards).forEach(function (card, index) {
            card.style.transitionDelay = (index * 0.1) + 's';
        });
    });

    // --- Timeline animation stagger ---
    var timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(function (item, index) {
        item.style.transitionDelay = (index * 0.15) + 's';
    });

})();
