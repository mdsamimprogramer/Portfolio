import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
    Mail, Phone, MapPin, Send, Loader2, ArrowUpRight,
    Sparkles, CheckCircle2, AlertCircle, Github, Linkedin,
    Twitter, Copy, Check, MessageCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const contactInfo = [
    {
        icon: MapPin,
        label: "Location",
        value: "Rangpur, Bangladesh",
        href: null,
        color: "blue",
        copyable: false,
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+880-1743282144",
        href: "tel:+8801743282144",
        color: "violet",
        copyable: true,
        copyValue: "+8801743282144",
    },
    {
        icon: Mail,
        label: "Email",
        value: "mdsamimhossen827@gmail.com",
        href: "mailto:mdsamimhossen827@gmail.com",
        color: "indigo",
        copyable: true,
        copyValue: "mdsamimhossen827@gmail.com",
    },
];

const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/", color: "hover:text-slate-900 dark:hover:text-white" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/", color: "hover:text-blue-600 dark:hover:text-blue-400" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/", color: "hover:text-sky-500 dark:hover:text-sky-400" },
];

/* ─────────────────────────────────────────
   MAGNETIC CURSOR BLOB
───────────────────────────────────────── */
const MagneticBlob = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 60, damping: 20 });
    const springY = useSpring(y, { stiffness: 60, damping: 20 });

    useEffect(() => {
        const move = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200); };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [x, y]);

    return (
        <motion.div
            style={{ left: springX, top: springY }}
            className="fixed pointer-events-none z-0 w-[400px] h-[400px] rounded-full
                bg-indigo-500/[0.04] dark:bg-indigo-400/[0.06]
                blur-[80px] mix-blend-normal"
        />
    );
};

/* ─────────────────────────────────────────
   STARRY CANVAS BG
───────────────────────────────────────── */
const StarryBg = () => {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animId, time = 0, stars = [];
        const dpr = Math.min(window.devicePixelRatio, 2);

        const resize = () => {
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = canvas.offsetHeight * dpr;
            buildStars();
        };

        const buildStars = () => {
            const area = canvas.width * canvas.height;
            stars = [];
            const add = (count, minS, maxS, minA, maxA, ts, tier) => {
                for (let i = 0; i < count; i++)
                    stars.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * (maxS - minS) + minS,
                        baseAlpha: Math.random() * (maxA - minA) + minA,
                        twinkleSpeed: Math.random() * ts + ts * 0.4,
                        twinkleOffset: Math.random() * Math.PI * 2,
                        dx: (Math.random() - 0.5) * 0.05,
                        dy: (Math.random() - 0.5) * 0.03,
                        tier,
                    });
            };
            add(Math.floor(area / 5500), 0.2, 1.0, 0.08, 0.35, 0.008, 1);
            add(Math.floor(area / 22000), 0.8, 2.0, 0.25, 0.65, 0.012, 2);
            add(Math.floor(area / 110000), 1.5, 3.0, 0.45, 0.75, 0.006, 3);
        };

        const blobs = [
            { x: 0.15, y: 0.10, r: 0.55, c: [99, 102, 241], sp: 0.00014 },
            { x: 0.85, y: 0.90, r: 0.50, c: [139, 92, 246], sp: 0.00011 },
            { x: 0.65, y: 0.18, r: 0.42, c: [59, 130, 246], sp: 0.00019 },
            { x: 0.28, y: 0.78, r: 0.38, c: [79, 70, 229], sp: 0.00009 },
        ];

        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            time++;
            const { width: w, height: h } = canvas;
            const dark = document.documentElement.classList.contains("dark");
            ctx.clearRect(0, 0, w, h);

            blobs.forEach((b) => {
                const cx = (b.x + Math.sin(time * b.sp) * 0.05) * w;
                const cy = (b.y + Math.cos(time * b.sp * 1.1) * 0.04) * h;
                const r = b.r * Math.max(w, h);
                const a = dark ? 0.13 : 0.05;
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                g.addColorStop(0, `rgba(${b.c},${a})`);
                g.addColorStop(0.6, `rgba(${b.c},${a * 0.28})`);
                g.addColorStop(1, `rgba(${b.c},0)`);
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
            });

            stars.forEach((s) => {
                const pulse = 0.45 + 0.55 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
                const visA = s.baseAlpha * pulse * (dark ? 1 : 0.35);
                if (visA < 0.015) return;
                s.x = ((s.x + s.dx) + w + 10) % (w + 20) - 10;
                s.y = ((s.y + s.dy) + h + 10) % (h + 20) - 10;
                if (s.tier >= 2) {
                    const gr = s.tier === 3 ? s.size * 10 : s.size * 6;
                    const ga = s.tier === 3 ? visA * 0.2 : visA * 0.17;
                    const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, gr);
                    glow.addColorStop(0, `rgba(200,210,255,${ga})`);
                    glow.addColorStop(0.4, `rgba(200,210,255,${ga * 0.3})`);
                    glow.addColorStop(1, "rgba(200,210,255,0)");
                    ctx.fillStyle = glow;
                    ctx.fillRect(s.x - gr, s.y - gr, gr * 2, gr * 2);
                }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                const b = dark ? 255 : 160;
                ctx.fillStyle = `rgba(${b},${b},${Math.min(b + 25, 255)},${visA})`;
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
    }, []);
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ─────────────────────────────────────────
   COPY TO CLIPBOARD HOOK
