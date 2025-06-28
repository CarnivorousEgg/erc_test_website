// Simple Static Alumni Map Module
class AlumniMap {
    constructor() {
        this.mapContainer = document.getElementById('alumni-map');
        this.alumniData = window.alumniData; // Use global alumni data
        
        this.init();
    }

    init() {
        if (!this.mapContainer) return;
        
        this.createStaticMap();
        this.attachRegionButtons();
        this.setupCompanyScroller();
    }

    createStaticMap(region = 'world') {
        // Fade out current map
        if (this.mapContainer.firstChild) {
            this.mapContainer.firstChild.classList.add('fade-out');
        }
        setTimeout(() => {
            let mapImage = `public/world_night.jpg`;
            if (region === 'india') mapImage = `public/india_night.jpg`;
            else if (region === 'usa') mapImage = `public/usa_night.jpg`;
            else if (region === 'europe') mapImage = `public/europe_night.jpg`;
            else if (region === 'asia') mapImage = `public/asia_night.jpg`;

            let alumniToShow = this.alumniData;
            let interactive = false;
            if (region !== 'world') {
                interactive = true;
                alumniToShow = this.alumniData.filter(alumni => alumni.region === region);
            }

            this.mapContainer.innerHTML = `
                <div class="static-world-map fade-in">
                    <img src="${mapImage}" 
                         alt="${region.charAt(0).toUpperCase() + region.slice(1)} Map" class="world-map-image">
                    <div class="map-overlay"></div>
                    <div class="alumni-markers">
                        ${alumniToShow.map((alumni, index) => `
                            <a class="alumni-marker${interactive ? '' : ' non-interactive'}" 
                                 style="left: ${this.getXFromLng(alumni.coordinates.lng)}%; top: ${this.getYFromLat(alumni.coordinates.lat)}%;"
                                 data-alumni='${JSON.stringify(alumni)}'
                                 data-index="${index}"
                                 ${interactive && alumni.linkedin ? `href='${alumni.linkedin}' target='_blank'` : ''}>
                                <div class="marker-dot"></div>
                                <div class="marker-pulse"></div>
                            </a>
                        `).join('')}
                    </div>
                    <div class="alumni-tooltip" id="alumni-tooltip">
                        <div class="tooltip-content">
                            <h4 class="tooltip-name"></h4>
                            <p class="tooltip-company"></p>
                            <p class="tooltip-location"></p>
                            <a class="tooltip-linkedin" href="#" target="_blank" style="display:none; color:#0a66c2; text-decoration:underline;">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div class="map-controls" style="margin-top:1.5rem;">
                    <button class="map-btn" onclick="window.alumniMap.createStaticMap('world')">World</button>
                    <button class="map-btn" onclick="window.alumniMap.createStaticMap('india')">India</button>
                    <button class="map-btn" onclick="window.alumniMap.createStaticMap('usa')">USA</button>
                    <button class="map-btn" onclick="window.alumniMap.createStaticMap('europe')">Europe</button>
                    <button class="map-btn" onclick="window.alumniMap.createStaticMap('asia')">Asia</button>
                </div>
                <div class="company-scroller" style="margin-top:2.5rem;">
                    <h4>Where Our Alumni Work</h4>
                    <div class="scroller-container">
                        <div class="scroller-content"></div>
                    </div>
                </div>
            `;

            if (interactive) {
                this.setupMarkerInteractions();
            }
            this.addMapStyles();
            this.setupCompanyScroller();
        }, 300);
    }

    // Mercator-like projection for world map image (simple linear mapping)
    getXFromLng(lng) {
        // World map image: -180 (left) to 180 (right)
        return ((lng + 180) / 360) * 100;
    }
    getYFromLat(lat) {
        // World map image: 90 (top) to -90 (bottom)
        return ((90 - lat) / 180) * 100;
    }

    setupMarkerInteractions() {
        const markers = this.mapContainer.querySelectorAll('.alumni-marker');
        const tooltip = this.mapContainer.querySelector('#alumni-tooltip');

        markers.forEach((marker, index) => {
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
        const linkedinEl = tooltip.querySelector('.tooltip-linkedin');

        nameEl.textContent = alumni.name;
        companyEl.textContent = `${alumni.position} @ ${alumni.company}`;
        locationEl.textContent = alumni.location;
        if (alumni.linkedin) {
            linkedinEl.href = alumni.linkedin;
            linkedinEl.style.display = 'inline';
        } else {
            linkedinEl.style.display = 'none';
        }

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
                transition: opacity 0.4s;
            }
            .fade-in { opacity: 0; animation: fadeInMap 0.5s forwards; }
            .fade-out { opacity: 1; animation: fadeOutMap 0.3s forwards; }
            @keyframes fadeInMap { from { opacity: 0; } to { opacity: 1; } }
            @keyframes fadeOutMap { from { opacity: 1; } to { opacity: 0; } }
            .alumni-marker.non-interactive { pointer-events: none; }

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

            .tooltip-linkedin {
                display: inline-block;
                margin-top: 0.5em;
                font-weight: 600;
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
            // Add animation for horizontal scroll
            scrollerContent.style.display = 'flex';
            scrollerContent.style.gap = '2rem';
            scrollerContent.style.animation = 'scroll-companies 30s linear infinite';
            // Pause on hover
            scrollerContent.addEventListener('mouseenter', () => {
                scrollerContent.style.animationPlayState = 'paused';
            });
            scrollerContent.addEventListener('mouseleave', () => {
                scrollerContent.style.animationPlayState = 'running';
            });
        }
        // Add keyframes if not present
        if (!document.getElementById('company-scroll-keyframes')) {
            const style = document.createElement('style');
            style.id = 'company-scroll-keyframes';
            style.textContent = `@keyframes scroll-companies {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }`;
            document.head.appendChild(style);
        }
    }

    // Add this to allow region switching
    attachRegionButtons() {
        const regions = ['india', 'usa', 'europe', 'asia'];
        regions.forEach(region => {
            const btn = document.querySelector(`.map-btn[onclick*="${region}"]`);
            if (btn) {
                btn.onclick = () => this.createStaticMap(region);
            }
        });
    }
}

window.AlumniMap = AlumniMap;
