import React from "react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <div className="footer-col">
                    <h4>Samim.</h4>
                    <p className="muted">
                        Fresh graduate passionate about creating beautiful web experiences.
                        Let's build something amazing together.
                    </p>
                </div>
                <div className="footer-col">
                    <h5>Quick Links</h5>
                    <ul className="footer-links">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#skills">Skills</a>
                        </li>
                        <li>
                            <a href="#projects">Projects</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h5>Contact</h5>
                    <p>
                        Rangpur, Bangladesh<br />
                        mdsamimhossen827@gmail.com<br />
                        +880 1743282144
                    </p>
                </div>
            </div>
            <div
                style={{
                    textAlign: "center",
                    padding: "18px 20px",
                    color: "var(--muted)",
                }}
            >
                © <span id="year">{year}</span> Samim. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
