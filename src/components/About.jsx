import React from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, Download } from "lucide-react";
import img from '../assets/samim.png'

const About = () => {
    return (
        <section id="about" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/20 overflow-hidden">
            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-square w-full max-w-md mx-auto">
                            <div className="absolute inset-0 bg-blue-500 rounded-3xl rotate-6 opacity-20 blur-xl"></div>
                            <img
                                src={img}
                                alt="Samim"
                                className="relative w-full h-full object-cover rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-2xl bg-slate-100 dark:bg-slate-800"
                            />
                            {/* Stats Floating Card */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl hidden md:flex items-center gap-3"
                            >
                                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">1+</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Year Experience</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                            About Me
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Transforming Ideas into <span className="text-purple-500">Digital Reality</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
                            Hi, I'm Samim, a passionate Full-Stack Developer dedicated to building efficient and scalable web applications.
                            I combine creativity with technical expertise to deliver user-centric solutions.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            My journey involves expertise in the MERN stack (MongoDB, Express, React, Node.js) along with Next.js for server-side rendering.
                            I'm constantly exploring new technologies to stay ahead in the ever-evolving tech landscape.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-600/25"
                            >
                                <Briefcase size={20} /> Hire Me
                            </a>
                            <a
                                href="https://drive.google.com/file/d/1b5pprp0se40NC4-2SPtC0Vb3eztColDq/view?usp=sharing"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold transition-all border border-slate-200 dark:border-slate-700"
                            >
                                <Download size={20} /> Download CV
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
