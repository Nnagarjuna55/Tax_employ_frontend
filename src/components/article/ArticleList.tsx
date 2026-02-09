import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Content } from '../../services/api';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
    articles: Content[];
    title?: string;
    showViewAll?: boolean;
}

const ARTICLES_PER_PAGE = 10;

export const ArticleList: React.FC<ArticleListProps> = ({
    articles,
    title = "Latest Articles",
    showViewAll = true
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const currentArticles = articles.slice(startIndex, endIndex);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-600">Stay updated with the latest tax news and regulations</p>
                </div>
                {showViewAll && (
                    <Link
                        to="/income-tax"
                        className="flex items-center gap-2 px-6 py-2 text-primary-600 hover:text-primary-700 font-semibold hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        View All <ArrowRight size={18} />
                    </Link>
                )}
            </div>

            {articles.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">No articles available yet.</p>
                    <p className="text-sm text-gray-400 mt-2">Check back soon for updates!</p>
                    <p className="text-xs text-gray-300 mt-4">Articles will appear here once published by administrators.</p>
                </div>
            ) : (
                <div>
                    <div className="grid gap-6 grid-cols-1">
                        {currentArticles.map((article, idx) => (
                            <ArticleCard key={article.id || article._id || idx} article={article} index={idx} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-gray-200">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                <ChevronLeft size={18} />
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                <span className="text-gray-600 font-medium">Page</span>
                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg font-semibold">{currentPage}</span>
                                <span className="text-gray-600">of</span>
                                <span className="text-gray-900 font-semibold">{totalPages}</span>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                Next
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

