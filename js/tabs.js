// Tab Management Module
export class TabManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabs('.project-tabs', '.project-content');
        this.setupTabs('.about-tabs', '.about-content');
        this.setupProjectSelection();
    }

    setupTabs(tabSelector, contentSelector) {
        const tabContainer = document.querySelector(tabSelector);
        if (!tabContainer) return;

        const tabs = tabContainer.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll(contentSelector);

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                tab.classList.add('active');

                const targetContent = document.querySelector(`${contentSelector}.${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    setupProjectSelection() {
        const projectCards = document.querySelectorAll('.project-card');
        const projectInfos = document.querySelectorAll('.project-info');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetProject = card.dataset.project;

                projectCards.forEach(c => c.classList.remove('active'));
                projectInfos.forEach(i => i.classList.remove('active'));

                card.classList.add('active');

                const targetInfo = document.getElementById(targetProject);
                if (targetInfo) {
                    targetInfo.classList.add('active');
                }
            });
        });
    }
}