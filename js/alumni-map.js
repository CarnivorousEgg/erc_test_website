// Simple Static Alumni Map Module
export class AlumniMap {
    constructor() {
        this.mapContainer = document.getElementById('alumni-map');
        this.alumniData = [
            // North America - West Coast
            { name: "Rahul Sharma", company: "Google", position: { x: 11, y: 42 }, city: "Mountain View, CA" },
            { name: "Priya Patel", company: "Microsoft", position: { x: 8, y: 36 }, city: "Seattle, WA" },
            { name: "Arjun Kumar", company: "Amazon", position: { x: 8, y: 36 }, city: "Seattle, WA" },
            { name: "Sneha Reddy", company: "Tesla", position: { x: 11, y: 42 }, city: "Palo Alto, CA" },
            { name: "Vikram Singh", company: "Apple", position: { x: 11, y: 42 }, city: "Cupertino, CA" },
            { name: "Ananya Gupta", company: "Meta", position: { x: 11, y: 42 }, city: "Menlo Park, CA" },
            { name: "Rohit Agarwal", company: "NVIDIA", position: { x: 11, y: 42 }, city: "Santa Clara, CA" },
            { name: "Kavya Nair", company: "Intel", position: { x: 11, y: 42 }, city: "Santa Clara, CA" },
            
            // North America - East Coast
            { name: "Aditya Joshi", company: "IBM", position: { x: 26, y: 41 }, city: "New York, NY" },
            { name: "Karthik Rao", company: "Goldman Sachs", position: { x: 26, y: 41 }, city: "New York, NY" },
            { name: "Divya Menon", company: "JPMorgan", position: { x: 26, y: 41 }, city: "New York, NY" },
            { name: "Amit Verma", company: "Spotify", position: { x: 26, y: 41 }, city: "New York, NY" },
            
            // Europe
            { name: "Siddharth Bhat", company: "Spotify", position: { x: 50, y: 33 }, city: "London, UK" },
            { name: "Riya Kapoor", company: "DeepMind", position: { x: 50, y: 33 }, city: "London, UK" },
            { name: "Pooja Desai", company: "SAP", position: { x: 53, y: 34 }, city: "Berlin, Germany" },
            { name: "Nikhil Pandey", company: "ASML", position: { x: 52, y: 34 }, city: "Netherlands" },
            
            // Asia - India
            { name: "Shreya Ghosh", company: "Flipkart", position: { x: 77, y: 54 }, city: "Bangalore, India" },
            { name: "Varun Malhotra", company: "Zomato", position: { x: 77, y: 50 }, city: "Delhi, India" },
            { name: "Isha Bansal", company: "Paytm", position: { x: 77, y: 54 }, city: "Bangalore, India" },
            { name: "Meera Iyer", company: "TCS", position: { x: 73, y: 55 }, city: "Mumbai, India" },
            { name: "Rajesh Kumar", company: "Infosys", position: { x: 77, y: 54 }, city: "Bangalore, India" },
            
            // Asia - Southeast
            { name: "Anjali Singh", company: "ByteDance", position: { x: 84, y: 59 }, city: "Singapore" },
            
            // Australia
            { name: "Akash Patel", company: "Atlassian", position: { x: 90, y: 81 }, city: "Sydney, Australia" },
            { name: "Nisha Reddy", company: "Canva", position: { x: 90, y: 81 }, city: "Sydney, Australia" }
        ];
        
        this.init();
    }

    init() {
        if (!this.mapContainer) return;
        
        this.createStaticMap();
        this.setupCompanyScroller();
    }

    createStaticMap() {
        this.mapContainer.innerHTML = `
            <div class="static-world-map">
                <img src="public/world_map.jpg" 
                     alt="World Map" class="world-map-image">
                <div class="map-overlay"></div>
                <div class="alumni-markers">
                    ${this.alumniData.map((alumni, index) => `
                        <div class="alumni-marker" 
                             style="left: ${alumni.position.x}%; top: ${alumni.position.y}%;"
                             data-alumni='${JSON.stringify(alumni)}'
                             data-index="${index}">
                            <div class="marker-dot"></div>
                            <div class="marker-pulse"></div>
                        </div>
                    `).join('')}
                </div>
                <div class="alumni-tooltip" id="alumni-tooltip">
                    <div class="tooltip-content">
                        <h4 class="tooltip-name"></h4>
                        <p class="tooltip-company"></p>
                        <p class="tooltip-location"></p>
                    </div>
                </div>
            </div>
        `;

        this.setupMarkerInteractions();
        this.addMapStyles();
    }

