// Theme Management Module
export class ThemeManager {
    constructor() {
        this.themeToggleNav = document.querySelector('.theme-toggle-nav');
        this.themeToggleMobile = document.querySelector('.theme-toggle-mobile');
        this.themeIcons = document.querySelectorAll('.theme-icon');
        this.themeText = document.querySelector('.theme-text');
        this.body = document.body;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedTheme();
    }

    bindEvents() {
        if (this.themeToggleNav) {
            this.themeToggleNav.addEventListener('click', () => this.toggleTheme());
        }

        if (this.themeToggleMobile) {
            this.themeToggleMobile.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        this.themeIcons.forEach(icon => {
            icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        });

        if (this.themeText) {
            this.themeText.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
        }
    }

    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
    }
}