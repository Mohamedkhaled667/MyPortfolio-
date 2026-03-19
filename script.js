document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load in case elements are already in view
    revealOnScroll();
    // Tab switching logic for Skills section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Re-trigger reveal animation for newly visible content if needed
                const grid = targetContent.querySelector('.reveal');
                if (grid && !grid.classList.contains('active')) {
                    grid.classList.add('active');
                }
            }
        });
    });

    // --- Theme & Language Toggling ---
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const body = document.body;
    const html = document.documentElement;

    if (themeToggle && langToggle) {
        // Load Theme Preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        // Toggle Theme
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            
            themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        });

        // Load Language Preference
        let currentLang = localStorage.getItem('portfolio-lang') || 'en';

        const updateLanguage = (lang) => {
            const translatableElements = document.querySelectorAll('[data-en][data-ar]');
            translatableElements.forEach(el => {
                el.innerHTML = el.getAttribute(`data-${lang}`);
            });

            if (lang === 'ar') {
                html.setAttribute('lang', 'ar');
                html.setAttribute('dir', 'rtl');
                langToggle.textContent = 'English';
            } else {
                html.setAttribute('lang', 'en');
                html.setAttribute('dir', 'ltr');
                langToggle.textContent = 'عربي';
            }
        };

        // Initialize Language
        updateLanguage(currentLang);

        // Toggle Language
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            localStorage.setItem('portfolio-lang', currentLang);
            updateLanguage(currentLang);
        });
    }

    // --- Pricing Table Toggle ---
    const togglePricingBtn = document.getElementById('toggle-pricing');
    const pricingTable = document.getElementById('pricing-table');

    if (togglePricingBtn && pricingTable) {
        togglePricingBtn.addEventListener('click', () => {
            pricingTable.classList.toggle('hidden');
            const isHidden = pricingTable.classList.contains('hidden');
            
            if (isHidden) {
                togglePricingBtn.setAttribute('data-en', 'View Pricing');
                togglePricingBtn.setAttribute('data-ar', 'شاهد الأسعار');
            } else {
                togglePricingBtn.setAttribute('data-en', 'Hide Pricing');
                togglePricingBtn.setAttribute('data-ar', 'إخفاء الأسعار');
                
                // Reveal animation
                const grid = pricingTable.querySelector('.reveal');
                if (grid) grid.classList.add('active');
                
                // Scroll to it
                setTimeout(() => {
                    pricingTable.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
            
            // Re-apply language to button text
            const lang = document.documentElement.getAttribute('lang') || 'en';
            togglePricingBtn.textContent = togglePricingBtn.getAttribute(`data-${lang}`);
        });
    }

    // --- PWA Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
                .then(reg => console.log('Service Worker registered!'))
                .catch(err => console.log('Service Worker registration failed:', err));
        });
    }
});
