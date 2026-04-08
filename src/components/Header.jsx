import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { cn } from "../utils";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [theme, setTheme] = useState(localStorage.getItem("site-theme") || "dark");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section on scroll
    useEffect(() => {
        const sections = ["home", "about", "skills", "projects", "contact"];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.4 }
        );
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (theme === "light") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("site-theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("site-theme", "dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-500",
                    isScrolled
                        ? "py-3"
                        : "py-5 bg-transparent"
                )}
            >
                {/* Glassmorphic Background — only on scroll */}
                <AnimatePresence>
                    {isScrolled && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-white/80 dark:bg-[#030308]/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-sm dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]"
                        />
                    )}
                </AnimatePresence>

                {/* Gradient top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent pointer-events-none" />

                <div className="container relative flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="group flex items-center gap-1">
                        <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
                            Samim
                        </span>
                        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 transition-all">
                            .
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                                        isActive
                                            ? "text-blue-600 dark:text-blue-400"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                                    )}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-lg bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20"
                                            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-200 shadow-sm"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={theme}
                                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                                </motion.span>
                            </AnimatePresence>
                        </button>

                        {/* CV Button */}
                        <a
                            href="https://drive.google.com/file/d/16okLOsG4D9C9m3-JjJfSJmGPagyxf1VP/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold tracking-wide transition-all duration-200 shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-95 overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            <Download size={15} />
                            <span>Download CV</span>
                        </a>
                    </div>

                    {/* Mobile: Theme + Hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 transition-all"
                        >
                            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                        </button>
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isMenuOpen ? "close" : "open"}
                                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    exit={{ scale: 0, rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, clipPath: "inset(0 0 100% 0)" }}
                        animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                        exit={{ opacity: 0, y: -10, clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-x-0 top-[64px] z-40 md:hidden bg-white/95 dark:bg-[#030308]/98 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 shadow-xl"
                    >
                        {/* Gradient accent at top of mobile menu */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

                        <nav className="container py-6 flex flex-col gap-1">
                            {navLinks.map((link, i) => {
                                const isActive = activeSection === link.href.slice(1);
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all",
                                            isActive
                                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                        )}
                                    >
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                        )}
                                        {link.name}
                                    </motion.a>
                                );
                            })}

                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5">
                                <a
                                    href="https://drive.google.com/file/d/16okLOsG4D9C9m3-JjJfSJmGPagyxf1VP/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-sm tracking-wide shadow-[0_4px_15px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.01] active:scale-95"
                                >
                                    <Download size={16} />
                                    Download CV
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </>
    );
};

export default Header;