───────────────────────────────────────── */
const useCopy = () => {
    const [copied, setCopied] = useState(null);
    const copy = useCallback((text, id) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(id);
            setTimeout(() => setCopied(null), 2000);
        });
    }, []);
    return { copied, copy };
};

/* ─────────────────────────────────────────
   COLOR MAP
───────────────────────────────────────── */
const colorMap = {
    blue: { bg: "bg-blue-500/10 dark:bg-blue-500/15", icon: "text-blue-600 dark:text-blue-400", ring: "ring-blue-400/30" },
    violet: { bg: "bg-violet-500/10 dark:bg-violet-500/15", icon: "text-violet-600 dark:text-violet-400", ring: "ring-violet-400/30" },
    indigo: { bg: "bg-indigo-500/10 dark:bg-indigo-500/15", icon: "text-indigo-600 dark:text-indigo-400", ring: "ring-indigo-400/30" },
};

/* ─────────────────────────────────────────
   INFO CARD — with copy-to-clipboard
───────────────────────────────────────── */
const InfoCard = ({ item, index, copied, onCopy }) => {
    const Icon = item.icon;
    const c = colorMap[item.color];
    const isCopied = copied === item.label;

    return (
        <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-center gap-4 p-4 rounded-2xl
                bg-white/70 dark:bg-white/[0.035]
                border border-white/80 dark:border-white/[0.07]
                hover:border-indigo-300/50 dark:hover:border-indigo-500/20
                shadow-sm hover:shadow-md dark:shadow-none
                transition-all duration-300"
        >
            {/* Icon bubble */}
            <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${c.bg} ${c.icon}
                flex items-center justify-center
                group-hover:scale-105 transition-transform duration-300`}>
                <Icon size={19} strokeWidth={1.8} />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500 mb-0.5">
                    {item.label}
                </p>
                {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer"
                        className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate
                            hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1">
                        {item.value}
                        <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100
                            -translate-y-0.5 translate-x-0.5 transition-all duration-200" />
                    </a>
                ) : (
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{item.value}</p>
                )}
            </div>

            {/* Copy button */}
            {item.copyable && (
                <button
                    onClick={() => onCopy(item.copyValue, item.label)}
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                        transition-all duration-200
                        ${isCopied
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-white/[0.05] text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                        }`}
                    title="Copy to clipboard"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isCopied ? (
                            <motion.span key="check"
                                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <Check size={14} />
                            </motion.span>
                        ) : (
                            <motion.span key="copy"
                                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <Copy size={14} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            )}
        </motion.div>
    );
};

