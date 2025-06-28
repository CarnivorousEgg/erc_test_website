// Main Application Entry Point - Non-module version for GitHub Pages
// Theme Management Module
class ThemeManager {
    constructor() {
        this.themeToggleNav = document.querySelector('.theme-toggle-nav');
        this.themeToggleMobile = document.querySelector('.theme-toggle-mobile');
        this.themeIcons = document.querySelectorAll('.theme-icon');
        this.themeText = document.querySelector('.theme-text');
        this.body = document.body;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedTheme();
    }

    bindEvents() {
        if (this.themeToggleNav) {
            this.themeToggleNav.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
        }

        if (this.themeToggleMobile) {
            this.themeToggleMobile.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
        }
    }

    setTheme(theme) {
        console.log(`🎨 Setting theme to: ${theme}`);
        this.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        this.themeIcons.forEach(icon => {
            icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        });

        if (this.themeText) {
            this.themeText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
        }

        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
        console.log(`✅ Theme changed to: ${theme}`);
    }

    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log(`🔄 Toggling theme from ${currentTheme} to ${newTheme}`);
        this.setTheme(newTheme);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }
}

// Navigation Management Module
class NavigationManager {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.mobileMenu = document.querySelector('.mobile-menu-overlay');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-menu-list a');
        this.dropdownLinks = document.querySelectorAll('.dropdown-content a');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupSmoothScrolling();
        this.setupDropdownScrolling();
    }

    bindEvents() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        if (this.mobileMenu) {
            this.mobileMenu.addEventListener('click', (e) => {
                if (e.target === this.mobileMenu) {
                    this.closeMobileMenu();
                }
            });
        }

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }

    setupDropdownScrolling() {
        this.dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href.includes('about-') ? '#about' : href.includes('project') ? '#projects' : href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    // Activate the correct tab if needed
                    if (href.startsWith('#about-')) {
                        const tab = href.replace('#about-', '');
                        document.querySelectorAll('.about-tabs .tab-btn').forEach(btn => {
                            btn.classList.toggle('active', btn.dataset.tab === tab);
                        });
                        document.querySelectorAll('.about-content').forEach(ac => {
                            ac.classList.toggle('active', ac.classList.contains(tab));
                        });
                    } else if (href.startsWith('#current-projects') || href.startsWith('#completed-projects') || href.startsWith('#mini-projects')) {
                        let tab = 'current';
                        if (href.startsWith('#completed-projects')) tab = 'completed';
                        if (href.startsWith('#mini-projects')) tab = 'mini';
                        document.querySelectorAll('.project-tabs .tab-btn').forEach(btn => {
                            btn.classList.toggle('active', btn.dataset.tab === tab);
                        });
                        document.querySelectorAll('.project-content').forEach(pc => {
                            pc.classList.toggle('active', pc.classList.contains(tab));
                        });
                    }
                }
            });
        });
    }
}

// Tab Management Module
class TabManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupProjectTabs();
        this.setupAboutTabs();
        this.setupProjectSelection();
    }

    setupProjectTabs() {
        const tabButtons = document.querySelectorAll('.project-tabs .tab-btn');
        const projectContents = document.querySelectorAll('.project-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                projectContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.querySelector(`.project-content.${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Update URL hash
                window.location.hash = `#projects-${targetTab}`;
            });
        });
    }

    setupAboutTabs() {
        const aboutTabs = document.querySelectorAll('.about-tabs .tab-btn');
        const aboutContents = document.querySelectorAll('.about-content');

        aboutTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Remove active class from all tabs and contents
                aboutTabs.forEach(t => t.classList.remove('active'));
                aboutContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.querySelector(`.about-content.${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Update URL hash
                window.location.hash = `#about-${targetTab}`;
            });
        });
    }

    setupProjectSelection() {
        const projectCards = document.querySelectorAll('.project-card');
        const projectInfos = document.querySelectorAll('.project-info');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetProject = card.dataset.project;
                
                // Remove active class from all cards and infos
                projectCards.forEach(c => c.classList.remove('active'));
                projectInfos.forEach(info => info.classList.remove('active'));
                
                // Add active class to clicked card
                card.classList.add('active');
                
                // Show corresponding project info
                const targetInfo = document.getElementById(`project-${targetProject}`);
                if (targetInfo) {
                    targetInfo.classList.add('active');
                }
            });
        });
    }
}

// Animation Management Module
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupIntersectionObserver();
        this.setupCounterAnimations();
    }

    setupScrollAnimations() {
        // Smooth scroll for scroll indicator
        window.scrollToReveal = () => {
            const revealSection = document.querySelector('.logo-reveal-section');
            if (revealSection) {
                revealSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.project-card, .about-tab, .value-card, .outreach-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.dataset.count);
                    this.animateCounter(target, 0, finalValue, 2000);
                    counterObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });

        statNumbers.forEach(stat => {
            counterObserver.observe(stat);
        });
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const difference = end - start;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (difference * easeOutQuart));
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Data for projects and members
const projectsData = {
    completed: [
        { name: "Autonomous Rover", description: "GPS-guided exploration robot", icon: "🤖", github: "https://github.com/erc-bpgc/autonomous-rover" },
        { name: "Smart Home System", description: "IoT-based home automation", icon: "🏠", github: "https://github.com/erc-bpgc/smart-home" },
        { name: "Gesture Controller", description: "Hand gesture recognition system", icon: "👋", github: "https://github.com/erc-bpgc/gesture-controller" }
    ],
    mini: [
        { name: "LED Cube", description: "3D LED display matrix", icon: "🔲", github: "https://github.com/erc-bpgc/led-cube" },
        { name: "Weather Station", description: "Environmental monitoring system", icon: "🌤️", github: "https://github.com/erc-bpgc/weather-station" },
        { name: "Music Visualizer", description: "Audio-reactive LED display", icon: "🎵", github: "https://github.com/erc-bpgc/music-visualizer" }
    ]
};

