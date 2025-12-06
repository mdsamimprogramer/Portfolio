import React, { useState, useEffect } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShrunk, setIsShrunk] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("site-theme") || "dark");

    useEffect(() => {
        // Header shrink
        const handleScroll = () => {
            const heroH = document.getElementById("hero")?.getBoundingClientRect().height || 300;
            if (window.scrollY > heroH - 80) {
                setIsShrunk(true);
            } else {
                setIsShrunk(false);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Theme toggle
        if (theme === "light") {
            document.body.classList.add("light");
            localStorage.setItem("site-theme", "light");
        } else {
            document.body.classList.remove("light");
            localStorage.setItem("site-theme", "dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={`header-wrap ${isShrunk ? "shrink" : ""}`} id="headerWrap">
            <div className="header-inner">
                <div className="logo">Samim.</div>

                <button
                    className="hamburger"
                    id="hamburger"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                >
                    ☰
                </button>

                <nav className={`nav ${isMenuOpen ? "open" : ""}`} id="mainNav" aria-label="Primary navigation">
                    <a className="nav-link" href="#home" onClick={closeMenu}>Home</a>
                    <a className="nav-link" href="#about" onClick={closeMenu}>About</a>
                    <a className="nav-link" href="#skills" onClick={closeMenu}>Skills</a>
                    <a className="nav-link" href="#projects" onClick={closeMenu}>Projects</a>
                    <a className="nav-link" href="#contact" onClick={closeMenu}>Contact</a>
                </nav>

                <div className="header-actions" role="group" aria-label="Header actions">
                    <button
                        id="themeToggle"
                        className="theme-btn"
                        aria-pressed={theme === "light"}
                        title="Toggle light/dark"
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? "🌞" : "🌙"}
                    </button>

                    <a className="btn btn--cv" href="https://drive.google.com/file/d/1b5pprp0se40NC4-2SPtC0Vb3eztColDq/view?usp=sharing" download aria-label="Download CV">
                        Download CV
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
