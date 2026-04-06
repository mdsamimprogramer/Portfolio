import React from "react";
import { motion } from "framer-motion";

const skillsData = [
    { name: "React.js", pct: 90 },
    { name: "Next.js", pct: 85 },
    { name: "JavaScript", pct: 90 },
    { name: "Node.js", pct: 80 },
    { name: "MongoDB", pct: 75 },
    { name: "Express.js", pct: 80 },
    { name: "Git & GitHub", pct: 85 },
    { name: "Firebase", pct: 80 },
    { name: "Tailwind CSS", pct: 95 },
    { name: "Bootstrap", pct: 85 },
    { name: "Figma", pct: 70 },
];

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-slate-50/50 dark:bg-slate-900/40 relative z-10">
            <div className="container">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4"
                    >
                        Expertise
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
                    >
                        My Technical <span className="text-purple-500">Skills</span>
                    </motion.h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A comprehensive overview of the technologies and tools I've mastered.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/10 group"
                        >
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="font-semibold text-slate-900 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{skill.name}</h3>
                                <span className="text-sm font-mono text-purple-400">{skill.pct}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.pct}%` }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
