import React, { useEffect, useRef } from "react";
import img from '../assets/samim.png'

const Hero = () => {
    const revealRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    useEffect(() => {
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

    return (
        <section className="hero container" id="hero">
            <div className="hero-inner">
                <div className="hero-left reveal" ref={addToRefs}>
                    <span className="badge">Available for opportunities</span>
                    <h1 className="hero-title">
                        Hi, I'm <span className="accent-text">Samim</span>
                        <span className="hero-sub">Aspiring Full-Stack Developer</span>
                    </h1>
                    <p className="lead professional-lead">
                        I am a <span className="neon">Full-Stack Developer</span> with expertise in{' '}
                        <span className="neon">React.js</span>, <span className="neon">Next.js</span>,{' '}
                        <span className="neon">Node.js</span>, <span className="neon">Express.js</span>, and{' '}
                        <span className="neon">MongoDB</span>. I create modern, responsive, and high-performance web applications{' '}
                        that deliver seamless user experiences. Additionally, I have experience with{' '}
                        <span className="neon">Tailwind CSS</span>, <span className="neon">Bootstrap</span>,{' '}
                        <span className="neon">Firebase</span>, and deploying apps on{' '}
                        <span className="neon">Vercel</span> and <span className="neon">Netlify</span>.
                    </p>

                    <div className="cta-row">
                        <a className="btn btn--primary" href="#contact">
                            Get In Touch
                        </a>
                        <a className="btn btn--outline" href="#projects">
                            View Work
                        </a>
                    </div>
                </div>

                <div
                    className="hero-right reveal"
                    ref={addToRefs}
                    style={{ display: "flex", justifyContent: "flex-end", minWidth: "220px" }}
                >
                    <div className="profile-wrap" aria-hidden="true">
                        <div className="profile">
                            <img
                                src={img}
                                alt="Profile photo - placeholder"
                            />
                        </div>
                        <div className="status-pill pulse" title="Ready to work">
                            <span className="status-dot" aria-hidden="true"></span>
                            <span style={{ fontWeight: 700 }}>Ready to Work</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* TECH RIBBON */}
            <div
                className="tech-ribbon reveal"
                ref={addToRefs}
                aria-hidden="true"
                style={{ marginTop: "22px" }}
            >
                <div className="tech-inner container" style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                    {/* Frontend */}
                    <div className="tech-item">HTML5</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">CSS3</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Tailwind CSS</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Bootstrap</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">JavaScript</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">React.js</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Next.js</div>

                    {/* Backend */}
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Node.js</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Express.js</div>

                    {/* Database */}
                    <div className="tech-sep">+</div>
                    <div className="tech-item">MongoDB</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Firebase</div>

                    {/* Version Control & Deployment */}
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Git & GitHub</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Vercel</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Netlify</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Surge</div>

                    {/* CMS & Others */}
                    <div className="tech-sep">+</div>
                    <div className="tech-item">WordPress</div>
                    <div className="tech-sep">+</div>
                    <div className="tech-item">Figma</div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
