import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Loader2,
    ArrowUpRight,
    MessageSquare,
    User,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Clock,
    Zap,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { cn } from "../utils";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "mdsamimhossen827@gmail.com",
        href: "mailto:mdsamimhossen827@gmail.com",
        gradient: "from-blue-600 to-indigo-500",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+880 1743-282144",
        href: "tel:+8801743282144",
        gradient: "from-indigo-600 to-purple-500",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Rangpur, Bangladesh",
        href: null,
        gradient: "from-purple-600 to-pink-500",
    },
];

const formSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

const ease = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease },
    },
};

const ContactBackground = () => (
    <>
        <div className="absolute inset-0 bg-slate-50 dark:bg-[#030308]" />
        <div className="absolute top-0 left-1/4 w-[480px] h-[480px] bg-blue-600/15 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] bg-purple-600/15 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div
            className="absolute top-1/3 right-[8%] w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-1/4 left-[5%] w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
            className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
            style={{
                backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)",
                backgroundSize: "40px 40px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
            }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
    </>
);

const ContactInfoCard = ({ item }) => {
    const Icon = item.icon;
    const cardClass = cn(
        "group relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden",
        "bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl",
        "border border-slate-200/80 dark:border-white/[0.08]",
        "shadow-sm hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10",
        "transition-shadow duration-500",
        item.href && "cursor-pointer"
    );

    const inner = (
        <>
            <div
                className={cn(
                    "relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white",
                    "shadow-lg group-hover:scale-110 transition-transform duration-500",
                    item.gradient
                )}
            >
                <Icon size={20} strokeWidth={2} />
            </div>
            <div className="relative flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">
                    {item.label}
                </p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.value}
                </p>
            </div>
            {item.href && (
                <ArrowUpRight
                    size={18}
                    className="relative text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0"
                />
            )}
        </>
    );

    return (
        <motion.div variants={itemVariants}>
            {item.href ? (
                <motion.a
                    href={item.href}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={cardClass}
                >
                    {inner}
                </motion.a>
            ) : (
                <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={cardClass}
                >
                    {inner}
                </motion.div>
            )}
        </motion.div>
    );
};

