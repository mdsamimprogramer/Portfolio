import React, { useState, useEffect, useRef } from "react";

const Contact = () => {
    const revealRefs = useRef([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    });
    const [status, setStatus] = useState({ msg: "", type: "", loading: false });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ msg: "", type: "", loading: false });

        if (!formData.firstName || !formData.email || !formData.message) {
            setStatus({ msg: "Please fill required fields (Name, Email, Message).", type: "error", loading: false });
            return;
        }

        setStatus({ msg: "", type: "", loading: true });

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1200));

        setStatus({ msg: "Thanks — your message was sent (demo).", type: "success", loading: false });
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: ""
        });
    };

    return (
        <section className="contact container" id="contact">
            <div className="contact-inner">
                <div className="contact-left reveal" ref={addToRefs}>
                    <span className="badge small">Contact Me</span>
                    <h2 className="section-title">
                        Get in touch to discuss your{" "}
                        <span style={{ color: "var(--accent)", fontWeight: 900 }}>
                            next project
                        </span>
                    </h2>
                    <p className="muted">
                        Are you ready to take your project to the next level? Whether you’re
                        looking for a new website, a web application, or simply need advice.
                    </p>

                    <ul className="contact-list">
                        <li>
                            <strong>Address:</strong> Rangpur, Bangladesh
                        </li>
                        <li>
                            <strong>Phone:</strong> +880-1743282144
                        </li>
                        <li>
                            <strong>Email:</strong> mdsamimhossen827@gmail.com
                        </li>
                    </ul>

                    <div className="badge-cta" aria-hidden="true">
                        <span className="circle">D</span>
                        <div>
                            <small>Available for hire</small>
                            <div
                                className="dot green"
                                title="Available"
                                style={{
                                    display: "inline-block",
                                    marginLeft: "6px",
                                    background: "var(--accent)",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="contact-right reveal" ref={addToRefs}>
                    <form className="contact-form" id="contactForm" noValidate onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-row">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your message here..."
                            required
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <button
                            className="btn btn--primary full"
                            type="submit"
                            id="submitBtn"
                            style={{ opacity: status.loading ? 0.6 : 1 }}
                            disabled={status.loading}
                        >
                            <span id="btnText">Submit Message</span>
                            {status.loading && <span id="btnSpinner" style={{ display: "inline-block", marginLeft: "8px" }}>⏳</span>}
                        </button>
                        {status.msg && (
                            <p
                                id="formStatus"
                                className="form-status"
                                role="status"
                                aria-live="polite"
                                style={{ color: status.type === 'error' ? '#ffb4b4' : 'var(--accent)' }}
                            >
                                {status.msg}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
