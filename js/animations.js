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

// DecryptText Animation for .hero-title
function decryptTextAnimation({
  selector = '.hero-title',
  text = '',
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  revealDirection = 'center',
} = {}) {
  const el = document.querySelector(selector);
  if (!el) return;
  const originalText = text || el.textContent;
  let currentIteration = 0;
  let revealedIndices = new Set();
  let interval;

  function getNextIndex() {
    const len = originalText.length;
    switch (revealDirection) {
      case 'start':
        return revealedIndices.size;
      case 'end':
        return len - 1 - revealedIndices.size;
      case 'center': {
        const middle = Math.floor(len / 2);
        const offset = Math.floor(revealedIndices.size / 2);
        const nextIndex =
          revealedIndices.size % 2 === 0
            ? middle + offset
            : middle - offset - 1;
        if (nextIndex >= 0 && nextIndex < len && !revealedIndices.has(nextIndex)) {
          return nextIndex;
        }
        for (let i = 0; i < len; i++) {
          if (!revealedIndices.has(i)) return i;
        }
        return 0;
      }
      default:
        return revealedIndices.size;
    }
  }

  function shuffleText() {
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ' || revealedIndices.has(i)) return originalText[i];
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');
  }

  function animate() {
    if (revealedIndices.size < originalText.length) {
      const nextIndex = getNextIndex();
      revealedIndices.add(nextIndex);
      el.textContent = shuffleText();
    } else {
      clearInterval(interval);
      el.textContent = originalText;
    }
  }

  // Start animation
  el.textContent = shuffleText();
  interval = setInterval(animate, speed);
}

// Run the animation on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    decryptTextAnimation({ selector: '.hero-title', revealDirection: 'center' });
  });
} else {
  decryptTextAnimation({ selector: '.hero-title', revealDirection: 'center' });
}