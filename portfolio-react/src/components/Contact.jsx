import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    });
    const [status, setStatus] = useState({ msg: "", type: "", loading: false });

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
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus({ msg: "Message sent! I'll get back to you soon.", type: "success", loading: false });
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: ""
        });
    };

    return (
        <section id="contact" className="py-20 container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                            Contact
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Let's Work <span className="text-blue-500">Together</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            Have a project in mind or want to discuss a new idea?
                            I'm available for freelance work and full-time opportunities.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="p-3 bg-blue-500/10 rounded-full text-blue-600 dark:text-blue-400">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-slate-200">Location</h3>
                                <p className="text-slate-600 dark:text-slate-400">Rangpur, Bangladesh</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="p-3 bg-blue-500/10 rounded-full text-blue-600 dark:text-blue-400">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-slate-200">Phone</h3>
                                <p className="text-slate-600 dark:text-slate-400">+880-1743282144</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="p-3 bg-blue-500/10 rounded-full text-blue-600 dark:text-blue-400">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-slate-200">Email</h3>
                                <p className="text-slate-600 dark:text-slate-400">mdsamimhossen827@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-100 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-100 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-100 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-100 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 dark:text-slate-100 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                                placeholder="How can I help you?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status.loading}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status.loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                            {status.loading ? "Sending..." : "Send Message"}
                        </button>

                        {status.msg && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-lg text-center text-sm font-medium ${status.type === 'error'
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                    }`}
                            >
                                {status.msg}
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
