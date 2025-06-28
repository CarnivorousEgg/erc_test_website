// Home Section Logic
export async function loadHomeSection() {
    const res = await fetch('partials/home.html');
    const html = await res.text();
    document.getElementById('home-section').innerHTML = html;
}

export function initHomeSection() {
    // Add any home section-specific JS here
}
