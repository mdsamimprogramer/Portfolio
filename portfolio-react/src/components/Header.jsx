import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { cn } from "../utils";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("site-theme") || "dark");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
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
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300",
                isScrolled
                    ? "bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <a href="#home" className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    Samim<span className="text-blue-500">.</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <a
                        href="https://drive.google.com/file/d/1-B8HQmXxlNnIUL3iwKd7ItLNIss0VUV0/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
                    >
                        <Download size={16} />
                        <span>CV</span>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden fixed inset-0 top-[60px] bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6"
                >
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
                        >
                            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
