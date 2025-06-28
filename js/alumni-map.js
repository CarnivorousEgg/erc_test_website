// Alumni World Map Module
export class AlumniMap {
    constructor() {
        this.mapContainer = document.getElementById('alumni-map');
        this.map = null;
        this.markers = [];
        this.alumniData = [
            { name: "Rahul Sharma", company: "Google", location: [37.4419, -122.1430], city: "Mountain View, CA" },
            { name: "Priya Patel", company: "Microsoft", location: [47.6062, -122.3321], city: "Seattle, WA" },
            { name: "Arjun Kumar", company: "Amazon", location: [47.6205, -122.3493], city: "Seattle, WA" },
            { name: "Sneha Reddy", company: "Tesla", location: [37.3861, -122.0839], city: "Palo Alto, CA" },
            { name: "Vikram Singh", company: "Apple", location: [37.3349, -122.0090], city: "Cupertino, CA" },
            { name: "Ananya Gupta", company: "Meta", location: [37.4848, -122.1477], city: "Menlo Park, CA" },
            { name: "Rohit Agarwal", company: "NVIDIA", location: [37.3708, -121.9906], city: "Santa Clara, CA" },
            { name: "Kavya Nair", company: "Intel", location: [37.3861, -121.9634], city: "Santa Clara, CA" },
            { name: "Aditya Joshi", company: "IBM", location: [41.1220, -73.7948], city: "Armonk, NY" },
            { name: "Meera Iyer", company: "Qualcomm", location: [32.9042, -117.2011], city: "San Diego, CA" },
            { name: "Karthik Rao", company: "Goldman Sachs", location: [40.7505, -73.9934], city: "New York, NY" },
            { name: "Divya Menon", company: "JPMorgan", location: [40.7505, -73.9934], city: "New York, NY" },
            { name: "Siddharth Bhat", company: "Uber", location: [37.7749, -122.4194], city: "San Francisco, CA" },
            { name: "Riya Kapoor", company: "Airbnb", location: [37.7749, -122.4194], city: "San Francisco, CA" },
            { name: "Amit Verma", company: "Spotify", location: [40.7505, -73.9934], city: "New York, NY" },
            { name: "Pooja Desai", company: "Netflix", location: [37.2431, -121.7915], city: "Los Gatos, CA" },
            { name: "Nikhil Pandey", company: "Adobe", location: [37.3318, -121.8911], city: "San Jose, CA" },
            { name: "Shreya Ghosh", company: "Salesforce", location: [37.7749, -122.4194], city: "San Francisco, CA" },
            { name: "Varun Malhotra", company: "Oracle", location: [37.5407, -122.0639], city: "Redwood City, CA" },
            { name: "Isha Bansal", company: "Cisco", location: [37.4419, -122.1430], city: "San Jose, CA" }
        ];
        
        this.init();
    }

    async init() {
        if (!this.mapContainer) return;
        
        try {
            // Load Leaflet CSS
            await this.loadCSS('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
            
            // Load Leaflet JS
            await this.loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
            
            this.createMap();
            this.addMarkers();
            this.setupCompanyScroller();
        } catch (error) {
            console.error('Error initializing alumni map:', error);
            this.showFallback();
        }
    }

    loadCSS(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    createMap() {
        this.map = L.map(this.mapContainer, {
            center: [20, 0],
            zoom: 2,
            zoomControl: true,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
            dragging: true,
            touchZoom: true
        });

        // Add tile layer with dark theme
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        // Style the map container
        this.mapContainer.style.height = '400px';
        this.mapContainer.style.borderRadius = '12px';
        this.mapContainer.style.overflow = 'hidden';
        this.mapContainer.style.border = '1px solid var(--border-color)';
    }

    addMarkers() {
        // Create custom icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div class="marker-dot"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        // Add CSS for custom markers
        this.addMarkerStyles();

        this.alumniData.forEach((alumni, index) => {
            const marker = L.marker(alumni.location, { icon: customIcon })
                .addTo(this.map)
                .bindPopup(`
                    <div class="alumni-popup">
                        <h4>${alumni.name}</h4>
                        <p><strong>${alumni.company}</strong></p>
                        <p>${alumni.city}</p>
                    </div>
                `, {
                    className: 'custom-popup'
                });

            // Add animation delay
            setTimeout(() => {
                marker.getElement().style.animation = `markerPulse 2s ease-in-out infinite`;
                marker.getElement().style.animationDelay = `${index * 0.1}s`;
            }, 1000);

            this.markers.push(marker);
        });
    }

    addMarkerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .custom-marker {
                background: transparent !important;
                border: none !important;
            }
            
            .marker-dot {
                width: 12px;
                height: 12px;
                background: var(--primary-color);
                border-radius: 50%;
                border: 2px solid var(--bg-primary);
                box-shadow: 0 0 10px rgba(34, 211, 238, 0.6);
                position: relative;
            }
            
            .marker-dot::after {
                content: '';
                position: absolute;
                top: -4px;
                left: -4px;
                width: 20px;
                height: 20px;
                border: 2px solid var(--primary-color);
                border-radius: 50%;
                opacity: 0.3;
                animation: markerRipple 2s ease-out infinite;
            }
            
            @keyframes markerPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            @keyframes markerRipple {
                0% {
                    transform: scale(0.8);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .custom-popup .leaflet-popup-content-wrapper {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            }
            
            .custom-popup .leaflet-popup-content {
                margin: 12px;
                color: var(--text-primary);
            }
            
            .alumni-popup h4 {
                margin: 0 0 8px 0;
                color: var(--primary-color);
                font-size: 14px;
                font-weight: 600;
            }
            
            .alumni-popup p {
                margin: 4px 0;
                font-size: 12px;
                color: var(--text-secondary);
            }
            
            .custom-popup .leaflet-popup-tip {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
            }
        `;
        document.head.appendChild(style);
    }

    setupCompanyScroller() {
        const companies = [...new Set(this.alumniData.map(alumni => alumni.company))];
        const scrollerContent = document.querySelector('.scroller-content');
        
        if (scrollerContent) {
            // Clear existing content
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

    showFallback() {
        this.mapContainer.innerHTML = `
            <div class="map-fallback">
                <div class="fallback-content">
                    <h4>🌍 Our Global Alumni Network</h4>
                    <p>Our alumni are working at leading tech companies across the globe</p>
                    <div class="fallback-stats">
                        <div class="fallback-stat">
                            <span class="stat-number">${this.alumniData.length}+</span>
                            <span class="stat-label">Alumni Worldwide</span>
                        </div>
                        <div class="fallback-stat">
                            <span class="stat-number">${[...new Set(this.alumniData.map(a => a.company))].length}+</span>
                            <span class="stat-label">Top Companies</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add fallback styles
        const style = document.createElement('style');
        style.textContent = `
            .map-fallback {
                height: 400px;
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 2rem;
            }
            
            .fallback-content h4 {
                font-size: 1.5rem;
                color: var(--text-primary);
                margin-bottom: 1rem;
            }
            
            .fallback-content p {
                color: var(--text-secondary);
                margin-bottom: 2rem;
            }
            
            .fallback-stats {
                display: flex;
                gap: 2rem;
                justify-content: center;
            }
            
            .fallback-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .fallback-stat .stat-number {
                font-size: 2rem;
                font-weight: 700;
                color: var(--primary-color);
            }
            
            .fallback-stat .stat-label {
                font-size: 0.9rem;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
        `;
        document.head.appendChild(style);
    }
}