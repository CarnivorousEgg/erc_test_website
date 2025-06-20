document.addEventListener('DOMContentLoaded', function() {
    
    // --- Theme Management ---
    const themeToggleButtons = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    });
    setTheme(localStorage.getItem('theme') || 'dark');

    // --- Definitive Scroll Effect (clip-path) ---
    const revealContent = document.querySelector('.reveal-content');
    if (revealContent) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });
        revealObserver.observe(revealContent);
    }

    // --- Navigation Bar Logic ---
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('#home');
    let lastScrollY = window.scrollY;

    const navObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) { // When hero is NOT intersecting
            window.addEventListener('scroll', handleNavScroll, { passive: true });
        } else { // When hero IS intersecting
            navbar.classList.remove('hidden');
            window.removeEventListener('scroll', handleNavScroll);
        }
    }, { rootMargin: "-200px 0px 0px 0px" }); // Trigger 200px after hero top passes
    
    if (heroSection) {
        navObserver.observe(heroSection);
    }

    function handleNavScroll() {
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            navbar.classList.add('hidden'); // Scrolling Down
        } else {
            navbar.classList.remove('hidden'); // Scrolling Up
        }
        lastScrollY = window.scrollY;
    }

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        hamburger.classList.toggle('is-active');
    });
    document.querySelectorAll('.mobile-nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            hamburger.classList.remove('is-active');
        });
    });

    // --- Universal Tab Switching Logic ---
    function setupTabs(containerSelector) {
        const tabContainer = document.querySelector(containerSelector);
        if (!tabContainer) return;

        const tabs = tabContainer.querySelectorAll('.tab-btn');
        const contents = tabContainer.parentElement.querySelectorAll(`${containerSelector}-content, .project-content, .about-content`);

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetClass = this.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                contents.forEach(c => {
                    if (c.classList.contains(targetClass)) {
                        c.classList.add('active');
                    } else {
                        c.classList.remove('active');
                    }
                });
            });
        });
    }

    setupTabs('.project-tabs');
    setupTabs('.about-tabs');

    // --- Current Project Selection Logic ---
    const projectCards = document.querySelectorAll('.project-sidebar .project-card');
    const projectInfos = document.querySelectorAll('.project-display .project-info');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            projectCards.forEach(c => c.classList.remove('active'));
            projectInfos.forEach(i => i.classList.remove('active'));
            
            this.classList.add('active');
            const targetInfo = document.getElementById(this.dataset.project);
            if (targetInfo) targetInfo.classList.add('active');
        });
    });

    // --- Utility: Scroll to Next Section ---
    window.scrollToNext = function() {
        const nextSection = document.querySelector('.logo-reveal');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
});
