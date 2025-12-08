import React, { useEffect } from 'react';

const Skills = () => {
    useEffect(() => {
        const handleScroll = () => {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

                if (isVisible && !bar.dataset.animated) {
                    const target = bar.getAttribute('data-progress') || bar.style.width || '0%';

                    bar.style.left = '0';
                    bar.style.right = 'auto';
                    bar.style.transform = 'none';

                    bar.style.width = '0';
                    // eslint-disable-next-line no-unused-expressions
                    void bar.offsetWidth;
                    bar.style.width = target;

                    bar.dataset.animated = 'true';
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on load
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const technicalSkills = [
        { name: 'HTML5 / CSS3', progress: '95%' },
        { name: 'JavaScript (ES6+)', progress: '90%' },
        { name: 'React.js', progress: '85%' },
        { name: 'Node.js', progress: '80%' },
        { name: 'Tailwind CSS', progress: '92%' },
    ];

    const additionalSkills = [
        { name: 'UI/UX Design', progress: '88%' },
        { name: 'Cyber Security', progress: '75%' },
        { name: 'DevOps', progress: '70%' },
        { name: 'Project Management', progress: '82%' },
        { name: 'Technical Writing', progress: '85%' },
    ];

    const tools = [
        { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
        { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
        { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-400' },
        { name: 'React', icon: 'fab fa-react', color: 'text-cyan-400' },
        { name: 'Node.js', icon: 'fab fa-node-js', color: 'text-green-500' },
        { name: 'Tailwind', img: 'https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000' },
        { name: 'Git', icon: 'fab fa-git-alt', color: 'text-orange-600' },
        { name: 'GitHub', icon: 'fab fa-github', color: 'text-gray-300' },
        { name: 'Figma', icon: 'fab fa-figma', color: 'text-purple-500' },
        { name: 'AWS', icon: 'fas fa-server', color: 'text-green-400' },
        { name: 'MongoDB', icon: 'fas fa-database', color: 'text-blue-400' },
        { name: 'Security', icon: 'fas fa-shield-alt', color: 'text-yellow-500' },
    ];

    return (
        <section id="skills" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        My <span className="text-cyber-red">Skills</span>
                    </h2>
                    <div className="w-20 h-1 bg-cyber-red mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        The tools and technologies I wield to craft digital experiences
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div data-aos="fade-right">
                        <h3 className="text-2xl font-bold mb-6">
                            Technical <span className="text-cyber-red">Expertise</span>
                        </h3>

                        <div className="space-y-6">
                            {technicalSkills.map((skill) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-mono">{skill.name}</span>
                                        <span className="text-cyber-red">{skill.progress}</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div className="skill-progress" data-progress={skill.progress} style={{ width: 0 }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div data-aos="fade-left">
                        <h3 className="text-2xl font-bold mb-6">
                            Additional <span className="text-cyber-blue">Skills</span>
                        </h3>

                        <div className="space-y-6">
                            {additionalSkills.map((skill) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-mono">{skill.name}</span>
                                        <span className="text-cyber-blue">{skill.progress}</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div className="skill-progress" data-progress={skill.progress} style={{ width: 0 }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="mt-16" data-aos="fade-up">
                    <h3 className="text-2xl font-bold mb-6 text-center">
                        Tools & <span className="text-cyber-purple">Technologies</span>
                    </h3>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                        {tools.map((tool, index) => (
                            <div
                                key={index}
                                className="cyber-card p-4 rounded-lg flex flex-col items-center justify-center hover:bg-cyber-dark transition">
                                {tool.icon ? (
                                    <i className={`${tool.icon} text-4xl ${tool.color} mb-2`}></i>
                                ) : (
                                    <img src={tool.img} alt={tool.name} className="w-8 h-8 mb-2" />
                                )}
                                <span className="font-mono text-sm">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
