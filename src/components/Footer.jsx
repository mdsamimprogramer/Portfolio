import React from "react";
import { motion } from "framer-motion";
import { Facebook, Github, Linkedin, Mail, Twitter, MapPin, ArrowUpRight, Heart } from "lucide-react";

const Footer = () => {
    const year = new Date().getFullYear();

    const quickLinks = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
    ];

    const socials = [
        { icon: Github, href: "https://github.com/mdsamimprogramer", label: "GitHub" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/samim01/", label: "LinkedIn" },
        { icon: Facebook, href: "https://www.facebook.com/md.samim.khan.22906", label: "Facebook" },
    ];

    return (
        <footer className="relative overflow-hidden bg-slate-100 dark:bg-[#030308] border-t border-slate-200 dark:border-white/5 text-slate-900 dark:text-slate-50">
            {/* Ambient Glows */}
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Decorative Top Divider Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="container relative z-10 pt-16 pb-8">

                {/* Main Grid */}
                <div className="grid md:grid-cols-12 gap-12 mb-16">

                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-5"
                    >
                        <a href="#home" className="inline-block mb-5">
                            <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                Samim
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">.</span>
                            </span>
                        </a>
                        <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-8 text-sm md:text-base">
                            Building modern, scalable digital experiences with clean code and exceptional design.
                            Let's transform your vision into reality.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="group flex items-center justify-center w-11 h-11 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] shadow-sm"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="md:col-span-3"
                    >
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-4 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="group flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
                                    >
                                        <ArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-blue-500" />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-4"
                    >
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-4 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
                            Get In Touch
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:mdsamimhossen827@gmail.com"
                                    className="group flex items-start gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                                        <Mail size={15} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-sm font-medium leading-tight pt-1">
                                        mdsamimhossen827@gmail.com
                                    </span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                                <div className="mt-0.5 w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <MapPin size={15} className="text-purple-600 dark:text-purple-400" />
                                </div>
                                <span className="text-sm font-medium leading-tight pt-1">
                                    Rangpur, Bangladesh
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="relative border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Gradient line above bottom bar */}
                    <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                    <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
                        © {year} <span className="font-semibold text-slate-700 dark:text-slate-300">Samim</span>. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
                        Crafted with <Heart size={14} className="text-red-500 animate-pulse fill-red-500" /> using React & Tailwind
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
