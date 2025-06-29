// Enhanced Alumni Map Module with Fixed Interactions and Better Positioning
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
        const currentMap = this.mapContainer.querySelector('.static-world-map');
        if (currentMap) {
            currentMap.classList.add('fade-out');
        }
        
        setTimeout(() => {
            let mapImage = `public/world_night.jpg`;
            if (region === 'usa') mapImage = 'public/usa_night.jpg';
            else if (region === 'europe') mapImage = 'public/europe_night.jpg';
            else if (region === 'asia') mapImage = 'public/asia_night.jpg';

            // Use ALL alumni data with corrected coordinates
            let alumniToShow = this.alumniData.map(alumni => {
                // Fix coordinates that are in the sea or incorrect
                let correctedCoordinates = { ...alumni.coordinates };
                
                // Fix specific problematic locations with accurate coordinates
                if (alumni.location.includes('Pittsburgh')) {
                    correctedCoordinates = { lat: 40.4406, lng: -79.9959 };
                } else if (alumni.location.includes('Miami')) {
                    correctedCoordinates = { lat: 25.7617, lng: -80.1918 };
                } else if (alumni.location.includes('Bangalore')) {
                    correctedCoordinates = { lat: 12.9716, lng: 77.5946 };
                } else if (alumni.location.includes('Lisbon')) {
                    correctedCoordinates = { lat: 38.7223, lng: -9.1393 };
                } else if (alumni.location.includes('San Francisco')) {
                    correctedCoordinates = { lat: 37.7749, lng: -122.4194 };
                } else if (alumni.location.includes('Cupertino')) {
                    correctedCoordinates = { lat: 37.3230, lng: -122.0322 };
                } else if (alumni.location.includes('San Diego')) {
                    correctedCoordinates = { lat: 32.7157, lng: -117.1611 };
                } else if (alumni.location.includes('Seattle')) {
                    correctedCoordinates = { lat: 47.6062, lng: -122.3321 };
                } else if (alumni.location.includes('Austin')) {
                    correctedCoordinates = { lat: 30.2672, lng: -97.7431 };
                } else if (alumni.location.includes('New York')) {
                    correctedCoordinates = { lat: 40.7128, lng: -74.0060 };
                } else if (alumni.location.includes('Mumbai')) {
                    correctedCoordinates = { lat: 19.0760, lng: 72.8777 };
                } else if (alumni.location.includes('Delhi') || alumni.location.includes('Gurgaon')) {
                    correctedCoordinates = { lat: 28.4595, lng: 77.0266 };
                } else if (alumni.location.includes('Prague')) {
                    correctedCoordinates = { lat: 50.0755, lng: 14.4378 };
                } else if (alumni.location.includes('Berlin')) {
                    correctedCoordinates = { lat: 52.5200, lng: 13.4050 };
                } else if (alumni.location.includes('Vancouver')) {
                    correctedCoordinates = { lat: 49.2827, lng: -123.1207 };
                } else if (alumni.location.includes('Sydney')) {
                    correctedCoordinates = { lat: -33.8688, lng: 151.2093 };
                } else if (alumni.location.includes('Houston')) {
                    correctedCoordinates = { lat: 29.7604, lng: -95.3698 };
                } else if (alumni.location.includes('Dallas')) {
                    correctedCoordinates = { lat: 32.7767, lng: -96.7970 };
                } else if (alumni.location.includes('College Station')) {
                    correctedCoordinates = { lat: 30.6280, lng: -96.3344 };
                } else if (alumni.location.includes('Princeton')) {
                    correctedCoordinates = { lat: 40.3573, lng: -74.6672 };
                } else if (alumni.location.includes('Stanford')) {
                    correctedCoordinates = { lat: 37.4275, lng: -122.1697 };
                } else if (alumni.location.includes('Mountain View')) {
                    correctedCoordinates = { lat: 37.3861, lng: -122.0839 };
                } else if (alumni.location.includes('Palo Alto')) {
                    correctedCoordinates = { lat: 37.4419, lng: -122.1430 };
                } else if (alumni.location.includes('Santa Clara')) {
                    correctedCoordinates = { lat: 37.3541, lng: -121.9552 };
                } else if (alumni.location.includes('Ann Arbor')) {
                    correctedCoordinates = { lat: 42.2808, lng: -83.7430 };
                } else if (alumni.location.includes('Menlo Park')) {
                    correctedCoordinates = { lat: 37.4529, lng: -122.1817 };
                } else if (alumni.location.includes('Darmstadt')) {
                    correctedCoordinates = { lat: 49.8728, lng: 8.6512 };
                } else if (alumni.location.includes('Colorado')) {
                    correctedCoordinates = { lat: 39.5501, lng: -105.7821 };
                } else if (alumni.location.includes('Reno')) {
                    correctedCoordinates = { lat: 39.5296, lng: -119.8138 };
                } else if (alumni.location.includes('San Jose')) {
                    correctedCoordinates = { lat: 37.3382, lng: -121.8863 };
                }
                
                return { ...alumni, coordinates: correctedCoordinates };
            });

            console.log(`📊 Found ${alumniToShow.length} total alumni`);

            // Further filter by region if not world view
            if (region !== 'world') {
                alumniToShow = alumniToShow.filter(alumni => {
                    if (region === 'usa') return alumni.location && (
                        alumni.location.toLowerCase().includes('usa') || 
                        alumni.location.toLowerCase().includes('united states') ||
                        alumni.location.toLowerCase().includes('ca, usa') ||
                        alumni.location.toLowerCase().includes('tx, usa') ||
                        alumni.location.toLowerCase().includes('ny, usa') ||
                        alumni.location.toLowerCase().includes('florida') ||
                        alumni.location.toLowerCase().includes('california') ||
                        alumni.location.toLowerCase().includes('pennsylvania') ||
                        alumni.location.toLowerCase().includes('seattle') ||
                        alumni.location.toLowerCase().includes('austin') ||
                        alumni.location.toLowerCase().includes('dallas') ||
                        alumni.location.toLowerCase().includes('houston') ||
                        alumni.location.toLowerCase().includes('colorado') ||
                        alumni.location.toLowerCase().includes('nevada') ||
                        alumni.location.toLowerCase().includes('michigan')
                    );
                    if (region === 'europe') return alumni.location && (
                        alumni.location.toLowerCase().includes('europe') ||
                        alumni.location.toLowerCase().includes('germany') ||
                        alumni.location.toLowerCase().includes('france') ||
                        alumni.location.toLowerCase().includes('uk') ||
                        alumni.location.toLowerCase().includes('portugal') ||
                        alumni.location.toLowerCase().includes('czech') ||
                        alumni.location.toLowerCase().includes('prague') ||
                        alumni.location.toLowerCase().includes('lisbon') ||
                        alumni.location.toLowerCase().includes('berlin') ||
                        alumni.location.toLowerCase().includes('darmstadt')
                    );
                    if (region === 'asia') return alumni.location && (
                        alumni.location.toLowerCase().includes('asia') ||
                        alumni.location.toLowerCase().includes('singapore') ||
                        alumni.location.toLowerCase().includes('japan') ||
                        alumni.location.toLowerCase().includes('china') ||
                        alumni.location.toLowerCase().includes('india') ||
                        alumni.location.toLowerCase().includes('bangalore') ||
                        alumni.location.toLowerCase().includes('mumbai') ||
                        alumni.location.toLowerCase().includes('delhi') ||
                        alumni.location.toLowerCase().includes('gurgaon')
                    );
                    return false;
                });
                console.log(`🎯 Filtered to ${alumniToShow.length} alumni for ${region}`);
            }

            // Group nearby alumni to reduce density (especially for USA)
            const groupedAlumni = this.groupNearbyAlumni(alumniToShow, region);
            console.log(`📍 Grouped into ${groupedAlumni.length} markers`);

            const interactive = region !== 'world';

            this.mapContainer.innerHTML = `
                <div class="static-world-map fade-in">
                    <img src="${mapImage}" 
                         alt="${region.charAt(0).toUpperCase() + region.slice(1)} Map" class="world-map-image">
                    <div class="alumni-markers">
                        ${groupedAlumni.map((group, index) => `
                            <button class="alumni-marker${interactive ? ' interactive' : ' breathing'}" 
                                 style="left: ${this.getXFromLng(group.coordinates.lng, region)}%; top: ${this.getYFromLat(group.coordinates.lat, region)}%;"
                                 data-group='${JSON.stringify(group).replace(/'/g, '&apos;')}'
                                 data-index="${index}"
                                 ${interactive ? `onclick="this.showGroupTooltip(event)"` : ''}>
                                <div class="marker-dot ${group.alumni.length > 1 ? 'grouped' : ''}">
                                    ${group.alumni.length > 1 ? group.alumni.length : ''}
                                </div>
                                <div class="marker-pulse"></div>
                                ${interactive ? `<div class="marker-tooltip">${this.createGroupTooltipContent(group)}</div>` : ''}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;

            this.addMapStyles();
            this.setupGroupInteractions();
            
            // Make breathing markers visible immediately
            setTimeout(() => {
                const breathingMarkers = this.mapContainer.querySelectorAll('.alumni-marker.breathing');
                breathingMarkers.forEach((marker, index) => {
                    setTimeout(() => {
                        marker.classList.add('visible');
                    }, index * 100);
                });
                
                const interactiveMarkers = this.mapContainer.querySelectorAll('.alumni-marker.interactive');
                interactiveMarkers.forEach((marker, index) => {
                    setTimeout(() => {
                        marker.classList.add('visible');
                    }, index * 100);
                });
            }, 100);
            
        }, 300);
    }

    // Group nearby alumni to reduce density
    groupNearbyAlumni(alumni, region) {
        const groups = [];
        const processed = new Set();
        const threshold = region === 'usa' ? 2 : region === 'europe' ? 3 : 5; // Distance threshold in degrees

        alumni.forEach((alumnus, index) => {
            if (processed.has(index)) return;

            const group = {
                coordinates: alumnus.coordinates,
                alumni: [alumnus]
            };

            // Find nearby alumni
            alumni.forEach((other, otherIndex) => {
                if (otherIndex === index || processed.has(otherIndex)) return;

                const distance = Math.sqrt(
                    Math.pow(alumnus.coordinates.lat - other.coordinates.lat, 2) +
                    Math.pow(alumnus.coordinates.lng - other.coordinates.lng, 2)
                );

                if (distance < threshold) {
                    group.alumni.push(other);
                    processed.add(otherIndex);
                }
            });

            processed.add(index);
            groups.push(group);
        });

        return groups;
    }

    createGroupTooltipContent(group) {
        if (group.alumni.length === 1) {
            const alumni = group.alumni[0];
            return `${alumni.name}<br><small>${alumni.company}</small>`;
        } else {
            return `${group.alumni.length} Alumni<br><small>Click to see details</small>`;
        }
    }

    setupGroupInteractions() {
        const interactiveMarkers = this.mapContainer.querySelectorAll('.alumni-marker.interactive');
        
        interactiveMarkers.forEach(marker => {
            marker.addEventListener('click', (e) => {
                e.preventDefault();
                const groupData = JSON.parse(marker.dataset.group);
                
                if (groupData.alumni.length === 1) {
                    // Single alumni - open LinkedIn
                    const alumni = groupData.alumni[0];
                    if (alumni.linkedin) {
                        window.open(alumni.linkedin, '_blank');
                    }
                } else {
                    // Multiple alumni - show modal
                    this.showGroupModal(groupData);
                }
            });
        });
    }

    showGroupModal(group) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Alumni in this Area (${group.alumni.length})</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="alumni-list">
                        ${group.alumni.map(alumni => `
                            <div class="alumni-item">
                                <div class="alumni-info">
                                    <h4>${alumni.name}</h4>
                                    <p><strong>${alumni.company}</strong></p>
                                    <p class="location">${alumni.location}</p>
                                    <p class="role">${alumni.position}</p>
                                </div>
                                ${alumni.linkedin ? `
                                    <a href="${alumni.linkedin}" target="_blank" class="linkedin-btn">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" class="linkedin-icon">
                                        LinkedIn
                                    </a>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
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

    // Enhanced projection for different regions
    getXFromLng(lng, region) {
        if (region === 'usa') {
            // USA specific projection (-125 to -65 longitude)
            return Math.max(0, Math.min(100, ((lng + 125) / 60) * 100));
        } else if (region === 'europe') {
            // Europe specific projection (-10 to 40 longitude)
            return Math.max(0, Math.min(100, ((lng + 10) / 50) * 100));
        } else if (region === 'asia') {
            // Asia specific projection (60 to 150 longitude)
            return Math.max(0, Math.min(100, ((lng - 60) / 90) * 100));
        }
        // World projection
        return Math.max(0, Math.min(100, ((lng + 180) / 360) * 100));
    }

    getYFromLat(lat, region) {
        if (region === 'usa') {
            // USA specific projection (25 to 50 latitude)
            return Math.max(0, Math.min(100, ((50 - lat) / 25) * 100));
        } else if (region === 'europe') {
            // Europe specific projection (35 to 70 latitude)
            return Math.max(0, Math.min(100, ((70 - lat) / 35) * 100));
        } else if (region === 'asia') {
            // Asia specific projection (10 to 55 latitude)
            return Math.max(0, Math.min(100, ((55 - lat) / 45) * 100));
        }
        // World projection
        return Math.max(0, Math.min(100, ((90 - lat) / 180) * 100));
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
                filter: brightness(1.0) contrast(1.2) saturate(1.3);
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
                width: 28px;
                height: 28px;
                transform: translate(-50%, -50%);
                opacity: 0;
                transition: opacity 0.5s ease;
                background: none;
                border: none;
                cursor: pointer;
                z-index: 10;
            }

            .alumni-marker.interactive {
                pointer-events: all;
            }

            .alumni-marker.breathing {
                pointer-events: none;
            }

            .alumni-marker.visible {
                opacity: 1;
            }

            .marker-dot {
                width: 16px;
                height: 16px;
                background: var(--primary-color);
                border-radius: 50%;
                border: 2px solid var(--bg-primary);
                box-shadow: 0 0 15px rgba(34, 211, 238, 0.8);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                font-weight: bold;
                color: var(--bg-primary);
            }

            .marker-dot.grouped {
                width: 20px;
                height: 20px;
                background: var(--secondary-color);
                font-size: 11px;
            }

            .marker-pulse {
                width: 28px;
                height: 28px;
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
                    transform: translate(-50%, -50%) scale(2.2);
                    opacity: 0.2;
                }
            }

            @keyframes pulse {
                0% {
                    transform: translate(-50%, -50%) scale(0.8);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(2.5);
                    opacity: 0;
                }
            }

            .alumni-marker.interactive:hover .marker-dot {
                background: #ffffff;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
                transform: translate(-50%, -50%) scale(1.4);
            }

            .marker-tooltip {
                position: absolute;
                bottom: 35px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                padding: 8px 12px;
                font-size: 12px;
                color: var(--text-primary);
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                text-align: center;
            }

            .alumni-marker.interactive:hover .marker-tooltip {
                opacity: 1;
            }

            /* Alumni Group Modal Styles */
            .alumni-list {
                display: grid;
                gap: 1rem;
                max-height: 400px;
                overflow-y: auto;
            }

            .alumni-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 1rem;
                gap: 1rem;
            }

            .alumni-info h4 {
                margin: 0 0 0.25rem 0;
                color: var(--text-primary);
                font-size: 1rem;
                font-weight: 600;
            }

            .alumni-info p {
                margin: 0.25rem 0;
                font-size: 0.9rem;
            }

            .alumni-info .location {
                color: var(--text-muted);
                font-size: 0.8rem;
            }

            .alumni-info .role {
                color: var(--text-secondary);
                font-size: 0.85rem;
            }

            .linkedin-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: #0077B5;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                white-space: nowrap;
            }

            .linkedin-btn:hover {
                background: #005885;
                transform: translateY(-2px);
            }

            .linkedin-icon {
                width: 16px;
                height: 16px;
                object-fit: contain;
            }

            /* Responsive adjustments */
            @media (max-width: 768px) {
                .static-world-map {
                    height: 300px;
                }
                
                .alumni-marker {
                    width: 24px;
                    height: 24px;
                }
                
                .marker-dot {
                    width: 14px;
                    height: 14px;
                    font-size: 9px;
                }
                
                .marker-dot.grouped {
                    width: 18px;
                    height: 18px;
                    font-size: 10px;
                }
                
                .marker-pulse {
                    width: 24px;
                    height: 24px;
                }

                .alumni-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.75rem;
                }

                .linkedin-btn {
                    align-self: flex-end;
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