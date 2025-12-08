import React, { useEffect } from 'react';
// import Particles from 'particles.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Particles initialization removed due to strict mode incompatibility


    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  const scrollToTop = () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  };

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div id="preloader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-dark transition-opacity duration-500">
          <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyber-red mb-4">
              </div>
              <h2 className="text-2xl font-mono font-bold text-cyber-red animate-pulse">REDWOLF</h2>
              <p className="text-cyber-blue mt-2">Loading cyber systems...</p>
          </div>
      </div>
    );
  }

  return (
    <div className="antialiased">

      {/* Particles Background */}
      <div id="particles-js"></div>

      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        {/* <Projects /> */}
        <Contact />
      </main>

      <Footer />

      {/* Back to Top Button */}
      <button id="back-to-top"
          className="fixed bottom-8 right-8 bg-cyber-red text-white p-3 rounded-full shadow-lg opacity-0 invisible transition-all duration-300 z-50" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}

export default App;
