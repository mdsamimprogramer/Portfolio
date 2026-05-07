import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, ArrowUpRight, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

const contactInfo = [
    {
        icon: MapPin,
        label: "Location",
        value: "Rangpur, Bangladesh",
        href: null,
        gradient: "from-blue-500 to-cyan-400",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+880-1743282144",
        href: "tel:+8801743282144",
        gradient: "from-purple-500 to-pink-400",
    },
    {
        icon: Mail,
        label: "Email",
        value: "mdsamimhossen827@gmail.com",
        href: "mailto:mdsamimhossen827@gmail.com",
        gradient: "from-indigo-500 to-blue-400",
    },
];

const ContactInfoCard = ({ item, index }) => {
    const Icon = item.icon;
    const Wrapper = item.href ? "a" : "div";
    const wrapperProps = item.href ? { href: item.href, target: "_blank", rel: "noreferrer" } : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
        >
            <Wrapper
                {...wrapperProps}
                className="group relative flex items-center gap-5 p-5 rounded-2xl
                    bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl
                    border border-white/60 dark:border-white/[0.06]
                    hover:border-blue-300/50 dark:hover:border-blue-500/20
                    shadow-[0_2px_15px_rgba(0,0,0,0.04)] dark:shadow-none
                    hover:shadow-[0_8px_30px_rgba(99,102,241,0.08)] dark:hover:shadow-[0_8px_30px_rgba(99,102,241,0.06)]
                    transition-all duration-500 cursor-pointer"
            >
                {/* Icon */}
                <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg
                    group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon size={20} strokeWidth={2} />
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.gradient} opacity-40 blur-lg group-hover:opacity-60 transition-opacity duration-500`} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {item.value}
                    </p>
                </div>

                {/* Arrow */}
                {item.href && (
                    <ArrowUpRight
                        size={18}
                        className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0"
                    />
                )}
            </Wrapper>
        </motion.div>
    );
};

/* ── Starry Gradient Background (Apple / Linear / Vercel-inspired) ── */
const StarryGradientBg = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animId;
        let time = 0;
        let stars = [];

        const dpr = window.devicePixelRatio > 1 ? 2 : 1;

        const resize = () => {
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            createStars();
        };

        const createStars = () => {
            const w = canvas.width;
            const h = canvas.height;
            const count = Math.floor((w * h) / 9000);
            stars = [];
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 1.6 + 0.3,
                    baseAlpha: Math.random() * 0.45 + 0.15,
                    twinkleSpeed: Math.random() * 0.015 + 0.004,
                    twinkleOffset: Math.random() * Math.PI * 2,
                    driftX: (Math.random() - 0.5) * 0.12,
                    driftY: (Math.random() - 0.5) * 0.08,
                });
            }
        };

        const blobs = [
            { x: 0.2, y: 0.15, r: 0.5, color: [99, 102, 241], speed: 0.0002 },
            { x: 0.8, y: 0.85, r: 0.45, color: [139, 92, 246], speed: 0.00018 },
            { x: 0.65, y: 0.25, r: 0.35, color: [59, 130, 246], speed: 0.00025 },
            { x: 0.35, y: 0.75, r: 0.3, color: [79, 70, 229], speed: 0.00015 },
        ];

        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            time++;
            const w = canvas.width;
            const h = canvas.height;
            const isDark = document.documentElement.classList.contains("dark");

            ctx.clearRect(0, 0, w, h);

            // 1. Draw soft gradient blobs
            blobs.forEach((b) => {
                const cx = (b.x + Math.sin(time * b.speed) * 0.06) * w;
                const cy = (b.y + Math.cos(time * b.speed * 1.2) * 0.05) * h;
                const radius = b.r * Math.max(w, h);
                const alpha = isDark ? 0.1 : 0.06;

                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
                grad.addColorStop(0, `rgba(${b.color.join(",")}, ${alpha})`);
                grad.addColorStop(1, `rgba(${b.color.join(",")}, 0)`);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
            });

            // 2. Draw white stars with twinkle + soft glow
            stars.forEach((s) => {
                const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
                const alpha = s.baseAlpha * (0.5 + 0.5 * twinkle);
                const visAlpha = isDark ? alpha : alpha * 0.3;

                if (visAlpha < 0.02) return;

                // Drift
                s.x += s.driftX;
                s.y += s.driftY;
                if (s.x < 0) s.x = w;
                if (s.x > w) s.x = 0;
                if (s.y < 0) s.y = h;
                if (s.y > h) s.y = 0;

                // Soft glow halo for larger stars
                if (s.size > 0.9) {
                    const glowR = s.size * 5;
                    const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
                    glow.addColorStop(0, `rgba(255, 255, 255, ${visAlpha * 0.3})`);
                    glow.addColorStop(1, `rgba(255, 255, 255, 0)`);
                    ctx.fillStyle = glow;
                    ctx.fillRect(s.x - glowR, s.y - glowR, glowR * 2, glowR * 2);
                }

                // Star core — always white
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                const coreColor = isDark ? "255,255,255" : "180,185,210";
                ctx.fillStyle = `rgba(${coreColor}, ${visAlpha})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState({ msg: "", type: "", loading: false });
    const [focusedField, setFocusedField] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus({ msg: "Message sent successfully! I'll get back to you soon.", type: "success", loading: false });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    };

    const inputClasses = (fieldName) =>
        `w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-300 resize-none
         bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm
         text-slate-900 dark:text-slate-100
         placeholder:text-slate-400 dark:placeholder:text-slate-600
         ${focusedField === fieldName
            ? "border-indigo-400/60 dark:border-indigo-400/40 ring-4 ring-indigo-500/10 dark:ring-indigo-400/10 bg-white/90 dark:bg-white/[0.06] shadow-[0_0_20px_rgba(99,102,241,0.06)]"
            : "border border-slate-200/80 dark:border-white/[0.08] hover:border-indigo-300/40 dark:hover:border-white/[0.12]"
        }`;

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-24 overflow-hidden"
        >
            {/* ═══ PREMIUM BACKGROUND SYSTEM ═══ */}

            {/* Base Layer — soft neutral */}
            <div className="absolute inset-0 bg-[#f0f2f8] dark:bg-[#0a0a1a]" />

            {/* Animated Mesh Gradient Canvas — main visual impact */}
            <StarryGradientBg />

            {/* Noise texture overlay for Apple-like grain */}
            <div
                className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Radial center vignette — draws eye to content */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(0,0,0,0.02) 100%)",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none dark:block hidden"
                style={{
                    background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(99,102,241,0.04) 0%, transparent 70%)",
                }}
            />

            {/* Top edge glow line — Vercel-style separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

            {/* Subtle dot grid — Linear-inspired */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.035]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)`,
                    backgroundSize: "32px 32px",
                    maskImage: "radial-gradient(ellipse 60% 50% at 50% 45%, black, transparent)",
                }}
            />

            {/* Decorative slow-rotating orbital ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
                <motion.div
                    className="w-full h-full rounded-full border border-indigo-200/15 dark:border-white/[0.025]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400/50 dark:bg-indigo-400/30" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-purple-400/50 dark:bg-purple-400/30" />
                </motion.div>
            </div>

            {/* ═══ CONTENT ═══ */}
            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                        <Sparkles size={14} />
                        <span>Get In Touch</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-5">
                        Let's Build Something{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                            Amazing
                        </span>
                    </h2>

                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                        Drop me a message and let's make it happen.
                    </p>
                </motion.div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
                    {/* Left Column — Contact Info */}
                    <div className="lg:col-span-2 space-y-5">
                        {contactInfo.map((item, i) => (
                            <ContactInfoCard key={item.label} item={item} index={i} />
                        ))}

                        {/* Availability Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="relative mt-8 p-6 rounded-2xl
                                bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl
                                border border-white/70 dark:border-white/[0.05]
                                shadow-[0_4px_20px_rgba(99,102,241,0.04)] dark:shadow-none"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                                </span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                    Available for Opportunities
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed font-medium">
                                Open to freelance projects, full-time roles, and exciting collaborations.
                                Typical response time: <span className="text-slate-700 dark:text-slate-300 font-semibold">under 24 hours</span>.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column — Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-3 relative group"
                    >
                        {/* Hover glow behind form card */}
                        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 dark:from-blue-500/[0.06] dark:via-indigo-500/[0.03] dark:to-purple-500/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />

                        {/* Form Card */}
                        <div className="relative bg-white/75 dark:bg-white/[0.025] backdrop-blur-2xl rounded-3xl
                            border border-white/80 dark:border-white/[0.06]
                            shadow-[0_8px_40px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_60px_rgba(0,0,0,0.25)]
                            overflow-hidden"
                        >
                            {/* Top accent line */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

                            <div className="p-8 md:p-10">
                                {/* Form Header */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                                        Send a Message
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">
                                        Fill in the details below and I'll get back to you promptly.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="contact-firstName" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                First Name <span className="text-indigo-500">*</span>
                                            </label>
                                            <input
                                                id="contact-firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("firstName")}
                                                onBlur={() => setFocusedField(null)}
                                                className={inputClasses("firstName")}
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="contact-lastName" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Last Name
                                            </label>
                                            <input
                                                id="contact-lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("lastName")}
                                                onBlur={() => setFocusedField(null)}
                                                className={inputClasses("lastName")}
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    {/* Email + Phone Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Email <span className="text-indigo-500">*</span>
                                            </label>
                                            <input
                                                id="contact-email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("email")}
                                                onBlur={() => setFocusedField(null)}
                                                className={inputClasses("email")}
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Phone
                                            </label>
                                            <input
                                                id="contact-phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("phone")}
                                                onBlur={() => setFocusedField(null)}
                                                className={inputClasses("phone")}
                                                placeholder="+1 234 567 890"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            Message <span className="text-indigo-500">*</span>
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField("message")}
                                            onBlur={() => setFocusedField(null)}
                                            className={inputClasses("message")}
                                            placeholder="Tell me about your project, idea, or just say hello..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={status.loading}
                                        className="group/btn relative w-full py-4 rounded-xl font-bold text-sm tracking-wide
                                            bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                                            hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500
                                            text-white shadow-[0_6px_20px_rgba(79,70,229,0.25)]
                                            hover:shadow-[0_8px_30px_rgba(79,70,229,0.4)]
                                            transition-all duration-300
                                            hover:scale-[1.015] active:scale-[0.985]
                                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                            flex items-center justify-center gap-2.5 overflow-hidden"
                                    >
                                        {/* Shimmer Effect */}
                                        <span className="absolute inset-0 w-full h-full">
                                            <span className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        </span>

                                        <span className="relative flex items-center gap-2.5">
                                            {status.loading ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={18} />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} className="group-hover/btn:-rotate-12 transition-transform duration-300" />
                                                    Send Message
                                                </>
                                            )}
                                        </span>
                                    </button>

                                    {/* Status Message */}
                                    <AnimatePresence mode="wait">
                                        {status.msg && (
                                            <motion.div
                                                key={status.type}
                                                initial={{ opacity: 0, y: 10, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                                exit={{ opacity: 0, y: -10, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium
                                                    ${status.type === "error"
                                                        ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                                                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                                    }`}
                                            >
                                                {status.type === "error" ? (
                                                    <AlertCircle size={18} className="flex-shrink-0" />
                                                ) : (
                                                    <CheckCircle2 size={18} className="flex-shrink-0" />
                                                )}
                                                {status.msg}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Shimmer keyframes */}
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </section>
    );
};

export default Contact;