/* ─────────────────────────────────────────
   FORM FIELD — floating label + refined UX
───────────────────────────────────────── */
const Field = ({ id, label, type = "text", register, error, rows, required, maxLength, watch }) => {
    const isArea = !!rows;
    const watched = watch ? watch(id) || "" : "";
    const charPct = maxLength ? (watched.length / maxLength) * 100 : 0;
    const charColor = charPct > 90 ? "text-red-500" : charPct > 70 ? "text-amber-500" : "text-slate-400 dark:text-slate-600";

    const base = `peer w-full px-4 rounded-xl text-sm font-medium outline-none transition-all duration-300
        bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm
        text-slate-900 dark:text-slate-100
        border ${error
            ? "border-red-400/70 dark:border-red-500/50 ring-2 ring-red-500/10"
            : "border-slate-200/80 dark:border-white/[0.08] hover:border-indigo-300/50 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/8"
        }
        focus:bg-white/95 dark:focus:bg-white/[0.07]`;

    return (
        <div className="relative group/field w-full">
            {isArea ? (
                <textarea
                    id={id} {...register} rows={rows}
                    placeholder=" " maxLength={maxLength}
                    className={`${base} pt-6 pb-8 resize-none leading-relaxed`}
                />
            ) : (
                <input
                    id={id} type={type} {...register}
                    placeholder=" "
                    className={`${base} pt-6 pb-2`}
                />
            )}

            {/* Floating label */}
            <label
                htmlFor={id}
                className={`absolute left-4 pointer-events-none font-medium transition-all duration-200
                    text-sm top-4 text-slate-400 dark:text-slate-500
                    peer-focus:text-[10.5px] peer-focus:top-[8px] peer-focus:font-bold peer-focus:tracking-wide
                    ${error
                        ? "peer-focus:text-red-500"
                        : "peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400"
                    }
                    peer-[:not(:placeholder-shown)]:text-[10.5px] peer-[:not(:placeholder-shown)]:top-[8px]
                    peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:tracking-wide
                    ${error
                        ? "peer-[:not(:placeholder-shown)]:text-red-500"
                        : "peer-[:not(:placeholder-shown)]:text-indigo-600 dark:peer-[:not(:placeholder-shown)]:text-indigo-400"
                    }`}
            >
                {label}{required && <span className="text-indigo-500/70 ml-0.5">*</span>}
            </label>

            {/* Char count + mini progress bar for textarea */}
            {isArea && maxLength && (
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div className="flex-1 mr-3 h-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full transition-colors duration-300 ${charPct > 90 ? "bg-red-500" : charPct > 70 ? "bg-amber-400" : "bg-indigo-400/60"
                                }`}
                            animate={{ width: `${charPct}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <span className={`text-[10px] tabular-nums font-semibold transition-colors duration-300 ${charColor}`}>
                        {watched.length}/{maxLength}
                    </span>
                </div>
            )}

            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 ml-1 flex items-center gap-1 text-[11px] font-bold text-red-500"
                    >
                        <AlertCircle size={11} className="flex-shrink-0" />
                        {error.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─────────────────────────────────────────
   SCHEMA
───────────────────────────────────────── */
const schema = z.object({
    firstName: z.string().min(2, "At least 2 characters"),
    lastName: z.string().optional(),
    email: z.string().email("Enter a valid email"),
    phone: z.string().optional(),
    message: z.string().min(10, "At least 10 characters").max(1000, "Max 1000 characters"),
});

/* ─────────────────────────────────────────
   SUBMIT BUTTON
───────────────────────────────────────── */
const SubmitButton = ({ isSubmitting }) => (
    <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group/btn relative w-full py-3.5 rounded-xl font-bold text-sm tracking-wide
            bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
            hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500
            text-white
            shadow-[0_4px_20px_rgba(79,70,229,0.35)]
            hover:shadow-[0_6px_30px_rgba(79,70,229,0.5)]
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2.5 overflow-hidden"
    >
        {/* Shimmer */}
        <span className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.8s_infinite]
            bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait" initial={false}>
            {isSubmitting ? (
                <motion.span key="loading" className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    <Loader2 className="animate-spin" size={16} />
                    Sending…
                </motion.span>
            ) : (
                <motion.span key="idle" className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                    <Send size={15} className="group-hover/btn:-rotate-12 transition-transform duration-300" />
                    Send Message
                </motion.span>
            )}
        </AnimatePresence>
    </motion.button>
);

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const { copied, copy } = useCopy();

    const {
        register, handleSubmit, reset, watch,
        formState: { errors, dirtyFields },
    } = useForm({ resolver: zodResolver(schema) });

    const requiredFields = ["firstName", "email", "message"];
    const filled = requiredFields.filter((f) => dirtyFields[f]).length;
    const progress = Math.round((filled / requiredFields.length) * 100);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setStatus(null);
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: `${data.firstName} ${data.lastName || ""}`.trim(),
                    from_email: data.email,
                    phone: data.phone || "N/A",
                    message: data.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setStatus({ type: "success", msg: "Message sent! I'll reply within 24 hours." });
            reset();
        } catch (err) {
            setStatus({ type: "error", msg: err?.text || "Something went wrong. Please try again." });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus(null), 6000);
        }
    };

    /* stagger variants */
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <section ref={sectionRef} id="contact" className="relative py-28 overflow-hidden">

            {/* ── Background ── */}
            <div className="absolute inset-0 bg-[#f0f2f8] dark:bg-[#08080f]" />
            <StarryBg />
            <MagneticBlob />

            {/* Grain */}
            <div
                className="absolute inset-0 opacity-[0.022] dark:opacity-[0.045] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
            />

            {/* Top edge line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            {/* Orbital rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {[700, 920].map((size, i) => (
                    <motion.div
                        key={size}
                        className="absolute rounded-full border border-indigo-200/10 dark:border-white/[0.018]"
                        style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{ duration: i === 0 ? 90 : 130, repeat: Infinity, ease: "linear" }}
                    >
                        <div className={`absolute rounded-full bg-indigo-400/50
                            ${i === 0 ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5" : "bottom-0 right-1/4 translate-y-1/2 w-1 h-1 bg-purple-400/40"}`} />
                    </motion.div>
                ))}
            </div>

            {/* ── Content ── */}
            <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-18"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full
                            border border-indigo-400/25 bg-indigo-500/[0.07]
                            text-indigo-600 dark:text-indigo-400 text-[11px] font-bold tracking-[0.16em] uppercase"
                    >
                        <MessageCircle size={12} />
                        Get In Touch
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold
                        text-slate-900 dark:text-white tracking-tight leading-[1.06] mb-5">
                        Let's Build Something{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r
                            from-blue-600 via-indigo-500 to-purple-600
                            dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                            Amazing
                        </span>
                    </h2>

                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg
                        max-w-md mx-auto leading-relaxed">
                        Have a project in mind or want to collaborate? Drop me a message and let's make it happen.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

                    {/* ── Left column ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-2 flex flex-col gap-3"
                    >
                        {/* Info cards */}
                        {contactInfo.map((item, i) => (
                            <motion.div key={item.label} variants={itemVariants}>
                                <InfoCard item={item} index={i} copied={copied} onCopy={copy} />
                            </motion.div>
                        ))}

                        {/* Availability badge */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-2 p-5 rounded-2xl
                                bg-white/55 dark:bg-white/[0.03]
                                border border-white/80 dark:border-white/[0.06]
                                shadow-sm"
                        >
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-55" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                </span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                    Available for Opportunities
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
                                Open to freelance, full-time roles & collaborations.
                                Typical reply:{" "}
                                <span className="text-slate-700 dark:text-slate-300 font-semibold">under 24 hours</span>.
                            </p>
                        </motion.div>

                        {/* Social links — NEW */}
                        <motion.div variants={itemVariants} className="mt-1">
                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-600 mb-3 ml-1">
                                Find me on
                            </p>
                            <div className="flex items-center gap-2">
                                {socialLinks.map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        title={s.label}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        whileTap={{ scale: 0.92 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center
                                            bg-white/70 dark:bg-white/[0.04]
                                            border border-white/80 dark:border-white/[0.07]
                                            text-slate-500 dark:text-slate-400
                                            shadow-sm hover:shadow-md dark:shadow-none
                                            transition-colors duration-200 ${s.color}`}
                                    >
                                        <s.icon size={17} strokeWidth={1.8} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Right column — Form ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.975 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-3 relative group/card"
                    >
                        {/* Ambient glow on hover */}
                        <div className="absolute -inset-4 rounded-[2.5rem]
                            bg-gradient-to-br from-blue-500/6 via-indigo-500/4 to-purple-500/6
                            opacity-0 group-hover/card:opacity-100
                            transition-opacity duration-700 blur-2xl pointer-events-none" />

                        {/* Card */}
                        <div className="relative bg-white/80 dark:bg-white/[0.028] backdrop-blur-2xl
                            rounded-3xl border border-white/90 dark:border-white/[0.07]
                            shadow-[0_8px_48px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_64px_rgba(0,0,0,0.35)]
                            overflow-hidden">

                            {/* Top accent line */}
                            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

                            {/* Progress bar */}
                            <div className="h-[3px] bg-slate-100 dark:bg-white/[0.04]">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left"
                                    animate={{ scaleX: progress / 100 }}
                                    style={{ transformOrigin: "left" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>

                            <div className="p-8 md:p-10">

                                {/* Card header */}
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                                            Send a Message
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-500">
                                            Fill in the details — I'll get back to you promptly.
                                        </p>
                                    </div>

                                    {/* Progress pill — NEW animated dot */}
                                    <div className="flex-shrink-0 ml-4 flex items-center gap-1.5
                                        px-3 py-1.5 rounded-full
                                        bg-slate-100/80 dark:bg-white/[0.06]
                                        border border-slate-200/60 dark:border-white/[0.06]
                                        text-[11px] font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                                        <motion.span
                                            className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                                            animate={progress === 100
                                                ? { scale: [1, 1.5, 1], backgroundColor: ["#6366f1", "#10b981", "#6366f1"] }
                                                : { opacity: [1, 0.5, 1] }
                                            }
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                        {filled}/{requiredFields.length} done
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                                    {/* Row 1 — names */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Field id="firstName" label="First Name" register={register("firstName")} error={errors.firstName} required />
                                        <Field id="lastName" label="Last Name (optional)" register={register("lastName")} error={errors.lastName} />
                                    </div>

                                    {/* Row 2 — contact */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Field id="email" label="Email Address" type="email" register={register("email")} error={errors.email} required />
                                        <Field id="phone" label="Phone (optional)" register={register("phone")} error={errors.phone} />
                                    </div>

                                    {/* Message */}
                                    <Field
                                        id="message" label="Your Message"
                                        register={register("message")} error={errors.message}
                                        rows={5} required maxLength={1000} watch={watch}
                                    />

                                    {/* Submit */}
                                    <SubmitButton isSubmitting={isSubmitting} />

                                    {/* Status toast */}
                                    <AnimatePresence mode="wait">
                                        {status && (
                                            <motion.div
                                                key={status.type}
                                                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                                                transition={{ duration: 0.25, ease: "easeOut" }}
                                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium
                                                    ${status.type === "success"
                                                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                                                        : "bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400"
                                                    }`}
                                            >
                                                {status.type === "success"
                                                    ? <CheckCircle2 size={17} className="flex-shrink-0" />
                                                    : <AlertCircle size={17} className="flex-shrink-0" />
                                                }
                                                {status.msg}

                                                {/* Auto-dismiss bar */}
                                                <div className="ml-auto w-16 h-0.5 rounded-full bg-current opacity-20 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-current rounded-full"
                                                        initial={{ width: "100%" }}
                                                        animate={{ width: "0%" }}
                                                        transition={{ duration: 6, ease: "linear" }}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                @keyframes shimmer { 100% { transform: translateX(250%); } }
            `}</style>
        </section>
    );
};

export default Contact;