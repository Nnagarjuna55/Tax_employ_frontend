import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchContent } from '../services/api';
import { Card } from '../components/ui/Card';
import { Loader } from '../components/ui/Loader';
import { Badge } from '../components/ui/Badge';
import SEOHead from '../components/SEOHead';

interface CategoryPageProps {
    title: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title }) => {
    const location = useLocation();
    // Simple way to get the current sub-path
    const currentPath = location.pathname.split('/').pop();

    const subLinks = [
        { name: 'Articles', path: 'articles' },
        { name: 'News', path: 'news' },
        { name: 'Judiciary', path: 'judiciary' },
        { name: 'Others', path: 'others' },
    ];

    const categoryKeywords: Record<string, string> = {
        'Income Tax': 'income tax, income tax India, income tax articles, income tax news, income tax updates, tax planning, tax filing',
        'GST': 'GST, GST India, GST articles, GST news, GST updates, GST compliance, GST filing, goods and services tax',
        'MCA': 'MCA, MCA compliance, MCA articles, MCA news, Ministry of Corporate Affairs, company law, corporate compliance',
        'SEBI': 'SEBI, SEBI regulations, SEBI articles, SEBI news, securities and exchange board, stock market regulations',
        'MS Office': 'MS Office, Microsoft Office, Excel, Word, PowerPoint, office tutorials, office guides'
    };

    return (
        <>
            <SEOHead
                title={`${title} -  | Expert Articles, News & Updates`}
                description={`Stay updated with latest ${title} articles, news, judiciary updates, and compliance guidelines. Expert insights on ${title} regulations and best practices.`}
                keywords={categoryKeywords[title] || `${title.toLowerCase()}, tax, compliance, articles, news`}
            />
            <div>
                <h1 className="text-3xl font-bold mb-6 text-primary border-b pb-2">{title}</h1>

                <div className="flex space-x-4 mb-8">
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

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <Routes>
                        <Route index element={<div className="text-gray-500">Select a category above to view content.</div>} />
                        <Route path="articles" element={<StubContent title="Articles" category={title} />} />
                        <Route path="news" element={<StubContent title="News" category={title} />} />
                        <Route path="judiciary" element={<StubContent title="Judiciary" category={title} />} />
                        <Route path="others" element={<StubContent title="Others" category={title} />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

const StubContent: React.FC<{ title: string, category: string }> = ({ title, category }) => {
    const navigate = useNavigate();
    const [data, setData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const typeKey = title.toLowerCase();
    const categoryKey = category.toLowerCase().replace(" ", "-");

    React.useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchContent(categoryKey, typeKey)
            .then(items => {
                if (!mounted) return;
                // Defensive handling: backend may return an object with pagination
                // or wrap items. Ensure we always set an array into state.
                if (Array.isArray(items)) {
                    setData(items);
                } else if (items && typeof items === 'object' && 'items' in items && Array.isArray((items as any).items)) {
                    setData((items as any).items);
                } else if (items && typeof items === 'object') {
                    // try to find a plausible array property
                    const possible = Object.values(items).find(v => Array.isArray(v));
                    if (Array.isArray(possible)) {
                        setData(possible as any[]);
                    } else {
                        console.warn('fetchContent returned non-array payload', items);
                        setData([]);
                    }
                } else {
                    setData([]);
                }
            })
            .catch((err) => {
                console.error('fetchContent error', err);
                if (!mounted) return;
                setData([]);
            })
            .finally(() => {
                if (!mounted) return;
                setLoading(false);
            });

        return () => { mounted = false };
    }, [categoryKey, typeKey]);

    if (loading) return <Loader text={`Loading ${title}...`} />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{title} in {category}</h2>
                <Badge label={`${data.length} items`} variant="secondary" />
            </div>

            {(!Array.isArray(data) || data.length === 0) ? (
                <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No content found for this section.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {data.map((item, idx) => {
                        const key = item?.id ?? item?._id ?? idx;
                        const dateText = item?.date ? new Date(item.date).toLocaleDateString() : '';
                        const articleId = item?.id ?? item?._id;
                        return (
                            <Card
                                key={key}
                                title={item?.title ?? 'Untitled'}
                                subtitle={dateText}
                                className="h-full"
                                onClick={() => {
                                    if (articleId) {
                                        navigate(`/article/${articleId}`);
                                    }
                                }}
                            >
                                <Badge label={item?.type ?? 'N/A'} variant="accent" />
                                <p className="mt-3 text-gray-600 line-clamp-3">
                                    {item?.summary ?? item?.body ?? ''}
                                </p>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
