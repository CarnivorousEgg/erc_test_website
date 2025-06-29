// Enhanced Alumni Map Module with Corrected Asia Coordinates
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

            // Filter alumni by region
            let alumniToShow = this.alumniData;
            if (region !== 'world') {
                alumniToShow = this.alumniData.filter(alumni => {
                    if (region === 'usa') return this.isInUSA(alumni.location);
                    if (region === 'europe') return this.isInEurope(alumni.location);
                    if (region === 'asia') return this.isInAsia(alumni.location);
                    return false;
                });
            }

            console.log(`📊 Found ${alumniToShow.length} alumni for ${region}`);

            // Group nearby alumni to reduce density
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
                                 data-index="${index}">
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
            
            // Make markers visible with staggered animation
            setTimeout(() => {
                const markers = this.mapContainer.querySelectorAll('.alumni-marker');
                markers.forEach((marker, index) => {
                    setTimeout(() => {
                        marker.classList.add('visible');
                    }, index * 100);
                });
            }, 100);
            
        }, 300);
    }

    // Precise region detection
    isInUSA(location) {
        const usaKeywords = ['usa', 'united states', 'california', 'texas', 'new york', 'florida', 'washington', 'oregon', 'colorado', 'nevada', 'michigan', 'pennsylvania', 'massachusetts', 'illinois', 'georgia', 'north carolina', 'virginia', 'ca, usa', 'tx, usa', 'ny, usa', 'fl, usa', 'wa, usa', 'co, usa'];
        return usaKeywords.some(keyword => location.toLowerCase().includes(keyword));
    }

    isInEurope(location) {
        const europeKeywords = ['germany', 'france', 'uk', 'united kingdom', 'portugal', 'spain', 'italy', 'netherlands', 'belgium', 'switzerland', 'austria', 'czech', 'poland', 'sweden', 'norway', 'denmark', 'finland', 'ireland', 'greece', 'hungary', 'romania', 'bulgaria', 'croatia', 'slovakia', 'slovenia', 'estonia', 'latvia', 'lithuania', 'luxembourg', 'malta', 'cyprus', 'prague', 'lisbon', 'berlin', 'paris', 'london', 'madrid', 'rome', 'amsterdam', 'brussels', 'zurich', 'vienna', 'warsaw', 'stockholm', 'oslo', 'copenhagen', 'helsinki', 'dublin', 'athens', 'budapest', 'bucharest', 'sofia', 'zagreb', 'bratislava', 'ljubljana', 'tallinn', 'riga', 'vilnius', 'cambridge', 'toulouse', 'maranello', 'walldorf', 'darmstadt'];
        return europeKeywords.some(keyword => location.toLowerCase().includes(keyword));
    }

    isInAsia(location) {
        const asiaKeywords = ['india', 'china', 'japan', 'singapore', 'south korea', 'thailand', 'malaysia', 'indonesia', 'philippines', 'vietnam', 'bangladesh', 'pakistan', 'sri lanka', 'nepal', 'myanmar', 'cambodia', 'laos', 'brunei', 'mongolia', 'taiwan', 'hong kong', 'macau', 'bangalore', 'mumbai', 'delhi', 'chennai', 'hyderabad', 'pune', 'kolkata', 'ahmedabad', 'surat', 'jaipur', 'lucknow', 'kanpur', 'nagpur', 'indore', 'thane', 'bhopal', 'visakhapatnam', 'pimpri', 'patna', 'vadodara', 'ghaziabad', 'ludhiana', 'agra', 'nashik', 'faridabad', 'meerut', 'rajkot', 'kalyan', 'vasai', 'varanasi', 'srinagar', 'aurangabad', 'dhanbad', 'amritsar', 'navi mumbai', 'allahabad', 'ranchi', 'howrah', 'coimbatore', 'jabalpur', 'gwalior', 'vijayawada', 'jodhpur', 'madurai', 'raipur', 'kota', 'guwahati', 'chandigarh', 'solapur', 'hubballi', 'tiruchirappalli', 'bareilly', 'mysore', 'tiruppur', 'gurgaon', 'aligarh', 'jalandhar', 'bhubaneswar', 'salem', 'warangal', 'guntur', 'bhiwandi', 'saharanpur', 'gorakhpur', 'bikaner', 'amravati', 'noida', 'jamshedpur', 'bhilai', 'cuttack', 'firozabad', 'kochi', 'nellore', 'bhavnagar', 'dehradun', 'durgapur', 'asansol', 'rourkela', 'nanded', 'kolhapur', 'ajmer', 'akola', 'gulbarga', 'jamnagar', 'ujjain', 'loni', 'siliguri', 'jhansi', 'ulhasnagar', 'jammu', 'sangli', 'mangalore', 'erode', 'belgaum', 'ambattur', 'tirunelveli', 'malegaon', 'gaya', 'jalgaon', 'udaipur', 'maheshtala', 'beijing', 'shanghai', 'guangzhou', 'shenzhen', 'chengdu', 'hangzhou', 'wuhan', 'xian', 'suzhou', 'tianjin', 'nanjing', 'shenyang', 'harbin', 'jinan', 'changchun', 'dalian', 'kunming', 'taiyuan', 'shijiazhuang', 'urumqi', 'guiyang', 'hefei', 'lanzhou', 'zhengzhou', 'changsha', 'nanning', 'haikou', 'yinchuan', 'xining', 'hohhot', 'lhasa', 'tokyo', 'osaka', 'yokohama', 'nagoya', 'sapporo', 'fukuoka', 'kobe', 'kawasaki', 'kyoto', 'saitama', 'hiroshima', 'sendai', 'kitakyushu', 'chiba', 'sakai', 'niigata', 'hamamatsu', 'okayama', 'sagamihara', 'seoul', 'busan', 'incheon', 'daegu', 'daejeon', 'gwangju', 'suwon', 'ulsan', 'changwon', 'goyang', 'yongin', 'seongnam', 'bucheon', 'ansan', 'cheongju', 'jeonju', 'anyang', 'pohang', 'uijeongbu', 'siheung', 'cheonan', 'hwaseong', 'gimhae', 'gumi', 'pyeongtaek', 'iksan', 'gunpo', 'osan', 'yangsan', 'jeju', 'chuncheon', 'gangneung', 'andong', 'mokpo', 'yeosu', 'suncheon', 'gimcheon', 'naju', 'sangju', 'jeongeup', 'gongju', 'yeongju', 'seosan', 'nonsan', 'boryeong', 'asan', 'gyeongju', 'miryang', 'tongyeong', 'sacheon', 'kimhae', 'yangju', 'icheon', 'anju', 'namyangju', 'paju', 'gimpo', 'hanam', 'guri', 'gwangmyeong', 'gwacheon', 'uiwang', 'gunsan', 'jecheon', 'chungju', 'wonju', 'gangneung', 'samcheok', 'sokcho', 'donghae', 'taebaek', 'bangkok', 'kuala lumpur', 'jakarta', 'manila', 'ho chi minh city', 'hanoi', 'phnom penh', 'vientiane', 'bandar seri begawan', 'ulaanbaatar', 'taipei', 'dhaka', 'karachi', 'lahore', 'islamabad', 'rawalpindi', 'faisalabad', 'multan', 'gujranwala', 'peshawar', 'quetta', 'sialkot', 'sargodha', 'bahawalpur', 'sukkur', 'larkana', 'sheikhupura', 'jhang', 'rahim yar khan', 'gujrat', 'kasur', 'mardan', 'mingora', 'dera ghazi khan', 'sahiwal', 'nawabshah', 'okara', 'mirpur khas', 'chiniot', 'kamoke', 'mandi bahauddin', 'jhelum', 'sadiqabad', 'jacobabad', 'shikarpur', 'khanewal', 'hafizabad', 'kohat', 'muzaffargarh', 'khanpur', 'gojra', 'mianwali', 'bahawalnagar', 'muridke', 'pak pattan', 'abottabad', 'tando allahyar', 'jaranwala', 'chishtian', 'daska', 'mandi burewala', 'ahmadpur east', 'kamalia', 'vihari', 'wah cantonment', 'dera ismail khan', 'chaman', 'zhob', 'gwadar', 'turbat', 'khuzdar', 'colombo', 'kandy', 'galle', 'jaffna', 'negombo', 'batticaloa', 'matara', 'ratnapura', 'badulla', 'gampaha', 'kalutara', 'kurunegala', 'anuradhapura', 'polonnaruwa', 'trincomalee', 'vavuniya', 'mannar', 'puttalam', 'hambantota', 'monaragala', 'ampara', 'kegalle', 'nuwara eliya', 'kathmandu', 'pokhara', 'lalitpur', 'bharatpur', 'biratnagar', 'birgunj', 'dharan', 'butwal', 'hetauda', 'janakpur', 'dhangadhi', 'tulsipur', 'siddharthanagar', 'bhairahawa', 'kalaiya', 'itahari', 'gorkha', 'baglung', 'nepalgunj', 'tansen', 'dhankuta', 'ilam', 'rajbiraj', 'lahan', 'gaur', 'malangwa', 'siraha', 'rangoon', 'mandalay', 'naypyidaw', 'mawlamyine', 'bago', 'pathein', 'monywa', 'meiktila', 'myitkyina', 'dawei', 'pyay', 'hpa-an', 'taunggyi', 'sittwe', 'lashio', 'pakokku', 'magway', 'thaton', 'chauk', 'shwebo', 'sagaing', 'myeik', 'kawthaung', 'kyaukpyu', 'loikaw', 'hakha', 'falam', 'tamu', 'kalay', 'mindat', 'tedim', 'tonzang', 'rihkhawdar', 'thantlang', 'karnataka', 'maharashtra', 'tamil nadu', 'telangana', 'haryana', 'uttar pradesh'];
        return asiaKeywords.some(keyword => location.toLowerCase().includes(keyword));
    }

    // Group nearby alumni to reduce density
    groupNearbyAlumni(alumni, region) {
        const groups = [];
        const processed = new Set();
        
        // Adjust threshold based on region and density
        let threshold;
        if (region === 'usa') threshold = 1.5; // Smaller threshold for dense USA
        else if (region === 'europe') threshold = 2.0;
        else if (region === 'asia') threshold = 1.8; // Adjusted for Asia
        else threshold = 3.0; // World view

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
                    if (alumni.linkedin && alumni.linkedin !== '#') {
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
                                ${alumni.linkedin && alumni.linkedin !== '#' ? `
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

    // Enhanced projection system for accurate positioning - CORRECTED FOR ASIA
    getXFromLng(lng, region) {
        switch (region) {
            case 'usa':
                // USA: -125° to -65° longitude (60° range)
                return Math.max(0, Math.min(100, ((lng + 125) / 60) * 100));
            case 'europe':
                // Europe: -10° to 40° longitude (50° range)
                return Math.max(0, Math.min(100, ((lng + 10) / 50) * 100));
            case 'asia':
                // Asia: 65° to 150° longitude (85° range) - CORRECTED
                return Math.max(0, Math.min(100, ((lng - 65) / 85) * 100));
            default:
                // World: -180° to 180° longitude (360° range)
                return Math.max(0, Math.min(100, ((lng + 180) / 360) * 100));
        }
    }

    getYFromLat(lat, region) {
        switch (region) {
            case 'usa':
                // USA: 25° to 50° latitude (25° range)
                return Math.max(0, Math.min(100, ((50 - lat) / 25) * 100));
            case 'europe':
                // Europe: 35° to 70° latitude (35° range)
                return Math.max(0, Math.min(100, ((70 - lat) / 35) * 100));
            case 'asia':
                // Asia: 5° to 55° latitude (50° range) - CORRECTED
                return Math.max(0, Math.min(100, ((55 - lat) / 50) * 100));
            default:
                // World: -90° to 90° latitude (180° range)
                return Math.max(0, Math.min(100, ((90 - lat) / 180) * 100));
        }
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
                width: 32px;
                height: 32px;
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
                width: 18px;
                height: 18px;
                background: var(--primary-color);
                border-radius: 50%;
                border: 3px solid var(--bg-primary);
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
                transition: all 0.3s ease;
            }

            .marker-dot.grouped {
                width: 24px;
                height: 24px;
                background: var(--secondary-color);
                font-size: 12px;
                border-width: 2px;
            }

            .marker-pulse {
                width: 32px;
                height: 32px;
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
                box-shadow: 0 0 25px rgba(255, 255, 255, 0.9);
                transform: translate(-50%, -50%) scale(1.4);
            }

            .marker-tooltip {
                position: absolute;
                bottom: 40px;
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
                min-width: 120px;
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
                min-width: 100px;
                justify-content: center;
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
                    width: 28px;
                    height: 28px;
                }
                
                .marker-dot {
                    width: 16px;
                    height: 16px;
                    font-size: 9px;
                    border-width: 2px;
                }
                
                .marker-dot.grouped {
                    width: 20px;
                    height: 20px;
                    font-size: 10px;
                }
                
                .marker-pulse {
                    width: 28px;
                    height: 28px;
                }

                .alumni-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.75rem;
                }

                .linkedin-btn {
                    align-self: flex-end;
                    min-width: 80px;
                }

                .marker-tooltip {
                    min-width: 100px;
                    font-size: 11px;
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