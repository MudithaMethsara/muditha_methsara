document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Line
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.height = scrollPercent + '%';
        });
    }

    // Scroll to Top
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // Handle Active Nav State based on current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Marquee content duplication for seamless loop
    const marquees = document.querySelectorAll('.marquee-content');
    marquees.forEach(marquee => {
        const content = marquee.innerHTML;
        marquee.innerHTML = content + '&nbsp;&nbsp;&nbsp;&nbsp;' + content + '&nbsp;&nbsp;&nbsp;&nbsp;' + content;
    });

    // Tab pill functionality
    const tabPills = document.querySelectorAll('.tab-pill');
    tabPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Visual active state toggle
            const siblings = pill.parentElement.querySelectorAll('.tab-pill');
            siblings.forEach(s => s.classList.remove('active'));
            pill.classList.add('active');
            
            // Project filtering logic
            if (pill.parentElement.id === 'project-filters') {
                const filter = pill.getAttribute('data-filter');
                const cards = document.querySelectorAll('.project-card');
                
                cards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-category');
                        if (categories && categories.includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            }
        });
    });
});
