import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white mt-20">
            {/* Newsletter Section */}
            <div className="relative overflow-hidden border-b border-violet-800/30 bg-gradient-to-r from-violet-950/20 to-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full font-semibold text-sm mb-4 border border-violet-500/30">
                            <span>✨</span>
                            <span>Stay Connected</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-200 to-primary-200 bg-clip-text text-transparent">Stay Updated</h3>
                        <p className="text-gray-300 mb-8">Get the latest tax updates and compliance news delivered to your inbox.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-violet-500/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            />
                            <button className="btn-violet inline-flex items-center justify-center gap-2">
                                Subscribe
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-violet-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-600/20">
                                T
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-primary-300 bg-clip-text text-transparent">Tax Portal</h3>
                                <p className="text-xs text-gray-400">Your Compliance Hub</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed max-w-sm">
                            Your comprehensive source for tax regulations, compliance updates, and expert insights on Income Tax, GST, MCA, SEBI, and more.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-300 group">
                                <Mail size={18} className="text-violet-400 group-hover:text-violet-300 transition-colors" />
                                <a href="mailto:info@taxportal.com" className="hover:text-violet-300 transition-colors">info@taxportal.com</a>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300 group">
                                <Phone size={18} className="text-violet-400 group-hover:text-violet-300 transition-colors" />
                                <a href="tel:+911234567890" className="hover:text-violet-300 transition-colors">+91 123 456 7890</a>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <MapPin size={18} className="text-violet-400" />
                                <span>New Delhi, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white border-l-2 border-violet-500 pl-3">Categories</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/income-tax" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    Income Tax
                                </Link>
                            </li>
                            <li>
                                <Link to="/gst" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    GST
                                </Link>
                            </li>
                            <li>
                                <Link to="/mca" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    MCA
                                </Link>
                            </li>
                            <li>
                                <Link to="/sebi" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    SEBI
                                </Link>
                            </li>
                            <li>
                                <Link to="/ms-office" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    MS Office
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white border-l-2 border-violet-500 pl-3">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/submit-article" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    Submit Article
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white border-l-2 border-violet-500 pl-3">Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    Cookie Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-violet-400 transition-colors font-medium">
                                    Disclaimer
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-gray-800 pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-12 h-12 bg-white/10 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 bg-white/10 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 bg-white/10 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 bg-white/10 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                        </div>

                        <p className="text-gray-400 text-sm">
                            &copy; {currentYear} Tax Portal. All rights reserved. Made with care for tax professionals.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
