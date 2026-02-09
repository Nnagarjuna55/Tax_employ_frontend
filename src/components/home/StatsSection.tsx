import React from 'react';
import { TrendingUp, BookOpen, Newspaper } from 'lucide-react';

interface StatsSectionProps {
    articleCount: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ articleCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="text-primary-600" size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{articleCount}+</p>
                        <p className="text-sm text-gray-600">Articles Published</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-accent-600" size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">Daily</p>
                        <p className="text-sm text-gray-600">Updates</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <Newspaper className="text-secondary-600" size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">Expert</p>
                        <p className="text-sm text-gray-600">Content</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