const membersData = {
    current: [
        { name: "Ritwik Sharma", role: "President", description: "Leading innovation in robotics", avatar: "👨‍💻" },
        { name: "Saransh Agarwal", role: "Vice President", description: "Driving technical excellence", avatar: "👨‍🔬" },
        { name: "Sniggdha Semwal", role: "Secretary", description: "Coordinating club activities", avatar: "👩‍💼" }
    ]
};

// Main Application Class
class ERCWebsite {
    constructor() {
        this.init();
        this.setupHashNavigation();
    }

    async init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    async initializeModules() {
        try {
            console.log('🚀 Initializing ERC Website...');
            
            // Initialize core modules
            this.themeManager = new ThemeManager();
            console.log('✅ Theme manager initialized');
            
            this.navigationManager = new NavigationManager();
            console.log('✅ Navigation manager initialized');
            
            this.tabManager = new TabManager();
            console.log('✅ Tab manager initialized');
            
            this.animationManager = new AnimationManager();
            console.log('✅ Animation manager initialized');

            // Update content
            this.updateProjectsContent();
            console.log('✅ Projects content updated');
            
            this.updateMembersContent();
            console.log('✅ Members content updated');

            // Setup performance optimizations
            this.setupPerformanceOptimizations();
            console.log('✅ Performance optimizations setup');

            console.log('🤖 ERC Website loaded successfully!');
            console.log('🎨 Theme system active');
            console.log('📱 Responsive design ready');
            console.log('✨ All animations initialized');

        } catch (error) {
            console.error('❌ Error initializing website:', error);
        }
    }

    updateProjectsContent() {
        // Update completed projects
        const completedGrid = document.querySelector('.project-content.completed .archive-grid');
        if (completedGrid) {
            completedGrid.innerHTML = projectsData.completed.map(project => `
                <a href="${project.github}" target="_blank" class="archive-card">
                    <div class="archive-image">
                        <div class="archive-placeholder">${project.icon}</div>
                    </div>
                    <h4>${project.name}</h4>
                    <p>${project.description}</p>
                </a>
            `).join('');
        }

        // Update mini projects
        const miniGrid = document.querySelector('.project-content.mini .archive-grid');
        if (miniGrid) {
            miniGrid.innerHTML = projectsData.mini.map(project => `
                <a href="${project.github}" target="_blank" class="archive-card">
                    <div class="archive-image">
                        <div class="archive-placeholder">${project.icon}</div>
                    </div>
                    <h4>${project.name}</h4>
                    <p>${project.description}</p>
                </a>
            `).join('');
        }
    }

    updateMembersContent() {
        const membersGrid = document.querySelector('.about-content.members .members-grid');
        if (membersGrid) {
            membersGrid.innerHTML = membersData.current.map(member => `
                <div class="member-card">
                    <div class="member-avatar">${member.avatar}</div>
                    <h4>${member.name}</h4>
                    <p class="member-role">${member.role}</p>
                    <p>${member.description}</p>
                </div>
            `).join('');
        }
    }

    setupPerformanceOptimizations() {
        // Throttle scroll events
        let ticking = false;

        const updateOnScroll = () => {
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }, { passive: true });

        // Preload critical resources
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        // Preload fonts
        const fontPreload = document.createElement('link');
        fontPreload.rel = 'preload';
        fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap';
        fontPreload.as = 'style';
        document.head.appendChild(fontPreload);
    }

    setupHashNavigation() {
        const scrollToHash = () => {
            const hash = window.location.hash;
            if (hash === '#about' || hash.startsWith('#about-')) {
                document.getElementById('about').scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Show correct about tab
                const tab = hash.replace('#about-', '') || 'our-story';
                document.querySelectorAll('.about-tabs .tab-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.tab === tab);
                });
                document.querySelectorAll('.about-content').forEach(ac => {
                    ac.classList.toggle('active', ac.classList.contains(tab));
                });
            } else if (hash === '#projects' || hash.startsWith('#projects')) {
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Show correct project tab
                const tab = hash.replace('#projects-', '') || 'current';
                document.querySelectorAll('.project-tabs .tab-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.tab === tab);
                });
                document.querySelectorAll('.project-content').forEach(pc => {
                    pc.classList.toggle('active', pc.classList.contains(tab));
                });
            } else if (hash) {
                const target = document.querySelector(hash);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        window.addEventListener('hashchange', scrollToHash);
        // On page load
        scrollToHash();
        // Project tabs: update hash on click
        document.querySelectorAll('.project-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.hash = '#projects-' + btn.dataset.tab;
            });
        });
        // About tabs: update hash on click
        document.querySelectorAll('.about-tabs .tab-btn').forEach(tab => {
            tab.addEventListener('click', () => {
                window.location.hash = '#about-' + tab.dataset.tab;
            });
        });
    }
}

// Utility functions
window.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(smoothScrollPolyfill);
}

// Initialize the application
new ERCWebsite();

// Initialize AlumniMap if alumni section is present
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('alumni-map')) {
        if (window.AlumniMap) {
            window.alumniMap = new window.AlumniMap();
        } else if (typeof AlumniMap !== 'undefined') {
            window.alumniMap = new AlumniMap();
        }
    }
});