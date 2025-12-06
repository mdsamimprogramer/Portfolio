import React, { useEffect, useRef } from "react";
import img from '../assets/samim.png'

const About = () => {
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
        <section className="about container" id="about">
            <div className="about-inner">
                <div className="about-left reveal" ref={addToRefs}>
                    <div className="avatar-lg">
                        <img
                            src={img}
                            alt="samim large avatar - placeholder"
                        />
                        <span className="ring ring-1" aria-hidden="true"></span>
                        <span className="ring ring-2" aria-hidden="true"></span>
                    </div>
                </div>

                <div className="about-right reveal" ref={addToRefs}>
                    <span className="badge small">About Me</span>
                    <h2 className="section-title">
                        Who is{" "}
                        <span style={{ color: "var(--accent)", fontWeight: 900 }}>
                            Samim?
                        </span>
                    </h2>
                    <p className="muted">
                        “Helping businesses grow with creative web design and development
                        solutions.”
                    </p>
                    <p>
                        Hi, I'm Shukur, a passionate Full-Stack Developer who thrives on
                        turning ideas into visually stunning realities. With a love for
                        creativity and a meticulous eye for detail.
                    </p>

                    <ul className="contact-mini" aria-label="Contact mini">
                        <li>
                            <strong>Email:</strong> mdsamimhossen827@gmail.com
                        </li>
                        <li>
                            <strong>Phone:</strong> +880-1743282144
                        </li>
                    </ul>

                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "center",
                            marginTop: "18px",
                        }}
                    >
                        <div
                            style={{
                                background: "var(--glass)",
                                padding: "12px 18px",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: 900,
                                    color: "var(--accent)",
                                    fontSize: "20px",
                                }}
                            >
                                1+
                            </div>
                            <div style={{ color: "var(--muted)", fontSize: "13px" }}>
                                Years Experience
                            </div>
                        </div>
                        <a className="btn btn--primary" href="https://drive.google.com/file/d/1b5pprp0se40NC4-2SPtC0Vb3eztColDq/view?usp=sharing" aria-label="Open resume">
                            My Resume
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
