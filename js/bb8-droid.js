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
        this.createIframeEmbed();
    }

    createIframeEmbed() {
        console.log('[BB8Droid] createIframeEmbed() called.');
        this.container.innerHTML = '';

        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'bb8-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading BB8 Droid...</p>
        `;
        this.container.appendChild(loadingDiv);

        // Create the iFrame for Spline Public URL
        const iframe = document.createElement('iframe');
        iframe.src = 'https://my.spline.design/r4xbot-hcV1POfkhWgpKuNN6lr24b2J/';
        iframe.frameBorder = '0';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.className = 'bb8-spline-iframe';

        iframe.onload = () => {
            console.log('[BB8Droid] iFrame loaded successfully.');
            loadingDiv.style.display = 'none';
        };
        iframe.onerror = (e) => {
            console.error('[BB8Droid] Failed to load iFrame.', e);
            loadingDiv.innerHTML = `
                <div class=\"error-icon\">⚠️</div>
                <p>Failed to load BB8 Droid</p>
                <button onclick=\"location.reload()\" class=\"retry-btn\">Retry</button>
            `;
        };

        this.container.appendChild(iframe);
        console.log('[BB8Droid] iFrame appended to main container.');
    }
}

// Export for use in other files
window.BB8Droid = BB8Droid; 