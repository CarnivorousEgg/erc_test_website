// Tab Management Module
import { createStarBorder } from './StarBorder.js';

export class TabManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupProjectTabs();
        this.setupAboutTabs();
        this.setupProjectSelection();
    }

    setupProjectTabs() {
        let tabButtons = Array.from(document.querySelectorAll('.project-tabs .tab-btn'));
        const projectContents = document.querySelectorAll('.project-content');

        function updateStarBorders() {
            tabButtons.forEach(btn => {
                if (btn.parentElement.classList.contains('star-border-container')) {
                    btn.parentElement.replaceWith(btn);
                }
            });
            // Re-query after DOM changes
            tabButtons = Array.from(document.querySelectorAll('.project-tabs .tab-btn'));
            tabButtons.forEach(btn => {
                if (!btn.classList.contains('active')) {
                    const wrapped = createStarBorder({
                        tag: 'button',
                        className: btn.className,
                        color: 'cyan',
                        speed: '5s',
                        children: btn.innerHTML,
                        type: btn.type || 'button',
                        style: btn.style
                    });
                    btn.replaceWith(wrapped);
                }
            });
            // Re-query again for next event attachment
            tabButtons = Array.from(document.querySelectorAll('.project-tabs .tab-btn'));
        }

        function attachListeners() {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.dataset.tab;
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    projectContents.forEach(content => content.classList.remove('active'));
                    button.classList.add('active');
                    const targetContent = document.querySelector(`.project-content.${targetTab}`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                    window.location.hash = `#projects-${targetTab}`;
                    updateStarBorders();
                    attachListeners();
                });
            });
        }
        updateStarBorders();
        attachListeners();
    }

    setupAboutTabs() {
        let aboutTabButtons = Array.from(document.querySelectorAll('.about-tabs .tab-btn'));
        const aboutContents = document.querySelectorAll('.about-content');

        function updateStarBorders() {
            aboutTabButtons.forEach(btn => {
                if (btn.parentElement.classList.contains('star-border-container')) {
                    btn.parentElement.replaceWith(btn);
                }
            });
            aboutTabButtons = Array.from(document.querySelectorAll('.about-tabs .tab-btn'));
            aboutTabButtons.forEach(btn => {
                if (!btn.classList.contains('active')) {
                    const wrapped = createStarBorder({
                        tag: 'button',
                        className: btn.className,
                        color: 'cyan',
                        speed: '5s',
                        children: btn.innerHTML,
                        type: btn.type || 'button',
                        style: btn.style
                    });
                    btn.replaceWith(wrapped);
                }
            });
            aboutTabButtons = Array.from(document.querySelectorAll('.about-tabs .tab-btn'));
        }

        function attachListeners() {
            aboutTabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.dataset.tab;
                    aboutTabButtons.forEach(btn => btn.classList.remove('active'));
                    aboutContents.forEach(content => content.classList.remove('active'));
                    button.classList.add('active');
                    const targetContent = document.querySelector(`.about-content.${targetTab}`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                    window.location.hash = `#about-${targetTab}`;
                    updateStarBorders();
                    attachListeners();
                });
            });
        }
        updateStarBorders();
        attachListeners();
    }

    setupProjectSelection() {
        const projectCards = document.querySelectorAll('.project-card');
        const projectInfos = document.querySelectorAll('.project-info');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetProject = card.dataset.project;
                
                // Remove active class from all cards and infos
                projectCards.forEach(c => c.classList.remove('active'));
                projectInfos.forEach(info => info.classList.remove('active'));
                
                // Add active class to clicked card
                card.classList.add('active');
                
                // Show corresponding project info
                const targetInfo = document.getElementById(`project-${targetProject}`);
                if (targetInfo) {
                    targetInfo.classList.add('active');
                }
            });
        });
    }
}