// Interactive Features Module
import { membersData, alumniData, socialFeedData, valueDetails } from './data.js';

export class InteractiveFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.setupMemberFilters();
        this.setupStatsAnimation();
        this.setupContactForm();
        this.setupValueDetails();
        this.setupAlumniMap();
        this.setupSocialFeed();
        this.setupCompanyScroller();
    }

    setupMemberFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const memberCards = document.querySelectorAll('.member-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter member cards
                memberCards.forEach(card => {
                    const category = card.dataset.category;
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    setupStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateStats = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
            });
        };

        // Trigger animation when stats section is visible
        const statsSection = document.querySelector('.story-stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
    }

    setupContactForm() {
        const contactForm = document.querySelector('.message-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const name = contactForm.querySelector('input[type="text"]').value;
                const email = contactForm.querySelector('input[type="email"]').value;
                const message = contactForm.querySelector('textarea').value;
                
                // Here you would typically send the data to a server
                console.log('Contact form submitted:', { name, email, message });
                
                // Show success message
                this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            });
        }
    }

    setupValueDetails() {
        // Make value details functions globally available
        window.showValueDetails = (value) => {
            const details = valueDetails[value];
            if (details) {
                this.showModal(details.title, this.createValueDetailsHTML(details));
            }
        };
    }

    createValueDetailsHTML(details) {
        return `
            <div class="value-details">
                <p class="value-description">${details.description}</p>
                <h4>Examples:</h4>
                <ul class="value-examples">
                    ${details.examples.map(example => `<li>${example}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    setupAlumniMap() {
        // Make alumni region functions globally available
        window.showAlumniByRegion = (region) => {
            const alumni = alumniData.regions[region];
            if (alumni) {
                this.showModal(`Alumni in ${region.toUpperCase()}`, this.createAlumniListHTML(alumni));
            }
        };

        window.showAlumniStories = () => {
            this.showModal('Alumni Success Stories', this.createAlumniStoriesHTML());
        };
    }

    createAlumniListHTML(alumni) {
        return `
            <div class="alumni-list">
                ${alumni.map(person => `
                    <div class="alumni-item">
                        <h4>${person.name}</h4>
                        <p><strong>${person.company}</strong> - ${person.location}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createAlumniStoriesHTML() {
        return `
            <div class="alumni-stories">
                <div class="story">
                    <h4>Rahul Kumar - Google</h4>
                    <p>"ERC gave me the foundation to build complex systems. The hands-on experience with robotics projects was invaluable for my career in software engineering."</p>
                </div>
                <div class="story">
                    <h4>Priya Sharma - Microsoft</h4>
                    <p>"The collaborative environment at ERC taught me how to work in teams and solve real-world problems. These skills are essential in my current role."</p>
                </div>
                <div class="story">
                    <h4>Arjun Singh - Apple</h4>
                    <p>"From building my first robot to leading teams, ERC shaped my engineering journey. The mentorship and guidance I received here continue to inspire me."</p>
                </div>
            </div>
        `;
    }

    setupSocialFeed() {
        const feedContainer = document.querySelector('.feed-container');
        if (feedContainer) {
            feedContainer.innerHTML = socialFeedData.map(post => `
                <div class="feed-post ${post.platform}-post">
                    <div class="post-header">
                        <span class="platform-icon">${post.icon}</span>
                        <span class="platform-name">${post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}</span>
                    </div>
                    <div class="post-content">
                        <p>${post.content}</p>
                    </div>
                    <div class="post-meta">${post.timestamp}</div>
                </div>
            `).join('');
        }
    }

    setupCompanyScroller() {
        const scrollerContent = document.querySelector('.scroller-content');
        if (scrollerContent) {
            // Duplicate companies for infinite scroll effect
            const companies = [...alumniData.companies, ...alumniData.companies];
            scrollerContent.innerHTML = companies.map(company => `
                <div class="company-tag">${company}</div>
            `).join('');
        }
    }

    showModal(title, content) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Global functions for HTML onclick handlers
window.showJoinForm = () => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Join ERC</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <form class="join-form">
                    <input type="text" placeholder="Full Name" required>
                    <input type="email" placeholder="Email" required>
                    <select required>
                        <option value="">Select Your Branch</option>
                        <option value="cse">Computer Science</option>
                        <option value="ece">Electronics</option>
                        <option value="mech">Mechanical</option>
                        <option value="chem">Chemical</option>
                        <option value="civil">Civil</option>
                    </select>
                    <textarea placeholder="Why do you want to join ERC? (Tell us about your interests and experience)" rows="4" required></textarea>
                    <button type="submit" class="submit-btn">
                        <span>Submit Application</span>
                        <div class="btn-icon">📤</div>
                    </button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('.join-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.remove();
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'notification notification-success';
        notification.innerHTML = `
            <span>Application submitted successfully! We'll review and get back to you soon.</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}; 