// BB8 Droid Component for Spline Integration
class BB8Droid {
    constructor(containerId) {
        console.log('[BB8Droid] Constructor called with containerId:', containerId);
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`[BB8Droid] Container with id "${containerId}" not found at constructor.`);
        } else {
            console.log(`[BB8Droid] Container found for id "${containerId}".`);
        }
        this.init();
    }

    init() {
        console.log('[BB8Droid] init() called.');
        if (!this.container) {
            console.error(`[BB8Droid] Container with id "${this.containerId}" not found in init.`);
            return;
        }
        this.createSplineViewer();
    }

    createSplineViewer() {
        console.log('[BB8Droid] createSplineViewer() called.');
        this.container.innerHTML = '';

        // Inject the Spline Viewer script if not already present
        if (!document.querySelector('script[src*="@splinetool/viewer@1.10.16/build/spline-viewer.js"]')) {
            const splineScript = document.createElement('script');
            splineScript.type = 'module';
            splineScript.src = 'https://unpkg.com/@splinetool/viewer@1.10.16/build/spline-viewer.js';
            document.head.appendChild(splineScript);
            console.log('[BB8Droid] Spline Viewer script injected.');
        } else {
            console.log('[BB8Droid] Spline Viewer script already present.');
        }

        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'bb8-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading BB8 Droid...</p>
        `;
        this.container.appendChild(loadingDiv);

        // Create the Spline Viewer element
        const splineViewer = document.createElement('spline-viewer');
        splineViewer.setAttribute('url', 'https://prod.spline.design/cYi9bYRzn0AQIeyt/scene.splinecode');
        splineViewer.style.width = '100%';
        splineViewer.style.height = '100%';
        splineViewer.className = 'bb8-spline-viewer';

        // Handle loading and error events
        splineViewer.addEventListener('load', () => {
            console.log('[BB8Droid] Spline Viewer loaded successfully.');
            loadingDiv.style.display = 'none';
        });
        splineViewer.addEventListener('error', (e) => {
            console.error('[BB8Droid] Failed to load Spline Viewer.', e);
            loadingDiv.innerHTML = `
                <div class="error-icon">⚠️</div>
                <p>Failed to load BB8 Droid</p>
                <button onclick=\"location.reload()\" class=\"retry-btn\">Retry</button>
            `;
        });

        this.container.appendChild(splineViewer);
        console.log('[BB8Droid] Spline Viewer appended to main container.');
    }
}

// Export for use in other files
window.BB8Droid = BB8Droid; 