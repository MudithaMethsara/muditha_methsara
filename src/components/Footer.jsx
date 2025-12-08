import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 cyber-glass">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <a href="#home" className="flex items-center space-x-2">
                            <span className="text-2xl font-mono font-bold text-cyber-red">RED<span className="text-white">WOLF</span></span>
                        </a>
                        <p className="text-gray-400 mt-2 text-sm">
                            Crafting the future, one line of code at a time.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <div className="flex space-x-6 mb-4">
                            <a href="#" className="text-gray-400 hover:text-cyber-red transition">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyber-blue transition">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyber-purple transition">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyber-red transition">
                                <i className="fab fa-dribbble"></i>
                            </a>
                        </div>

                        <p className="text-gray-500 text-sm">
                            &copy; <span id="year">{currentYear}</span> Methsara Kosgollawaththa. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
