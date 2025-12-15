let scene, camera, renderer, particles, torus;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let animationFrameId;
let isAnimating = true;
let isWebGLAvailable = true;

function isWebGLSupported() {
    try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!context;
    } catch (e) {
        return false;
    }
}

function initThree() {
    const canvas = document.getElementById('three-canvas');
    
    if (!canvas) return;
    
    if (!isWebGLSupported()) {
        console.warn('WebGL not available, skipping 3D animation');
        isWebGLAvailable = false;
        canvas.style.background = 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1), transparent)';
        return;
    }
    
    try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        const antialiasEnabled = window.devicePixelRatio <= 2;
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: antialiasEnabled,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        
        canvas.addEventListener('webglcontextlost', handleContextLost, false);
        canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
        
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 800;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.025,
            color: 0xd4af37,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
        
        const geometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100);
        const material = new THREE.MeshBasicMaterial({
            color: 0xc0c0c0,
            wireframe: true,
            transparent: true,
            opacity: 0.25
        });
        torus = new THREE.Mesh(geometry, material);
        scene.add(torus);
        
        setupIntersectionObserver(canvas);
        
        animate();
    } catch (error) {
        console.error('Failed to initialize Three.js:', error);
        isWebGLAvailable = false;
        canvas.style.background = 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1), transparent)';
    }
}

function handleContextLost(event) {
    event.preventDefault();
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    isAnimating = false;
    console.warn('WebGL context lost');
}

function handleContextRestored() {
    console.log('WebGL context restored');
    isAnimating = true;
    animate();
}

function setupIntersectionObserver(canvas) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isAnimating && isWebGLAvailable) {
                    isAnimating = true;
                    animate();
                }
            } else {
                isAnimating = false;
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(canvas.parentElement);
}

function animate() {
    if (!isAnimating || !renderer) return;
    
    animationFrameId = requestAnimationFrame(animate);
    
    if (particles) {
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0006;
    }
    
    if (torus) {
        torus.rotation.x += 0.006;
        torus.rotation.y += 0.003;
        torus.rotation.z += 0.006;
    }
    
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (-targetY - camera.position.y) * 0.03;
    
    renderer.render(scene, camera);
}

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        targetX = (e.clientX / window.innerWidth) * 2 - 1;
        targetY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
    
    function updateCursor() {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        followerX += (cursorX - followerX) * 0.2;
        followerY += (cursorY - followerY) * 0.2;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                if (entry.target.classList.contains('skill-bar')) {
                    const skillFill = entry.target.querySelector('.skill-fill');
                    const skillValue = skillFill.getAttribute('data-skill');
                    setTimeout(() => {
                        skillFill.style.width = skillValue + '%';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

function initPortfolioTabs() {
    const tabs = document.querySelectorAll('.portfolio-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
}

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card) => {
        card.style.cursor = 'default';
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        console.log('Form submitted:', data);
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}


function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.style.left = navLinks.style.left === '0px' ? '-100%' : '0px';
        menuToggle.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.left = '-100%';
                menuToggle.classList.remove('active');
            }
        });
    });
}

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.home-content');
        
        parallaxElements.forEach(el => {
            const speed = 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (renderer && camera) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }
    }, 150);
});

document.addEventListener('DOMContentLoaded', () => {
    initThree();
    initCursor();
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initPortfolioTabs();
    initProjectCards();
    initContactForm();
    initMobileMenu();
    initParallax();
});
