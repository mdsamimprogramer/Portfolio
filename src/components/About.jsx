import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, Download, Code, Cpu } from "lucide-react";
import img from '../assets/me3.png'

const About = () => {
    return (
        <section id="about" className="py-24 relative overflow-hidden text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-[#030308]">
            {/* Ambient Background Glows */}
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Subtle Grid Overlay for AAA Aesthetic */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-screen"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34h-58.34l-.83-.83L0 54.628v-58.34h58.34l.83.83z' fill='currentColor' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                    maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)"
                }}
            />

            <div className="container relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                    {/* PREMIUM IMAGE SECTION */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative flex justify-center perspective-[1000px] order-2 lg:order-1"
                    >
                        <div className="relative w-full max-w-[400px] lg:max-w-[450px] aspect-[4/5] sm:aspect-square group mx-auto">
                            {/* Animated Ambient Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] rotate-6 opacity-30 blur-[40px] group-hover:opacity-50 group-hover:rotate-12 transition-all duration-700 animate-pulse"></div>

                            {/* Stylish AAA Corner Accents */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-xl z-20 transition-all duration-500 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:border-purple-500 opacity-80 shadow-lg"></div>
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-purple-500 rounded-br-xl z-20 transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:border-blue-500 opacity-80 shadow-lg"></div>

                            {/* Glassmorphic Image Wrapper */}
                            <div className="relative z-10 w-full h-full p-2 bg-white/50 dark:bg-slate-800/40 backdrop-blur-md rounded-[3rem] border border-white/60 dark:border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-[1.02] flex items-center justify-center">
                                <img
                                    src={img}
                                    alt="Samim - Developer Profile"
                                    className="w-full h-full object-contain rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                                />
                                {/* Inner Refraction */}
                                <div className="absolute inset-2 rounded-[2.5rem] ring-1 ring-inset ring-white/40 dark:ring-white/10 pointer-events-none" />
                            </div>

                            {/* Floating Premium Badge 1 */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="absolute -bottom-8 -right-4 md:-right-8 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 shadow-2xl group-hover:-translate-y-2 transition-transform duration-500"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
                                    <Award size={24} />
                                </div>
                                <div className="pr-4">
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">1+</p>
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Year Exp.</p>
                                </div>
                            </motion.div>

                            {/* Floating Premium Badge 2 */}
                            <motion.div
                                initial={{ y: -30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="absolute -top-6 -left-4 md:-left-8 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl p-3.5 flex items-center gap-3 shadow-2xl group-hover:translate-y-2 transition-transform duration-500 hidden sm:flex"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <Code size={20} />
                                </div>
                                <div className="pr-3">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Full-Stack</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* CONTENT SECTION */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase shadow-sm">
                            <Cpu size={16} />
                            <span>About Me</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.15]">
                            Transforming Ideas into <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                                Digital Reality
                            </span>
                        </h2>

                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                            <p>
                                Hi, I'm Samim, a passionate Full-Stack Developer dedicated to building efficient and scalable web applications.
                                I combine creativity with technical expertise to deliver user-centric solutions.
                            </p>
                            <p>
                                My journey involves expertise in the <strong className="text-slate-900 dark:text-white">MERN stack</strong> (MongoDB, Express, React, Node.js)
                                along with <strong className="text-slate-900 dark:text-white">Next.js</strong> for server-side rendering.
                                I'm constantly exploring new technologies to stay ahead in the ever-evolving tech landscape.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-5 mt-10">
                            <a
                                href="#contact"
                                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-[1.02] shadow-[0_10px_20px_rgba(37,99,235,0.2)] dark:shadow-[0_0_30px_rgba(59,130,246,0.4)] active:scale-95 overflow-hidden"
                            >
                                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                <Briefcase size={18} /> Hire Me
                            </a>
                            <a
                                href="https://drive.google.com/file/d/16okLOsG4D9C9m3-JjJfSJmGPagyxf1VP/view?usp=sharing"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl font-bold text-sm tracking-wide transition-all hover:bg-slate-50 dark:hover:bg-white/10 dark:hover:border-white/20 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                            >
                                <Download size={18} className="text-blue-600 dark:text-purple-400" /> Download CV
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
};

export default About;
