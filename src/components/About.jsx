import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-cyber-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-cyber-red">About</span> <span className="text-white">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-cyber-red mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Who I am and what I do in the cyber world
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/3" data-aos="fade-right">
                        <div className="cyber-card p-6 rounded-lg">
                            <div className="text-cyber-red text-5xl mb-4">
                                <i className="fas fa-user-secret"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Cyber Developer</h3>
                            <p className="text-gray-400">
                                Specializing in creating secure, high-performance web applications with futuristic
                                aesthetics.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-1/3" data-aos="fade-up">
                        <div className="cyber-card p-6 rounded-lg">
                            <div className="text-cyber-blue text-5xl mb-4">
                                <i className="fas fa-code"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Code Artisan</h3>
                            <p className="text-gray-400">
                                Crafting clean, efficient, and maintainable code that stands the test of time.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-1/3" data-aos="fade-left">
                        <div className="cyber-card p-6 rounded-lg">
                            <div className="text-cyber-purple text-5xl mb-4">
                                <i className="fas fa-lightbulb"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Innovator</h3>
                            <p className="text-gray-400">
                                Constantly exploring new technologies and pushing the boundaries of web development.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1" data-aos="fade-right">
                        <h3 className="text-2xl font-bold mb-6">
                            The <span className="text-cyber-red">RedWolf</span> Story
                        </h3>
                        <p className="text-gray-400 mb-4">
                            My journey into the digital realm began at a young age, fascinated by the endless
                            possibilities of technology.
                            What started as a hobby quickly evolved into a passion for creating immersive web
                            experiences.
                        </p>
                        <p className="text-gray-400 mb-4">
                            Under the alias <span className="text-cyber-red font-mono">RedWolf</span>, I combine technical
                            expertise with creative vision to build applications that are not only functional
                            but also visually striking and engaging.
                        </p>
                        <p className="text-gray-400">
                            When I'm not coding, you can find me exploring the latest in cyber security, contributing to
                            open-source projects,
                            or mentoring aspiring developers in the digital wilderness.
                        </p>
                    </div>

                    <div className="order-1 md:order-2" data-aos="fade-left">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-cyber-red opacity-20 rounded-xl blur-lg"></div>
                            <div className="relative cyber-glass rounded-lg overflow-hidden">
                                <img src="assets/images/about.png" alt="RedWolf at work" className="w-full h-auto" />
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyber-dark to-transparent p-6">
                                    <h4 className="text-xl font-bold mb-2">Methsara Kosgollawaththa</h4>
                                    <p className="text-cyber-red font-mono">Founder of RedWolf Dynamic & Cyber Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
