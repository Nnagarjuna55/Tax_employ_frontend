import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo';

const SubNavbarSimple: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-primary-100 to-primary-50 shadow-sm border-t border-primary-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center py-3 gap-4">
                    {/* Brand Section */}
                    <div className="flex items-center gap-3">
                        <Logo size="sm" showText={false} />
                        <div>
                            <h2 className="text-lg font-bold text-primary-900">TaxEmploy</h2>
                            <p className="text-xs text-primary-600">Smart tax solutions & compliance</p>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex gap-6">
                            <Link
                                to="/about-us/who-we-are"
                                className="text-sm font-medium text-primary-900 hover:text-primary-700 transition-colors"
                            >
                                Who we are
                            </Link>
                            <Link
                                to="/about-us/what-we-do"
                                className="text-sm font-medium text-primary-900 hover:text-primary-700 transition-colors"
                            >
                                What we do
                            </Link>
                            <Link
                                to="/about-us/our-team"
                                className="text-sm font-medium text-primary-900 hover:text-primary-700 transition-colors"
                            >
                                Our Team
                            </Link>
                            <Link
                                to="/about-us/contact"
                                className="text-sm font-medium text-primary-900 hover:text-primary-700 transition-colors"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pl-6 border-l border-primary-200">
                            <span className="text-xs text-primary-600 font-medium">Follow:</span>
                            <div className="flex gap-2">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-primary-200 hover:bg-primary-300 rounded-full flex items-center justify-center text-primary-700 hover:text-primary-900 transition-colors"
                                >
                                    <Facebook size={14} />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-primary-200 hover:bg-primary-300 rounded-full flex items-center justify-center text-primary-700 hover:text-primary-900 transition-colors"
                                >
                                    <Twitter size={14} />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-primary-200 hover:bg-primary-300 rounded-full flex items-center justify-center text-primary-700 hover:text-primary-900 transition-colors"
                                >
                                    <Linkedin size={14} />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-primary-200 hover:bg-primary-300 rounded-full flex items-center justify-center text-primary-700 hover:text-primary-900 transition-colors"
                                >
                                    <Instagram size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubNavbarSimple;
