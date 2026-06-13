import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    Mail, Phone, MapPin, Send, Loader2, ArrowUpRight,
    Sparkles, CheckCircle2, AlertCircle, User, MessageSquare
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
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+880-1743282144",
        href: "tel:+8801743282144",
        color: "violet",
    },
    {
        icon: Mail,
        label: "Email",
        value: "mdsamimhossen827@gmail.com",
        href: "mailto:mdsamimhossen827@gmail.com",
        color: "indigo",
    },
];

/* ─────────────────────────────────────────
   STARRY CANVAS BG  (unchanged logic, minor perf tweak)
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
                        dx: (Math.random() - 0.5) * 0.06,
                        dy: (Math.random() - 0.5) * 0.04,
                        tier,
                    });
            };
            add(Math.floor(area / 6000), 0.2, 1.0, 0.1, 0.4, 0.008, 1);
            add(Math.floor(area / 25000), 0.8, 2.0, 0.3, 0.7, 0.012, 2);
            add(Math.floor(area / 120000), 1.5, 3.0, 0.5, 0.8, 0.006, 3);
        };

        const blobs = [
            { x: 0.18, y: 0.12, r: 0.55, c: [99, 102, 241], sp: 0.00015 },
            { x: 0.82, y: 0.88, r: 0.50, c: [139, 92, 246], sp: 0.00012 },
            { x: 0.60, y: 0.20, r: 0.40, c: [59, 130, 246], sp: 0.00020 },
            { x: 0.30, y: 0.75, r: 0.35, c: [79, 70, 229], sp: 0.00010 },
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
                const a = dark ? 0.12 : 0.055;
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                g.addColorStop(0, `rgba(${b.c},${a})`);
                g.addColorStop(0.6, `rgba(${b.c},${a * 0.3})`);
                g.addColorStop(1, `rgba(${b.c},0)`);
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
            });

            stars.forEach((s) => {
                const pulse = 0.45 + 0.55 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
                const visA = s.baseAlpha * pulse * (dark ? 1 : 0.4);
                if (visA < 0.015) return;
                s.x = ((s.x + s.dx) + w + 10) % (w + 20) - 10;
                s.y = ((s.y + s.dy) + h + 10) % (h + 20) - 10;
                if (s.tier >= 2) {
                    const gr = s.tier === 3 ? s.size * 10 : s.size * 6;
                    const ga = s.tier === 3 ? visA * 0.2 : visA * 0.18;
                    const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, gr);
                    glow.addColorStop(0, `rgba(200,210,255,${ga})`);
                    glow.addColorStop(0.4, `rgba(200,210,255,${ga * 0.3})`);
                    glow.addColorStop(1, "rgba(200,210,255,0)");
                    ctx.fillStyle = glow;
                    ctx.fillRect(s.x - gr, s.y - gr, gr * 2, gr * 2);
                }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                const b = dark ? 255 : 170;
                ctx.fillStyle = `rgba(${b},${b},${Math.min(b + 20, 255)},${visA})`;
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
    }, []);
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* Success overlay for polished feedback */
const SuccessOverlay = ({ msg }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        aria-hidden={false}
    >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative z-10 max-w-md w-full bg-white dark:bg-gray-900/95 border border-white/80 dark:border-white/[0.04] rounded-2xl p-6 flex items-center gap-4 shadow-2xl"
            role="status"
            aria-live="polite"
        >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30">
                <CheckCircle2 size={28} className="text-emerald-600" />
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{msg}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Thanks — I will reply within 24 hours.</p>
            </div>
        </motion.div>
    </motion.div>
);

