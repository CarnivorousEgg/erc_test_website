// Social Feed Module
export class SocialFeedManager {
    constructor() {
        this.feedContainer = document.querySelector('.feed-container');
        this.samplePosts = [
            {
                platform: 'instagram',
                icon: '📷',
                content: '🤖 Our autonomous rover just completed its first successful navigation test! #Robotics #Innovation',
                time: '2 hours ago'
            },
            {
                platform: 'linkedin',
                icon: '💼',
                content: 'Excited to announce our collaboration with industry partners for the next generation of IoT solutions.',
                time: '5 hours ago'
            },
            {
                platform: 'instagram',
                icon: '📷',
                content: '🚀 Just launched our new drone swarm project! Amazing teamwork from our members. #Innovation #Drones',
                time: '1 day ago'
            },
            {
                platform: 'linkedin',
                icon: '💼',
                content: 'Proud to announce our collaboration with leading tech companies for internship opportunities.',
                time: '2 days ago'
            },
            {
                platform: 'instagram',
                icon: '📷',
                content: '⚡ Working late nights on the bionic arm project. The future is here! #Robotics #Engineering',
                time: '3 days ago'
            }
        ];
        
        this.init();
    }

    init() {
        if (!this.feedContainer) return;
        
        this.loadInitialPosts();
        this.startAutoRefresh();
    }

    loadInitialPosts() {
        this.samplePosts.forEach((post, index) => {
            setTimeout(() => {
                this.addPost(post, false);
            }, index * 200);
        });
    }

    addPost(post, animate = true) {
        const newPost = document.createElement('div');
        newPost.className = `feed-post ${post.platform}-post`;
        
        if (animate) {
            newPost.style.opacity = '0';
            newPost.style.transform = 'translateY(-20px)';
        }
        
        newPost.innerHTML = `
            <div class="post-header">
                <span class="platform-icon">${post.icon}</span>
                <span class="platform-name">${post.platform === 'instagram' ? 'Instagram' : 'LinkedIn'}</span>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
            </div>
            <div class="post-meta">${post.time}</div>
        `;

        this.feedContainer.insertBefore(newPost, this.feedContainer.firstChild);
        
        if (animate) {
            setTimeout(() => {
                newPost.style.transition = 'all 0.5s ease';
                newPost.style.opacity = '1';
                newPost.style.transform = 'translateY(0)';
            }, 100);
        }

        this.limitPosts();
    }

    limitPosts() {
        const posts = this.feedContainer.querySelectorAll('.feed-post');
        if (posts.length > 5) {
            const oldestPost = posts[posts.length - 1];
            oldestPost.style.transition = 'all 0.5s ease';
            oldestPost.style.opacity = '0';
            oldestPost.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (oldestPost.parentNode) {
                    oldestPost.parentNode.removeChild(oldestPost);
                }
            }, 500);
        }
    }

    startAutoRefresh() {
        setInterval(() => {
            const randomPost = this.samplePosts[Math.floor(Math.random() * this.samplePosts.length)];
            this.addPost({
                ...randomPost,
                time: 'Just now'
            });
        }, 30000);
    }
}