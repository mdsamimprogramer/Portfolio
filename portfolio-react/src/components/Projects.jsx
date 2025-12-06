import React, { useEffect, useRef } from "react";
import img1 from '../assets/1.png'
import img2 from '../assets/2.png'
import img3 from '../assets/3.png'

const Projects = () => {
    const revealRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    useEffect(() => {
        // Reveal
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18 }
        );

        revealRefs.current.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 10;
        const rotateX = (0.5 - y) * 7;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = "";
        card.style.transition = "transform 300ms ease";
    };

    const handleMouseEnter = (e) => {
        const card = e.currentTarget;
        card.style.transition = "transform 160ms ease";
    };

    return (
        <section className="projects container" id="projects">
            <div className="reveal" ref={addToRefs}>
                <span className="badge small">My Projects</span>
                <h2 className="section-title">
                    Showcasing my{" "}
                    <span style={{ color: "var(--accent)", fontWeight: 900 }}>
                        creative work
                    </span>
                </h2>
                <p className="muted">
                    Projects I've built while learning web development.
                </p>
            </div>

            <div className="projects-grid">
                <article
                    className="project-card reveal"
                    tabIndex="0"
                    ref={addToRefs}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                >
                    <div
                        className="project-media"
                        style={{
                            backgroundImage: `url(${img1})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                    <div className="project-body">
                        <h3>HomeHero – Service Finder</h3>
                        <p className="muted">
                            HomeHero connects users with trusted local service providers on a secure, responsive platform for seamless booking, rating, and management.
                        </p>
                        <div className="project-tags">
                            <span className="tag">React.js</span>
                            <span className="tag">React Router DOM</span>
                            <span className="tag">Tailwind CSS</span>
                            <span className="tag">DaisyUI</span>
                            <span className="tag">Node.js</span>
                            <span className="tag">Express.js</span>
                            <span className="tag">MongoDB</span>
                            <span className="tag">Firebase Auth</span>
                            <span className="tag">JWT</span>
                            <span className="tag">API</span>
                            <span className="tag">Vite</span>
                            <span className="tag">Git & GitHub</span>
                            <span className="tag">Vercel</span>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <a className="btn btn--ghost small" href="https://github.com/mdsamimprogramer/homehero-a10-client">
                                Code
                            </a>
                            <a className="btn btn--primary small" href="https://homehero-ass10.netlify.app/">
                                Demo
                            </a>
                        </div>
                    </div>
                </article>

                {/* 2 */}
                <article
                    className="project-card reveal"
                    tabIndex="0"
                    ref={addToRefs}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                >
                    <div
                        className="project-media"
                        style={{
                            backgroundImage: `url(${img2})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                    <div className="project-body">
                        <h3>GreenNest – Plant Care</h3>
                        <p className="muted">
                            A React project using React Router, Tailwind CSS, Firebase Auth, JSON Data, and Framer Motion/Swiper.js, featuring secure login, protected routes, profile updates, and a consultation booking form.                        </p>
                        <div className="project-tags">
                            <span className="tag">React.js</span>
                            <span className="tag">React Router DOM</span>
                            <span className="tag">Tailwind CSS</span>
                            <span className="tag">DaisyUI</span>
                            <span className="tag">Firebase Auth</span>
                            <span className="tag">Node.js</span>
                            <span className="tag">Express.js</span>
                            <span className="tag">MongoDB</span>
                            <span className="tag">JWT</span>
                            <span className="tag">API</span>
                            <span className="tag">JSON Data</span>
                            <span className="tag">Git & GitHub</span>
                        </div>


                        <div style={{ display: "flex", gap: "10px" }}>
                            <a className="btn btn--ghost small" href="https://github.com/mdsamimprogramer/assinment-09-greennest-project">
                                Code
                            </a>
                            <a className="btn btn--primary small" href="https://asinment-8.firebaseapp.com/">
                                Demo
                            </a>
                        </div>
                    </div>
                </article>
                {/* 3 */}
                <article
                    className="project-card reveal"
                    tabIndex="0"
                    ref={addToRefs}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                >
                    <div
                        className="project-media"
                        style={{
                            backgroundImage: `url(${img3})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                    <div className="project-body">
                        <h3>Nature's Platter (Next.js)</h3>
                        <p className="muted">
                            Nature's Platter: A Next.js (App Router) demo app with NextAuth.js authentication, minimal Express.js backend, responsive UI, public and protected pages, product management, and smooth user interactions.</p>
                        <div className="project-tags">
                            <span className="tag">Next.js</span>
                            <span className="tag">React.js</span>
                            <span className="tag">NextAuth.js</span>
                            <span className="tag">Tailwind CSS</span>
                            <span className="tag">Firebase Auth</span>
                            <span className="tag">Node.js</span>
                            <span className="tag">Express.js</span>
                            <span className="tag">MongoDB</span>
                            <span className="tag">JWT</span>
                            <span className="tag">API</span>
                            <span className="tag">JSON Data</span>
                            <span className="tag">Git & GitHub</span>
                            <span className="tag">Vercel</span>
                            <span className="tag">Protected Routes</span>
                        </div>



                        <div style={{ display: "flex", gap: "10px" }}>
                            <a className="btn btn--ghost small" href="https://github.com/mdsamimprogramer/next-js-client">
                                Code
                            </a>
                            <a className="btn btn--primary small" href="https://next-js-client-vqte.vercel.app/">
                                Demo
                            </a>
                        </div>
                    </div>
                </article>

            </div>
        </section>
    );
};

export default Projects;
