'use client'

import { motion } from 'framer-motion'
import { AnimatedElement } from "./AnimatedElement"
import { MapPin, Phone, Mail, Globe, Heart, Rocket, ArrowUp, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react'

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Startups', href: '/startups' },
        { name: 'Events', href: '/events' },
        { name: 'Team', href: '/team' },
        { name: 'Contact', href: '/contact' },
        { name: 'Admin', href: '/admin' }
    ]

    const socialLinks = [
        { name: 'LinkedIn', icon: Linkedin, href: '/', color: 'hover:bg-blue-600' },
        { name: 'Instagram', icon: Instagram, href: '/', color: 'hover:bg-pink-600' },
        { name: 'YouTube', icon: Youtube, href: '/', color: 'hover:bg-red-600' },
        { name: 'Facebook', icon: Facebook, href: '/', color: 'hover:bg-blue-700' },
        { name: 'Twitter', icon: Twitter, href: '/', color: 'hover:bg-sky-500' },
    ]

    return (
        <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.05, 0.1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
                />
            </div>

            <footer className="relative z-10">
                {/* Main Footer Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Branding Section */}
                        <AnimatedElement className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <motion.div
                                        animate={{
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                                    >
                                        <Rocket className="w-7 h-7 text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                            Startup Incubation
                                        </h3>
                                        <p className="text-xs text-gray-400">ICFAI University Tripura</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    Empowering the next generation of entrepreneurs with world-class mentorship,
                                    resources, and support to transform innovative ideas into successful businesses.
                                </p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            whileHover={{ scale: 1.1, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl ${social.color} transition-all duration-300 group`}
                                            aria-label={social.name}
                                        >
                                            <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatedElement>

                        {/* Quick Links */}
                        <AnimatedElement className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                                    Quick Links
                                </h3>
                                <ul className="space-y-3">
                                    {quickLinks.map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                                        >
                                            <a
                                                href={link.href}
                                                className="group flex items-center text-gray-300 hover:text-white transition-colors"
                                            >
                                                <motion.span
                                                    className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mr-0 group-hover:mr-2 transition-all duration-300"
                                                />
                                                {link.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatedElement>

                        {/* Contact Info */}
                        <AnimatedElement className="lg:col-span-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                                    Get in Touch
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">Address</h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                Kamalghat, Mohanpur<br />West Tripura - 799210, India
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">Phone</h4>
                                            <p className="text-sm text-gray-400">0381-2865752/62</p>
                                            <p className="text-sm text-gray-400">+91-8415952506</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MessageCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm ">Toll-free:</h4>
                                            <p className="text-l text-gray-400">1800-345-3673</p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm ">Website</h4>
                                            <a href="https://www.iutripura.in" target="_blank" rel="noopener noreferrer" className="text-l text-blue-400 hover:text-blue-300">
                                                www.iutripura.in
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatedElement>
                    </div>

                    {/* Map Section */}
                    <AnimatedElement className="mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none z-10" />
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.7385821714065!2d91.33594297490373!3d23.93430938169191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753f40b1e17beef%3A0x968fbf25214edf8d!2sICFAI%20University%20Tripura!5e0!3m2!1sen!2sin!4v1734284940094!5m2!1sen!2sin"
                                width="100%"
                                height="400"
                                style={{ border: "0" }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="relative z-0"
                            />
                        </motion.div>
                    </AnimatedElement>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col md:flex-row items-center justify-between gap-4"
                        >
                            <p className="text-sm text-gray-400 flex items-center gap-2">
                                © {new Date().getFullYear()} The ICFAI University, Tripura.
                                <span className="hidden sm:inline">Made with</span>
                                <Heart className="w-4 h-4 text-red-500 inline" />
                                <span className="hidden sm:inline">for entrepreneurs</span>
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                                <span>•</span>
                                <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            <motion.button
                onClick={scrollToTop}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
        </div>
    )
}

export default Footer