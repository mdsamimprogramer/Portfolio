import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Facebook, Github, Linkedin, Mail } from "lucide-react";
import img from '../assets/me.png';

const Hero = () => {
    const techStack = [
        "HTML5", "CSS3", "Tailwind", "Bootstrap", "JavaScript", "React.js", "Next.js",
        "Node.js", "Express.js", "MongoDB", "Firebase", "Git", "Vercel"
    ];

    return (
        <section id="home" className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden text-slate-900 dark:text-slate-50">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10" />

            <div className="container grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Available for opportunities
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Samim</span>
                        <span className="block text-2xl lg:text-4xl text-slate-600 dark:text-slate-400 font-medium mt-4">MERN-Stack Developer</span>
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        Building modern, scalable web applications with
                        <span className="text-slate-900 dark:text-slate-100 font-semibold"> React</span>,
                        <span className="text-slate-900 dark:text-slate-100 font-semibold"> Next.js</span>, and
                        <span className="text-slate-900 dark:text-slate-100 font-semibold"> Node.js</span>.
                        Focused on creating intuitive user experiences and performant backend systems.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mb-12">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/25"
                        >
                            Get In Touch <ArrowRight size={20} />
                        </a>
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold transition-all hover:scale-105 border border-slate-200 dark:border-slate-700 shadow-sm"
                        >
                            View Work
                        </a>
                    </div>

                    <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
                        <a href="https://github.com/mdsamimprogramer" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Github size={24} /></a>
                        <a href="https://www.linkedin.com/in/samim01/" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
                        <a href="https://www.facebook.com/md.samim.khan.22906" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Facebook size={24} /></a>
                        <a href="mailto:mdsamimhossen827@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Mail size={24} /></a>
                    </div>
                </motion.div>

                {/* Premium Professional Image Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex justify-center lg:justify-end perspective-[1000px] w-full"
                >
                    <div className="relative w-[280px] sm:w-72 lg:w-96 aspect-[4/5] sm:aspect-square group">
                        {/* 3D Animated Ambient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] rotate-6 opacity-30 blur-[40px] group-hover:opacity-50 group-hover:rotate-12 transition-all duration-700 animate-pulse"></div>

                        {/* Stylish AAA Corner Accents */}
                        <div className="absolute -top-4 -left-4 w-10 h-10 border-t-4 border-l-4 border-blue-500 rounded-tl-xl z-20 transition-all duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:border-purple-400 opacity-80 backdrop-blur-sm"></div>
                        <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-4 border-r-4 border-purple-500 rounded-br-xl z-20 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-blue-400 opacity-80 backdrop-blur-sm"></div>

                        {/* Image Wrapper */}
                        <div className="relative z-10 w-full h-full p-2 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 dark:border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-[1.02] flex items-center justify-center">
                            <img
                                src={img}
                                alt="Samim - Professional Developer"
                                className="w-full h-full object-contain rounded-[2rem] bg-slate-100 dark:bg-slate-900 grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Premium Inner Ring Refraction */}
                            <div className="absolute inset-2 rounded-[2rem] ring-1 ring-inset ring-white/40 dark:ring-white/10 pointer-events-none" />
                        </div>

                        {/* Floating Glassmorphic Badge */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="absolute -bottom-6 -left-8 lg:-left-12 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white shadow-lg shadow-blue-500/30">
                                    <span className="text-xl font-bold">10+</span>
                                </div>
                                <div className="text-sm pr-2">
                                    <p className="font-bold text-slate-900 dark:text-slate-100 text-base">Projects</p>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">Completed</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Secondary Tech Badge */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="absolute -top-6 -right-4 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-2xl group-hover:translate-y-2 transition-transform duration-500"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">MERN Stack</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Tech Ribbon */}
            <div className="absolute bottom-0 w-full border-t border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden py-4">
                <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
                    {/* Duplicated list for seamless scroll (implementation requires custom animation config in tailwind) */}
                    {[...techStack, ...techStack].map((tech, index) => (
                        <span key={index} className="text-slate-600 dark:text-slate-400 font-medium text-sm lg:text-base flex items-center gap-2 px-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span> {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;