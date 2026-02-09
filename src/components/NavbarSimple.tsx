import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, LogIn, LogOut, User, FileText, Menu, X } from 'lucide-react';
import Logo from './Logo';
import LoginModal from './LoginModal';

const NavbarSimple: React.FC = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ id: string; email: string; name: string; is_admin: boolean } | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            setIsLoggedIn(!!token);
            if (userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (e) {
                    console.error('Error parsing user data:', e);
                }
            } else {
                setUser(null);
            }
        };

        checkAuth();

        // Listen for auth changes (custom event from login modal)
        const handleAuthChange = () => {
            checkAuth();
        };

        // Listen for storage changes (cross-tab updates)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'token' || e.key === 'user') {
                checkAuth();
            }
        };

        window.addEventListener('auth-changed', handleAuthChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('auth-changed', handleAuthChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [location]);

    // Close login modal when user logs in
    useEffect(() => {
        if (isLoggedIn && loginModalOpen) {
            setLoginModalOpen(false);
        }
    }, [isLoggedIn, loginModalOpen]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
        setMobileMenuOpen(false);
    };

    const menus = [
        { name: 'Home', path: '/' },
        { name: 'Income Tax', path: '/income-tax', submenus: ['Articles', 'News', 'Judiciary', 'Others'] },
        { name: 'GST', path: '/gst', submenus: ['Articles', 'News', 'Judiciary', 'Others'] },
        { name: 'MCA', path: '/mca', submenus: ['Articles', 'News', 'Judiciary', 'Others'] },
        { name: 'SEBI', path: '/sebi', submenus: ['Articles', 'News', 'Judiciary', 'Others'] },
        { name: 'MS Office', path: '/ms-office', submenus: ['Articles', 'News', 'Judiciary', 'Others'] },
        { name: 'About Us', path: '/about-us' },
    ];

    return (
        <nav className="bg-gradient-to-r from-primary-800 to-primary-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center hover:opacity-90 transition-opacity"
                    >
                        <Logo size="md" showText={true} className="text-white" />
                    </Link>
                    <h1 className="text-lg font-bold text-white">TaxEmploy</h1>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1 flex-1 ml-8">
                        {menus.map((menu) => (
                            <div key={menu.name} className="relative group">
                                {menu.submenus ? (
                                    <>
                                        <button
                                            className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1"
                                            onMouseEnter={() => setOpenMenu(menu.name)}
                                        >
                                            {menu.name}
                                            <ChevronDown size={14} className={`transition-transform ${openMenu === menu.name ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openMenu === menu.name && (
                                            <div
                                                className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-medium py-2 z-50"
                                                onMouseEnter={() => setOpenMenu(menu.name)}
                                                onMouseLeave={() => setOpenMenu(null)}
                                            >
                                                {menu.submenus.map((submenu) => (
                                                    <Link
                                                        key={submenu}
                                                        to={`${menu.path}/${submenu.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                                        onClick={() => setOpenMenu(null)}
                                                    >
                                                        {submenu}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={menu.path}
                                        className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        {menu.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden lg:flex items-center gap-3 ml-4">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/submit-article"
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors text-sm"
                                >
                                    <FileText size={16} />
                                    Create Article
                                </Link>
                                <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                                    <User size={16} />
                                    <span className="text-sm font-medium">{user?.name || user?.email?.split('@')[0] || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors text-sm"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setLoginModalOpen(!loginModalOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-primary-700 hover:bg-primary-50 rounded-lg font-semibold transition-colors text-sm shadow-sm"
                            >
                                <LogIn size={16} />
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-white/10">
                        <div className="space-y-2">
                            {menus.map((menu) => (
                                <div key={menu.name}>
                                    {menu.submenus ? (
                                        <div>
                                            <button
                                                className="w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg flex items-center justify-between"
                                                onClick={() => setOpenMenu(openMenu === menu.name ? null : menu.name)}
                                            >
                                                {menu.name}
                                                <ChevronDown size={16} className={`transition-transform ${openMenu === menu.name ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openMenu === menu.name && (
                                                <div className="pl-4 mt-1 space-y-1">
                                                    {menu.submenus.map((submenu) => (
                                                        <Link
                                                            key={submenu}
                                                            to={`${menu.path}/${submenu.toLowerCase().replace(/\s+/g, '-')}`}
                                                            className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg"
                                                            onClick={() => {
                                                                setOpenMenu(null);
                                                                setMobileMenuOpen(false);
                                                            }}
                                                        >
                                                            {submenu}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            to={menu.path}
                                            className="block px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {menu.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        to="/submit-article"
                                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg font-medium text-sm"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <FileText size={16} />
                                        Create Article
                                    </Link>
                                    <div className="flex items-center gap-2 px-4 py-2 text-sm text-white/80">
                                        <User size={16} />
                                        {user?.name || user?.email || 'User'}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg font-medium text-sm"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        setLoginModalOpen(!loginModalOpen);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-2 bg-white text-primary-700 rounded-lg font-semibold text-sm"
                                >
                                    <LogIn size={16} />
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </nav>
    );
};

export default NavbarSimple;
