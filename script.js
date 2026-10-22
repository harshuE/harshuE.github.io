// Navigation scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .experience-item, .cert-card, .skill-category, .timeline-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('.section');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add typing effect to hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Uncomment to enable typing effect
    // setTimeout(typeWriter, 1000);
}

// Data Science Canvas Animation
function initDataVisualization() {
    const canvas = document.getElementById('dataCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    
    // Data points representing data science concepts
    const dataPoints = [];
    const connections = [];
    const numPoints = 30;
    
    // Create data points
    for (let i = 0; i < numPoints; i++) {
        dataPoints.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 2,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    // Create connections between nearby points (network graph effect)
    function createConnections() {
        connections.length = 0;
        for (let i = 0; i < dataPoints.length; i++) {
            for (let j = i + 1; j < dataPoints.length; j++) {
                const dx = dataPoints[i].x - dataPoints[j].x;
                const dy = dataPoints[i].y - dataPoints[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    connections.push({
                        from: i,
                        to: j,
                        distance: distance,
                        opacity: (150 - distance) / 150 * 0.2
                    });
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw connections
        createConnections();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.lineWidth = 1;
        connections.forEach(conn => {
            const from = dataPoints[conn.from];
            const to = dataPoints[conn.to];
            ctx.globalAlpha = conn.opacity;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
        });
        
        // Update and draw data points
        ctx.globalAlpha = 1;
        dataPoints.forEach(point => {
            // Update position
            point.x += point.vx;
            point.y += point.vy;
            
            // Bounce off edges
            if (point.x < 0 || point.x > width) point.vx *= -1;
            if (point.y < 0 || point.y > height) point.vy *= -1;
            
            // Keep within bounds
            point.x = Math.max(0, Math.min(width, point.x));
            point.y = Math.max(0, Math.min(height, point.y));
            
            // Draw point (data node)
            ctx.fillStyle = `rgba(59, 130, 246, ${point.opacity})`;
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw glow effect
            const gradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, point.radius * 3
            );
            gradient.addColorStop(0, `rgba(59, 130, 246, ${point.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius * 3, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    animate();
}

// Initialize data visualization when page loads
document.addEventListener('DOMContentLoaded', () => {
    initDataVisualization();
});

// Animated progress bars for skills (data visualization style)
function animateSkillBars() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.animation = 'skill-pulse 0.5s ease';
        }, index * 50);
    });
}

// Chart-like animation for project cards
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'chart-grow 0.8s ease-out';
        }, index * 200);
    });
}

// Call animations when elements come into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const projectsSection = document.querySelector('#skills');
if (projectsSection) {
    skillObserver.observe(projectsSection);
}

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProjectCards();
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const projectsSection2 = document.querySelector('#projects');
if (projectsSection2) {
    projectObserver.observe(projectsSection2);
}

// --- Shared Web Speech helper (used by hero avatar narration AND card "Listen" buttons) ---
// Centralizing cancellation here guarantees only one utterance ever plays at a time,
// no matter which feature (hero avatar vs. a card's Listen button) triggered it.
const SpeechHub = (function () {
    const supported = 'speechSynthesis' in window;
    let activeButton = null; // the currently "speaking" button element, if any

    function resetActiveButton() {
        if (activeButton) {
            activeButton.classList.remove('is-speaking');
            const icon = activeButton.querySelector('i');
            if (icon) icon.className = activeButton.dataset.idleIcon || 'fas fa-volume-up';
            activeButton = null;
        }
    }

    function stop() {
        if (supported && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        resetActiveButton();
    }

    // speakText: speaks `text` aloud. If `buttonEl` is given, toggles its visual state
    // (icon + .is-speaking class) while speech plays, and reverts on end/stop/error.
    // Clicking the same button again while it is speaking stops the speech (toggle behavior).
    function speakText(text, buttonEl) {
        if (!supported) return;

        const wasThisButton = buttonEl && activeButton === buttonEl;

        // Always clear any in-flight speech first so two narrations never overlap.
        window.speechSynthesis.cancel();
        resetActiveButton();

        if (wasThisButton) {
            // Treat a second click on the same button as "stop".
            return;
        }

        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 1;
        utter.pitch = 1;

        if (buttonEl) {
            activeButton = buttonEl;
            buttonEl.dataset.idleIcon = buttonEl.dataset.idleIcon ||
                (buttonEl.querySelector('i') ? buttonEl.querySelector('i').className : 'fas fa-volume-up');
            buttonEl.classList.add('is-speaking');
            const icon = buttonEl.querySelector('i');
            if (icon) icon.className = 'fas fa-stop';
        }

        utter.onend = () => {
            if (activeButton === buttonEl) resetActiveButton();
        };
        utter.onerror = () => {
            if (activeButton === buttonEl) resetActiveButton();
        };

        window.speechSynthesis.speak(utter);
    }

    return { supported, speakText, stop };
})();

// --- Card "Listen" buttons: Projects, Experience, Research, About ---
(function initCardListenButtons() {
    if (!SpeechHub.supported) return;

    function cleanText(el) {
        if (!el) return '';
        return el.textContent.replace(/\s+/g, ' ').trim();
    }

    function makeListenButton(label, script) {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-listen-wrapper';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'listen-btn';
        btn.setAttribute('aria-label', label);
        btn.innerHTML = '<i class="fas fa-volume-up"></i><span>Listen</span>';
        btn.addEventListener('click', () => SpeechHub.speakText(script, btn));
        wrapper.appendChild(btn);
        return wrapper;
    }

    // Projects: "This project is called X. <description> In terms of impact, <impact>."
    document.querySelectorAll('#projects .project-card').forEach(card => {
        const title = cleanText(card.querySelector('.project-title-wrapper h3'));
        const description = cleanText(card.querySelector('.project-description'));
        const impact = cleanText(card.querySelector('.project-impact p'));
        if (!title) return;
        let script = `This project is called ${title}. ${description}`;
        if (impact) script += ` In terms of impact: ${impact}`;
        const wrapper = makeListenButton(`Listen to a summary of ${title}`, script);
        card.insertBefore(wrapper, card.firstChild);
    });

    // Research: narrate title, authors, venue and status naturally.
    document.querySelectorAll('.research-card').forEach(card => {
        const title = cleanText(card.querySelector('.research-body h3'));
        const authors = cleanText(card.querySelector('.research-authors'));
        const venue = cleanText(card.querySelector('.research-venue'));
        const status = cleanText(card.querySelector('.research-status'));
        if (!title) return;
        let script = `This research paper is titled "${title}".`;
        if (authors) script += ` It was co-authored by ${authors.replace(/^,|,$/g, '')}.`;
        if (venue) script += ` It is being presented at the ${venue}.`;
        if (status) script += ` Current status: ${status}.`;
        const wrapper = makeListenButton(`Listen to a summary of ${title}`, script);
        card.insertBefore(wrapper, card.firstChild);
    });

    // Experience: "As a <role> at <company>, from <duration>, I ... <duties>."
    document.querySelectorAll('#experience .experience-item').forEach(item => {
        const headerClone = item.querySelector('.experience-header h3')?.cloneNode(true);
        if (headerClone) {
            const badge = headerClone.querySelector('.current-badge');
            if (badge) badge.remove();
        }
        const role = headerClone ? cleanText(headerClone) : '';
        const company = cleanText(item.querySelector('.company'));
        const duration = cleanText(item.querySelector('.duration'));
        const duties = Array.from(item.querySelectorAll('.experience-duties li')).map(cleanText).filter(Boolean);
        if (!role) return;
        let script = `As a ${role}`;
        if (company) script += ` at ${company}`;
        if (duration) script += `, from ${duration}`;
        script += ', my key responsibilities and achievements included: ';
        script += duties.join('. ') + '.';
        const wrapper = makeListenButton(`Listen to a summary of the ${role} role at ${company}`, script);
        item.insertBefore(wrapper, item.firstChild);
    });

    // About section: read the lead paragraph with a natural framing.
    const aboutBtn = document.querySelector('.listen-btn[data-listen-target="about-lead"]');
    if (aboutBtn) {
        const leadText = cleanText(document.getElementById('about-lead'));
        aboutBtn.addEventListener('click', () => {
            SpeechHub.speakText(`Here is a quick overview of who I am. ${leadText}`, aboutBtn);
        });
    }
})();

// --- Quick Contact floating widget ---
(function initQuickContact() {
    const toggle = document.getElementById('quick-contact-toggle');
    const menu = document.getElementById('quick-contact-menu');
    if (!toggle || !menu) return;

    function closeMenu() {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = menu.classList.toggle('active');
        toggle.classList.toggle('active', isActive);
        toggle.setAttribute('aria-expanded', String(isActive));
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && e.target !== toggle && menu.classList.contains('active')) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
})();

// --- 3D Avatar + Voice Narration ---
(function initAvatarNarration() {
    const canvas = document.getElementById('avatar-canvas');
    const fallbackEl = document.getElementById('avatar-fallback');
    const playBtn = document.getElementById('avatar-play-btn');
    const captionsEl = document.getElementById('avatar-captions');
    if (!canvas || !playBtn || !captionsEl) return;

    const NARRATION_TEXT =
        "Hi, I'm Harishalinee Elangovan, a Software, Data and AI professional. " +
        "I'm an Associate Data Analyst and AI Engineer at Agrithmics, and a final-year " +
        "Data Science undergraduate at SLIIT. I build full-stack dot net applications and " +
        "REST APIs, deploy them with IIS and Docker, and add OCR and automation testing " +
        "to keep data pipelines and dashboards reliable. On the AI side, I work with " +
        "Python, TensorFlow and PyTorch, and I recently built an edge-based fall risk " +
        "detection model that reached ninety seven percent accuracy, with a paper accepted " +
        "for IEEE ICSCDS twenty twenty six. I'm looking for software engineering, data " +
        "analyst, AI ML engineer, or QA automation roles where I can keep building reliable, " +
        "data-driven systems.";

    let scene, camera, renderer, head, jaw, clock;
    let threeReady = false;
    let rafId = null;
    let isVisible = false;
    let speaking = false;

    function buildFallbackAvatar() {
        canvas.hidden = true;
        fallbackEl.hidden = false;
        fallbackEl.innerHTML =
            '<div class="css-avatar">' +
            '  <div class="css-avatar-head">' +
            '    <div class="css-avatar-hair"></div>' +
            '    <div class="css-avatar-eye left"></div>' +
            '    <div class="css-avatar-eye right"></div>' +
            '    <div class="css-avatar-mouth" id="css-avatar-mouth"></div>' +
            '  </div>' +
            '  <div class="css-avatar-shoulders"></div>' +
            '</div>';
    }

    async function initThree() {
        try {
            const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
            camera.position.set(0, 0, 6);

            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setSize(280, 280, false);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

            const ambient = new THREE.AmbientLight(0xffffff, 0.55);
            scene.add(ambient);
            const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
            keyLight.position.set(3, 4, 5);
            scene.add(keyLight);
            const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.4);
            fillLight.position.set(-4, -1, 2);
            scene.add(fillLight);

            head = new THREE.Group();

            // Shoulders / blazer
            const shoulderGeo = new THREE.CylinderGeometry(1.5, 1.9, 1.4, 32, 1, true, 0, Math.PI);
            const shoulderMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.6 });
            const shoulders = new THREE.Mesh(shoulderGeo, shoulderMat);
            shoulders.rotation.x = Math.PI;
            shoulders.position.y = -2.1;
            head.add(shoulders);

            // Neck
            const neckGeo = new THREE.CylinderGeometry(0.45, 0.5, 0.6, 24);
            const skinMat = new THREE.MeshStandardMaterial({ color: 0xcf9d78, roughness: 0.7 });
            const neck = new THREE.Mesh(neckGeo, skinMat);
            neck.position.y = -1.15;
            head.add(neck);

            // Head (sphere, slightly squashed)
            const faceGeo = new THREE.SphereGeometry(1.1, 48, 48);
            faceGeo.scale(0.92, 1.05, 0.95);
            const face = new THREE.Mesh(faceGeo, skinMat);
            head.add(face);

            // Hair
            const hairGeo = new THREE.SphereGeometry(1.15, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.58);
            const hairMat = new THREE.MeshStandardMaterial({ color: 0x1f1510, roughness: 0.8 });
            const hair = new THREE.Mesh(hairGeo, hairMat);
            hair.position.y = 0.15;
            hair.rotation.x = Math.PI;
            head.add(hair);

            // Eyes
            const eyeGeo = new THREE.SphereGeometry(0.1, 16, 16);
            const eyeMat = new THREE.MeshStandardMaterial({ color: 0x2b2118, roughness: 0.3 });
            const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
            eyeL.position.set(-0.38, 0.12, 0.92);
            const eyeR = eyeL.clone();
            eyeR.position.x = 0.38;
            head.add(eyeL, eyeR);

            // Jaw / mouth (animated for lip-sync)
            const jawGeo = new THREE.BoxGeometry(0.5, 0.16, 0.12);
            const jawMat = new THREE.MeshStandardMaterial({ color: 0x8a3b3b, roughness: 0.5 });
            jaw = new THREE.Mesh(jawGeo, jawMat);
            jaw.position.set(0, -0.42, 0.95);
            head.add(jaw);

            // Brand-blue accent collar
            const collarGeo = new THREE.TorusGeometry(0.55, 0.06, 12, 32, Math.PI);
            const collarMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 });
            const collar = new THREE.Mesh(collarGeo, collarMat);
            collar.position.y = -1.55;
            collar.rotation.z = Math.PI;
            head.add(collar);

            scene.add(head);
            clock = new THREE.Clock();
            threeReady = true;
            startLoop();
        } catch (err) {
            console.warn('3D avatar unavailable, using CSS fallback:', err);
            buildFallbackAvatar();
        }
    }

    function animateThree() {
        rafId = requestAnimationFrame(animateThree);
        if (!threeReady || !isVisible) return;
        const t = clock.getElapsedTime();
        // Idle breathing + subtle rotation
        head.rotation.y = Math.sin(t * 0.5) * 0.15;
        head.position.y = Math.sin(t * 1.2) * 0.04;
        // Mouth animation driven by speaking state
        if (jaw) {
            const target = speaking ? 0.6 + Math.random() * 0.9 : 0.15;
            jaw.scale.y += (target - jaw.scale.y) * 0.4;
        }
        renderer.render(scene, camera);
    }

    function startLoop() {
        if (rafId === null) animateThree();
    }

    // Pause rendering when the avatar scrolls off-screen to save battery
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
        });
    }, { threshold: 0.1 });
    visibilityObserver.observe(canvas.closest('.meet-avatar-wrapper') || canvas);

    initThree();

    // --- Web Speech API narration + typed captions ---
    const supportsSpeech = 'speechSynthesis' in window;

    function typeCaption(text, totalDurationMs) {
        captionsEl.innerHTML = '';
        const words = text.split(' ');
        const perWord = Math.max(totalDurationMs / words.length, 40);
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.className = 'avatar-caption-word';
            span.textContent = word + ' ';
            span.style.animationDelay = (i * perWord / 1000) + 's';
            captionsEl.appendChild(span);
        });
    }

    function playNarration() {
        if (!supportsSpeech) return;
        // Cancel any in-flight speech first — including a card "Listen" button's
        // narration elsewhere on the page — since speechSynthesis is a single
        // global queue shared by every speaking feature on the site.
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(NARRATION_TEXT);
        utter.rate = 1;
        utter.pitch = 1;

        playBtn.disabled = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i> Narrating...';

        utter.onstart = () => {
            speaking = true;
            // Estimate ~45s worth of speech for caption pacing
            const estMs = Math.max(NARRATION_TEXT.length * 55, 8000);
            typeCaption(NARRATION_TEXT, estMs);
        };

        utter.onboundary = () => {
            // word-boundary pulses handled implicitly by the mouth animation loop
        };

        utter.onend = () => {
            speaking = false;
            playBtn.disabled = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i> Hear my story';
        };

        utter.onerror = () => {
            speaking = false;
            playBtn.disabled = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i> Hear my story';
        };

        window.speechSynthesis.speak(utter);
    }

    if (!supportsSpeech) {
        // Graceful fallback: show typed caption on click, no audio
        playBtn.innerHTML = '<i class="fas fa-closed-captioning"></i> Read my story';
        playBtn.addEventListener('click', () => {
            typeCaption(NARRATION_TEXT, 12000);
        });
    } else {
        playBtn.addEventListener('click', playNarration);
    }
})();

