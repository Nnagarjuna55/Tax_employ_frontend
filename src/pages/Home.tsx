import React, { useState, useEffect } from 'react';
import { fetchAllContent } from '../services/api';
import type { Content } from '../services/api';
import { Loader } from '../components/ui/Loader';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { ArticleList } from '../components/article/ArticleList';
import SEOHead from '../components/SEOHead';

const Home: React.FC = () => {
    const [articles, setArticles] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchAllContent({ limit: 12 });
            setArticles(Array.isArray(data) ? data : []);
        } catch (err: any) {
            console.error('Error loading articles:', err);
            setError(err.message || 'Failed to load articles');
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-16">
                <Loader text="Loading articles..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-16 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <p className="text-red-600 font-medium">{error}</p>
                    <button
                        onClick={loadArticles}
                        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title=" - Smart Tax Solutions & Compliance | Income Tax, GST, MCA, SEBI"
                description=" provides expert insights on Indian taxation, GST, Income Tax, MCA compliance, and SEBI regulations. Stay updated with latest tax news, articles, and judiciary updates."
                keywords="tax, income tax, GST, MCA, SEBI, tax compliance, tax articles, tax news, Indian taxation, tax regulations, tax updates, tax portal, tax solutions"
            />
            <div className="space-y-12">
                <HeroSection articleCount={articles.length} />
                <StatsSection articleCount={articles.length} />
                <ArticleList articles={articles} />
            </div>
        </>
    );
};

export default Home;
