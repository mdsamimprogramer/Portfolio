import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';

const projectsData = [
    {
        id: 6,
        title: "CareerFlow – SaaS Job Application Tracking Platform",
        description: "CareerFlow is a full-stack SaaS platform designed to help developers and job seekers manage their job applications efficiently. It includes a drag-and-drop Kanban pipeline for tracking applications, secure cloud storage for resumes, AI-powered feedback using the Gemini API to analyze job descriptions, automated email reminders for interviews and deadlines, Stripe-based subscription management, and a real-time analytics dashboard to monitor job search progress.",
        image: img6,
        tech: ["React.js", "Redux", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "REST API", "AI API", "Stripe", "Serverless Cron Jobs", "Email Automation", "Axios", "Kanban Drag & Drop"], repo: "https://github.com/mdsamimprogramer/careerflow-job-tracker",
        demo: "https://career-flow-six.vercel.app/"
    },
    {
        id: 1,
        title: "Contest Hub – Full-Stack Contest Management Platform",
        description: "ContestHub is a full-stack platform to explore, join, and win contests. It features role-based dashboards (Admin, Creator, User), secure authentication, payment-based participation, contest approval, winner declaration, and a leaderboard system. Built with React, Node.js, Express, MongoDB, Firebase Authentication, JWT, Stripe, and TanStack Query.",
        image: img4,
        tech: ["React.js", "Tailwind CSS", "DaisyUI", "Node.js", "Express.js", "MongoDB", "Firebase Auth", "JWT", "Stripe", "TanStack Query", "Role Based Dashboard"],
        repo: "https://github.com/mdsamimprogramer/ContestHub_Client",
        demo: "https://contests-hub.netlify.app/"
    },
    {
        id: 2,
        title: "HomeHero – Service Finder",
        description: "Connects users with trusted local service providers on a secure, responsive platform. Features booking management, rating system, and secure authentication.",
        image: img1,
        tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "CRUD Operation", "JWT", "REST API", "MongoDB", "Firebase"],
        repo: "https://github.com/mdsamimprogramer/homehero-a10-client",
        demo: "https://homehero-ass10.netlify.app/"
    },
    {
        id: 3,
        title: "GreenNest – Plant Care",
        description: "A plant care platform featuring secure login, profile management, and consultation bookings. Built with React and Firebase.",
        image: img2,
        tech: ["React.js", "Tailwind CSS", "Firebase", "Express.js", "MongoDB"],
        repo: "https://github.com/mdsamimprogramer/assinment-09-greennest-project",
        demo: "https://asinment-8.firebaseapp.com/"
    },
    {
        id: 4,
        title: "Nature's Platter",
        description: "Next.js application with NextAuth authentication and product management. precise UI implementation with Tailwind CSS.",
        image: img3,
        tech: ["Next.js", "NextAuth", "Tailwind CSS", "MongoDB", "Vercel"],
        repo: "https://github.com/mdsamimprogramer/next-js-client",
        demo: "https://next-js-client-vqte.vercel.app/"
    },
    {
        id: 5,
        title: "Productive-Apps AppGalaxy",
        description: "AppGalaxy is a modern, responsive App Showcase Platform that allows users to easily browse apps, view details, install/uninstall apps, and monitor app performance through interactive review charts.",
        image: img5,
        tech: ["React.js", "Tailwind CSS", "React Router DOM", "Firebase", "Recharts", "LocalStorage"],
        repo: "https://github.com/mdsamimprogramer/productive-apps",
        demo: "https://assinment-08-productive-apps.netlify.app/"
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
        >
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-300 rounded-md border border-slate-200 dark:border-slate-700">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <Github size={16} /> Code
                    </a>
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors ml-auto"
                    >
                        <ExternalLink size={16} /> Live Demo
                    </a>
                </div>
            </div>
        </motion.article>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-20 container">
            <div className="text-center mb-16">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
                >
                    My Work
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
                >
                    Featured <span className="text-blue-500">Projects</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                >
                    A collection of projects showcasing my journey in full-stack development, featuring responsive designs and secure backends.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
