import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
    articleCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ articleCount = 0 }) => {
    return (
        <div className="relative overflow-hidden py-16 md:py-24">
            {/* Animated Background Elements - Violet Theme */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full font-semibold text-sm mb-6">
                        <Sparkles size={16} />
                        <span>Welcome to TaxEmployee</span>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-950 mb-6 leading-tight">
                        Your Complete Tax & Compliance <span className="bg-gradient-to-r from-violet-600 to-primary-600 bg-clip-text text-transparent">Hub</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Stay informed with expert insights on Income Tax, GST, MCA, SEBI regulations, and more. Your trusted source for tax compliance and regulatory updates.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link
                            to="/income-tax"
                            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-violet-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center justify-center gap-2 group"
                        >
                            Explore Articles
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/about-us"
                            className="px-8 py-3 bg-white border-2 border-violet-600 text-violet-600 font-semibold rounded-lg hover:bg-violet-50 transition-all duration-200"
                        >
                            Learn More
                        </Link>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                        <div className="bg-white rounded-lg p-4 shadow-light border border-violet-100">
                            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-primary-600 bg-clip-text text-transparent">{articleCount || 0}+</div>
                            <div className="text-xs text-gray-600 mt-1">Articles</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-light border border-violet-100">
                            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-primary-600 bg-clip-text text-transparent">50K+</div>
                            <div className="text-xs text-gray-600 mt-1">Readers</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-light border border-violet-100">
                            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-primary-600 bg-clip-text text-transparent">10+</div>
                            <div className="text-xs text-gray-600 mt-1">Categories</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

