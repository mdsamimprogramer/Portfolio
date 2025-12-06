import React, { useEffect, useRef } from "react";

const skillsData = [
    { name: "React.js", pct: 90 },
    { name: "Next.js", pct: 75 },
    { name: "JavaScript", pct: 90 },
    { name: "Node.js", pct: 80 },
    { name: "MongoDB", pct: 75 },
    { name: "Express.js", pct: 80 },
    { name: "Git & GitHub", pct: 85 },
    // New additions
    { name: "Firebase (Auth & Hosting)", pct: 80 },
    { name: "Bootstrap", pct: 85 },
    { name: "Figma / UI Design", pct: 95 },
];


const Skills = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");

                        // Check if it's a skill card to animate
                        if (entry.target.classList.contains('skill-card')) {
                            const card = entry.target;
                            const pct = parseInt(card.dataset.pct || "0", 10);
                            const bar = card.querySelector(".bar");
                            const counter = card.querySelector(".pct-counter");

                            // Animate width
                            if (bar) bar.style.width = pct + "%";

                            // Count up
                            if (counter) {
                                let current = 0;
                                const duration = 900;
                                const step = Math.max(10, Math.floor(duration / pct));
                                const id = setInterval(() => {
                                    current += 1;
                                    counter.textContent = current + "%";
                                    if (current >= pct) {
                                        clearInterval(id);
                                        counter.textContent = pct + "%";
                                    }
                                }, step);
                            }
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.35 }
        );

        // Observe section title
        if (sectionRef.current) observer.observe(sectionRef.current);

        // Observe skill cards
        const cards = gridRef.current ? gridRef.current.querySelectorAll('.skill-card') : [];
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="skills container" id="skills">
            <div className="reveal" ref={sectionRef}>
                <span className="badge small">My Skills</span>
                <h2 className="section-title">
                    Design, develop, deliver: my{" "}
                    <span style={{ color: "var(--accent)", fontWeight: 900 }}>
                        essential gear
                    </span>
                </h2>
            </div>

            <div className="skills-grid" id="skillsGrid" ref={gridRef}>
                {skillsData.map((skill) => (
                    <div
                        key={skill.name}
                        className="skill-card reveal"
                        data-pct={skill.pct}
                        data-name={skill.name}
                    >
                        <div className="skill-head">
                            <div>{skill.name}</div>
                            <div className="pct-counter">0%</div>
                        </div>
                        <div className="progress">
                            <div className="bar"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
