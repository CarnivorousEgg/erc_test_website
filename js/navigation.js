// Navigation Module
export class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.heroSection = document.querySelector('.hero');
        this.hamburger = document.querySelector('.hamburger');
        this.mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        this.mobileMenuLinks = document.querySelectorAll('.mobile-menu-list a');
        this.lastScrollY = window.scrollY;
        
        this.init();
    }

    init() {
        this.setupScrollBehavior();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupDropdownNavigation();
    }

    setupScrollBehavior() {
        if (!this.heroSection) return;

        const navObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (!entry.isIntersecting) {
                window.addEventListener('scroll', this.handleNavScroll.bind(this), { passive: true });
            } else {
                this.navbar.classList.remove('hidden');
                window.removeEventListener('scroll', this.handleNavScroll.bind(this));
            }
        }, { 
            rootMargin: '-100px 0px 0px 0px' 
        });

        navObserver.observe(this.heroSection);
    }

    handleNavScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
            this.navbar.classList.add('hidden');
        } else {
            this.navbar.classList.remove('hidden');
        }
        
        this.lastScrollY = currentScrollY;
    }

    setupMobileMenu() {
        if (!this.hamburger || !this.mobileMenuOverlay) return;

        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        this.mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        this.mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === this.mobileMenuOverlay) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.mobileMenuOverlay.classList.toggle('active');
        
        if (this.mobileMenuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);

                    if (targetSection) {
                        const navHeight = this.navbar.offsetHeight;
                        const targetPosition = targetSection.offsetTop - navHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    setupDropdownNavigation() {
        const dropdownLinks = document.querySelectorAll('.dropdown-content a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');

                if (href && href.startsWith('#')) {
                    this.handleDropdownNavigation(href);
                }
            });
        });
    }

    handleDropdownNavigation(href) {
        let projectTabName = '';
        let aboutTabName = '';

        // Handle Projects dropdown
        if (href === '#current-projects') projectTabName = 'current';
        else if (href === '#completed-projects') projectTabName = 'completed';
        else if (href === '#mini-projects') projectTabName = 'mini';
        else if (href === '#projects') projectTabName = 'current'; // Always default to current

        // Handle About Us dropdown
        if (href === '#about-our-story') aboutTabName = 'our-story';
        else if (href === '#about-current-team') aboutTabName = 'current-team';
        else if (href === '#about-alumni') aboutTabName = 'alumni';
        else if (href === '#about-contact') aboutTabName = 'contact';
        else if (href === '#about') aboutTabName = 'our-story'; // Always default to our-story

        if (projectTabName) {
            this.navigateToSection('#projects', () => this.activateProjectTab(projectTabName));
        }

        if (aboutTabName) {
            this.navigateToSection('#about', () => this.activateAboutTab(aboutTabName));
        }
    }

    navigateToSection(sectionId, callback) {
        const section = document.querySelector(sectionId);
        if (section) {
            const navHeight = this.navbar.offsetHeight;
            const targetPosition = section.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            setTimeout(callback, 500);
        }
    }

    activateProjectTab(tabName) {
        const tabButtons = document.querySelectorAll('.project-tabs .tab-btn');
        const projectContents = document.querySelectorAll('.project-content');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        projectContents.forEach(content => content.classList.remove('active'));

        const targetTab = document.querySelector(`.project-tabs .tab-btn[data-tab="${tabName}"]`);
        const targetContent = document.querySelector(`.project-content.${tabName}`);

        if (targetTab) targetTab.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    }

    activateAboutTab(tabName) {
        const aboutTabs = document.querySelectorAll('.about-tabs .about-tab');
        const aboutSections = document.querySelectorAll('.about-content .about-section');

        aboutTabs.forEach(tab => tab.classList.remove('active'));
        aboutSections.forEach(section => section.classList.remove('active'));

        const targetTab = document.querySelector(`.about-tabs .about-tab[data-about="${tabName}"]`);
        const targetSection = document.getElementById(tabName);

        if (targetTab) targetTab.classList.add('active');
        if (targetSection) targetSection.classList.add('active');
    }
}