// Animation and Effects Module
export class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupLogoReveal();
        this.setupScrollAnimations();
        this.setupLoadingAnimation();
        this.setupCounterAnimations();
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

// --- DecryptedText Animation for Home Title ---
export function animateDecryptedText(element, text, {
    speed = 50,
    maxIterations = 10,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    onComplete = null
} = {}) {
    if (!element) return;
    let iteration = 0;
    let interval;
    function randomChar() {
        return characters[Math.floor(Math.random() * characters.length)];
    }
    function scramble(currentText, revealedCount) {
        return currentText.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i < revealedCount) return text[i];
            return randomChar();
        }).join('');
    }
    function startAnimation() {
        let revealed = 0;
        interval = setInterval(() => {
            if (iteration < maxIterations) {
                element.textContent = scramble(text, revealed);
                iteration++;
            } else if (revealed < text.length) {
                revealed++;
                element.textContent = scramble(text, revealed);
            } else {
                element.textContent = text;
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, speed);
    }
    clearInterval(interval);
    startAnimation();
}

window.animateDecryptedText = animateDecryptedText;