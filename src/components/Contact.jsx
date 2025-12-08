import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
           // Should be handled by required attribute, but just in case
           return;
        }

        // Simulate submission
        const isSuccess = Math.random() > 0.3; // Keep the random logic from original script for now

        if (isSuccess) {
            setStatus({ type: 'success', message: 'Your message has been sent successfully!' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setStatus({ type: 'error', message: 'There was an error sending your message. Please try again later.' });
        }

        setTimeout(() => {
            const messageElement = document.getElementById(isSuccess ? 'form-success' : 'form-error');
            if(messageElement) messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get In <span className="text-cyber-red">Touch</span>
                    </h2>
                    <div className="w-20 h-1 bg-cyber-red mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or want to discuss potential opportunities? Reach out to me!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div data-aos="fade-right">
                        <h3 className="text-2xl font-bold mb-6">
                            Contact <span className="text-cyber-red">Information</span>
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="text-cyber-red text-xl mr-4 mt-1">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Email</h4>
                                    <a href="mailto:infomudithamethsara@gmail.com"
                                        className="text-gray-400 hover:text-cyber-red transition">infomudithamethsara@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="text-cyber-blue text-xl mr-4 mt-1">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Location</h4>
                                    <p className="text-gray-400">Nittambuwa, Sri Lanka</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="text-cyber-purple text-xl mr-4 mt-1">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Phone</h4>
                                    <a href="tel:+94726125275"
                                        className="text-gray-400 hover:text-cyber-purple transition">+94 72 612 5275</a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="text-cyber-yellow text-xl mr-4 mt-1">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Availability</h4>
                                    <p className="text-gray-400">Monday - Friday: 9AM - 5PM</p>
                                    <p className="text-gray-400">Weekends: By appointment</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-bold mb-4">Follow Me</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-cyber-red transition text-xl">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-cyber-blue transition text-xl">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-cyber-purple transition text-xl">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-cyber-red transition text-xl">
                                    <i className="fab fa-dribbble"></i>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-cyber-yellow transition text-xl">
                                    <i className="fab fa-stack-overflow"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div data-aos="fade-left">
                        <form id="contact-form" className="cyber-glass p-8 rounded-lg" onSubmit={handleSubmit} noValidate>
                            {/* Name */}
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-sm font-mono mb-2">Your Name</label>
                                <input type="text" id="name" name="name"
                                    className="w-full px-4 py-3 bg-cyber-dark border border-gray-700 rounded-md focus:outline-none focus:border-cyber-red transition"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-mono mb-2">Your Email</label>
                                <input type="email" id="email" name="email"
                                    className="w-full px-4 py-3 bg-cyber-dark border border-gray-700 rounded-md focus:outline-none focus:border-cyber-red transition"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Subject */}
                            <div className="mb-6">
                                <label htmlFor="subject" className="block text-sm font-mono mb-2">Subject</label>
                                <input type="text" id="subject" name="subject"
                                    className="w-full px-4 py-3 bg-cyber-dark border border-gray-700 rounded-md focus:outline-none focus:border-cyber-red transition"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Message */}
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-mono mb-2">Your Message</label>
                                <textarea id="message" name="message" rows="5"
                                    className="w-full px-4 py-3 bg-cyber-dark border border-gray-700 rounded-md focus:outline-none focus:border-cyber-red transition"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button type="submit"
                                className="cyber-button w-full px-6 py-3 bg-cyber-red text-white rounded-md font-mono hover:bg-cyber-purple transition">
                                Send Message
                                <i className="fas fa-paper-plane ml-2"></i>
                            </button>

                            {/* Success / Error Messages */}
                            {status.type === 'success' && (
                                <div id="form-success" className="mt-4 p-3 bg-green-900 text-green-300 rounded-md">
                                    <i className="fas fa-check-circle mr-2"></i>
                                    {status.message}
                                </div>
                            )}
                            {status.type === 'error' && (
                                <div id="form-error" className="mt-4 p-3 bg-red-900 text-red-300 rounded-md">
                                    <i className="fas fa-exclamation-circle mr-2"></i>
                                    {status.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
