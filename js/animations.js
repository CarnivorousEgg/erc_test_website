// Animation and Effects Module
export class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupLogoReveal();
        this.setupScrollAnimations();
        this.setupLoadingAnimation();
    }

    setupLogoReveal() {
        const revealTriangle = document.querySelector('.reveal-triangle');
        const logoRevealSection = document.querySelector('.logo-reveal-section');

        if (!revealTriangle || !logoRevealSection) return;

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

    setupScrollAnimations() {
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
    }

    setupLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }
}

// Global scroll to reveal function
window.scrollToReveal = function() {
    const logoRevealSection = document.querySelector('.logo-reveal-section');
    if (logoRevealSection) {
        logoRevealSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};