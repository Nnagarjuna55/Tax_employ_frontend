import React from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    images: string[];
    uploading: boolean;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (index: number) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    images,
    uploading,
    onImageChange,
    onRemoveImage,
}) => {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <ImageIcon size={14} className="inline mr-1" />
                Images (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors bg-gray-50">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onImageChange}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                />
                <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="text-primary-600" size={24} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 mb-1">
                        {uploading ? 'Uploading...' : 'Click to upload images'}
                    </span>
                    <span className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</span>
                </label>
            </div>
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={url}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                                type="button"
                                onClick={() => onRemoveImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

