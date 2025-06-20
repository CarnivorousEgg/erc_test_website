document.addEventListener('DOMContentLoaded', function() {
    
    // Theme Management
    const themeToggleNav = document.querySelector('.theme-toggle-nav'); // Desktop only
    const themeToggleMobile = document.querySelector('.theme-toggle-mobile'); // Mobile menu only
    const themeIcons = document.querySelectorAll('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    const body = document.body;

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update all theme icons
        themeIcons.forEach(icon => {
            if (theme === 'dark') {
                icon.textContent = '🌙';
            } else {
                icon.textContent = '☀️';
            }
        });

        // Update theme text in mobile menu
        if (themeText) {
            themeText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
        }
    }

    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Desktop theme toggle (always visible in nav)
    if (themeToggleNav) {
        themeToggleNav.addEventListener('click', toggleTheme);
    }

    // Mobile theme toggle (only visible in opened menu)
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Logo Reveal Effect (Inverted Triangle - Diligent Robotics Style)
    const revealTriangle = document.querySelector('.reveal-triangle');
    const logoRevealSection = document.querySelector('.logo-reveal-section');

    if (revealTriangle && logoRevealSection) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        revealTriangle.classList.add('revealed');
                    }, 500);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        revealObserver.observe(logoRevealSection);
    }

    // Navigation Hide/Show Logic
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    let lastScrollY = window.scrollY;

    const navObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
            window.addEventListener('scroll', handleNavScroll, { passive: true });
        } else {
            navbar.classList.remove('hidden');
            window.removeEventListener('scroll', handleNavScroll);
        }
    }, { 
        rootMargin: '-100px 0px 0px 0px' 
    });

    if (heroSection) {
        navObserver.observe(heroSection);
    }

    function handleNavScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    }

    // Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-list a');

    if (hamburger && mobileMenuOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenuOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on links
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                hamburger.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Tab Functionality
    function setupTabs(tabSelector, contentSelector) {
        const tabContainer = document.querySelector(tabSelector);
        if (!tabContainer) return;

        const tabs = tabContainer.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll(contentSelector);

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                this.classList.add('active');

                const targetContent = document.querySelector(`${contentSelector}.${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    setupTabs('.project-tabs', '.project-content');
    setupTabs('.about-tabs', '.about-content');

    // Current Project Selection
    const projectCards = document.querySelectorAll('.project-card');
    const projectInfos = document.querySelectorAll('.project-info');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetProject = this.dataset.project;

            projectCards.forEach(c => c.classList.remove('active'));
            projectInfos.forEach(i => i.classList.remove('active'));

            this.classList.add('active');

            const targetInfo = document.getElementById(targetProject);
            if (targetInfo) {
                targetInfo.classList.add('active');
            }
        });
    });

    // Alumni Map Dots Interaction
    const alumniDots = document.querySelectorAll('.alumni-dot');
    alumniDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 15px currentColor)';
            this.style.transform = 'scale(1.5)';
        });

        dot.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 0 8px currentColor)';
            this.style.transform = 'scale(1)';
        });
    });

    // Social Feed Auto-refresh (simulate new posts)
    const feedContainer = document.querySelector('.feed-container');
    if (feedContainer) {
        const samplePosts = [
            {
                platform: 'instagram',
                icon: '📷',
                content: '🚀 Just launched our new drone swarm project! Amazing teamwork from our members. #Innovation #Drones',
                time: '5 minutes ago'
            },
            {
                platform: 'linkedin',
                icon: '💼',
                content: 'Proud to announce our collaboration with leading tech companies for internship opportunities.',
                time: '1 hour ago'
            },
            {
                platform: 'instagram',
                icon: '📷',
                content: '⚡ Working late nights on the bionic arm project. The future is here! #Robotics #Engineering',
                time: '3 hours ago'
            }
        ];

        function addNewPost() {
            const randomPost = samplePosts[Math.floor(Math.random() * samplePosts.length)];
            const newPost = document.createElement('div');
            newPost.className = `feed-post ${randomPost.platform}-post`;
            newPost.style.opacity = '0';
            newPost.style.transform = 'translateY(-20px)';
            
            newPost.innerHTML = `
                <div class="post-header">
                    <span class="platform-icon">${randomPost.icon}</span>
                    <span class="platform-name">${randomPost.platform === 'instagram' ? 'Instagram' : 'LinkedIn'}</span>
                </div>
                <div class="post-content">
                    <p>${randomPost.content}</p>
                </div>
                <div class="post-meta">${randomPost.time}</div>
            `;

            feedContainer.insertBefore(newPost, feedContainer.firstChild);
            
            // Animate in
            setTimeout(() => {
                newPost.style.transition = 'all 0.5s ease';
                newPost.style.opacity = '1';
                newPost.style.transform = 'translateY(0)';
            }, 100);

            // Remove oldest post if more than 5
            const posts = feedContainer.querySelectorAll('.feed-post');
            if (posts.length > 5) {
                const oldestPost = posts[posts.length - 1];
                oldestPost.style.transition = 'all 0.5s ease';
                oldestPost.style.opacity = '0';
                oldestPost.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (oldestPost.parentNode) {
                        oldestPost.parentNode.removeChild(oldestPost);
                    }
                }, 500);
            }
        }

        // Add new post every 30 seconds
        setInterval(addNewPost, 30000);
    }

    // Company Scroller Pause on Hover
    const scrollerContent = document.querySelector('.scroller-content');
    if (scrollerContent) {
        scrollerContent.addEventListener('mouseenter', () => {
            scrollerContent.style.animationPlayState = 'paused';
        });

        scrollerContent.addEventListener('mouseleave', () => {
            scrollerContent.style.animationPlayState = 'running';
        });
    }

    // Scroll to Reveal Function
    window.scrollToReveal = function() {
        if (logoRevealSection) {
            logoRevealSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll(
        '.outreach-card, .archive-card, .stat-card, .value-card, .member-card'
    );
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        animationObserver.observe(el);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    console.log('🤖 ERC Website loaded successfully!');
    console.log('🎨 Theme system active');
    console.log('📱 Responsive design ready');
    console.log('✨ All animations initialized');
    console.log('🌍 Alumni map interactive');
    console.log('📱 Social feed live');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(smoothScrollPolyfill);
}