import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Facebook, Twitter, Youtube, Linkedin, Instagram, MessageSquare, Send } from 'lucide-react';

const SubNavbar: React.FC = () => {
    console.log('🌊 SubNavbar component rendering');

    return (
        <div className="bg-white">
            <div className="border-b">
                <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div>
                            <h2 className="text-2xl font-extrabold text-blue-600">TaxEmploy</h2>
                            <p className="text-xs text-gray-500">Complete tax solution</p>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 text-sm text-gray-700">
                        <Link to="/login" className="hover:text-blue-600 transition-colors">Login/Register</Link>
                        <Link to="/profile" className="hover:text-blue-600 transition-colors">My Profile</Link>
                        <Link to="/submit-post" className="hover:text-blue-600 transition-colors">Submit Post</Link>
                        <Link to="/books" className="hover:text-blue-600 transition-colors">Books</Link>
                        <Link to="/subscription" className="hover:text-blue-600 transition-colors">Subscription</Link>
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-700"><Search size={16} /></button>
                            <button className="p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"><Bell size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-600 text-white">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/about-us/who-we-are" className="text-sm hover:underline hover:text-blue-100">Who we are</Link>
                        <Link to="/about-us/what-we-do" className="text-sm hover:underline hover:text-blue-100">What we do</Link>
                        <Link to="/about-us/our-team" className="text-sm hover:underline hover:text-blue-100">Our Team</Link>
                        <Link to="/about-us/contact" className="text-sm hover:underline hover:text-blue-100">Contact</Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm hidden md:inline-block">Follow Us:</span>
                        <div className="flex items-center gap-2">
                            <a href="#" aria-label="facebook" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white hover:text-blue-600 transition-all duration-200">
                                <Facebook size={16} />
                            </a>
                            <a href="#" aria-label="twitter" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white hover:text-blue-600 transition-all duration-200">
                                <Twitter size={16} />
                            </a>
                            <a href="#" aria-label="youtube" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white hover:text-blue-600 transition-all duration-200">
                                <Youtube size={16} />
                            </a>
                            <a href="#" aria-label="linkedin" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white hover:text-blue-600 transition-all duration-200">
                                <Linkedin size={16} />
                            </a>
                            <a href="#" aria-label="instagram" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white hover:text-blue-600 transition-all duration-200">
                                <Instagram size={16} />
                            </a>
                            <a href="#" aria-label="whatsapp" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white hover:text-blue-600 transition-all duration-200">
                                <MessageSquare size={16} />
                            </a>
                            <a href="#" aria-label="telegram" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white hover:text-blue-600 transition-all duration-200">
                                <Send size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubNavbar;
