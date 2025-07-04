(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();class f{constructor(){this.themeToggleNav=document.querySelector(".theme-toggle-nav"),this.themeToggleMobile=document.querySelector(".theme-toggle-mobile"),this.themeIcons=document.querySelectorAll(".theme-icon"),this.themeText=document.querySelector(".theme-text"),this.body=document.body,this.init()}init(){this.bindEvents(),this.loadSavedTheme()}bindEvents(){this.themeToggleNav&&this.themeToggleNav.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),this.toggleTheme()}),this.themeToggleMobile&&this.themeToggleMobile.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),this.toggleTheme()})}setTheme(a){console.log(`🎨 Setting theme to: ${a}`),this.body.setAttribute("data-theme",a),localStorage.setItem("theme",a),this.themeIcons.forEach(t=>{t.textContent=a==="dark"?"🌙":"☀️"}),this.themeText&&(this.themeText.textContent=a==="dark"?"Dark Mode":"Light Mode"),window.dispatchEvent(new CustomEvent("themeChanged",{detail:{theme:a}})),console.log(`✅ Theme changed to: ${a}`)}toggleTheme(){const a=this.body.getAttribute("data-theme")||"dark",t=a==="dark"?"light":"dark";console.log(`🔄 Toggling theme from ${a} to ${t}`),this.setTheme(t)}loadSavedTheme(){const a=localStorage.getItem("theme")||"dark";this.setTheme(a)}}class v{constructor(){this.hamburger=document.querySelector(".hamburger"),this.mobileMenu=document.querySelector(".mobile-menu-overlay"),this.navLinks=document.querySelectorAll(".nav-link, .mobile-menu-list a"),this.dropdownLinks=document.querySelectorAll(".dropdown-content a"),this.init()}init(){this.bindEvents(),this.setupSmoothScrolling(),this.setupDropdownScrolling()}bindEvents(){this.hamburger&&this.hamburger.addEventListener("click",()=>{this.toggleMobileMenu()}),this.mobileMenu&&this.mobileMenu.addEventListener("click",a=>{a.target===this.mobileMenu&&this.closeMobileMenu()}),this.navLinks.forEach(a=>{a.addEventListener("click",()=>{this.closeMobileMenu()})})}toggleMobileMenu(){this.mobileMenu.classList.toggle("active"),this.hamburger.classList.toggle("active"),document.body.classList.toggle("menu-open")}closeMobileMenu(){this.mobileMenu.classList.remove("active"),this.hamburger.classList.remove("active"),document.body.classList.remove("menu-open")}setupSmoothScrolling(){this.navLinks.forEach(a=>{a.addEventListener("click",t=>{const e=a.getAttribute("href");if(e.startsWith("#")){t.preventDefault();const n=document.querySelector(e);n&&(n.scrollIntoView({behavior:"smooth",block:"start"}),window.history.pushState(null,null,e))}})})}setupDropdownScrolling(){this.dropdownLinks.forEach(a=>{a.addEventListener("click",t=>{const e=a.getAttribute("href");if(e&&e.startsWith("#"))if(t.preventDefault(),e.startsWith("#about-")){const n=e.replace("#about-","");this.navigateToAboutTab(n)}else if(e.includes("projects")){let n="current";e.includes("completed")&&(n="completed"),e.includes("mini")&&(n="mini"),this.navigateToProjectTab(n)}else{const n=document.querySelector(e);n&&(n.scrollIntoView({behavior:"smooth",block:"start"}),window.history.pushState(null,null,e))}})})}navigateToAboutTab(a){const t=document.querySelector("#about");t&&(t.scrollIntoView({behavior:"smooth",block:"start"}),window.history.pushState(null,null,`#about-${a}`),setTimeout(()=>{document.querySelectorAll(".about-tabs .tab-btn").forEach(e=>{e.classList.toggle("active",e.dataset.tab===a)}),document.querySelectorAll(".about-content").forEach(e=>{e.classList.toggle("active",e.classList.contains(a))})},500))}navigateToProjectTab(a){const t=document.querySelector("#projects");t&&(t.scrollIntoView({behavior:"smooth",block:"start"}),window.history.pushState(null,null,`#projects-${a}`),setTimeout(()=>{document.querySelectorAll(".project-tabs .tab-btn").forEach(e=>{e.classList.toggle("active",e.dataset.tab===a)}),document.querySelectorAll(".project-content").forEach(e=>{e.classList.toggle("active",e.classList.contains(a))})},500))}}class S{constructor(){this.init()}init(){this.setupProjectTabs(),this.setupAboutTabs(),this.setupProjectSelection()}setupProjectTabs(){const a=document.querySelectorAll(".project-tabs .tab-btn"),t=document.querySelectorAll(".project-content");a.forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.tab;a.forEach(o=>o.classList.remove("active")),t.forEach(o=>o.classList.remove("active")),e.classList.add("active");const i=document.querySelector(`.project-content.${n}`);i&&i.classList.add("active"),window.history.pushState(null,null,`#projects-${n}`)})})}setupAboutTabs(){const a=document.querySelectorAll(".about-tabs .tab-btn"),t=document.querySelectorAll(".about-content");a.forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.tab;a.forEach(o=>o.classList.remove("active")),t.forEach(o=>o.classList.remove("active")),e.classList.add("active");const i=document.querySelector(`.about-content.${n}`);i&&i.classList.add("active"),window.history.pushState(null,null,`#about-${n}`)})})}setupProjectSelection(){const a=document.querySelectorAll(".project-card"),t=document.querySelectorAll(".project-info");a.forEach(e=>{e.addEventListener("click",n=>{if(n.preventDefault(),window.innerWidth<=1024){const o=e.dataset.github;o&&window.open(o,"_blank")}else{const o=e.dataset.project;a.forEach(s=>s.classList.remove("active")),t.forEach(s=>s.classList.remove("active")),e.classList.add("active");const r=document.getElementById(`project-${o}`);r&&r.classList.add("active")}})})}}class M{constructor(){this.init()}init(){this.setupScrollAnimations(),this.setupIntersectionObserver(),this.setupCounterAnimations()}setupScrollAnimations(){window.scrollToReveal=()=>{const a=document.querySelector(".logo-reveal-section");a&&a.scrollIntoView({behavior:"smooth",block:"start"})}}setupIntersectionObserver(){const a={threshold:.1,rootMargin:"0px 0px -50px 0px"},t=new IntersectionObserver(e=>{e.forEach(n=>{n.isIntersecting&&n.target.classList.add("animate-in")})},a);document.querySelectorAll(".project-card, .about-tab, .value-card, .outreach-card").forEach(e=>{t.observe(e)})}setupCounterAnimations(){const a=document.querySelectorAll(".stat-number[data-count]"),t=new IntersectionObserver(e=>{e.forEach(n=>{if(n.isIntersecting){const i=n.target,o=parseInt(i.dataset.count);this.animateCounter(i,0,o,2e3)}})},{threshold:.5,rootMargin:"0px 0px -50px 0px"});a.forEach(e=>{t.observe(e)})}animateCounter(a,t,e,n){const i=performance.now(),o=e-t,r=s=>{const c=s-i,d=Math.min(c/n,1),m=1-Math.pow(1-d,4),b=Math.floor(t+o*m);a.textContent=b.toLocaleString(),d<1&&requestAnimationFrame(r)};requestAnimationFrame(r)}}const k={completed:[{name:"Autonomous Rover",description:"GPS-guided exploration robot",icon:"🤖",github:"https://github.com/erc-bpgc/autonomous-rover"},{name:"Smart Home System",description:"IoT-based home automation",icon:"🏠",github:"https://github.com/erc-bpgc/smart-home"},{name:"Gesture Controller",description:"Hand gesture recognition system",icon:"👋",github:"https://github.com/erc-bpgc/gesture-controller"}],mini:[{name:"LED Cube",description:"3D LED display matrix",icon:"🔲",github:"https://github.com/erc-bpgc/led-cube"},{name:"Weather Station",description:"Environmental monitoring system",icon:"🌤️",github:"https://github.com/erc-bpgc/weather-station"},{name:"Music Visualizer",description:"Audio-reactive LED display",icon:"🎵",github:"https://github.com/erc-bpgc/music-visualizer"}]},A={current:[{name:"Saransh Agrawal",role:"Chief Coordinator",description:"Leading innovation in robotics",avatar:"👨‍💻"},{name:"Aryan Goyal",role:"Sub Coordinator",description:"Driving technical excellence",avatar:"👨‍🔬"},{name:"Nilesh Bhatia",role:"Sub Coordinator",description:"Coordinating club activities",avatar:"👩‍💼"},{name:"Parth Jaju",role:"Treasurer",description:"Managing finances and resources",avatar:"💰"},{name:"Kevin Matthews",role:"Research Head",description:"Leading research initiatives",avatar:"🔬"},{name:"Dev Thacker",role:"Electronics Head",description:"Electronics and hardware expert",avatar:"⚡"}]};class C{constructor(){this.init(),this.setupHashNavigation()}async init(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>this.initializeModules()):this.initializeModules()}async initializeModules(){try{console.log("🚀 Initializing ERC Website..."),this.themeManager=new f,console.log("✅ Theme manager initialized"),this.navigationManager=new v,console.log("✅ Navigation manager initialized"),this.tabManager=new S,console.log("✅ Tab manager initialized"),this.animationManager=new M,console.log("✅ Animation manager initialized"),this.updateProjectsContent(),console.log("✅ Projects content updated"),this.updateMembersContent(),console.log("✅ Members content updated"),this.setupPerformanceOptimizations(),console.log("✅ Performance optimizations setup"),console.log("🤖 ERC Website loaded successfully!"),console.log("🎨 Theme system active"),console.log("📱 Responsive design ready"),console.log("✨ All animations initialized")}catch(a){console.error("❌ Error initializing website:",a)}}updateProjectsContent(){const a=document.querySelector(".project-content.completed .archive-grid");a&&(a.innerHTML=k.completed.map(e=>`
                <a href="${e.github}" target="_blank" class="archive-card">
                    <div class="archive-image">
                        <div class="archive-placeholder">${e.icon}</div>
                    </div>
                    <h4>${e.name}</h4>
                    <p>${e.description}</p>
                </a>
            `).join(""));const t=document.querySelector(".project-content.mini .archive-grid");t&&(t.innerHTML=k.mini.map(e=>`
                <a href="${e.github}" target="_blank" class="archive-card">
                    <div class="archive-image">
                        <div class="archive-placeholder">${e.icon}</div>
                    </div>
                    <h4>${e.name}</h4>
                    <p>${e.description}</p>
                </a>
            `).join(""))}updateMembersContent(){const a=document.querySelector(".team-grid");a&&(a.innerHTML=A.current.map(t=>`
                <div class="team-member">
                    <div class="member-avatar">${t.avatar}</div>
                    <h4>${t.name}</h4>
                    <p class="member-role">${t.role}</p>
                    <div class="member-links">
                        <a href="#" class="linkedin-link" target="_blank">LinkedIn</a>
                    </div>
                </div>
            `).join(""))}setupPerformanceOptimizations(){let a=!1;const t=()=>{a=!1};window.addEventListener("scroll",()=>{a||(requestAnimationFrame(t),a=!0)},{passive:!0}),this.preloadCriticalResources()}preloadCriticalResources(){const a=document.createElement("link");a.rel="preload",a.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap",a.as="style",document.head.appendChild(a)}setupHashNavigation(){const a=()=>{const t=window.location.hash;if(t==="#about"||t.startsWith("#about-")){document.getElementById("about").scrollIntoView({behavior:"smooth",block:"start"});const e=t.replace("#about-","")||"our-story";document.querySelectorAll(".about-tabs .tab-btn").forEach(n=>{n.classList.toggle("active",n.dataset.tab===e)}),document.querySelectorAll(".about-content").forEach(n=>{n.classList.toggle("active",n.classList.contains(e))})}else if(t==="#projects"||t.startsWith("#projects")){document.getElementById("projects").scrollIntoView({behavior:"smooth",block:"start"});const e=t.replace("#projects-","")||"current";document.querySelectorAll(".project-tabs .tab-btn").forEach(n=>{n.classList.toggle("active",n.dataset.tab===e)}),document.querySelectorAll(".project-content").forEach(n=>{n.classList.toggle("active",n.classList.contains(e))})}else if(t){const e=document.querySelector(t);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}};window.addEventListener("hashchange",a),a()}}window.debounce=function(l,a){let t;return function(...n){const i=()=>{clearTimeout(t),l(...n)};clearTimeout(t),t=setTimeout(i,a)}};if(!("scrollBehavior"in document.documentElement.style)){const l=document.createElement("script");l.src="https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js",document.head.appendChild(l)}new C;window.addEventListener("DOMContentLoaded",()=>{document.getElementById("alumni-map")&&(window.AlumniMap?new window.AlumniMap:typeof AlumniMap<"u"&&new AlumniMap)});window.alumniData=[{name:"Abhimanyu Singh",role:"Chief Coordinator 2017-2018",company:"Carnegie Mellon University",position:"Research Assistant",location:"Pittsburgh, PA, USA",coordinates:{lat:40.4406,lng:-79.9959},linkedin:"https://www.linkedin.com/in/abhimanyu-singh-21b017105",batch:"2017"},{name:"Shubham Chavan",role:"Sub Coordinator 2017-2018",company:"Neocis",position:"System Engineer",location:"Miami, FL, USA",coordinates:{lat:25.7617,lng:-80.1918},linkedin:"https://www.linkedin.com/in/svc97/",batch:"2017"},{name:"Abhishek Moitra",role:"Teaching Head 2017-2018",company:"SRC",position:"Research Scholar",location:"Bangalore, Karnataka, India",coordinates:{lat:12.9716,lng:77.5946},linkedin:"https://www.linkedin.com/in/abhishek-moitra-52696798/",batch:"2017"},{name:"Rohan Godiyal",role:"Research Head 2017-2018",company:"IST Lisbon",position:"Undergraduate Research Intern",location:"Lisbon, Portugal",coordinates:{lat:38.7223,lng:-9.1393},linkedin:"https://rohangodiyal.wixsite.com/rohan-godiyal",batch:"2017"},{name:"Nikhil Khedekar",role:"Member",company:"University of Nevada, Reno",position:"PhD Student",location:"Reno, NV, USA",coordinates:{lat:39.5296,lng:-119.8138},linkedin:"https://www.linkedin.com/in/nkhedekar/",batch:"2017"},{name:"Utkarsh Sarawgi",role:"Member",company:"Apple",position:"AI/ML Rotational Engineer",location:"Cupertino, CA, USA",coordinates:{lat:37.323,lng:-122.0322},linkedin:"https://www.linkedin.com/in/utkarshsarawgi",batch:"2017"},{name:"Shubham Kumar",role:"Member",company:"UC San Diego",position:"Grad Student",location:"San Diego, CA, USA",coordinates:{lat:32.7157,lng:-117.1611},linkedin:"https://www.linkedin.com/in/shubham-kumar-1410",batch:"2017"},{name:"Anand Dugad",role:"Chief Coordinator 2016-2017",company:"Western Digital",position:"Senior Datapath Design Engineer",location:"San Jose, CA, USA",coordinates:{lat:37.3382,lng:-121.8863},linkedin:"https://www.linkedin.com/in/anand-dugad",batch:"2016"},{name:"Harsh Mavani",role:"Sub Coordinator 2016-2017",company:"Flipkart",position:"Software Developer Engineer",location:"Bangalore, Karnataka, India",coordinates:{lat:12.9716,lng:77.5946},linkedin:"https://www.linkedin.com/in/harsh-mavani-518732b5",batch:"2016"},{name:"Sanjeev Murthy",role:"Teaching Head 2016-2017",company:"Apple",position:"FPGA Engineer",location:"Cupertino, CA, USA",coordinates:{lat:37.323,lng:-122.0322},linkedin:"https://www.linkedin.com/in/sanjeev-murthy",batch:"2016"},{name:"Shubhan Patni",role:"Member",company:"CTU Prague",position:"PhD Student",location:"Prague, Czech Republic",coordinates:{lat:50.0755,lng:14.4378},linkedin:"https://in.linkedin.com/in/shubhan-patni-45b91010b",batch:"2016"},{name:"Tejas Zodage",role:"Member",company:"Carnegie Mellon University",position:"Masters in Robotics",location:"Pittsburgh, PA, USA",coordinates:{lat:40.4406,lng:-79.9959},linkedin:"https://www.linkedin.com/in/tejas-zodage-4abb1412a",batch:"2016"},{name:"Akshay Sancheti",role:"Member",company:"Manastik",position:"Co-Founder",location:"Bangalore, Karnataka, India",coordinates:{lat:12.9716,lng:77.5946},linkedin:"https://www.linkedin.com/in/akshaysancheti007",batch:"2016"},{name:"Pranav Pal Lekhi",role:"Chief Coordinator 2015-2016",company:"Qualcomm",position:"Systems Engineer",location:"Denver, CO, USA",coordinates:{lat:39.7392,lng:-104.9903},linkedin:"http://www.linkedin.com/in/pranav-pal-lekhi-5b8440105",batch:"2015"},{name:"Tanvi Jadhav",role:"Sub Coordinator 2015-2016",company:"Kumu Networks",position:"Systems Engineer",location:"San Francisco, CA, USA",coordinates:{lat:37.7749,lng:-122.4194},linkedin:"https://www.linkedin.com/in/tanvi-jadhav-60539087/",batch:"2015"},{name:"Shubham Sarwate",role:"Teaching Head 2015-2016",company:"Apple",position:"Software Engineer",location:"Cupertino, CA, USA",coordinates:{lat:37.323,lng:-122.0322},linkedin:"https://www.linkedin.com/in/shubham-sarwate/",batch:"2015"},{name:"Vedangi Pathak",role:"Member",company:"University of British Columbia",position:"PhD Student",location:"Vancouver, BC, Canada",coordinates:{lat:49.2827,lng:-123.1207},linkedin:"https://www.linkedin.com/in/vedangi-pathak-439a3b85/",batch:"2015"},{name:"Mandar Pradhan",role:"Member",company:"Atlassian",position:"ML Engineer",location:"Sydney, NSW, Australia",coordinates:{lat:-33.8688,lng:151.2093},linkedin:"https://www.linkedin.com/in/mpradhan20",batch:"2015"},{name:"Maitreya Naik",role:"Chief Coordinator 2014-2015",company:"Aurora",position:"Software Engineer",location:"Palo Alto, CA, USA",coordinates:{lat:37.4419,lng:-122.143},linkedin:"https://www.linkedin.com/in/maitreyanaik/",batch:"2014"},{name:"Rahul Bhola",role:"Sub Coordinator 2014-2015",company:"Lenskart",position:"Software Development Engineer",location:"Gurgaon, Haryana, India",coordinates:{lat:28.4595,lng:77.0266},linkedin:"https://www.linkedin.com/in/rahulbhola1/",batch:"2014"},{name:"Souryendu Das",role:"Teaching Head 2014-2015",company:"Texas A&M University",position:"PhD Student",location:"College Station, TX, USA",coordinates:{lat:30.628,lng:-96.3344},linkedin:"https://www.linkedin.com/in/souryendu-das",batch:"2014"},{name:"Aum Jadhav",role:"Robocon Coordinator 2014-2015",company:"Aurora",position:"Senior Software Engineer",location:"Palo Alto, CA, USA",coordinates:{lat:37.4419,lng:-122.143},linkedin:"https://www.linkedin.com/in/aum-jadhav/",batch:"2014"},{name:"Soham Patkar",role:"Member",company:"SkySpecs",position:"Robotics Autonomy Engineer",location:"Ann Arbor, MI, USA",coordinates:{lat:42.2808,lng:-83.743},linkedin:"https://www.linkedin.com/in/sohampatkar/",batch:"2014"},{name:"Madhura Gandhi",role:"Member",company:"Waymo",position:"Software Engineer",location:"Mountain View, CA, USA",coordinates:{lat:37.3861,lng:-122.0839},linkedin:"https://www.linkedin.com/in/madhurag/",batch:"2014"},{name:"Shikhar Sharma",role:"Chief Coordinator 2013-2014",company:"Sheru",position:"Founder and COO",location:"Mumbai, Maharashtra, India",coordinates:{lat:19.076,lng:72.8777},linkedin:"https://www.linkedin.com/in/shikhar03sharma/",batch:"2013"},{name:"Neisarg Dave",role:"Member",company:"NEC Labs America",position:"Research Scientist",location:"Princeton, NJ, USA",coordinates:{lat:40.3573,lng:-74.6672},linkedin:"https://www.linkedin.com/in/neisargdave",batch:"2013"},{name:"Shridevi Muthkhod",role:"Member",company:"Stanford University",position:"EE Grad Student",location:"Stanford, CA, USA",coordinates:{lat:37.4275,lng:-122.1697},linkedin:"https://www.linkedin.com/in/shridevi-muthkhod-51017a55/",batch:"2013"},{name:"Ronak Gupta",role:"Chief Coordinator 2012-2013",company:"Jawaharlal Nehru Centre",position:"MS Student",location:"Bangalore, Karnataka, India",coordinates:{lat:12.9716,lng:77.5946},linkedin:"https://www.linkedin.com/in/ronak-gupta-3a687425/",batch:"2012"},{name:"Nikhilesh Behera",role:"Sub Coordinator 2012-2013",company:"Amazon",position:"Software Development Engineer",location:"Seattle, WA, USA",coordinates:{lat:47.6062,lng:-122.3321},linkedin:"https://www.linkedin.com/in/nikhilesh-behera/",batch:"2012"},{name:"Apurva Ankleshwaria",role:"Inventory Manager 2012-2013",company:"Bert Labs",position:"Founding Member",location:"Bangalore, Karnataka, India",coordinates:{lat:12.9716,lng:77.5946},linkedin:"https://www.linkedin.com/in/apurvaankleshwaria/",batch:"2012"},{name:"Arihant Lunawat",role:"Member",company:"Energy Robotics",position:"Robotics Software Engineer",location:"Darmstadt, Germany",coordinates:{lat:49.8728,lng:8.6512},linkedin:"https://www.linkedin.com/in/arihantlunawat/",batch:"2012"},{name:"Arnav Goel",role:"Member",company:"Stealth-mode Startup",position:"Principal Software Engineer",location:"San Francisco, CA, USA",coordinates:{lat:37.7749,lng:-122.4194},linkedin:"https://www.linkedin.com/in/arnavgoel/",batch:"2012"},{name:"Rohit Sant",role:"Member",company:"Zipline",position:"Robotics & Perception Software",location:"San Francisco, CA, USA",coordinates:{lat:37.7749,lng:-122.4194},linkedin:"https://www.linkedin.com/in/rhsant/",batch:"2012"},{name:"Chintak Sheth",role:"Member",company:"Facebook",position:"Software Engineer",location:"Menlo Park, CA, USA",coordinates:{lat:37.4529,lng:-122.1817},linkedin:"https://www.linkedin.com/in/chintaksheth/",batch:"2012"},{name:"Jinal Shah",role:"Chief Coordinator 2011-2012",company:"NVIDIA",position:"Circuit Design Engineer",location:"Santa Clara, CA, USA",coordinates:{lat:37.3541,lng:-121.9552},linkedin:"https://www.linkedin.com/in/jinal1/",batch:"2011"},{name:"Saksham Bhatla",role:"Member",company:"Amazon",position:"Software Development Engineer",location:"Seattle, WA, USA",coordinates:{lat:47.6062,lng:-122.3321},linkedin:"https://www.linkedin.com/in/sakshambhatla/",batch:"2011"},{name:"Kartik Mankad",role:"Member",company:"NVIDIA",position:"Senior Verification Engineer",location:"Santa Clara, CA, USA",coordinates:{lat:37.3541,lng:-121.9552},linkedin:"https://www.linkedin.com/in/kartikmankad/",batch:"2011"},{name:"Deepak Chandra",role:"Member",company:"Apple",position:"Firmware Engineer",location:"Cupertino, CA, USA",coordinates:{lat:37.323,lng:-122.0322},linkedin:"https://www.linkedin.com/in/deepak-chandra/",batch:"2011"},{name:"Avinash Kumar",role:"Chief Coordinator 2010-2011",company:"Marvell Semiconductor",position:"Software Engineer",location:"Santa Clara, CA, USA",coordinates:{lat:37.3541,lng:-121.9552},linkedin:"https://www.linkedin.com/in/avinashckumar/",batch:"2010"},{name:"Shatruddha Kushwaha",role:"Member",company:"SUN Mobility",position:"Entrepreneur",location:"Bangalore, Karnataka, India",coordinates:{lat:12.9716,lng:77.5946},linkedin:"https://www.linkedin.com/in/shatruddha/",batch:"2010"},{name:"Nitant Gupta",role:"Member",company:"Rice University",position:"PhD Student",location:"Houston, TX, USA",coordinates:{lat:29.7604,lng:-95.3698},linkedin:"https://www.linkedin.com/in/nitantgupta/",batch:"2010"},{name:"Ajusal Sugathan",role:"Chief Coordinator 2009-2010",company:"Altitude Trading",position:"Head of Quant Research",location:"New York, NY, USA",coordinates:{lat:40.7128,lng:-74.006},linkedin:"https://www.linkedin.com/in/ajusal/",batch:"2009"},{name:"Kinshuk Kar",role:"Member",company:"Engati Chatbot Platform",position:"Senior Director, Product Management",location:"Mumbai, Maharashtra, India",coordinates:{lat:19.076,lng:72.8777},linkedin:"https://www.linkedin.com/in/kinshukkar/",batch:"2009"},{name:"Arjun Bidesi",role:"Co-Founder, ERC",company:"Thumbtack",position:"Growth and Marketing Analytics",location:"San Francisco, CA, USA",coordinates:{lat:37.7749,lng:-122.4194},linkedin:"https://www.linkedin.com/in/arjun-bidesi/",batch:"2006"},{name:"Jayanth Varanasi",role:"Co-Founder, ERC",company:"Sugarbox",position:"Director of Product",location:"Mumbai, Maharashtra, India",coordinates:{lat:19.076,lng:72.8777},linkedin:"https://www.linkedin.com/in/jayanthvaranasi/",batch:"2006"}];let x=class{constructor(){this.mapContainer=document.getElementById("alumni-map"),this.alumniData=window.alumniData,this.currentRegion="world",this.init()}init(){if(!this.mapContainer){console.error("❌ Alumni map container not found");return}console.log("🗺️ Initializing Alumni Map..."),this.createStaticMap(),this.attachRegionButtons(),this.setupCompanyScroller(),console.log("✅ Alumni Map initialized")}createStaticMap(a="world"){console.log(`🌍 Creating map for region: ${a}`),this.currentRegion=a;const t=this.mapContainer.querySelector(".static-world-map");t&&t.classList.add("fade-out"),setTimeout(()=>{let e="public/world_night.jpg";a==="usa"?e="public/usa_night.jpg":a==="europe"?e="public/europe_night.jpg":a==="asia"&&(e="public/asia_night.jpg");let n=this.alumniData;a!=="world"&&(n=this.alumniData.filter(r=>a==="usa"?this.isInUSA(r.location):a==="europe"?this.isInEurope(r.location):a==="asia"?this.isInAsia(r.location):!1)),console.log(`📊 Found ${n.length} alumni for ${a}`);const i=this.groupNearbyAlumni(n,a);console.log(`📍 Grouped into ${i.length} markers`);const o=a!=="world";this.mapContainer.innerHTML=`
                <div class="static-world-map fade-in">
                    <img src="${e}" 
                         alt="${a.charAt(0).toUpperCase()+a.slice(1)} Map" class="world-map-image">
                    <div class="alumni-markers">
                        ${i.map((r,s)=>`
                            <button class="alumni-marker${o?" interactive":" breathing"}" 
                                 style="left: ${this.getXFromLng(r.coordinates.lng,a)}%; top: ${this.getYFromLat(r.coordinates.lat,a)}%;"
                                 data-group='${JSON.stringify(r).replace(/'/g,"&apos;")}'
                                 data-index="${s}">
                                <div class="marker-dot ${r.alumni.length>1?"grouped":""}">
                                    ${r.alumni.length>1?r.alumni.length:""}
                                </div>
                                <div class="marker-pulse"></div>
                                ${o?`<div class="marker-tooltip">${this.createGroupTooltipContent(r)}</div>`:""}
                            </button>
                        `).join("")}
                    </div>
                </div>
            `,this.addMapStyles(),this.setupGroupInteractions(),setTimeout(()=>{this.mapContainer.querySelectorAll(".alumni-marker").forEach((s,c)=>{setTimeout(()=>{s.classList.add("visible")},c*100)})},100)},300)}isInUSA(a){return["usa","united states","california","texas","new york","florida","washington","oregon","colorado","nevada","michigan","pennsylvania","massachusetts","illinois","georgia","north carolina","virginia","ca, usa","tx, usa","ny, usa","fl, usa","wa, usa","co, usa"].some(e=>a.toLowerCase().includes(e))}isInEurope(a){return["germany","france","uk","united kingdom","portugal","spain","italy","netherlands","belgium","switzerland","austria","czech","poland","sweden","norway","denmark","finland","ireland","greece","hungary","romania","bulgaria","croatia","slovakia","slovenia","estonia","latvia","lithuania","luxembourg","malta","cyprus","prague","lisbon","berlin","paris","london","madrid","rome","amsterdam","brussels","zurich","vienna","warsaw","stockholm","oslo","copenhagen","helsinki","dublin","athens","budapest","bucharest","sofia","zagreb","bratislava","ljubljana","tallinn","riga","vilnius","cambridge","toulouse","maranello","walldorf","darmstadt"].some(e=>a.toLowerCase().includes(e))}isInAsia(a){return["india","china","japan","singapore","south korea","thailand","malaysia","indonesia","philippines","vietnam","bangladesh","pakistan","sri lanka","nepal","myanmar","cambodia","laos","brunei","mongolia","taiwan","hong kong","macau","bangalore","mumbai","delhi","chennai","hyderabad","pune","kolkata","ahmedabad","surat","jaipur","lucknow","kanpur","nagpur","indore","thane","bhopal","visakhapatnam","pimpri","patna","vadodara","ghaziabad","ludhiana","agra","nashik","faridabad","meerut","rajkot","kalyan","vasai","varanasi","srinagar","aurangabad","dhanbad","amritsar","navi mumbai","allahabad","ranchi","howrah","coimbatore","jabalpur","gwalior","vijayawada","jodhpur","madurai","raipur","kota","guwahati","chandigarh","solapur","hubballi","tiruchirappalli","bareilly","mysore","tiruppur","gurgaon","aligarh","jalandhar","bhubaneswar","salem","warangal","guntur","bhiwandi","saharanpur","gorakhpur","bikaner","amravati","noida","jamshedpur","bhilai","cuttack","firozabad","kochi","nellore","bhavnagar","dehradun","durgapur","asansol","rourkela","nanded","kolhapur","ajmer","akola","gulbarga","jamnagar","ujjain","loni","siliguri","jhansi","ulhasnagar","jammu","sangli","mangalore","erode","belgaum","ambattur","tirunelveli","malegaon","gaya","jalgaon","udaipur","maheshtala","beijing","shanghai","guangzhou","shenzhen","chengdu","hangzhou","wuhan","xian","suzhou","tianjin","nanjing","shenyang","harbin","jinan","changchun","dalian","kunming","taiyuan","shijiazhuang","urumqi","guiyang","hefei","lanzhou","zhengzhou","changsha","nanning","haikou","yinchuan","xining","hohhot","lhasa","tokyo","osaka","yokohama","nagoya","sapporo","fukuoka","kobe","kawasaki","kyoto","saitama","hiroshima","sendai","kitakyushu","chiba","sakai","niigata","hamamatsu","okayama","sagamihara","seoul","busan","incheon","daegu","daejeon","gwangju","suwon","ulsan","changwon","goyang","yongin","seongnam","bucheon","ansan","cheongju","jeonju","anyang","pohang","uijeongbu","siheung","cheonan","hwaseong","gimhae","gumi","pyeongtaek","iksan","gunpo","osan","yangsan","jeju","chuncheon","gangneung","andong","mokpo","yeosu","suncheon","gimcheon","naju","sangju","jeongeup","gongju","yeongju","seosan","nonsan","boryeong","asan","gyeongju","miryang","tongyeong","sacheon","kimhae","yangju","icheon","anju","namyangju","paju","gimpo","hanam","guri","gwangmyeong","gwacheon","uiwang","gunsan","jecheon","chungju","wonju","gangneung","samcheok","sokcho","donghae","taebaek","bangkok","kuala lumpur","jakarta","manila","ho chi minh city","hanoi","phnom penh","vientiane","bandar seri begawan","ulaanbaatar","taipei","dhaka","karachi","lahore","islamabad","rawalpindi","faisalabad","multan","gujranwala","peshawar","quetta","sialkot","sargodha","bahawalpur","sukkur","larkana","sheikhupura","jhang","rahim yar khan","gujrat","kasur","mardan","mingora","dera ghazi khan","sahiwal","nawabshah","okara","mirpur khas","chiniot","kamoke","mandi bahauddin","jhelum","sadiqabad","jacobabad","shikarpur","khanewal","hafizabad","kohat","muzaffargarh","khanpur","gojra","mianwali","bahawalnagar","muridke","pak pattan","abottabad","tando allahyar","jaranwala","chishtian","daska","mandi burewala","ahmadpur east","kamalia","vihari","wah cantonment","dera ismail khan","chaman","zhob","gwadar","turbat","khuzdar","colombo","kandy","galle","jaffna","negombo","batticaloa","matara","ratnapura","badulla","gampaha","kalutara","kurunegala","anuradhapura","polonnaruwa","trincomalee","vavuniya","mannar","puttalam","hambantota","monaragala","ampara","kegalle","nuwara eliya","kathmandu","pokhara","lalitpur","bharatpur","biratnagar","birgunj","dharan","butwal","hetauda","janakpur","dhangadhi","tulsipur","siddharthanagar","bhairahawa","kalaiya","itahari","gorkha","baglung","nepalgunj","tansen","dhankuta","ilam","rajbiraj","lahan","gaur","malangwa","siraha","rangoon","mandalay","naypyidaw","mawlamyine","bago","pathein","monywa","meiktila","myitkyina","dawei","pyay","hpa-an","taunggyi","sittwe","lashio","pakokku","magway","thaton","chauk","shwebo","sagaing","myeik","kawthaung","kyaukpyu","loikaw","hakha","falam","tamu","kalay","mindat","tedim","tonzang","rihkhawdar","thantlang","karnataka","maharashtra","tamil nadu","telangana","haryana","uttar pradesh"].some(e=>a.toLowerCase().includes(e))}groupNearbyAlumni(a,t){const e=[],n=new Set;let i;return t==="usa"?i=1.5:t==="europe"?i=2:t==="asia"?i=1.8:i=3,a.forEach((o,r)=>{if(n.has(r))return;const s={coordinates:o.coordinates,alumni:[o]};a.forEach((c,d)=>{if(d===r||n.has(d))return;Math.sqrt(Math.pow(o.coordinates.lat-c.coordinates.lat,2)+Math.pow(o.coordinates.lng-c.coordinates.lng,2))<i&&(s.alumni.push(c),n.add(d))}),n.add(r),e.push(s)}),e}createGroupTooltipContent(a){if(a.alumni.length===1){const t=a.alumni[0];return`${t.name}<br><small>${t.company}</small>`}else return`${a.alumni.length} Alumni<br><small>Click to see details</small>`}setupGroupInteractions(){this.mapContainer.querySelectorAll(".alumni-marker.interactive").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const n=JSON.parse(t.dataset.group);if(n.alumni.length===1){const i=n.alumni[0];i.linkedin&&i.linkedin!=="#"&&window.open(i.linkedin,"_blank")}else this.showGroupModal(n)})})}showGroupModal(a){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Alumni in this Area (${a.alumni.length})</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="alumni-list">
                        ${a.alumni.map(e=>`
                            <div class="alumni-item">
                                <div class="alumni-info">
                                    <h4>${e.name}</h4>
                                    <p><strong>${e.company}</strong></p>
                                    <p class="location">${e.location}</p>
                                    <p class="role">${e.position}</p>
                                </div>
                                ${e.linkedin&&e.linkedin!=="#"?`
                                    <a href="${e.linkedin}" target="_blank" class="linkedin-btn">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" class="linkedin-icon">
                                        LinkedIn
                                    </a>
                                `:""}
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `,document.body.appendChild(t),t.addEventListener("click",e=>{e.target===t&&t.remove()})}getXFromLng(a,t){switch(t){case"usa":return Math.max(0,Math.min(100,(a+125)/60*100));case"europe":return Math.max(0,Math.min(100,(a+10)/50*100));case"asia":return Math.max(0,Math.min(100,(a-65)/85*100));default:return Math.max(0,Math.min(100,(a+180)/360*100))}}getYFromLat(a,t){switch(t){case"usa":return Math.max(0,Math.min(100,(50-a)/25*100));case"europe":return Math.max(0,Math.min(100,(70-a)/35*100));case"asia":return Math.max(0,Math.min(100,(55-a)/50*100));default:return Math.max(0,Math.min(100,(90-a)/180*100))}}addMapStyles(){if(document.getElementById("alumni-map-styles"))return;const a=document.createElement("style");a.id="alumni-map-styles",a.textContent=`
            .static-world-map {
                position: relative;
                width: 100%;
                height: 400px;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid var(--border-color);
                background: var(--bg-tertiary);
                transition: opacity 0.4s;
            }
            
            .fade-in { opacity: 0; animation: fadeInMap 0.5s forwards; }
            .fade-out { opacity: 1; animation: fadeOutMap 0.3s forwards; }
            @keyframes fadeInMap { from { opacity: 0; } to { opacity: 1; } }
            @keyframes fadeOutMap { from { opacity: 1; } to { opacity: 0; } }

            .world-map-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: brightness(1.0) contrast(1.2) saturate(1.3);
            }

            .alumni-markers {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .alumni-marker {
                position: absolute;
                width: 32px;
                height: 32px;
                transform: translate(-50%, -50%);
                opacity: 0;
                transition: opacity 0.5s ease;
                background: none;
                border: none;
                cursor: pointer;
                z-index: 10;
            }

            .alumni-marker.interactive {
                pointer-events: all;
            }

            .alumni-marker.breathing {
                pointer-events: none;
            }

            .alumni-marker.visible {
                opacity: 1;
            }

            .marker-dot {
                width: 18px;
                height: 18px;
                background: var(--primary-color);
                border-radius: 50%;
                border: 3px solid var(--bg-primary);
                box-shadow: 0 0 15px rgba(34, 211, 238, 0.8);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                font-weight: bold;
                color: var(--bg-primary);
                transition: all 0.3s ease;
            }

            .marker-dot.grouped {
                width: 24px;
                height: 24px;
                background: var(--secondary-color);
                font-size: 12px;
                border-width: 2px;
            }

            .marker-pulse {
                width: 32px;
                height: 32px;
                border: 2px solid var(--primary-color);
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0.6;
            }

            .alumni-marker.breathing .marker-pulse {
                animation: breathingPulse 3s ease-in-out infinite;
            }

            .alumni-marker.interactive .marker-pulse {
                animation: pulse 2s ease-out infinite;
            }

            @keyframes breathingPulse {
                0%, 100% {
                    transform: translate(-50%, -50%) scale(0.8);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(-50%, -50%) scale(2.2);
                    opacity: 0.2;
                }
            }

            @keyframes pulse {
                0% {
                    transform: translate(-50%, -50%) scale(0.8);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(-50%, -50%) scale(2.5);
                    opacity: 0;
                }
            }

            .alumni-marker.interactive:hover .marker-dot {
                background: #ffffff;
                box-shadow: 0 0 25px rgba(255, 255, 255, 0.9);
                transform: translate(-50%, -50%) scale(1.4);
            }

            .marker-tooltip {
                position: absolute;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                padding: 8px 12px;
                font-size: 12px;
                color: var(--text-primary);
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                text-align: center;
                min-width: 120px;
            }

            .alumni-marker.interactive:hover .marker-tooltip {
                opacity: 1;
            }

            /* Alumni Group Modal Styles */
            .alumni-list {
                display: grid;
                gap: 1rem;
                max-height: 400px;
                overflow-y: auto;
            }

            .alumni-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 1rem;
                gap: 1rem;
            }

            .alumni-info h4 {
                margin: 0 0 0.25rem 0;
                color: var(--text-primary);
                font-size: 1rem;
                font-weight: 600;
            }

            .alumni-info p {
                margin: 0.25rem 0;
                font-size: 0.9rem;
            }

            .alumni-info .location {
                color: var(--text-muted);
                font-size: 0.8rem;
            }

            .alumni-info .role {
                color: var(--text-secondary);
                font-size: 0.85rem;
            }

            .linkedin-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: #0077B5;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                white-space: nowrap;
                min-width: 100px;
                justify-content: center;
            }

            .linkedin-btn:hover {
                background: #005885;
                transform: translateY(-2px);
            }

            .linkedin-icon {
                width: 16px;
                height: 16px;
                object-fit: contain;
            }

            /* Responsive adjustments */
            @media (max-width: 768px) {
                .static-world-map {
                    height: 300px;
                }
                
                .alumni-marker {
                    width: 28px;
                    height: 28px;
                }
                
                .marker-dot {
                    width: 16px;
                    height: 16px;
                    font-size: 9px;
                    border-width: 2px;
                }
                
                .marker-dot.grouped {
                    width: 20px;
                    height: 20px;
                    font-size: 10px;
                }
                
                .marker-pulse {
                    width: 28px;
                    height: 28px;
                }

                .alumni-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.75rem;
                }

                .linkedin-btn {
                    align-self: flex-end;
                    min-width: 80px;
                }

                .marker-tooltip {
                    min-width: 100px;
                    font-size: 11px;
                }
            }
        `,document.head.appendChild(a)}setupCompanyScroller(){const a=[...new Set(this.alumniData.map(e=>e.company))],t=document.querySelector(".scroller-content");if(t&&(t.innerHTML="",[...a,...a].forEach(n=>{const i=document.createElement("span");i.className="company-name",i.textContent=n,t.appendChild(i)}),t.style.display="flex",t.style.gap="3rem",t.style.animation="scroll-companies 40s linear infinite",t.addEventListener("mouseenter",()=>{t.style.animationPlayState="paused"}),t.addEventListener("mouseleave",()=>{t.style.animationPlayState="running"})),!document.getElementById("company-scroll-keyframes")){const e=document.createElement("style");e.id="company-scroll-keyframes",e.textContent=`
                @keyframes scroll-companies {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .company-scroller {
                    margin-top: 3rem;
                    text-align: center;
                }
                
                .company-scroller h4 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-bottom: 2rem;
                }
                
                .scroller-container {
                    overflow: hidden;
                    position: relative;
                    height: 60px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                }
                
                .company-name {
                    color: var(--text-secondary);
                    white-space: nowrap;
                    font-weight: 500;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    padding: 0 1rem;
                }
                
                .company-name:hover {
                    color: var(--primary-color);
                }
            `,document.head.appendChild(e)}}attachRegionButtons(){const a=document.querySelectorAll(".map-btn");console.log(`🔘 Found ${a.length} region buttons`),a.forEach(t=>{t.addEventListener("click",()=>{const e=t.textContent.toLowerCase();console.log(`🌍 Region button clicked: ${e}`),this.createStaticMap(e),a.forEach(n=>n.classList.remove("active")),t.classList.add("active")})})}};window.AlumniMap=x;window.scrollToReveal=function(){const l=document.querySelector(".logo-reveal-section");l&&l.scrollIntoView({behavior:"smooth",block:"start"})};function y({selector:l=".hero-title",text:a="",speed:t=120,maxIterations:e=10,characters:n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",revealDirection:i="center"}={}){const o=document.querySelector(l);if(!o)return;const r=a||o.textContent;let s=new Set,c;function d(){const h=r.length;switch(i){case"start":return s.size;case"end":return h-1-s.size;case"center":{const u=Math.floor(h/2),w=Math.floor(s.size/2),p=s.size%2===0?u+w:u-w-1;if(p>=0&&p<h&&!s.has(p))return p;for(let g=0;g<h;g++)if(!s.has(g))return g;return 0}default:return s.size}}function m(){return r.split("").map((h,u)=>h===" "||s.has(u)?`<span>${r[u]}</span>`:`<span class="${Math.random()>.5?"glitch-red":"glitch-green"}">${n[Math.floor(Math.random()*n.length)]}</span>`).join("")}function b(){if(s.size<r.length){const h=d();s.add(h),o.innerHTML=m()}else clearInterval(c),o.textContent=r}o.innerHTML=m(),c=setInterval(b,t)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",function(){y({selector:".hero-title",revealDirection:"center"})}):y({selector:".hero-title",revealDirection:"center"});
