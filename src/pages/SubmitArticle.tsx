import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { createContent, uploadImage } from '../services/api';
import { FormInput } from '../components/form/FormInput';
import { FormSelect } from '../components/form/FormSelect';
import { ImageUpload } from '../components/form/ImageUpload';
import { AlertCircle, CheckCircle, FileText, Calendar, User, Tag } from 'lucide-react';

const CATEGORIES = [
    { value: 'income-tax', label: 'Income Tax' },
    { value: 'gst', label: 'GST' },
    { value: 'mca', label: 'MCA' },
    { value: 'sebi', label: 'SEBI' },
    { value: 'ms-office', label: 'MS Office' },
];

const TYPES = [
    { value: 'articles', label: 'Article' },
    { value: 'news', label: 'News' },
    { value: 'judiciary', label: 'Judiciary' },
    { value: 'others', label: 'Others' },
];

const SubmitArticle: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const [formData, setFormData] = useState({
        title: '',
        author: user.name || user.email || '',
        date: new Date().toISOString().split('T')[0],
        category: 'income-tax',
        type: 'articles',
        summary: '',
        body: '',
    });

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingImages(true);
        setError(null);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                try {
                    const url = await uploadImage(file);
                    return url;
                } catch (err) {
                    console.error(`Failed to upload ${file.name}:`, err);
                    throw err;
                }
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            setImages(prev => [...prev, ...uploadedUrls.filter(url => url)]);

            // Clear the input
            e.target.value = '';
        } catch (err: any) {
            setError(`Image upload failed: ${err.message || 'Unknown error'}`);
            console.error('Image upload error:', err);
        } finally {
            setUploadingImages(false);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.title.trim() || !formData.body.trim()) {
            setError('Title and content are required');
            setLoading(false);
            return;
        }

        if (formData.body.length < 10) {
            setError('Article content must be at least 10 characters');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                title: formData.title,
                author: formData.author || user.name || user.email || 'Admin',
                category: formData.category,
                type: formData.type,
                body: formData.body,
                summary: formData.summary || undefined,
                ...(images.length > 0 && { images }),
            };

            console.log('Submitting article with payload:', payload);

            await createContent(payload);

            setSuccess(true);
            setTimeout(() => navigate('/'), 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to submit article');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
                <Card title="Article Published!" className="text-center max-w-md w-full">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <p className="text-gray-700 font-medium mb-2">Your article has been published successfully!</p>
                        <p className="text-sm text-gray-500">Redirecting to home page...</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <FileText className="text-primary-600" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
                        <p className="text-gray-600">Share your knowledge with our community</p>
                    </div>
                </div>
            </div>

            <Card className="shadow-medium">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="flex gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <FormInput
                        label="Article Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter a compelling title for your article"
                        required
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                        <FormInput
                            label="Author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Author name"
                            icon={User}
                            required
                        />
                        <FormInput
                            label="Date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            icon={Calendar}
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <FormSelect
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            options={CATEGORIES}
                            icon={Tag}
                            required
                        />
                        <FormSelect
                            label="Type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            options={TYPES}
                            required
                        />
                    </div>

                    <ImageUpload
                        images={images}
                        uploading={uploadingImages}
                        onImageChange={handleImageChange}
                        onRemoveImage={removeImage}
                    />

                    <FormInput
                        label="Summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="Brief summary of your article"
                        rows={3}
                        maxLength={500}
                        showCount
                    />

                    <FormInput
                        label="Article Content"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        placeholder="Write your article content here"
                        rows={12}
                        required
                        showCount
                    />

                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={loading || uploadingImages}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            {loading ? 'Publishing...' : 'Publish Article'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default SubmitArticle;
