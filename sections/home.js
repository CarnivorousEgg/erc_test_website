// Home Section Logic

export async function loadHomeSection() {
    const res = await fetch('partials/home.html');
    const html = await res.text();
    document.getElementById('home-section').innerHTML = html;
    // Animate the main title and subtitle after loading
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    if (title && window.animateDecryptedText) {
        window.animateDecryptedText(title, 'Electronics & Robotics Club', {
            speed: 40,
            maxIterations: 15
        });
    }
    if (subtitle && window.animateDecryptedText) {
        window.animateDecryptedText(subtitle, 'BITS Pilani K K Birla Goa Campus', {
            speed: 40,
            maxIterations: 15
        });
    }
    // Re-animate on home nav click
    const homeLinks = document.querySelectorAll('a[href="#home"], .nav-logo');
    homeLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                const title = document.querySelector('.hero-title');
                const subtitle = document.querySelector('.hero-subtitle');
                if (title && window.animateDecryptedText) {
                    window.animateDecryptedText(title, 'Electronics & Robotics Club', {
                        speed: 40,
                        maxIterations: 15
                    });
                }
                if (subtitle && window.animateDecryptedText) {
                    window.animateDecryptedText(subtitle, 'BITS Pilani K K Birla Goa Campus', {
                        speed: 40,
                        maxIterations: 15
                    });
                }
            }, 300); // Wait for section to be visible
        });
    });
}

export function initHomeSection() {
    // Add any home section-specific JS here
}
