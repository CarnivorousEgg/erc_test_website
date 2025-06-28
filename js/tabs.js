// Tab Management Module
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
        const tabButtons = document.querySelectorAll('.project-tabs .tab-btn');
        const projectContents = document.querySelectorAll('.project-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                projectContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                button.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.querySelector(`.project-content.${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Update URL hash
                window.location.hash = `#projects-${targetTab}`;
            });
        });
    }

    setupAboutTabs() {
        const aboutTabs = document.querySelectorAll('.about-tabs .tab-btn');
        const aboutContents = document.querySelectorAll('.about-content');

        aboutTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // Remove active class from all tabs and contents
                aboutTabs.forEach(t => t.classList.remove('active'));
                aboutContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.querySelector(`.about-content.${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Update URL hash
                window.location.hash = `#about-${targetTab}`;
            });
        });
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