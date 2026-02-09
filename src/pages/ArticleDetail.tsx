import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { fetchContentById } from '../services/api';
import { Calendar, User, Eye, Folder } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadArticle = async () => {
            if (!id) {
                setError('Article ID not found');
                setLoading(false);
                console.warn('No article ID provided');
                return;
            }

            try {
                setLoading(true);
                console.log('Fetching article with ID:', id);
                const data = await fetchContentById(id);
                console.log('Fetched article data:', data);

                if (!data) {
                    setError('Article not found. Please try another article.');
                    console.warn('No data returned from API for ID:', id);
                } else {
                    setArticle(data);
                    console.log('Article loaded successfully:', data.title);
                }
            } catch (err: any) {
                const errorMsg = err.message || 'Failed to load article';
                setError(errorMsg);
                console.error('Error loading article:', errorMsg);
            } finally {
                setLoading(false);
            }
        };

        loadArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto py-12">
                <Card title="Loading...">
                    <p className="text-gray-600">Please wait...</p>
                </Card>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="max-w-3xl mx-auto py-12">
                <Card title="Error">
                    <p className="text-red-600 mb-4">{error || 'Article not found'}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to Home
                    </button>
                </Card>
            </div>
        );
    }

    const articleDate = article.date ? new Date(article.date).toISOString() : new Date().toISOString();
    const articleUrl = `${window.location.origin}/article/${id}`;
    const articleImage = article.images && article.images.length > 0 ? article.images[0] : '/-logo.svg';

    return (
        <>
            <SEOHead
                title={`${article.title} - `}
                description={article.summary || article.body?.substring(0, 160) || `Read about ${article.title} on  - Expert tax insights and compliance guidance.`}
                keywords={`${article.category}, ${article.type}, ${article.title}, tax, compliance, India`}
                image={articleImage}
                url={articleUrl}
                type="article"
                author={article.author || ''}
                publishedTime={articleDate}
                modifiedTime={articleDate}
            />
            {/* Structured Data for Article */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": article.title,
                        "description": article.summary || article.body?.substring(0, 160),
                        "image": articleImage,
                        "datePublished": articleDate,
                        "dateModified": articleDate,
                        "author": {
                            "@type": "Person",
                            "name": article.author || ""
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "",
                            "logo": {
                                "@type": "ImageObject",
                                "url": `${window.location.origin}/-logo.svg`
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": articleUrl
                        },
                        "articleSection": article.category,
                        "keywords": `${article.category}, ${article.type}, tax, compliance`
                    })
                }}
            />
            <div className="space-y-8">
                {/* Breadcrumb */}
                <div className="bg-white/60 rounded-lg p-4 shadow-sm">
                    <nav className="text-sm text-gray-500">
                        <Link to="/" className="hover:underline text-gray-600">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/" className="hover:underline text-gray-600">Articles</Link>
                        <span className="mx-2">/</span>
                        <span className="font-semibold text-gray-800 line-clamp-1">{article.title}</span>
                    </nav>
                </div>

                <div className="max-w-3xl mx-auto">
                    <article itemScope itemType="https://schema.org/Article" className="bg-white rounded-xl shadow-md p-8">
                        <h1 itemProp="headline" className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

                        <div className="text-sm text-gray-500 flex flex-wrap gap-4 pb-6 border-b">
                            <span className="inline-flex items-center gap-2"><User size={16} /> {article.author || 'Admin'}</span>
                            <span className="inline-flex items-center gap-2"><Calendar size={16} /> {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="inline-flex items-center gap-2"><Eye size={16} /> 0 views</span>
                            <span className="inline-flex items-center gap-2"><Folder size={16} /> {article.category}</span>
                        </div>

                        {article.summary && (
                            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600">
                                <p itemProp="description" className="text-blue-900 italic">{article.summary}</p>
                            </div>
                        )}

                        {/* Images */}
                        {article.images && article.images.length > 0 && (
                            <div className="mt-6 space-y-4">
                                {article.images.map((imageUrl: string, index: number) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={`${article.title} - ${article.category} - Image ${index + 1}`}
                                        title={article.title}
                                        className="w-full rounded-lg shadow-md"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        <div itemProp="articleBody" className="mt-8 text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {article.body}
                        </div>

                        <div className="mt-8 pt-6 border-t">
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                ← Back to Articles
                            </button>
                        </div>
                    </article>

                    {/* Related Articles */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2].map((i) => (
                                <Card key={i} title="Related Article" className="cursor-pointer hover:shadow-lg transition-shadow">
                                    <p className="text-gray-600 mb-4">Coming soon...</p>
                                    <Link to="/" className="text-blue-600 hover:underline">View more &rarr;</Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticleDetail;
