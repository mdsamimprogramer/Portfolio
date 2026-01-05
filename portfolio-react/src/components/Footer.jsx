import React from "react";
import { Facebook, Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-900 pt-16 pb-8 relative z-10">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <a href="#home" className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-4 block">
                            Samim<span className="text-blue-600 dark:text-blue-500">.</span>
                        </a>
                        <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-6">
                            Building digital experiences with modern technologies.
                            Let's turn your vision into reality.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/mdsamimprogramer" aria-label="Github Profile" className="p-2 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/samim01/" aria-label="LinkedIn Profile" className="p-2 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.facebook.com/md.samim.khan.22906" aria-label="Facebook Profile" className="p-2 bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><a href="#home" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
                            <li><a href="#projects" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a></li>
                            <li><a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                <Mail size={18} className="text-blue-600 dark:text-blue-500" />
                                mdsamimhossen827@gmail.com
                            </li>
                            <li className="text-slate-600 dark:text-slate-400">
                                Rangpur, Bangladesh
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-900 pt-8 text-center">
                    <p className="text-slate-600 dark:text-slate-500 text-sm">
                        © {year} Samim. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
