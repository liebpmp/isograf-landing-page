/* ============================================================
   ISOGRAF Landing Page — JavaScript
   Scroll animations, sticky navbar, hamburger menu, smooth scroll
   ============================================================ */

(function () {
    'use strict';

    // --- DOM Elements ---
    const navbar = document.getElementById('navbar');
    const navHamburger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');

    // --- Sticky Navbar with scroll effect ---
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // --- Mobile Hamburger Menu ---
    if (navHamburger && navLinks) {
        navHamburger.addEventListener('click', function () {
            navHamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu on link click
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
        // Fallback: show all immediately
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
                    // Remove active from all
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
            // Extract the numeric value and prefix/suffix
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
                // Ease-out
                var eased = 1 - Math.pow(1 - progress, 3);
                var current = Math.round(eased * target);

                // Format with dots for thousands
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

    // Observe the stats row
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

    // --- Staggered animation for card groups ---
    var cardGroups = document.querySelectorAll('.service-cards, .done4you-cards, .ergebnisse-cards, .team-grid');

    cardGroups.forEach(function (group) {
        var cards = group.children;
        Array.from(cards).forEach(function (card, index) {
            card.style.transitionDelay = (index * 0.1) + 's';
        });
    });

    // --- Timeline animation stagger ---
    var timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(function (item, index) {
        item.style.transitionDelay = (index * 0.15) + 's';
    });

})();
