export const projectsSection = `
<section id="projects" class="projects-section">
    <div class="container">
        <div class="section-header-left">
            <h2 class="section-title">Our Projects</h2>
            <div class="project-tabs">
                <button class="tab-btn active" data-tab="current">Current</button>
                <button class="tab-btn" data-tab="completed">Completed</button>
                <button class="tab-btn" data-tab="mini">Mini Projects</button>
            </div>
        </div>
        <!-- Current Projects -->
        <div class="project-content current active">
            <div class="current-projects-layout">
                <div class="project-sidebar">
                    <div class="project-card active" data-project="kutta">
                        <h3>Quadruped Robot</h3>
                        <p>Advanced four-legged robot</p>
                    </div>
                    <div class="project-card" data-project="swarm">
                        <h3>Swarm Drones</h3>
                        <p>Coordinated UAV systems</p>
                    </div>
                    <div class="project-card" data-project="saap">
                        <h3>Snakebot</h3>
                        <p>Modular Snake Robot</p>
                    </div>
                    <div class="project-card" data-project="arm">
                        <h3>Robotic Arm</h3>
                        <p>6DOF Robotic Arm</p>
                    </div>
                    <div class="project-card" data-project="vulcan">
                        <h3>Project Vulcan</h3>
                        <p>Humanoid Robot</p>
                    </div>
                    <div class="project-card" data-project="drone">
                        <h3>Drone Automation</h3>
                        <p>GPS-less Navigation</p>
                    </div>
                    <div class="project-card" data-project="embedded">
                        <h3>RISC-V Processor</h3>
                        <p>Custom processor design</p>
                    </div>
                </div>
                <div class="project-display">
                    <div class="project-info active" id="project-kutta">
                        <h3>Quadruped Robot</h3>
                        <p class="project-description">This project focuses on applying real-world reinforcement learning and torque-controlled actuation to develop a quadruped robot capable of agile, terrain-adaptive locomotion using advanced sensing and optimized mechanical design.</p>
                        <div class="project-specs">
                            <div class="spec">
                                <strong>Navigation Range</strong>
                                <span>500m autonomous radius</span>
                            </div>
                            <div class="spec">
                                <strong>Sensors</strong>
                                <span>LiDAR + RGB-D + IMU</span>
                            </div>
                            <div class="spec">
                                <strong>Processing</strong>
                                <span>NVIDIA Jetson Xavier NX</span>
                            </div>
                            <div class="spec">
                                <strong>Contributors</strong>
                                <span>Ritwik Sharma, Saransh Agarwal, Sniggdha Semwal, Kshayik Champawat</span>
                            </div>
                        </div>
                        <button class="github-btn" onclick="window.open('https://github.com/erc-bpgc/autonomous-rover', '_blank')">
                            <span>VIEW GITHUB REPOSITORY</span>
                            <div class="btn-icon">→</div>
                        </button>
                    </div>
                    <div class="project-info" id="project-swarm">
                        <h3>Swarm Drones</h3>
                        <p class="project-description">Coordinated multi-drone systems for surveillance, mapping, and autonomous delivery with advanced swarm intelligence algorithms.</p>
                        <div class="project-specs">
                            <div class="spec">
                                <strong>Swarm Size</strong>
                                <span>Up to 10 coordinated units</span>
                            </div>
                            <div class="spec">
                                <strong>Flight Time</strong>
                                <span>45+ minutes per unit</span>
                            </div>
                            <div class="spec">
                                <strong>Communication</strong>
                                <span>Mesh network topology</span>
                            </div>
                            <div class="spec">
                                <strong>Contributors</strong>
                                <span>Indrajit Mandal, Omakar Shrikanth</span>
                            </div>
                        </div>
                        <button class="github-btn" onclick="window.open('https://github.com/erc-bpgc/swarm-drones', '_blank')">
                            <span>VIEW GITHUB REPOSITORY</span>
                            <div class="btn-icon">→</div>
                        </button>
                    </div>
                    <div class="project-info" id="project-saap">
                        <h3>Snakebot</h3>
                        <p class="project-description">A modular snake robot with innovative Virtual Rolling Sphere Joint mechanism for versatile locomotion in confined spaces.</p>
                        <div class="project-specs">
                            <div class="spec">
                                <strong>Number of Modules</strong>
                                <span>6+</span>
                            </div>
                            <div class="spec">
                                <strong>Unique Mechanism</strong>
                                <span>Virtual Rolling Sphere Joint</span>
                            </div>
                            <div class="spec">
                                <strong>Control System</strong>
                                <span>Distributed processing</span>
                            </div>
                            <div class="spec">
                                <strong>Contributors</strong>
                                <span>Dev Thacker, Nilesh Bhatia, Harsh Jain, Hritik Joglekar</span>
                            </div>
                        </div>
                        <button class="github-btn" onclick="window.open('https://github.com/ERC-BPGC/SnakeBot', '_blank')">
                            <span>VIEW GITHUB REPOSITORY</span>
                            <div class="btn-icon">→</div>
                        </button>
                    </div>
                    <div class="project-info" id="project-arm">
                        <h3>Robotic Arm</h3>
                        <p class="project-description">This project aims to develop a multi-DOF robotic arm that emulates industrial automation for executing tasks requiring high precision and repeatability.</p>
                        <div class="project-specs">
                            <div class="spec">
                                <strong>DOF</strong>
                                <span>6</span>
                            </div>
                            <div class="spec">
                                <strong>Payload</strong>
                                <span>2kg maximum</span>
                            </div>
                            <div class="spec">
                                <strong>Precision</strong>
                                <span>±0.1mm repeatability</span>
                            </div>
                            <div class="spec">
                                <strong>Contributors</strong>
                                <span>Sudhanshu Kulkarni, Ayush Gupta</span>
                            </div>
                        </div>
                        <button class="github-btn" onclick="window.open('https://github.com/ERC-BPGC/RoboticArm', '_blank')">
                            <span>VIEW GITHUB REPOSITORY</span>
                            <div class="btn-icon">→</div>
                        </button>
                    </div>
                    <div class="project-info" id="project-vulcan">
                        <h3>Project Vulcan</h3>
                        <p class="project-description">The aim of project vulcan is to recreate a humanoid robot with capabilities to interact with both people and objects, and to act in response to its environment.</p>
                        <div class="project-specs">
                            <div class="spec">
                                <strong>Height</strong>
                                <span>1.2m</span>
                            </div>
                            <div class="spec">
                                <strong>Sensors</strong>
                                <span>Computer Vision + Audio</span>
                            </div>
                            <div class="spec">
                                <strong>Interaction</strong>
                                <span>Voice + Gesture Recognition</span>
                            </div>
                            <div class="spec">
                                <strong>Contributors</strong>
                                <span>Aryan Goyal, Kevin Matthews, Parth Shah, Vimarsh Shah, Sharvil Potdar, Indrajit Mandal</span>
                            </div>
                        </div>
                        <button class="github-btn" onclick="window.open('https://github.com/ERC-BPGC/project-vulcan', '_blank')">
                            <span>VIEW GITHUB REPOSITORY</span>
                            <div class="btn-icon">→</div>
                        </button>
                    </div>
                    <div class="project-info" id="project-drone">
                        <h3>Drone Automation</h3>
                        <p class="project-description">Advanced autonomous drone system with GPS-less navigation using computer vision and SLAM algorithms for indoor and GPS-denied environments.</p>
                        <div class="project-specs">
                            <div class="spec">
                                <strong>Navigation</strong>
                                <span>Visual SLAM</span>
                            </div>
                            <div class="spec">
                                <strong>Flight Time</strong>
                                <span>30+ minutes</span>
                            </div>
                            <div class="spec">
                                <strong>Payload</strong>
                                <span>500g</span>
                            </div>
                            <div class="spec">
                                <strong>Contributors</strong>
                                <span>Parth Shah, Yash Mote, Parth Jaju, Nathan Sequira</span>
                            </div>
                        </div>
                        <button class="github-btn" onclick="window.open('https://github.com/erc-bpgc/drone-automation', '_blank')">
                            <span>VIEW GITHUB REPOSITORY</span>
                            <div class="btn-icon">→</div>
                        </button>
                    </div>
                    <div class="project-info" id="project-embedded">
                        <h3>RISC-V Processor</h3>
                        <p class="project-description">Custom RISC-V processor implementation with advanced features for embedded systems and IoT applications.</p>
                        <div class="project-specs">
                            <div class="spec">
                                <strong>Architecture</strong>
                                <span>RISC-V 32-bit</span>
                            </div>
                            <div class="spec">
                                <strong>Pipeline</strong>
                                <span>5-stage</span>
                            </div>
                            <div class="spec">
                                <strong>Features</strong>
                                <span>Custom ISA extensions</span>
                            </div>
                            <div class="spec">
                                <strong>Contributors</strong>
                                <span>Yash Kamath, Soumaditya, Dev Thacker</span>
                            </div>
                        </div>
                        <button class="github-btn" onclick="window.open('https://github.com/erc-bpgc/risc-v-processor', '_blank')">
                            <span>VIEW GITHUB REPOSITORY</span>
                            <div class="btn-icon">→</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Completed Projects -->
        <div class="project-content completed">
            <div class="archive-grid">
                <!-- Content will be populated by JavaScript -->
            </div>
        </div>
        <!-- Mini Projects -->
        <div class="project-content mini">
            <div class="archive-grid">
                <!-- Content will be populated by JavaScript -->
            </div>
        </div>
    </div>
</section>

<script>
    // Projects Section Logic
    export async function loadProjectsSection() {
        const res = await fetch('partials/projects.html');
        const html = await res.text();
        document.getElementById('projects-section').innerHTML = html;
    }

    export function initProjectsSection() {
        // Tab switching for project categories
        const tabBtns = document.querySelectorAll('.project-tabs .tab-btn');
        const projectContents = document.querySelectorAll('.project-content');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tab = btn.dataset.tab;
                projectContents.forEach(pc => {
                    pc.classList.toggle('active', pc.classList.contains(tab));
                });
            });
        });

        // Sidebar project card switching
        const sidebarCards = document.querySelectorAll('.project-sidebar .project-card');
        const projectInfos = document.querySelectorAll('.project-display .project-info');
        sidebarCards.forEach(card => {
            card.addEventListener('click', function() {
                sidebarCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                const project = card.dataset.project;
                projectInfos.forEach(info => {
                    info.classList.toggle('active', info.id === 'project-' + project);
                });
            });
        });
    }
</script>
`;
