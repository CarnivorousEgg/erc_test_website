// Project and Member Data
export const projectsData = {
    current: [
        {
            id: 'kutta',
            name: 'Quadruped Robot',
            description: 'This project focuses on applying real-world reinforcement learning and torque-controlled actuation to develop a quadruped robot capable of agile, terrain-adaptive locomotion using advanced sensing and optimized mechanical design.',
            specs: {
                'Navigation Range': '500m autonomous radius',
                'Sensors': 'LiDAR + RGB-D + IMU',
                'Processing': 'NVIDIA Jetson Xavier NX',
                'Contributors': 'Ritwik Sharma, Saransh Agarwal, Sniggdha Semwal, Kshayik Champawat'
            },
            github: 'https://github.com/erc-bpgc/autonomous-rover'
        },
        {
            id: 'swarm',
            name: 'Swarm Drones',
            description: 'Coordinated multi-drone systems for surveillance, mapping, and autonomous delivery with advanced swarm intelligence algorithms.',
            specs: {
                'Swarm Size': 'Up to 10 coordinated units',
                'Flight Time': '45+ minutes per unit',
                'Communication': 'Mesh network topology',
                'Contributors': 'Indrajit Mandal, Omakar Shrikanth'
            },
            github: 'https://github.com/erc-bpgc/swarm-drones'
        },
        {
            id: 'saap',
            name: 'Snakebot',
            description: 'A modular snake robot with innovative Virtual Rolling Sphere Joint mechanism for versatile locomotion in confined spaces.',
            specs: {
                'Number of Modules': '6+',
                'Unique Mechanism': 'Virtual Rolling Sphere Joint',
                'Control System': 'Distributed processing',
                'Contributors': 'Dev Thacker, Nilesh Bhatia, Harsh Jain, Hritik Joglekar'
            },
            github: 'https://github.com/ERC-BPGC/SnakeBot'
        },
        {
            id: 'arm',
            name: 'Robotic Arm',
            description: 'This project aims to develop a multi-DOF robotic arm that emulates industrial automation for executing tasks requiring high precision and repeatability.',
            specs: {
                'DOF': '6',
                'Payload': '2kg maximum',
                'Precision': '±0.1mm repeatability',
                'Contributors': 'Sudhanshu Kulkarni, Ayush Gupta'
            },
            github: 'https://github.com/ERC-BPGC/RoboticArm'
        },
        {
            id: 'vulcan',
            name: 'Project Vulcan',
            description: 'The aim of project vulcan is to recreate a humanoid robot with capabilities to interact with both people and objects, and to act in response to its environment.',
            specs: {
                'Height': '1.2m',
                'Sensors': 'Computer Vision + Audio',
                'Interaction': 'Voice + Gesture Recognition',
                'Contributors': 'Aryan Goyal, Kevin Matthews, Parth Shah, Vimarsh Shah, Sharvil Potdar, Indrajit Mandal'
            },
            github: 'https://github.com/ERC-BPGC/project-vulcan'
        },
        {
            id: 'drone',
            name: 'Drone Automation',
            description: 'Advanced autonomous drone system with GPS-less navigation using computer vision and SLAM algorithms for indoor and GPS-denied environments.',
            specs: {
                'Navigation': 'Visual SLAM',
                'Flight Time': '30+ minutes',
                'Payload': '500g',
                'Contributors': 'Parth Shah, Yash Mote, Parth Jaju, Nathan Sequira'
            },
            github: 'https://github.com/erc-bpgc/drone-automation'
        },
        {
            id: 'embedded',
            name: 'RISC-V Processor',
            description: 'Custom RISC-V processor implementation with advanced features for embedded systems and IoT applications.',
            specs: {
                'Architecture': 'RISC-V 32-bit',
                'Pipeline': '5-stage',
                'Features': 'Custom ISA extensions',
                'Contributors': 'Yash Kamath, Soumaditya, Dev Thacker'
            },
            github: 'https://github.com/erc-bpgc/risc-v-processor'
        }
    ],
    completed: [
        {
            name: 'Line Following Robot',
            description: 'Award-winning autonomous navigation system',
            github: 'https://github.com/erc-bpgc/line-follower',
            icon: '🏆'
        },
        {
            name: 'Maze Solver Bot',
            description: 'Autonomous maze navigation using flood-fill algorithm',
            github: 'https://github.com/erc-bpgc/maze-solver',
            icon: '🧩'
        },
        {
            name: 'Gesture Controlled Car',
            description: 'Hand gesture recognition for vehicle control',
            github: 'https://github.com/erc-bpgc/gesture-car',
            icon: '👋'
        },
        {
            name: 'Voice Assistant Robot',
            description: 'AI-powered conversational robot',
            github: 'https://github.com/erc-bpgc/voice-assistant',
            icon: '🎤'
        }
    ],
    mini: [
        {
            name: 'Arduino LED Matrix',
            description: 'Programmable display system with animations',
            github: 'https://github.com/erc-bpgc/led-matrix',
            icon: '💡'
        },
        {
            name: 'IoT Weather Station',
            description: 'Real-time environmental monitoring',
            github: 'https://github.com/erc-bpgc/weather-station',
            icon: '🌤️'
        },
        {
            name: 'Bluetooth Controlled Bot',
            description: 'Smartphone-controlled robot',
            github: 'https://github.com/erc-bpgc/bluetooth-bot',
            icon: '📱'
        },
        {
            name: 'Smart Home Automation',
            description: 'IoT-based home control system',
            github: 'https://github.com/erc-bpgc/smart-home',
            icon: '🏠'
        }
    ]
};

export const membersData = {
    current: [
        {
            name: 'Arjun Menon',
            role: 'President',
            avatar: '👨‍💻',
            description: 'Leading innovation in robotics and AI research'
        },
        {
            name: 'Priya Sharma',
            role: 'Vice President',
            avatar: '👩‍🔬',
            description: 'Coordinating technical projects and mentorship'
        },
        {
            name: 'Rahul Kumar',
            role: 'Technical Head',
            avatar: '👨‍🎓',
            description: 'Overseeing hardware and software development'
        },
        {
            name: 'Sneha Patel',
            role: 'Research Head',
            avatar: '👩‍💼',
            description: 'Advancing cutting-edge research initiatives'
        },
        {
            name: 'Vikram Singh',
            role: 'Project Manager',
            avatar: '👨‍🏭',
            description: 'Managing project timelines and deliverables'
        },
        {
            name: 'Ananya Reddy',
            role: 'Outreach Coordinator',
            avatar: '👩‍🎨',
            description: 'Building community partnerships and events'
        }
    ]
};