import React, { useEffect, useState } from 'react';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const professions = [
        'Cyber Developer',
        'UI/UX Designer',
        'Security Specialist',
        'Code Artisan',
        'Tech Innovator'
    ];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % professions.length;
            const fullText = professions[i];

            setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }

            setTypingSpeed(isDeleting ? 100 : 150);
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, professions]);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
            <div className="container mx-auto px-6 py-20 md:py-32">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-12 md:mb-0" data-aos="fade-right">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="text-cyber-red">Hello,</span> I'm <span className="text-cyber-blue">Methsara</span>
                        </h1>
                        <div className="mb-6">
                            <h2 className="text-2xl md:text-3xl font-mono text-cyber-purple">
                                <span id="typing-text" className="typing-cursor">{text}</span>
                            </h2>
                        </div>
                        <p className="text-lg text-gray-300 mb-8 max-w-lg">
                            Crafting futuristic digital experiences with cutting-edge web technologies.
                            I bridge the gap between design and functionality to create immersive cyber experiences.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#contact"
                                className="cyber-button px-8 py-3 bg-cyber-red text-white rounded-md font-mono hover:bg-cyber-purple transition">
                                Get In Touch
                            </a>
                            <a href="/resum.html" target="_blank"
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                View Resume
                            </a>
                        </div>
                        <br /><br />
                        <div className="flex flex-wrap gap-4">
                            <a href="https://github.com/MudithaMethsara"
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                <i className="fab fa-github text-3xl text-gray-300"></i>
                            </a>
                            <a href="https://linkedin.com/in/muditha-methsara-189a07230"
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                <i className="fab fa-linkedin text-3xl text-gray-300"></i>
                            </a>
                            <a href="https://www.facebook.com/muditha.methsara.redwolf/"
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                <i className="fab fa-facebook text-3xl text-gray-300"></i>
                            </a>
                            <a href="https://www.instagram.com/muditha_methsara?igsh=MThzZXlnZjQ4bGhycw=="
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                <i className="fab fa-instagram text-3xl text-gray-300"></i>
                            </a>
                            <a href="https://steamcommunity.com/id/red_wolf_mudithamethsara/"
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                <i className="fab fa-steam text-3xl text-gray-300"></i>
                            </a>
                            <a href=""
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                <i className="fas fa-gamepad text-3xl text-gray-300"></i>
                            </a>
                            <a href=""
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                <i className="fab fa-spotify text-3xl text-gray-300"></i>
                            </a>
                            <a href="https://discord.com/users/muditha_methsara"
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                <i className="fab fa-discord text-3xl text-gray-300"></i>
                            </a>
                            <a href="https://wa.me/94726125275"
                                className="cyber-button px-8 py-3 border border-cyber-red text-cyber-red rounded-md font-mono hover:bg-cyber-red hover:text-white transition">
                                <i className="fab fa-whatsapp text-3xl text-gray-300"></i>
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center" data-aos="fade-left">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div
                                className="absolute inset-0 bg-cyber-red opacity-20 rounded-full blur-xl animate-pulse-slow">
                            </div>
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyber-red">
                                <img src="assets/images/profile.jpg" alt="Methsara Kosgollawaththa"
                                    className="w-full h-full object-cover" />
                            </div>
                            <div
                                className="absolute -bottom-5 -right-5 bg-cyber-dark p-3 rounded-full border-2 border-cyber-blue">
                                <div className="text-cyber-blue text-2xl animate-spin-slow">
                                    <img src="assets/images/logoRounded.png" alt="" style={{ width: '50px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
