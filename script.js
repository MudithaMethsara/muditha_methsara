document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling (Lenis)
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // GSAP Registration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 2. Custom Cursor & Magnetic Hover
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        // Custom Cursor Style setup dynamically
        Object.assign(cursor.style, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid var(--accent-primary)',
            pointerEvents: 'none',
            zIndex: 9999,
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.2s, height 0.2s, background-color 0.2s'
        });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        gsap.ticker.add(() => {
            // Smooth cursor follow
            const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
            cursorX += (mouseX - cursorX) * dt;
            cursorY += (mouseY - cursorY) * dt;
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        });

        // Interactive elements
        const interactables = document.querySelectorAll('a, button, .card, .tab-pill, .social-icon');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(220, 20, 60, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' }); // reset magnetic
            });
        });

        // Magnetic Hover
        const magnetics = document.querySelectorAll('.btn, .social-icon');
        magnetics.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const h = rect.width / 2;
                const v = rect.height / 2;
                const x = e.clientX - rect.left - h;
                const y = e.clientY - rect.top - v;
                
                // Pull element slightly towards cursor
                gsap.to(el, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.5,
                    ease: 'power3.out'
                });
            });
        });
    }

    // 3. Neural Flow Canvas
    const canvas = document.getElementById('neural-flow-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let nodes = [];
        let mouse = { x: null, y: null };
        const NODE_COUNT = 80;
        const CONNECTION_DIST = 150;
        
        // CSS Style for canvas
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2';
        canvas.style.pointerEvents = 'none';

        function resize() {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            initNodes();
        }

        function initNodes() {
            nodes = [];
            // Create a pseudo-grid structure
            const cols = Math.floor(width / 80);
            const rows = Math.floor(height / 80);
            for (let i = 0; i < NODE_COUNT; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    baseX: Math.random() * width,
                    baseY: Math.random() * height
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            
            // Get scroll offset for parallax
            const scrollY = window.scrollY || 0;
            
            ctx.lineWidth = 1;

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                
                // Update pos
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounds
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Parallax Y offset
                const py = node.y - (scrollY * 0.2);

                // Check mouse proximity
                let distToMouse = 9999;
                if (mouse.x !== null) {
                    const dx = mouse.x - node.x;
                    const dy = mouse.y - py; // use screen Y for mouse
                    distToMouse = Math.sqrt(dx*dx + dy*dy);
                }

                // Draw connections
                for (let j = i + 1; j < nodes.length; j++) {
                    const node2 = nodes[j];
                    const py2 = node2.y - (scrollY * 0.2);
                    
                    const dx = node.x - node2.x;
                    const dy = py - py2;
                    const dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < CONNECTION_DIST) {
                        let opacity = 1 - (dist / CONNECTION_DIST);
                        
                        // Boost opacity if near mouse
                        if (distToMouse < 200) {
                            opacity = Math.min(1, opacity + 0.3);
                        }
                        
                        // Force mostly orthogonal or 45 deg angles aesthetically by picking color
                        const isOrthogonal = Math.abs(dx) < 10 || Math.abs(dy) < 10;
                        if (isOrthogonal) {
                            ctx.strokeStyle = `rgba(220, 20, 60, ${opacity * 0.5})`; // Crimson
                        } else {
                            ctx.strokeStyle = `rgba(122, 11, 34, ${opacity * 0.2})`; // Muted
                        }
                        
                        ctx.beginPath();
                        ctx.moveTo(node.x, py);
                        ctx.lineTo(node2.x, py2);
                        ctx.stroke();
                    }
                }

                // Draw node
                ctx.fillStyle = distToMouse < 100 ? '#DC143C' : '#FFFFFF';
                const radius = distToMouse < 100 ? 3 : 1.5;
                ctx.beginPath();
                ctx.arc(node.x, py, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        canvas.parentElement.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        resize();
        draw();
    }

    // 4. GSAP Animations & Load Sequence
    if (typeof gsap !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            // Hero Load Sequence
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                const tl = gsap.timeline();
                tl.fromTo(heroTitle, 
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
                )
                .fromTo('.hero-desc',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                    "-=0.6"
                )
                .fromTo('.hero .btn',
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                    "-=0.4"
                );
            }

            // Scroll Reveals (replacing simple fade-in-up)
            const fadeElements = document.querySelectorAll('.fade-in-up');
            fadeElements.forEach(el => {
                // Remove the CSS transition class so GSAP handles it
                el.classList.remove('fade-in-up');
                
                gsap.fromTo(el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Grid Stagger Reveal
            const grids = document.querySelectorAll('.grid-2, .grid-3');
            grids.forEach(grid => {
                const cards = grid.querySelectorAll('.card');
                gsap.fromTo(cards,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: grid,
                            start: 'top 80%',
                        }
                    }
                );
            });
        }
    }

    // 5. Navigation Indicator
    const navItems = document.querySelectorAll('.nav-item');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Create animated indicator
    const navbar = document.querySelector('.navbar');
    if (navbar && navItems.length > 0) {
        const indicator = document.createElement('div');
        indicator.classList.add('nav-indicator');
        Object.assign(indicator.style, {
            position: 'absolute',
            bottom: '0',
            height: '2px',
            backgroundColor: 'var(--accent-primary)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 8px var(--accent-glow)'
        });
        navbar.appendChild(indicator);

        function updateIndicator(el) {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const navRect = navbar.getBoundingClientRect();
            indicator.style.width = `${rect.width}px`;
            indicator.style.left = `${rect.left - navRect.left}px`;
        }

        let activeItem = null;
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPath) {
                item.classList.add('active');
                activeItem = item;
            } else {
                item.classList.remove('active');
            }

            item.addEventListener('mouseenter', () => updateIndicator(item));
            item.addEventListener('mouseleave', () => updateIndicator(activeItem));
        });

        // Remove CSS active indicator to use JS one
        const style = document.createElement('style');
        style.innerHTML = `.nav-item.active::after { display: none; }`;
        document.head.appendChild(style);

        // Initial setup
        setTimeout(() => updateIndicator(activeItem), 100); // delay for font loading
        window.addEventListener('resize', () => updateIndicator(activeItem));
    }

    // 6. Theme Toggle (Real Implementation)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.textContent = '☀';
        }

        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // GSAP crossfade effect on body
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(document.body, 
                    { opacity: 0.8 }, 
                    { opacity: 1, duration: 0.4, ease: 'power2.out' }
                );
            }
            
            themeToggle.textContent = isLight ? '☀' : '☾';
        });

        // Add Light Mode styles dynamically (or could be in CSS)
        const lightModeStyles = document.createElement('style');
        lightModeStyles.innerHTML = `
            body.light-mode {
                --bg-primary: #F5F5F5;
                --bg-secondary: #E0E0E0;
                --bg-tertiary: #D0D0D0;
                --text-primary: #111111;
                --text-secondary: #555555;
                --border-subtle: #CCCCCC;
            }
            body.light-mode .card, body.light-mode .navbar, body.light-mode .input-group input, body.light-mode textarea {
                background-color: rgba(255, 255, 255, 0.7);
                border-color: rgba(0, 0, 0, 0.1);
                color: var(--text-primary);
            }
            body.light-mode .logo {
                color: #111111;
                text-shadow: none;
            }
            body.light-mode .card-img-placeholder {
                background: linear-gradient(45deg, #e0e0e0, #f0f0f0);
            }
        `;
        document.head.appendChild(lightModeStyles);
    }

    // Tab pill filtering with GSAP
    const tabPills = document.querySelectorAll('.tab-pill');
    if (tabPills.length > 0 && typeof gsap !== 'undefined') {
        tabPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const siblings = pill.parentElement.querySelectorAll('.tab-pill');
                siblings.forEach(s => s.classList.remove('active'));
                pill.classList.add('active');
                
                if (pill.parentElement.id === 'project-filters') {
                    const filter = pill.getAttribute('data-filter');
                    const cards = document.querySelectorAll('.project-card');
                    
                    // Animate out
                    gsap.to(cards, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.3,
                        onComplete: () => {
                            let visibleCards = [];
                            cards.forEach(card => {
                                if (filter === 'all' || (card.dataset.category && card.dataset.category.includes(filter))) {
                                    card.style.display = 'block';
                                    visibleCards.push(card);
                                } else {
                                    card.style.display = 'none';
                                }
                            });
                            // Animate in
                            if (visibleCards.length > 0) {
                                gsap.fromTo(visibleCards, 
                                    { opacity: 0, scale: 0.95, y: 20 },
                                    { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
                                );
                            }
                        }
                    });
                }
            });
        });
    }

    // Scroll Progress
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.height = scrollPercent + '%';
        });
    }

    // Scroll Top
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            if (lenis) {
                lenis.scrollTo(0, { duration: 1.2 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Marquee duplication
    const marquees = document.querySelectorAll('.marquee-content');
    marquees.forEach(marquee => {
        const content = marquee.innerHTML;
        marquee.innerHTML = content + '&nbsp;&nbsp;&nbsp;&nbsp;' + content + '&nbsp;&nbsp;&nbsp;&nbsp;' + content;
    });
});
