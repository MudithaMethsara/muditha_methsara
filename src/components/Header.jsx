import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let current = '';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY + 100 >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        // { name: 'Projects', href: '#projects' }, // Commented out in original
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header className="fixed w-full z-40 cyber-glass">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Brand Logo */}
                    <a href="#home" className="flex items-center space-x-2">
                        <span className="text-2xl font-mono font-bold text-cyber-red">RED<span className="text-white">WOLF</span></span>
                    </a>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button id="mobile-menu-button" className="text-cyber-red focus:outline-none" onClick={toggleMenu}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`nav-link text-white hover:text-cyber-red transition ${activeSection === link.href.substring(1) ? 'active text-cyber-red' : ''}`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button id="theme-toggle" className="text-cyber-red hover:text-cyber-blue transition" onClick={toggleTheme}>
                            <i className={`fas ${isDark ? 'fa-moon' : 'fa-sun'}`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4 pb-4`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="block py-2 text-white hover:text-cyber-red transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button id="theme-toggle-mobile" className="mt-2 text-cyber-red hover:text-cyber-blue transition" onClick={toggleTheme}>
                        <i className={`fas ${isDark ? 'fa-moon' : 'fa-sun'}`}></i> Toggle Theme
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
