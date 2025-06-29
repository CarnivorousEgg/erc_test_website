// Enhanced Alumni Map Module with Interactive Features
class AlumniMap {
    constructor() {
        this.mapContainer = document.getElementById('alumni-map');
        this.alumniData = window.alumniData; // Use global alumni data
        this.currentRegion = 'world';
        
        this.init();
    }

    init() {
        if (!this.mapContainer) {
            console.error('❌ Alumni map container not found');
            return;
        }
        
        console.log('🗺️ Initializing Alumni Map...');
        this.createStaticMap();
        this.attachRegionButtons();
        this.setupCompanyScroller();
        console.log('✅ Alumni Map initialized');
    }

    createStaticMap(region = 'world') {
        console.log(`🌍 Creating map for region: ${region}`);
        this.currentRegion = region;
        
        // Fade out current map
        if (this.mapContainer.firstChild) {
            this.mapContainer.firstChild.classList.add('fade-out');
        }
        
        setTimeout(() => {
            let mapImage = `public/world_night.jpg`;
            if (region === 'india') mapImage = 'public/india_night.jpg';
            else if (region === 'usa') mapImage = 'public/usa_night.jpg';
            else if (region === 'europe') mapImage = 'public/europe_night.jpg';
            else if (region === 'asia') mapImage = 'public/asia_night.jpg';

            // Filter alumni data - use last 3-4 years (2017-2021 batches)
            let alumniToShow = this.alumniData.filter(alumni => {
                const batch = parseInt(alumni.batch);
                return batch >= 2017 && batch <= 2021;
            });

            console.log(`📊 Found ${alumniToShow.length} alumni from 2017-2021`);

            // Further filter by region if not world view
            if (region !== 'world') {
                alumniToShow = alumniToShow.filter(alumni => {
                    if (region === 'india') return alumni.location && alumni.location.toLowerCase().includes('india');
                    if (region === 'usa') return alumni.location && (
                        alumni.location.toLowerCase().includes('usa') || 
                        alumni.location.toLowerCase().includes('united states') ||
                        alumni.location.toLowerCase().includes('ca, usa') ||
                        alumni.location.toLowerCase().includes('tx, usa') ||
                        alumni.location.toLowerCase().includes('ny, usa')
                    );
                    if (region === 'europe') return alumni.location && (
                        alumni.location.toLowerCase().includes('europe') ||
                        alumni.location.toLowerCase().includes('germany') ||
                        alumni.location.toLowerCase().includes('france') ||
                        alumni.location.toLowerCase().includes('uk') ||
                        alumni.location.toLowerCase().includes('portugal') ||
                        alumni.location.toLowerCase().includes('czech') ||
                        alumni.location.toLowerCase().includes('prague') ||
                        alumni.location.toLowerCase().includes('lisbon')
                    );
                    if (region === 'asia') return alumni.location && (
                        alumni.location.toLowerCase().includes('asia') ||
                        alumni.location.toLowerCase().includes('singapore') ||
                        alumni.location.toLowerCase().includes('japan') ||
                        alumni.location.toLowerCase().includes('china')
                    );
                    return false;
                });
                console.log(`🎯 Filtered to ${alumniToShow.length} alumni for ${region}`);
            }

            const interactive = region !== 'world';

            this.mapContainer.innerHTML = `
                <div class="static-world-map fade-in">
                    <img src="${mapImage}" 
                         alt="${region.charAt(0).toUpperCase() + region.slice(1)} Map" class="world-map-image">
                    <div class="alumni-markers">
                        ${alumniToShow.map((alumni, index) => `
                            <div class="alumni-marker${interactive ? ' interactive' : ' breathing'}" 
                                 style="left: ${this.getXFromLng(alumni.coordinates.lng, region)}%; top: ${this.getYFromLat(alumni.coordinates.lat, region)}%;"
                                 data-alumni='${JSON.stringify(alumni)}'
                                 data-index="${index}">
                                <div class="marker-dot"></div>
                                <div class="marker-pulse"></div>
                            </div>
                        `).join('')}
                    </div>
                    ${interactive ? `
                        <div class="alumni-tooltip" id="alumni-tooltip">
                            <div class="tooltip-content">
                                <h4 class="tooltip-name"></h4>
                                <p class="tooltip-company"></p>
                                <p class="tooltip-location"></p>
                                <a class="tooltip-linkedin" href="#" target="_blank">LinkedIn Profile</a>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;

            if (interactive) {
                this.setupMarkerInteractions();
            }
            this.addMapStyles();
            
            // Make breathing markers visible immediately
            setTimeout(() => {
                const breathingMarkers = this.mapContainer.querySelectorAll('.alumni-marker.breathing');
                breathingMarkers.forEach((marker, index) => {
                    setTimeout(() => {
                        marker.classList.add('visible');
                    }, index * 100);
                });
            }, 100);
            
        }, 300);
    }

