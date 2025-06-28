export const outreachSection = `
<section id="outreach" class="outreach-section">
    <div class="container">
        <div class="section-header-left">
            <h2 class="section-title">Outreach & Impact</h2>
        </div>
        <div class="outreach-grid">
            <div class="outreach-card">
                <div class="outreach-icon">🏫</div>
                <h3>School Workshops</h3>
                <p>Inspiring the next generation through hands-on robotics workshops in local schools</p>
            </div>
            <div class="outreach-card">
                <div class="outreach-icon">🏆</div>
                <h3>Competition Mentoring</h3>
                <p>Guiding teams to victory in national robotics competitions and hackathons</p>
            </div>
            <div class="outreach-card">
                <div class="outreach-icon">🌐</div>
                <h3>Open Source</h3>
                <p>Contributing to the global tech community through open source projects</p>
            </div>
        </div>
    </div>
</section>
`;

// Outreach Section Logic
export async function loadOutreachSection() {
    const res = await fetch('partials/outreach.html');
    const html = await res.text();
    document.getElementById('outreach-section').innerHTML = html;
}

export function initOutreachSection() {
    // Add any outreach section-specific JS here
}
