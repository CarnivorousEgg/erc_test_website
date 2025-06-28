// Main Application Entry Point
import { ThemeManager } from './js/theme.js';
import { NavigationManager } from './js/navigation.js';
import { TabManager } from './js/tabs.js';
import { AnimationManager } from './js/animations.js';
import { AlumniMap } from './js/alumni-map.js';
import { SocialFeedManager } from './js/social-feed.js';
import { projectsData, membersData } from './js/data.js';
import { loadHomeSection, initHomeSection } from './sections/home.js';
import { loadProjectsSection } from './sections/projects.js';
import { loadAboutSection } from './sections/about.js';
import { loadOutreachSection } from './sections/outreach.js';
import { InteractiveFeatures } from './js/interactive-features.js';

class ERCWebsite {
    constructor() {
        this.init();
        this.setupHashNavigation();
        this.interactiveFeatures = new InteractiveFeatures();
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
            // Initialize core modules
            this.themeManager = new ThemeManager();
            this.navigationManager = new NavigationManager();
            this.tabManager = new TabManager();
            this.animationManager = new AnimationManager();

            // Render each section's content (load partials)
            await loadHomeSection();
            await loadProjectsSection();
            await loadAboutSection();
            await loadOutreachSection();

            // Initialize content modules
            this.updateProjectsContent();
            this.updateMembersContent();

            // Initialize interactive modules
            this.alumniMap = new AlumniMap();
            this.socialFeedManager = new SocialFeedManager();

            // Setup performance optimizations
            this.setupPerformanceOptimizations();

            console.log('🤖 ERC Website loaded successfully!');
            console.log('🎨 Theme system active');
            console.log('📱 Responsive design ready');
            console.log('✨ All animations initialized');
            console.log('🌍 Alumni map interactive');
            console.log('📱 Social feed live');

        } catch (error) {
            console.error('Error initializing website:', error);
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
        document.querySelectorAll('.about-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                window.location.hash = '#' + tab.dataset.about;
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