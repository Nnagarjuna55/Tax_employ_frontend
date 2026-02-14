import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { Content } from '../../services/api';

interface ArticleCardProps {
    article: Content;
    index?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
    // Use _id (MongoDB) or id, but don't fall back to index
    const articleId = article._id || article.id;

    if (!articleId) {
        console.warn('Article ID missing:', article);
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch {
            return dateString;
        }
    };

    // Mark `index` as used (may be passed by callers) to avoid TS6133 unused variable error
    void index;

    return (
        <div className="relative">
            <Link to={`/article/${articleId}`} className="absolute inset-0 z-10" style={{ pointerEvents: 'auto' }}></Link>
            <Card
                className="h-full cursor-pointer hover:shadow-xl hover:border-violet-200 group overflow-hidden relative z-0"
            >
                <div className="space-y-4">
                    {/* Image Section - Only show if image exists */}
                    {article.images && article.images.length > 0 && (
                        <div className="relative overflow-hidden rounded-xl -mx-6 -mt-6 mb-4 h-48 bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <img
                                src={article.images[0]}
                                alt={`${article.title} - ${article.category} article`}
                                title={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    )}

                    {/* Title */}
                    <div className="pt-2">
                        <h3 className="text-lg font-bold text-gray-950 line-clamp-2 group-hover:text-violet-600 transition-colors">
                            {article.title}
                        </h3>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap pt-2">
                        <Badge label={article.category} variant="violet" />
                        <Badge label={article.type} variant="secondary" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                        {article.summary || article.body.substring(0, 120) + '...'}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-violet-100">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-violet-400" />
                                <span className="font-medium">{formatDate(article.date)}</span>
                            </span>
                            {article.author && (
                                <span className="flex items-center gap-1.5">
                                    <User size={14} className="text-violet-400" />
                                    <span className="font-medium truncate">{article.author}</span>
                                </span>
                            )}
                        </div>

                        {/* Read More Link */}
                        <Link
                            to={`/article/${articleId}`}
                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                        >
                            Read Article
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