    setupMarkerInteractions() {
        const markers = this.mapContainer.querySelectorAll('.alumni-marker');
        const tooltip = this.mapContainer.querySelector('#alumni-tooltip');

        markers.forEach((marker, index) => {
            // Add staggered animation
            setTimeout(() => {
                marker.classList.add('visible');
            }, index * 100);

            marker.addEventListener('mouseenter', (e) => {
                const alumniData = JSON.parse(marker.dataset.alumni);
                this.showTooltip(tooltip, alumniData, e);
            });

            marker.addEventListener('mouseleave', () => {
                this.hideTooltip(tooltip);
            });

            marker.addEventListener('mousemove', (e) => {
                this.updateTooltipPosition(tooltip, e);
            });
        });
    }

    showTooltip(tooltip, alumni, event) {
        const nameEl = tooltip.querySelector('.tooltip-name');
        const companyEl = tooltip.querySelector('.tooltip-company');
        const locationEl = tooltip.querySelector('.tooltip-location');

        nameEl.textContent = alumni.name;
        companyEl.textContent = alumni.company;
        locationEl.textContent = alumni.city;

        tooltip.classList.add('visible');
        this.updateTooltipPosition(tooltip, event);
    }

    hideTooltip(tooltip) {
        tooltip.classList.remove('visible');
    }

    updateTooltipPosition(tooltip, event) {
        const rect = this.mapContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        tooltip.style.left = `${x + 15}px`;
        tooltip.style.top = `${y - 10}px`;
    }

    addMapStyles() {
        if (document.getElementById('alumni-map-styles')) return;

        const style = document.createElement('style');
        style.id = 'alumni-map-styles';
        style.textContent = `
            .static-world-map {
                position: relative;
                width: 100%;
                height: 400px;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid var(--border-color);
                background: var(--bg-tertiary);
            }

            .world-map-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: brightness(0.4) contrast(1.2) saturate(0.8);
            }

            .map-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, 
                    rgba(10, 15, 28, 0.6), 
                    rgba(34, 211, 238, 0.2)
                );
                pointer-events: none;
            }

            .alumni-markers {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .alumni-marker {
                position: absolute;
                width: 20px;
                height: 20px;
                transform: translate(-50%, -50%);
                cursor: pointer;
                pointer-events: all;
                opacity: 0;
                transition: opacity 0.5s ease;
            }

            .alumni-marker.visible {
                opacity: 1;
            }

            .marker-dot {
                width: 12px;
                height: 12px;
                background: var(--primary-color);
                border-radius: 50%;
                border: 2px solid var(--bg-primary);
                box-shadow: 0 0 15px rgba(34, 211, 238, 0.8);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
            }

            .marker-pulse {
                width: 20px;
                height: 20px;
                border: 2px solid var(--primary-color);
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: pulse 2s ease-out infinite;
                opacity: 0.6;
            }

            @keyframes pulse {
                0% {
                    transform: translate(-50%, -50%) scale(0.8);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(2);
                    opacity: 0;
                }
            }

            .alumni-marker:hover .marker-dot {
                background: #ffffff;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
                transform: translate(-50%, -50%) scale(1.3);
            }

            .alumni-tooltip {
                position: absolute;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 12px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                pointer-events: none;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                z-index: 1000;
                min-width: 200px;
            }

            .alumni-tooltip.visible {
                opacity: 1;
                transform: translateY(0);
            }

            .tooltip-name {
                margin: 0 0 4px 0;
                color: var(--primary-color);
                font-size: 14px;
                font-weight: 600;
            }

            .tooltip-company {
                margin: 0 0 4px 0;
                color: var(--text-primary);
                font-size: 13px;
                font-weight: 500;
            }

            .tooltip-location {
                margin: 0;
                color: var(--text-secondary);
                font-size: 12px;
            }

            /* Responsive adjustments */
            @media (max-width: 768px) {
                .static-world-map {
                    height: 300px;
                }
                
                .alumni-marker {
                    width: 16px;
                    height: 16px;
                }
                
                .marker-dot {
                    width: 10px;
                    height: 10px;
                }
                
                .marker-pulse {
                    width: 16px;
                    height: 16px;
                }
                
                .alumni-tooltip {
                    min-width: 180px;
                    padding: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupCompanyScroller() {
        const companies = [...new Set(this.alumniData.map(alumni => alumni.company))];
        const scrollerContent = document.querySelector('.scroller-content');
        
        if (scrollerContent) {
            scrollerContent.innerHTML = '';
            
            // Add companies twice for seamless scrolling
            const allCompanies = [...companies, ...companies];
            
            allCompanies.forEach(company => {
                const span = document.createElement('span');
                span.className = 'company-tag';
                span.textContent = company;
                scrollerContent.appendChild(span);
            });

            // Pause on hover
            scrollerContent.addEventListener('mouseenter', () => {
                scrollerContent.style.animationPlayState = 'paused';
            });

            scrollerContent.addEventListener('mouseleave', () => {
                scrollerContent.style.animationPlayState = 'running';
            });
        }
    }
}