    // Enhanced projection for different regions
    getXFromLng(lng, region) {
        if (region === 'usa') {
            // USA specific projection (-125 to -65 longitude)
            return ((lng + 125) / 60) * 100;
        } else if (region === 'india') {
            // India specific projection (68 to 97 longitude)
            return ((lng - 68) / 29) * 100;
        } else if (region === 'europe') {
            // Europe specific projection (-10 to 40 longitude)
            return ((lng + 10) / 50) * 100;
        } else if (region === 'asia') {
            // Asia specific projection (60 to 150 longitude)
            return ((lng - 60) / 90) * 100;
        }
        // World projection
        return ((lng + 180) / 360) * 100;
    }

    getYFromLat(lat, region) {
        if (region === 'usa') {
            // USA specific projection (25 to 50 latitude)
            return ((50 - lat) / 25) * 100;
        } else if (region === 'india') {
            // India specific projection (8 to 37 latitude)
            return ((37 - lat) / 29) * 100;
        } else if (region === 'europe') {
            // Europe specific projection (35 to 70 latitude)
            return ((70 - lat) / 35) * 100;
        } else if (region === 'asia') {
            // Asia specific projection (10 to 55 latitude)
            return ((55 - lat) / 45) * 100;
        }
        // World projection
        return ((90 - lat) / 180) * 100;
    }

    setupMarkerInteractions() {
        const markers = this.mapContainer.querySelectorAll('.alumni-marker.interactive');
        const tooltip = this.mapContainer.querySelector('#alumni-tooltip');

        console.log(`🎯 Setting up interactions for ${markers.length} markers`);

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

            .world-map-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: brightness(0.8) contrast(1.1) saturate(1.2);
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
                opacity: 0;
                transition: opacity 0.5s ease;
            }

            .alumni-marker.interactive {
                cursor: pointer;
                pointer-events: all;
            }

            .alumni-marker.breathing {
                pointer-events: none;
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
                opacity: 0.6;
            }

            .alumni-marker.breathing .marker-pulse {
                animation: breathingPulse 3s ease-in-out infinite;
            }

            .alumni-marker.interactive .marker-pulse {
                animation: pulse 2s ease-out infinite;
            }

            @keyframes breathingPulse {
                0%, 100% {
                    transform: translate(-50%, -50%) scale(0.8);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.5);
                    opacity: 0.3;
                }
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

            .alumni-marker.interactive:hover .marker-dot {
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
                margin: 0 0 8px 0;
                color: var(--text-secondary);
                font-size: 12px;
            }

            .tooltip-linkedin {
                color: #0a66c2;
                text-decoration: none;
                font-weight: 600;
                font-size: 12px;
            }

            .tooltip-linkedin:hover {
                text-decoration: underline;
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
                span.className = 'company-name';
                span.textContent = company;
                scrollerContent.appendChild(span);
            });
            
            // Add animation for horizontal scroll
            scrollerContent.style.display = 'flex';
            scrollerContent.style.gap = '3rem';
            scrollerContent.style.animation = 'scroll-companies 40s linear infinite';
            
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
            style.textContent = `
                @keyframes scroll-companies {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .company-scroller {
                    margin-top: 3rem;
                    text-align: center;
                }
                
                .company-scroller h4 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 2rem;
                }
                
                .scroller-container {
                    overflow: hidden;
                    position: relative;
                    height: 60px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                }
                
                .company-name {
                    color: var(--text-secondary);
                    white-space: nowrap;
                    font-weight: 500;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    padding: 0 1rem;
                }
                
                .company-name:hover {
                    color: var(--primary-color);
                }
            `;
            document.head.appendChild(style);
        }
    }

    attachRegionButtons() {
        const mapButtons = document.querySelectorAll('.map-btn');
        console.log(`🔘 Found ${mapButtons.length} region buttons`);
        
        mapButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const region = btn.textContent.toLowerCase();
                console.log(`🌍 Region button clicked: ${region}`);
                this.createStaticMap(region);
                
                // Update active button
                mapButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
}

window.AlumniMap = AlumniMap;