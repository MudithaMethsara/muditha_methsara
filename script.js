document.addEventListener('DOMContentLoaded', () => {
    // 0. Ensure Ambient Glass Orbs, HUD telemetry, and Thread SVG exist on every page
    if (!document.querySelector('.glass-orb-container')) {
        const orbContainer = document.createElement('div');
        orbContainer.className = 'glass-orb-container';
        orbContainer.setAttribute('aria-hidden', 'true');
        orbContainer.innerHTML = `
            <div class="glass-orb glass-orb-1"></div>
            <div class="glass-orb glass-orb-2"></div>
        `;
        document.body.appendChild(orbContainer);
    }

    if (!document.querySelector('.hud-tl')) {
        const hudContainer = document.createElement('div');
        hudContainer.className = 'hud-telemetry';
        hudContainer.innerHTML = `
            <div class="hud-corner hud-tl"><span class="text-accent">CAM_04 [REC]</span> &nbsp;SIGNAL_STRONG</div>
            <div class="hud-corner hud-tr"><span id="hudClock">00:00:00:00</span><br/><span>ISO 800 [LIVE_FEED]</span></div>
            <div class="hud-corner hud-bl"><span class="live-dot"></span> <span>SECURE NETWORK LINK</span></div>
            <div class="hud-corner hud-br"><span>SYS. DIAGNOSTIC</span><br/><span class="text-accent">STABLE // 2026</span></div>
        `;
        document.body.appendChild(hudContainer);
    }

    if (!document.querySelector('.thread-container')) {
        const threadContainer = document.createElement('div');
        threadContainer.className = 'thread-container';
        threadContainer.innerHTML = `
            <svg id="threadSvg" width="100%" height="100%" preserveAspectRatio="none">
                <path id="redLine" class="thread-line" d="M 0 0 Q 200 200 400 400" />
            </svg>
        `;
        document.body.appendChild(threadContainer);
    }

    // 0.5 Update HUD Telemetry Clock
    const hudClock = document.getElementById('hudClock');
    if (hudClock) {
        setInterval(() => {
            const now = new Date();
            const hrs = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            const secs = String(now.getSeconds()).padStart(2, '0');
            const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
            hudClock.textContent = `${hrs}:${mins}:${secs}:${ms}`;
        }, 50);
    }

    // 1. Smooth Inertial Scrolling (Lenis)
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

    // Register GSAP Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 1.5 Signature Loader Control
    const loader = document.getElementById('loader');
    if (loader) {
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
        if (isHomePage && !sessionStorage.getItem('loaderPlayed')) {
            setTimeout(() => {
                loader.classList.add('hidden');
                sessionStorage.setItem('loaderPlayed', 'true');
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            }, 1800);
        } else {
            loader.style.display = 'none';
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }
    }

    // 2. Detective Crosshair Cursor & Interactive Red Evidence Thread
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        const cursorData = document.createElement('div');
        cursorData.classList.add('cursor-data');
        document.body.appendChild(cursorData);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        Object.assign(cursor.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            border: '1.5px solid var(--accent-primary)',
            boxShadow: '0 0 15px var(--accent-glow), inset 0 0 8px var(--accent-glow)',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease',
            backdropFilter: 'blur(2px)'
        });

        const redLine = document.getElementById('redLine');

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorData.textContent = `X: ${Math.round(mouseX)} Y: ${Math.round(mouseY)}`;
        });

        if (typeof gsap !== 'undefined') {
            gsap.ticker.add(() => {
                const dt = 1.0 - Math.pow(1.0 - 0.25, gsap.ticker.deltaRatio());
                cursorX += (mouseX - cursorX) * dt;
                cursorY += (mouseY - cursorY) * dt;
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
                cursorData.style.transform = `translate3d(${cursorX + 16}px, ${cursorY + 16}px, 0)`;

                // Update Red Evidence Thread SVG Path
                if (redLine) {
                    const startX = 180;
                    const startY = 35;
                    const controlX = (startX + cursorX) / 2 + (mouseY * 0.1);
                    const controlY = (startY + cursorY) / 2 + (mouseX * 0.1);
                    redLine.setAttribute('d', `M ${startX} ${startY} Q ${controlX} ${controlY} ${cursorX} ${cursorY}`);
                }
            });
        }

        const interactables = document.querySelectorAll('a, button, .card, .tab-pill, .social-icon, input, textarea');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '48px';
                cursor.style.height = '48px';
                cursor.style.backgroundColor = 'rgba(255, 46, 76, 0.15)';
                cursor.style.borderColor = 'var(--accent-cyan)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '26px';
                cursor.style.height = '26px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = 'var(--accent-primary)';
                if (typeof gsap !== 'undefined') {
                    gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power3.out' });
                }
            });
        });

        // Magnetic Hover Effect
        const magnetics = document.querySelectorAll('.btn, .social-icon, .theme-toggle, .scroll-top, .badge-3d-access');
        magnetics.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const h = rect.width / 2;
                const v = rect.height / 2;
                const x = e.clientX - rect.left - h;
                const y = e.clientY - rect.top - v;

                if (typeof gsap !== 'undefined') {
                    gsap.to(el, {
                        x: x * 0.35,
                        y: y * 0.35,
                        duration: 0.4,
                        ease: 'power3.out'
                    });
                }
            });
        });

        // 3D Tilt Effect on Cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        rotationX: rotateX,
                        rotationY: rotateY,
                        transformPerspective: 1000,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    // 3. Signature Neural Systems Canvas Background
    const canvas = document.getElementById('neural-flow-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let nodes = [];
        let mouse = { x: null, y: null };
        const NODE_COUNT = 85;
        const CONNECTION_DIST = 160;

        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2';
        canvas.style.pointerEvents = 'none';

        function resize() {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            initNodes();
        }

        function initNodes() {
            nodes = [];
            for (let i = 0; i < NODE_COUNT; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                    size: Math.random() * 2 + 1
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            const scrollY = window.scrollY || 0;

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                const py = node.y - (scrollY * 0.15);

                let distToMouse = 9999;
                if (mouse.x !== null) {
                    const dx = mouse.x - node.x;
                    const dy = mouse.y - py;
                    distToMouse = Math.sqrt(dx * dx + dy * dy);
                }

                // Connections
                for (let j = i + 1; j < nodes.length; j++) {
                    const node2 = nodes[j];
                    const py2 = node2.y - (scrollY * 0.15);
                    const dx = node.x - node2.x;
                    const dy = py - py2;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DIST) {
                        let alpha = (1 - dist / CONNECTION_DIST) * 0.45;
                        if (distToMouse < 180) alpha += 0.35;

                        ctx.lineWidth = alpha * 1.5;
                        ctx.strokeStyle = `rgba(255, 46, 76, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(node.x, py);
                        ctx.lineTo(node2.x, py2);
                        ctx.stroke();
                    }
                }

                // Node Point Glow
                ctx.fillStyle = distToMouse < 120 ? '#00F0FF' : '#FF2E4C';
                const r = distToMouse < 120 ? node.size * 2 : node.size;
                ctx.beginPath();
                ctx.arc(node.x, py, r, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        if (canvas.parentElement) {
            canvas.parentElement.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            canvas.parentElement.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }

        resize();
        draw();
    }

    // 4. GSAP Scroll Animations & Text Reveals
    if (typeof gsap !== 'undefined') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!prefersReducedMotion) {
            // Hero Title Special Reveal
            const heroTitle = document.querySelector('.hero .hero-title');
            if (heroTitle) {
                const words = heroTitle.innerText.split(' ');
                heroTitle.innerHTML = '';
                words.forEach(word => {
                    const mask = document.createElement('span');
                    mask.className = 'reveal-mask';
                    mask.innerHTML = `<span class="reveal-text">${word}&nbsp;</span>`;
                    heroTitle.appendChild(mask);
                });
            }

            // Global Header Load Sequence
            const tl = gsap.timeline();
            tl.fromTo('.navbar', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
                .fromTo('.logo', { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.5")
                .fromTo('.sidebar-left', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.5")
                .fromTo('.header-cta', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.5");

            if (heroTitle) {
                tl.fromTo('.hero .reveal-text',
                    { yPercent: 100 },
                    { yPercent: 0, duration: 1.0, stagger: 0.05, ease: 'power4.out' },
                    "-=0.4"
                )
                .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
                .fromTo('.hero .hero-actions', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, "-=0.4");
            }

            // Scroll Triggers for Elements
            const fadeElements = document.querySelectorAll('.fade-in-up');
            fadeElements.forEach(el => {
                gsap.fromTo(el,
                    { opacity: 0, y: 35 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 92%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Grid Cards Parallax & Stagger
            const grids = document.querySelectorAll('.grid-2, .grid-3, .grid-4');
            grids.forEach(grid => {
                const gridCards = grid.querySelectorAll('.card');
                gsap.fromTo(gridCards,
                    { opacity: 0, y: 45 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.1,
                        duration: 0.85,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: grid,
                            start: 'top 85%',
                        }
                    }
                );
            });

            // Chapter Counter Rail ScrollSpy Tracking
            const chapters = document.querySelectorAll('[id^="ch-"], #hero, #featured-projects, #services-mini');
            const railItems = document.querySelectorAll('.chapter-rail li');

            if (chapters.length > 0 && railItems.length > 0) {
                chapters.forEach(sec => {
                    ScrollTrigger.create({
                        trigger: sec,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        onEnter: () => updateRail(sec.id),
                        onEnterBack: () => updateRail(sec.id)
                    });
                });

                function updateRail(id) {
                    railItems.forEach(item => {
                        const targetCh = item.getAttribute('data-ch');
                        if (id.includes(targetCh)) {
                            item.classList.add('is-active');
                        } else {
                            item.classList.remove('is-active');
                        }
                    });
                }
            }
        }
    }

    // 5. Sliding Navigation Indicator
    const navItems = document.querySelectorAll('.nav-item');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navbar = document.querySelector('.navbar');

    if (navbar && navItems.length > 0) {
        const indicator = document.createElement('div');
        indicator.classList.add('nav-indicator');
        Object.assign(indicator.style, {
            position: 'absolute',
            bottom: '0',
            height: '3px',
            borderRadius: '3px',
            backgroundColor: 'var(--accent-primary)',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 12px var(--accent-glow)'
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

        setTimeout(() => updateIndicator(activeItem), 120);
        window.addEventListener('resize', () => updateIndicator(activeItem));
    }

    // 6. Real Theme Toggle System (Dark Obsidian / Light Crystal Glass)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.textContent = '☀';
        }

        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            if (typeof gsap !== 'undefined') {
                gsap.fromTo(document.body,
                    { opacity: 0.85 },
                    { opacity: 1, duration: 0.4, ease: 'power2.out' }
                );
            }

            themeToggle.textContent = isLight ? '☀' : '☾';
        });
    }

    // 7. Tab Pill Project Filtering with GSAP Stagger
    const tabPills = document.querySelectorAll('.tab-pill');
    if (tabPills.length > 0) {
        tabPills.forEach(pill => {
            pill.addEventListener('click', () => {
                const parentContainer = pill.parentElement;
                if (!parentContainer) return;

                const siblings = parentContainer.querySelectorAll('.tab-pill');
                siblings.forEach(s => s.classList.remove('active'));
                pill.classList.add('active');

                if (parentContainer.id === 'project-filters') {
                    const filter = pill.getAttribute('data-filter');
                    const cards = document.querySelectorAll('.project-card');

                    if (typeof gsap !== 'undefined') {
                        gsap.to(cards, {
                            opacity: 0,
                            scale: 0.94,
                            duration: 0.25,
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

                                if (visibleCards.length > 0) {
                                    gsap.fromTo(visibleCards,
                                        { opacity: 0, scale: 0.94, y: 25 },
                                        { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
                                    );
                                }
                            }
                        });
                    }
                }
            });
        });
    }

    // 8. Scroll Progress Rail
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.height = scrollPercent + '%';
        });
    }

    // 9. Scroll to Top Button
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

    // 10. GSAP Scroll-Driven Infinite Marquee
    const marquees = document.querySelectorAll('.marquee-container');
    marquees.forEach(container => {
        const content = container.querySelector('.marquee-content');
        if (content && typeof gsap !== 'undefined') {
            content.innerHTML = content.innerHTML + content.innerHTML;

            let proxy = { skew: 0 };
            let skewSetter = gsap.quickSetter(content, "skewX", "deg");
            let clamp = gsap.utils.clamp(-12, 12);

            ScrollTrigger.create({
                onUpdate: (self) => {
                    let skew = clamp(self.getVelocity() / -120);
                    if (Math.abs(skew) > Math.abs(proxy.skew)) {
                        proxy.skew = skew;
                        gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
                    }
                }
            });

            gsap.set(content, { transformOrigin: "center center", force3D: true });

            gsap.to(content, {
                xPercent: -50,
                ease: "none",
                duration: 24,
                repeat: -1
            });
        }
    });
});