/* ─────────────────────────────────────────
   CONTACT INFO CARD  — refined pill style
───────────────────────────────────────── */
const colorMap = {
    blue: { bg: "bg-blue-500/10 dark:bg-blue-500/15", icon: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
    violet: { bg: "bg-violet-500/10 dark:bg-violet-500/15", icon: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
    indigo: { bg: "bg-indigo-500/10 dark:bg-indigo-500/15", icon: "text-indigo-600 dark:text-indigo-400", dot: "bg-indigo-500" },
};

const InfoCard = ({ item, index }) => {
    const Icon = item.icon;
    const Tag = item.href ? "a" : "div";
    const props = item.href ? { href: item.href, target: "_blank", rel: "noreferrer" } : {};
    const c = colorMap[item.color];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 * index, ease: [0.16, 1, 0.3, 1] }}
        >
            <Tag
                {...props}
                className="group flex items-center gap-4 p-4 rounded-2xl
                    bg-white/70 dark:bg-white/[0.03]
                    border border-white/70 dark:border-white/[0.07]
                    hover:border-indigo-300/60 dark:hover:border-indigo-500/25
                    shadow-sm hover:shadow-md
                    transition-all duration-400 cursor-pointer"
            >
                {/* Icon bubble */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${c.bg} ${c.icon} flex items-center justify-center
                    group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={19} strokeWidth={1.8} />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 mb-0.5">
                        {item.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {item.value}
                    </p>
                </div>

                {item.href && (
                    <ArrowUpRight
                        size={16}
                        className="flex-shrink-0 text-slate-300 dark:text-slate-600
                            group-hover:text-indigo-500 dark:group-hover:text-indigo-400
                            group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                            transition-all duration-300"
                    />
                )}
            </Tag>
        </motion.div>
    );
};

/* ─────────────────────────────────────────
   FORM FIELD — floating label + char count for textarea
───────────────────────────────────────── */
const Field = ({ id, label, type = "text", register, error, rows, required, maxLength, watch }) => {
    const isArea = !!rows;
    const watched = watch ? watch(id) || "" : "";

    const iconMap = {
        firstName: User,
        lastName: User,
        email: Mail,
        phone: Phone,
        message: MessageSquare,
    };
    const Icon = iconMap[id] || null;

    const base = `peer w-full pl-12 pr-4 rounded-xl text-sm font-medium outline-none transition-colors transition-shadow duration-200
        bg-white/60 dark:bg-white/[0.04]
        text-slate-900 dark:text-slate-100
        border ${error
            ? "border-red-400/70 dark:border-red-500/50 ring-2 ring-red-500/10"
            : "border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300/60 focus:border-indigo-400/60 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
        }
        focus:bg-white/95 dark:focus:bg-white/[0.06]`;

    const commonProps = {
        id,
        placeholder: " ",
        className: `${base} ${isArea ? "pt-6 pb-3 resize-none" : "pt-6 pb-2"}`,
        "aria-invalid": !!error,
        "aria-required": !!required,
        ...register,
    };

    return (
        <div className="relative group w-full">
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
                    <Icon size={16} />
                </div>
            )}

            {isArea ? (
                <textarea
                    rows={rows}
                    maxLength={maxLength}
                    {...commonProps}
                />
            ) : (
                <input
                    type={type}
                    {...commonProps}
                />
            )}

            {/* Floating label */}
            <label
                htmlFor={id}
                className={`absolute left-12 pointer-events-none font-medium transition-all duration-150
                    text-sm top-4 text-slate-400 dark:text-slate-500
                    peer-focus:text-[11px] peer-focus:top-[9px] peer-focus:font-semibold
                    peer-focus:${error ? "text-red-500" : "text-indigo-600 dark:text-indigo-400"}
                    peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:top-[9px] peer-[:not(:placeholder-shown)]:font-semibold
                    peer-[:not(:placeholder-shown)]:${error ? "text-red-500" : "text-indigo-600 dark:text-indigo-400"}`}
            >
                {label}{required && <span className="text-indigo-500 ml-0.5">*</span>}
            </label>

            {/* Char count for textarea */}
            {isArea && maxLength && (
                <span className="absolute bottom-3 right-4 text-[10px] text-slate-400 dark:text-slate-600 tabular-nums">
                    {watched.length}/{maxLength}
                </span>
            )}

            {/* Error */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="mt-1.5 ml-1 flex items-center gap-1 text-[11px] font-semibold text-red-500"
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
   MAIN COMPONENT
───────────────────────────────────────── */
const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // { type, msg }
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const {
        register, handleSubmit, reset, watch,
        formState: { errors, dirtyFields },
    } = useForm({ resolver: zodResolver(schema) });

    // Track overall form completeness for a subtle progress indicator
    const fields = ["firstName", "email", "message"];
    const filled = fields.filter((f) => dirtyFields[f]).length;
    const progress = Math.round((filled / fields.length) * 100);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setStatus(null);

        // Basic honeypot check
        if (data.company) {
            // silently ignore
            setIsSubmitting(false);
            return;
        }

        const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!SERVICE || !TEMPLATE || !KEY) {
            setStatus({ type: "error", msg: "Email service not configured. Please set environment variables." });
            setIsSubmitting(false);
            setTimeout(() => setStatus(null), 6000);
            return;
        }

        try {
            await emailjs.send(SERVICE, TEMPLATE, {
                from_name: `${data.firstName} ${data.lastName || ""}`.trim(),
                from_email: data.email,
                phone: data.phone || "N/A",
                message: data.message,
            }, KEY);

            setStatus({ type: "success", msg: "Message sent!" });
            reset();
        } catch (err) {
            setStatus({ type: "error", msg: err?.message || "Something went wrong. Please try again." });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus(null), 6000);
        }
    };

    return (
        <section ref={sectionRef} id="contact" className="relative py-24 overflow-hidden">

            {/* ── Background Stack ── */}
            <div className="absolute inset-0 bg-[#f0f2f8] dark:bg-[#0a0a1a]" />
            <StarryBg />

            {/* Noise grain */}
            <div
                className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
            />

            {/* Top line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />

            {/* Slow orbital ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
                <motion.div
                    className="w-full h-full rounded-full border border-indigo-200/15 dark:border-white/[0.02]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-purple-400/40" />
                </motion.div>
            </div>

            {/* ── Content ── */}
            <div className="container relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full
                        border border-indigo-400/25 bg-indigo-500/[0.07]
                        text-indigo-600 dark:text-indigo-400 text-[11px] font-bold tracking-[0.14em] uppercase">
                        <Sparkles size={12} />
                        Get In Touch
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-4">
                        Let's Build Something{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                            Amazing
                        </span>
                    </h2>

                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                        Have a project in mind or want to collaborate? Drop me a message and let's make it happen.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

                    {/* Left — info + availability */}
                    <div className="lg:col-span-2 flex flex-col gap-3">
                        {contactInfo.map((item, i) => <InfoCard key={item.label} item={item} index={i} />)}

                        {/* Availability */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                            className="mt-3 p-5 rounded-2xl
                                bg-white/50 dark:bg-white/[0.025]
                                border border-white/70 dark:border-white/[0.05]
                                shadow-sm"
                        >
                            <div className="flex items-center gap-2.5 mb-2.5">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                                </span>
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                    Available for Opportunities
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
                                Open to freelance projects, full-time roles, and collaborations.
                                Typical reply time:{" "}
                                <span className="text-slate-700 dark:text-slate-300 font-semibold">under 24 hours</span>.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right — form */}
                    <motion.div
                        initial={{ opacity: 0, y: 36, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-3 relative"
                    >
                        {/* Hover glow */}
                        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-500/8 via-indigo-500/4 to-purple-500/8
                            opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />

                        {/* Card */}
                        <div className="relative bg-white/95 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl
                            border border-white/80 dark:border-white/[0.04]
                            shadow-xl overflow-hidden">

                            {/* Top accent */}
                            <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/45 to-transparent" />

                            {/* Progress bar — fills as required fields are completed */}
                            <div className="h-0.5 bg-slate-100 dark:bg-white/[0.04]">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>

                            <div className="p-6 md:p-8">
                                {/* Form header */}
                                <div className="flex items-start justify-between mb-7">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                                            Send a Message
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-500">
                                            Fill in the details and I'll get back to you promptly.
                                        </p>
                                    </div>
                                    {/* Step indicator */}
                                    <div className="flex-shrink-0 ml-4 px-3 py-1.5 rounded-full
                                        bg-slate-100 dark:bg-white/[0.06]
                                        text-[11px] font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                                        {filled}/{fields.length} done
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-describedby={status ? "contact-status" : undefined}>

                                    {/* Honeypot (hidden) */}
                                    <input type="text" {...register("company")} autoComplete="off" tabIndex={-1} className="sr-only" />

                                    {/* Row 1 — names */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Field id="firstName" label="First Name" register={register("firstName")} error={errors.firstName} required />
                                        <Field id="lastName" label="Last Name" register={register("lastName")} error={errors.lastName} />
                                    </div>

                                    {/* Row 2 — email + phone */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Field id="email" label="Email Address" type="email" register={register("email")} error={errors.email} required />
                                        <Field id="phone" label="Phone Number" type="tel" register={register("phone")} error={errors.phone} />
                                    </div>

                                    {/* Message */}
                                    <Field
                                        id="message" label="Your Message"
                                        register={register("message")} error={errors.message}
                                        rows={5} required maxLength={1000} watch={watch}
                                    />

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group/btn relative w-full py-3.5 rounded-xl font-bold text-sm tracking-wide
                                            bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                                            hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500
                                            text-white
                                            shadow-[0_4px_18px_rgba(79,70,229,0.3)]
                                            hover:shadow-[0_6px_28px_rgba(79,70,229,0.45)]
                                            transition-all duration-300
                                            hover:scale-[1.012] active:scale-[0.988]
                                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                            flex items-center justify-center gap-2.5 overflow-hidden"
                                    >
                                        {/* Shimmer */}
                                        <span className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.8s_infinite]
                                            bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                                        <span className="relative flex items-center gap-2">
                                            {isSubmitting ? (
                                                <><Loader2 className="animate-spin" size={17} /> Sending…</>
                                            ) : (
                                                <><Send size={15} className="group-hover/btn:-rotate-12 transition-transform duration-300" /> Send Message</>
                                            )}
                                        </span>
                                    </button>

                                    {/* Status toast */}
                                    <AnimatePresence mode="wait">
                                        {status && (
                                            <motion.div
                                                key={status.type}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.25 }}
                                                role="status"
                                                aria-live="polite"
                                                aria-atomic="true"
                                                id="contact-status"
                                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium
                                                    ${status.type === "success"
                                                        ? "bg-emerald-50 border border-emerald-100 text-emerald-700 dark:text-emerald-300"
                                                        : "bg-red-50 border border-red-100 text-red-700 dark:text-red-300"
                                                    }`}
                                            >
                                                {status.type === "success"
                                                    ? <CheckCircle2 size={17} className="flex-shrink-0 text-emerald-600" />
                                                    : <AlertCircle size={17} className="flex-shrink-0 text-red-600" />
                                                }
                                                <span>{status.msg}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {/* Success overlay for high-polish feedback */}
                                    <AnimatePresence>
                                        {status?.type === "success" && <SuccessOverlay msg={status.msg} />}
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