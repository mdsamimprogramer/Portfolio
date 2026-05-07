import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

/* ─── Add to your index.html or _document.js ───────────────────────────────
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
*/

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState({ msg: "", type: "", loading: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ msg: "", type: "", loading: false });

        if (!formData.firstName || !formData.email || !formData.message) {
            setStatus({
                msg: "Please fill in name, email, and message.",
                type: "error",
                loading: false,
            });
            return;
        }

        setStatus({ msg: "", type: "", loading: true });
        await new Promise((res) => setTimeout(res, 1500));

        setStatus({
            msg: "Message sent! I'll get back to you soon.",
            type: "success",
            loading: false,
        });
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    };

    const infoItems = [
        { icon: <MapPin size={18} />, label: "Location", value: "Rangpur, Bangladesh" },
        { icon: <Phone size={18} />, label: "Phone", value: "+880-1743282144" },
        { icon: <Mail size={18} />, label: "Email", value: "mdsamimhossen827@gmail.com" },
    ];

    return (
        <section
            id="contact"
            className="py-28 px-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.3fr] gap-16 items-start">

                {/* ── Left: Info Panel ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-8"
                >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-px bg-violet-500" />
                        <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-violet-500">
                            Contact
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="space-y-4">
                        <h2
                            className="text-5xl leading-[1.15] font-semibold text-slate-900 dark:text-slate-50"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Let's create{" "}
                            <em className="text-violet-500 font-normal italic">
                                something great
                            </em>
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light max-w-[300px]">
                            Have a project in mind? I'm open for freelance collaborations
                            and full-time opportunities.
                        </p>
                    </div>

                    {/* Availability */}
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full px-4 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Available for new projects
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-200 dark:bg-slate-800" />

                    {/* Info Items */}
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {infoItems.map(({ icon, label, value }) => (
                            <div key={label} className="flex items-center gap-4 py-4">
                                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                                    {icon}
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-400 dark:text-slate-500 mb-0.5">
                                        {label}
                                    </p>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Right: Form Panel ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[20px] overflow-hidden shadow-sm"
                >
                    {/* Purple top accent bar */}
                    <div className="h-[3px] bg-violet-600 w-full" />

                    <div className="p-8">
                        {/* Form header */}
                        <div className="mb-6">
                            <h3
                                className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Send a message
                            </h3>
                            <p className="text-sm text-slate-400 dark:text-slate-500 font-light">
                                I'll get back to you within 24 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Row 1 */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="First name" required>
                                    <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
                                </Field>
                                <Field label="Last name">
                                    <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                                </Field>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Email" required>
                                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                                </Field>
                                <Field label="Phone">
                                    <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+880 ..." />
                                </Field>
                            </div>

                            {/* Message */}
                            <Field label="Message" required>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project…"
                                    className={`${inputBase} resize-none`}
                                />
                            </Field>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status.loading}
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium tracking-wide rounded-xl transition-all duration-150"
                            >
                                {status.loading
                                    ? <Loader2 size={16} className="animate-spin" />
                                    : <Send size={15} />
                                }
                                {status.loading ? "Sending…" : "Send message"}
                            </button>

                            {/* Status */}
                            {status.msg && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`text-sm text-center font-medium px-4 py-3 rounded-xl border ${status.type === "error"
                                        ? "bg-pink-50 dark:bg-pink-500/10 text-pink-800 dark:text-pink-300 border-pink-200 dark:border-pink-500/20"
                                        : "bg-green-50 dark:bg-green-500/10 text-green-800 dark:text-green-300 border-green-200 dark:border-green-500/20"
                                        }`}
                                >
                                    {status.msg}
                                </motion.div>
                            )}
                        </form>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

/* ─── Helpers ─── */

const inputBase =
    "w-full px-4 py-2.5 text-sm font-light bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-150";

const Input = ({ name, type = "text", value, onChange, placeholder }) => (
    <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputBase}
    />
);

const Field = ({ label, required, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-400 dark:text-slate-500">
            {label}
            {required && <span className="text-pink-400 ml-0.5">*</span>}
        </label>
        {children}
    </div>
);

export default Contact;