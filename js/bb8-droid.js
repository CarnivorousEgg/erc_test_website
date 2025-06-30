// BB8 Droid Component for Spline Integration
class BB8Droid {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        if (!this.container) {
            console.error(`Container with id "${this.containerId}" not found`);
            return;
        }

        // Create the Spline iframe container
        this.createSplineContainer();
    }

    createSplineContainer() {
        // Clear existing content
        this.container.innerHTML = '';
        
        // Create the main container
        const splineContainer = document.createElement('div');
        splineContainer.className = 'bb8-spline-container';
        
        // Create the iframe for Spline with the provided scene URL
        const splineIframe = document.createElement('iframe');
        splineIframe.src = 'https://prod.spline.design/cYi9bYRzn0AQIeyt/scene.splinecode';
        splineIframe.className = 'bb8-spline-iframe';
        splineIframe.setAttribute('frameborder', '0');
        splineIframe.setAttribute('width', '100%');
        splineIframe.setAttribute('height', '100%');
        splineIframe.setAttribute('allow', 'autoplay; fullscreen; camera; microphone; geolocation; gyroscope; accelerometer; magnetometer');
        
        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'bb8-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading BB8 Droid...</p>
        `;
        
        splineContainer.appendChild(loadingDiv);
        splineContainer.appendChild(splineIframe);
        
        // Hide loading when iframe loads
        splineIframe.onload = () => {
            loadingDiv.style.display = 'none';
        };
        
        // Handle iframe load errors
        splineIframe.onerror = () => {
            loadingDiv.innerHTML = `
                <div class="error-icon">⚠️</div>
                <p>Failed to load BB8 Droid</p>
                <button onclick="location.reload()" class="retry-btn">Retry</button>
            `;
        };
        
        this.container.appendChild(splineContainer);
    }
}

// Export for use in other files
window.BB8Droid = BB8Droid; 