const InputField = ({ id, label, type = "text", icon: Icon, register, error, isTextArea, required, maxLength }) => {
    const [focused, setFocused] = useState(false);

    const fieldClasses = cn(
        "w-full pl-11 pr-4 rounded-xl text-sm font-medium outline-none transition-all duration-300",
        "bg-slate-50/80 dark:bg-white/[0.03] text-slate-900 dark:text-slate-100",
        "border border-slate-200 dark:border-white/[0.08]",
        "hover:border-slate-300 dark:hover:border-white/15",
        "focus:border-blue-500/50 dark:focus:border-blue-400/40",
        "focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10",
        "focus:bg-white dark:focus:bg-white/[0.05]",
        error && "border-red-400/60 focus:border-red-400 focus:ring-red-500/10"
    );

    return (
        <motion.div
            className="relative w-full"
            animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
        >
            <label
                htmlFor={id}
                className={cn(
                    "block text-xs font-semibold uppercase tracking-wider mb-2 transition-colors",
                    error ? "text-red-500" : focused ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                )}
            >
                {label}
                {required && <span className="text-blue-500 ml-0.5">*</span>}
            </label>
            <div className="relative">
                <span
                    className={cn(
                        "absolute left-4 z-10 transition-colors duration-300",
                        isTextArea ? "top-4" : "top-1/2 -translate-y-1/2",
                        focused
                            ? error
                                ? "text-red-500"
                                : "text-blue-600 dark:text-blue-400"
                            : "text-slate-400 dark:text-slate-500"
                    )}
                >
                    <Icon size={18} strokeWidth={2} />
                </span>
                {isTextArea ? (
                    <textarea
                        id={id}
                        {...register}
                        rows={5}
                        maxLength={maxLength}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={cn(fieldClasses, "pt-3 pb-3 resize-none")}
                    />
                ) : (
                    <input
                        id={id}
                        type={type}
                        {...register}
                        maxLength={maxLength}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={cn(fieldClasses, "h-12")}
                    />
                )}
            </div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 6 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="flex items-center gap-1.5 text-xs text-red-500 font-medium"
                    >
                        <AlertCircle size={12} />
                        {error.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const messageLength = watch("message")?.length ?? 0;

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await emailjs.send(
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

            if (response.status !== 200) {
                throw new Error("Failed to send message. Please try again.");
            }

            setSubmitStatus({
                type: "success",
                msg: "Message sent! I'll get back to you within 24 hours.",
            });
            reset();
        } catch (error) {
            setSubmitStatus({
                type: "error",
                msg: error?.text || error?.message || "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 6000);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-28 overflow-hidden text-slate-900 dark:text-slate-50"
        >
            <ContactBackground />

            <div className="container relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease }}
                    className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase"
                    >
                        <Sparkles size={14} className="animate-pulse" />
                        Contact
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
                        Let&apos;s Start a{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                            Conversation
                        </span>
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-medium">
                        Have a project, job opportunity, or idea? Send a message — I typically reply within 24 hours.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Left — Contact info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="lg:col-span-5 space-y-4"
                    >
                        {contactInfo.map((item) => (
                            <ContactInfoCard key={item.label} item={item} />
                        ))}

                        {/* Availability + stats */}
                        <motion.div
                            variants={itemVariants}
                            className="relative p-6 rounded-2xl overflow-hidden mt-2
                                bg-gradient-to-br from-white/90 to-slate-50/90
                                dark:from-white/[0.06] dark:to-white/[0.02]
                                border border-slate-200/80 dark:border-white/[0.08]
                                shadow-lg dark:shadow-none"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex items-center gap-3 mb-4">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                                </span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">
                                    Open to opportunities
                                </span>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                                Freelance, full-time, and collaboration — let&apos;s build something great together.
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06]">
                                    <Clock size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Response</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">&lt; 24 hrs</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06]">
                                    <Zap size={18} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Status</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Available</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40, scale: 0.98 }}
                        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.25, ease }}
                        className="lg:col-span-7 relative group"
                    >
                        <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/20 dark:from-blue-500/30 dark:via-indigo-500/15 dark:to-purple-500/25 opacity-60 group-hover:opacity-100 blur-sm transition-opacity duration-700 pointer-events-none" />

                        <div className="relative rounded-[1.65rem] overflow-hidden bg-white/90 dark:bg-[#0a0a12]/90 backdrop-blur-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-2xl shadow-slate-200/50 dark:shadow-black/40">
                            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />

                            <div className="p-8 md:p-10">
                                <div className="flex items-start gap-4 mb-8">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                                        <MessageSquare size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            Send a message
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                            All fields marked with * are required
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <InputField
                                            id="firstName"
                                            label="First name"
                                            icon={User}
                                            register={register("firstName")}
                                            error={errors.firstName}
                                            required
                                        />
                                        <InputField
                                            id="lastName"
                                            label="Last name"
                                            icon={User}
                                            register={register("lastName")}
                                            error={errors.lastName}
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <InputField
                                            id="email"
                                            label="Email"
                                            type="email"
                                            icon={Mail}
                                            register={register("email")}
                                            error={errors.email}
                                            required
                                        />
                                        <InputField
                                            id="phone"
                                            label="Phone"
                                            icon={Phone}
                                            register={register("phone")}
                                            error={errors.phone}
                                        />
                                    </div>

                                    <div className="relative">
                                        <InputField
                                            id="message"
                                            label="Your message"
                                            icon={MessageSquare}
                                            register={register("message")}
                                            error={errors.message}
                                            isTextArea
                                            required
                                            maxLength={500}
                                        />
                                        <span className="absolute bottom-3 right-4 text-[10px] font-mono text-slate-400 dark:text-slate-600">
                                            {messageLength}/500
                                        </span>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        className={cn(
                                            "relative w-full py-4 rounded-xl font-bold text-sm tracking-wide overflow-hidden",
                                            "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white",
                                            "shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/35",
                                            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                                            "flex items-center justify-center gap-2.5"
                                        )}
                                    >
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                                            animate={{ x: ["-200%", "200%"] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                        />
                                        <span className="relative flex items-center gap-2.5">
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={18} />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} />
                                                    Send message
                                                </>
                                            )}
                                        </span>
                                    </motion.button>

                                    <AnimatePresence mode="wait">
                                        {submitStatus && (
                                            <motion.div
                                                key={submitStatus.type}
                                                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                                transition={{ duration: 0.35, ease }}
                                                className={cn(
                                                    "flex items-center gap-3 p-4 rounded-xl text-sm font-medium border",
                                                    submitStatus.type === "error"
                                                        ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                                                        : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                                )}
                                            >
                                                {submitStatus.type === "error" ? (
                                                    <AlertCircle size={20} className="flex-shrink-0" />
                                                ) : (
                                                    <CheckCircle2 size={20} className="flex-shrink-0" />
                                                )}
                                                {submitStatus.msg}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
