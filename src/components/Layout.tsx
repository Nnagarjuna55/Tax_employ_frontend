import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarSimple from './NavbarSimple';
import SubNavbarSimple from './SubNavbarSimple';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import TaxIllustration from './TaxIllustration';

const Layout: React.FC = () => {
    return (
        <ErrorBoundary>
            {/* Website Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "",
                        "url": "https://.com",
                        "description": "Smart tax solutions and compliance platform for Indian taxation",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://.com/?q={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })
                }}
            />
            <div className="min-h-screen flex flex-col bg-white">
                <NavbarSimple />
                <div className="py-8 bg-gradient-to-b from-primary-900/10 via-primary-900/5 to-transparent border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <TaxIllustration className="opacity-80 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>
                <SubNavbarSimple />
                <main className="flex-1 w-full py-8 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </ErrorBoundary>
    );
};

export default Layout;
