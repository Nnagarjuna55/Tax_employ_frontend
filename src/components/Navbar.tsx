import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const MENU_ITEMS = [
    { title: 'Home', path: '/' },
    {
        title: 'Income Tax',
        path: '/income-tax',
        subItems: [
            { title: 'Articles', path: 'articles' },
            { title: 'News', path: 'news' },
            { title: 'Judiciary', path: 'judiciary' },
            { title: 'Others', path: 'others' },
        ]
    },
    {
        title: 'GST',
        path: '/gst',
        subItems: [
            { title: 'Articles', path: 'articles' },
            { title: 'News', path: 'news' },
            { title: 'Judiciary', path: 'judiciary' },
            { title: 'Others', path: 'others' },
        ]
    },
    {
        title: 'MCA',
        path: '/mca',
        subItems: [
            { title: 'Articles', path: 'articles' },
            { title: 'News', path: 'news' },
            { title: 'Judiciary', path: 'judiciary' },
            { title: 'Others', path: 'others' },
        ]
    },
    {
        title: 'SEBI',
        path: '/sebi',
        subItems: [
            { title: 'Articles', path: 'articles' },
            { title: 'News', path: 'news' },
            { title: 'Judiciary', path: 'judiciary' },
            { title: 'Others', path: 'others' },
        ]
    },
    {
        title: 'MS Office',
        path: '/ms-office',
        subItems: [
            { title: 'Articles', path: 'articles' },
            { title: 'News', path: 'news' },
            { title: 'Judiciary', path: 'judiciary' },
            { title: 'Others', path: 'others' },
        ]
    },
    {
        title: 'About Us',
        path: '/about-us',
        subItems: [
            { title: 'Who we are', path: 'who-we-are' },
            { title: 'What we do', path: 'what-we-do' },
            { title: 'Our Team', path: 'our-team' },
            { title: 'Contact', path: 'contact' },
        ]
    },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

    console.log('🧭 Navbar component rendering');

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleSubMenu = (title: string) => {
        if (activeSubMenu === title) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(title);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-violet-700 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg transition-all">
                            T
                        </div>
                        <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-primary-600 bg-clip-text text-transparent hidden sm:inline">Tax Portal</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {MENU_ITEMS.map((item) => (
                            <div key={item.title} className="relative group">
                                {item.subItems ? (
                                    <div className="flex items-center">
                                        <Link
                                            to={item.path}
                                            className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-violet-50 transition-colors duration-200 flex items-center gap-1"
                                        >
                                            {item.title}
                                            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                                        </Link>

                                        {/* Dropdown */}
                                        <div className="absolute left-0 mt-0 w-56 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-3 z-50 border border-violet-100">
                                            {item.subItems.map((sub) => (
                                                <Link
                                                    key={sub.title}
                                                    to={`${item.path}/${sub.path}`}
                                                    className="block px-4 py-2.5 text-gray-700 hover:bg-violet-50 hover:text-violet-700 rounded-lg mx-2 transition-colors duration-150 font-medium text-sm"
                                                >
                                                    {sub.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-200"
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA & Mobile Menu Button */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/submit-article"
                            className="hidden sm:inline-block px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-700 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Submit Article
                        </Link>

                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} className="text-gray-950" /> : <Menu size={24} className="text-gray-950" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        {MENU_ITEMS.map((item) => (
                            <div key={item.title}>
                                {item.subItems ? (
                                    <div>
                                        <button
                                            onClick={() => toggleSubMenu(item.title)}
                                            className="flex justify-between items-center w-full px-4 py-3 text-gray-700 font-medium hover:bg-primary-50 rounded-lg transition-colors"
                                        >
                                            <span>{item.title}</span>
                                            <ChevronDown
                                                size={16}
                                                className={`transform transition-transform duration-300 ${activeSubMenu === item.title ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        {activeSubMenu === item.title && (
                                            <div className="bg-gray-50 rounded-lg ml-2 mt-1">
                                                {item.subItems.map((sub) => (
                                                    <Link
                                                        key={sub.title}
                                                        to={`${item.path}/${sub.path}`}
                                                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-700 hover:bg-white rounded text-sm font-medium transition-colors"
                                                        onClick={toggleMenu}
                                                    >
                                                        {sub.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="block px-4 py-3 text-gray-700 font-medium hover:bg-primary-50 rounded-lg transition-colors"
                                        onClick={toggleMenu}
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link
                            to="/submit-article"
                            className="block mt-4 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg text-center hover:shadow-lg transition-all"
                            onClick={toggleMenu}
                        >
                            Submit Article
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
