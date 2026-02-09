import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import { useState } from 'react';
import { sendContactMessage } from '../services/api';
import { Loader } from '../components/ui/Loader';
import SEOHead from '../components/SEOHead';

const AboutUs: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();

    const subLinks = [
        { name: 'Who We Are', path: 'who-we-are' },
        { name: 'What We Do', path: 'what-we-do' },
        { name: 'Our Team', path: 'our-team' },
        { name: 'Contact', path: 'contact' },
    ];

    return (
        <>
            <SEOHead
                title="About  - Your Trusted Tax & Compliance Partner"
                description="Learn about  - India's leading tax and compliance platform. Expert team providing insights on Income Tax, GST, MCA, and SEBI regulations."
                keywords="about , tax experts, tax consultants, tax compliance team, Indian tax professionals, tax advisory"
                url={window.location.href}
            />
            <div>
                <h1 className="text-3xl font-bold mb-6 text-primary border-b pb-2">About Us</h1>

                <div className="flex flex-wrap gap-4 mb-8">
                    {subLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-full border transition-colors ${currentPath === link.path
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm border text-lg leading-relaxed text-gray-700">
                    <Routes>
                        <Route index element={
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Welcome to </h2>
                                <p className="text-lg leading-relaxed mb-6">Your trusted companion in navigating the complex world of Indian taxation and corporate compliance. We simplify regulatory requirements and provide expert guidance for businesses and professionals.</p>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Choose ?</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                            Expert analysis of tax laws and regulations
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                            Real-time updates on policy changes
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                            Practical compliance solutions
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                            Comprehensive coverage of Income Tax, GST, MCA, SEBI
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        } />
                        <Route path="who-we-are" element={
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Who We Are</h2>
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
                                        <p className="text-gray-700 leading-relaxed">To empower businesses and individuals with accurate, timely, and actionable tax and compliance information. We bridge the gap between complex regulatory requirements and practical business needs.</p>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
                                        <p className="text-gray-700 leading-relaxed">To be India's most trusted digital platform for tax and corporate compliance, making regulatory compliance accessible, understandable, and manageable for everyone.</p>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">What Sets Us Apart</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-blue-600">Expertise</h4>
                                                <p className="text-sm text-gray-600">Team of qualified chartered accountants and legal experts</p>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-blue-600">Accuracy</h4>
                                                <p className="text-sm text-gray-600">Verified information from authentic government sources</p>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-blue-600">Timeliness</h4>
                                                <p className="text-sm text-gray-600">Real-time updates on regulatory changes</p>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-blue-600">Accessibility</h4>
                                                <p className="text-sm text-gray-600">User-friendly platform for all skill levels</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } />
                        <Route path="what-we-do" element={
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">What We Do</h2>
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <span className="text-2xl">📊</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tax Law Analysis</h3>
                                                <p className="text-gray-700">In-depth analysis of Income Tax Act, GST laws, and other regulatory frameworks with practical implications for businesses.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                <span className="text-2xl">📈</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Compliance Guidance</h3>
                                                <p className="text-gray-700">Step-by-step guidance for GST registration, filing, Income Tax returns, MCA compliance, and SEBI regulations.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <span className="text-2xl">📰</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">News & Updates</h3>
                                                <p className="text-gray-700">Latest notifications, circulars, and amendments from CBDT, GST Council, MCA, and SEBI with expert commentary.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <span className="text-2xl">⚖️</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Judicial Precedents</h3>
                                                <p className="text-gray-700">Analysis of important court rulings, tribunal decisions, and their impact on tax and corporate law compliance.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Services Include:</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <ul className="space-y-2 text-gray-700">
                                                <li>• Income Tax planning and compliance</li>
                                                <li>• GST registration and filing</li>
                                                <li>• Company law compliance (MCA)</li>
                                                <li>• SEBI regulatory updates</li>
                                            </ul>
                                            <ul className="space-y-2 text-gray-700">
                                                <li>• Tax litigation support</li>
                                                <li>• Due diligence services</li>
                                                <li>• Regulatory compliance audits</li>
                                                <li>• Professional training programs</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        } />
                        <Route path="our-team" element={
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                            Our diverse team brings together decades of experience in taxation, corporate law, and regulatory compliance.
                                            Each member is committed to delivering excellence and staying ahead of regulatory changes.
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-white text-2xl font-bold">CA</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">Rajesh Kumar</h3>
                                            <p className="text-blue-600 font-medium mb-2">Chartered Accountant</p>
                                            <p className="text-sm text-gray-600">15+ years in tax consulting and corporate compliance</p>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow">
                                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-white text-2xl font-bold">CS</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">Priya Sharma</h3>
                                            <p className="text-green-600 font-medium mb-2">Company Secretary</p>
                                            <p className="text-sm text-gray-600">Expert in MCA compliance and corporate governance</p>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow">
                                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-white text-2xl font-bold">LL</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">Amit Singh</h3>
                                            <p className="text-purple-600 font-medium mb-2">Legal Counsel</p>
                                            <p className="text-sm text-gray-600">Specialized in regulatory law and litigation support</p>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow">
                                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-white text-2xl font-bold">FC</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">Sneha Patel</h3>
                                            <p className="text-orange-600 font-medium mb-2">GST Specialist</p>
                                            <p className="text-sm text-gray-600">Certified GST practitioner with extensive filing experience</p>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow">
                                            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-white text-2xl font-bold">IT</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">Vikram Rao</h3>
                                            <p className="text-red-600 font-medium mb-2">Technology Lead</p>
                                            <p className="text-sm text-gray-600">Building innovative compliance solutions and digital platforms</p>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow">
                                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <span className="text-white text-2xl font-bold">RE</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-1">Meera Joshi</h3>
                                            <p className="text-indigo-600 font-medium mb-2">Research Analyst</p>
                                            <p className="text-sm text-gray-600">Monitoring regulatory changes and preparing compliance updates</p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg text-center">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Join Our Growing Team</h3>
                                        <p className="text-gray-600 mb-4">We're always looking for talented professionals passionate about tax and compliance</p>
                                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            View Career Opportunities
                                        </button>
                                    </div>
                                </div>
                            </div>
                        } />
                        <Route path="contact" element={
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                                <ContactForm />
                            </div>
                        } />
                    </Routes>
                </div>
            </div>
        </>
    );
};

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await sendContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 p-6 rounded text-center">
                <h3 className="text-green-800 font-bold mb-2">Message Sent!</h3>
                <p className="text-green-700">Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-green-900 underline">Send another</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    required
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    required
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                    required
                    className="w-full border rounded px-3 py-2 h-32 focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-white py-2 rounded hover:bg-blue-800 transition-colors disabled:opacity-50 flex justify-center"
            >
                {status === 'loading' ? <Loader size={20} /> : 'Send Message'}
            </button>
            {status === 'error' && <p className="text-red-600 text-sm">Failed to send message. Please try again.</p>}
        </form>
    );
};

export default AboutUs;
