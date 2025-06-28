export const aboutSection = `
<section id="about" class="about-section">
    <div class="container">
        <h2 class="section-title">About Us</h2>
        <div class="about-tabs">
            <span class="about-tab" data-about="our-story">Our Story</span>
            <span class="about-tab" data-about="our-values">Our Values</span>
            <span class="about-tab" data-about="current-members">Members</span>
            <span class="about-tab" data-about="alumni">Alumni</span>
            <span class="about-tab" data-about="contact">Contact</span>
        </div>
        <div class="about-content">
            <div class="about-section-content" id="about-our-story">
                <h3>Our Story</h3>
                <p>Founded in 2010, the Electronics & Robotics Club has been the driving force of hands-on engineering at BITS Goa. From a small group of enthusiasts to a thriving hub of over 200 members, we build, we break, we learn, and we innovate.</p>
                <p>Our projects have been featured in tech conferences and our alumni work at leading technology companies worldwide, forming a network that spans continents.</p>
            </div>
            <div class="about-section-content" id="about-our-values">
                <h3>Our Values</h3>
                <div class="values-grid">
                    <div class="value-card">
                        <div class="value-icon">🚀</div>
                        <h4>Innovation</h4>
                        <p>Pushing boundaries through creative engineering solutions</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">🤝</div>
                        <h4>Collaboration</h4>
                        <p>Building together, learning together, achieving more as a team</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">🎯</div>
                        <h4>Excellence</h4>
                        <p>Striving for the highest standards in every project</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">🌱</div>
                        <h4>Learning</h4>
                        <p>Continuous growth through experimentation and iteration</p>
                    </div>
                </div>
            </div>
            <div class="about-section-content" id="about-current-members">
                <h3>Members</h3>
                <div class="members-grid">
                    <!-- Content will be populated by JavaScript -->
                </div>
            </div>
            <div class="about-section-content" id="about-alumni">
                <h3>Alumni</h3>
                <div class="alumni-section">
                    <!-- Interactive World Map -->
                    <div class="world-map-container">
                        <div id="alumni-map"></div>
                    </div>
                    <!-- Company Scroller -->
                    <div class="company-scroller">
                        <h4>Where Our Alumni Work</h4>
                        <div class="scroller-container">
                            <div class="scroller-content">
                                <!-- Content will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="about-section-content" id="about-contact">
                <h3>Contact</h3>
                <div class="contact-layout">
                    <div class="contact-info">
                        <h4>Connect With Us</h4>
                        <div class="social-links">
                            <a href="mailto:bitsg.erc@gmail.com" class="social-link">
                                <span class="social-icon">📧</span>
                                <span>bitsg.erc@gmail.com</span>
                            </a>
                            <a href="https://www.instagram.com/erc_bitsgoa/" target="_blank" class="social-link">
                                <span class="social-icon">📱</span>
                                <span>Instagram</span>
                            </a>
                            <a href="https://www.linkedin.com/company/electronics-robotics-club-bits-goa/" target="_blank" class="social-link">
                                <span class="social-icon">💼</span>
                                <span>LinkedIn</span>
                            </a>
                            <a href="https://github.com/ERC-BPGC" target="_blank" class="social-link">
                                <span class="social-icon">🐙</span>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                    <!-- Social Media Feed -->
                    <div class="social-feed">
                        <h4>Latest Updates</h4>
                        <div class="feed-container">
                            <!-- Content will be populated by JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    // About Section Logic (restored tab logic)
    export async function loadAboutSection() {
        const res = await fetch('partials/about.html');
        const html = await res.text();
        document.getElementById('about-section').innerHTML = html;
    }

    export function initAboutSection() {
        // Tab switching logic for About Us section
        const tabs = document.querySelectorAll('.about-tab');
        const sections = document.querySelectorAll('.about-section-content');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                const target = tab.dataset.about;
                sections.forEach(function(sec) {
                    sec.classList.toggle('active', sec.id === 'about-' + target);
                });
            });
        });
    }
</script>
`;
