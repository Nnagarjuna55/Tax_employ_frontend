/**
 * API service for Tax Portal Frontend
 * Handles all communication with the backend API
 */

// Use proxy in development, direct URL in production
// Production backend runs on port 8000 / or use VITE_API_URL to override
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "/api" : "https://api.taxemployee.com/api");
const CONTENT_URL = `${API_BASE_URL}/content`;
const CONTACT_URL = `${API_BASE_URL}/contact`;

// Helper to check if response is OK and try to parse JSON
const parseResponse = async (response: Response) => {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
        return await response.json();
    }
    return response.text();
};

export interface Content {
    id?: string;
    _id?: string;
    title: string;
    type: string;
    category: string;
    body: string;
    summary?: string;
    date: string;
    author?: string;
    images?: string[];
}

export interface ContactData {
    name: string;
    email: string;
    message: string;
}

/**
 * Fetch all contents with optional filters
 */
export const fetchAllContent = async (
    params?: { skip?: number; limit?: number; q?: string }
): Promise<Content[]> => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.skip) queryParams.append("skip", params.skip.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.q) queryParams.append("q", params.q);

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        const url = `${CONTENT_URL}${queryString}`;

        console.log('Fetching from:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
            },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const payload = await parseResponse(response);
        console.log('Parsed payload:', payload);

        // API returns a paginated object { total, page, page_size, total_pages, items }
        if (Array.isArray(payload)) return payload as Content[];
        if (payload && Array.isArray(payload.items)) return payload.items as Content[];
        return [];
    } catch (error: any) {
        console.error("Failed to fetch all content:", error.message);
        // Return empty array instead of throwing
        return [];
    }
};

/**
 * Fetch contents by category and type
 */
export const fetchContent = async (
    category: string,
    type: string,
    params?: { skip?: number; limit?: number; q?: string }
): Promise<Content[]> => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.skip) queryParams.append("skip", params.skip.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.q) queryParams.append("q", params.q);

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        const response = await fetch(`${CONTENT_URL}/${category}/${type}${queryString}`);

        if (!response.ok) {
            throw new Error(`Error fetching content: ${response.statusText}`);
        }
        const payload = await response.json();
        if (Array.isArray(payload)) return payload as Content[];
        if (payload && Array.isArray(payload.items)) return payload.items as Content[];
        return [];
    } catch (error) {
        console.error("Failed to fetch content:", error);
        return [];
    }
};

/**
 * Fetch single content by ID
 */
export const fetchContentById = async (id: string): Promise<Content | null> => {
    try {
        const url = `${CONTENT_URL}/item/${id}`;
        console.log('Fetching from URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
            },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const payload = await response.json();
        console.log('Fetched content:', payload);

        // payload may be the content object directly
        return payload as Content;
    } catch (error) {
        console.error(`Failed to fetch content ${id}:`, error);
        return null;
    }
};

/**
 * Fetch contents by category
 */
export const fetchContentByCategory = async (
    category: string,
    params?: { skip?: number; limit?: number }
): Promise<Content[]> => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.skip) queryParams.append("skip", params.skip.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        const response = await fetch(`${CONTENT_URL}/category/${category}${queryString}`);

        if (!response.ok) {
            throw new Error(`Error fetching content: ${response.statusText}`);
        }
        const payload = await response.json();
        if (Array.isArray(payload)) return payload as Content[];
        if (payload && Array.isArray(payload.items)) return payload.items as Content[];
        return [];
    } catch (error) {
        console.error("Failed to fetch content by category:", error);
        return [];
    }
};

/**
 * Get authentication token from localStorage
 */
const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};

/**
 * Upload image file to AWS S3 via backend
 * Returns the S3 URL of the uploaded image
 */
export const uploadImage = async (file: File): Promise<string> => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required. Please login first.');
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new Error('File size exceeds 5MB limit');
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
        }

        const formData = new FormData();
        formData.append('file', file);

        const uploadUrl = `${API_BASE_URL}/upload/image`;

        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || 'Failed to upload image to S3');
        }

        const data = await response.json();

        // Return the S3 URL
        // S3 URLs are CDN-optimized if using CloudFront or custom domain
        return data.url;
    } catch (error: any) {
        console.error("Error uploading image to S3:", error);
        throw error;
    }
};

/**
 * Create new content (Admin)
 */
export const createContent = async (data: {
    title: string;
    category: string;
    type: string;
    body: string;
    summary?: string;
    author?: string;
    date?: string;
    images?: string[];
}): Promise<Content | null> => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        const url = CONTENT_URL;
        console.log('Creating content at:', url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        console.log('Create response status:', response.status);

        if (!response.ok) {
            const errorData = await parseResponse(response);
            throw new Error(`Failed to create content: ${response.status} ${JSON.stringify(errorData)}`);
        }

        const payload = await parseResponse(response);
        return payload as Content;
    } catch (error: any) {
        console.error("Error creating content:", error);
        throw error;
    }
};

/**
 * Send contact message
 */
export const sendContactMessage = async (data: ContactData) => {
    try {
        const response = await fetch(CONTACT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to send message");
        }
        const payload = await response.json();
        // API returns a ContactResponse object
        return payload;
    } catch (error) {
        console.error("Contact error:", error);
        throw error;
    }
};

/**
 * Fetch navigation menus
 */
export const fetchMenus = async () => {
    try {
        const menusUrl = import.meta.env.DEV ? "/menus" : `${API_BASE_URL.replace('/api', '')}/menus`;
        const response = await fetch(menusUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch menus");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching menus:", error);
        return { main_menus: [] };
    }
};

/**
 * Health check API
 */
export const healthCheck = async (): Promise<boolean> => {
    try {
        const healthUrl = import.meta.env.DEV ? "/health" : `${API_BASE_URL.replace('/api', '')}/health`;
        const response = await fetch(healthUrl);
        return response.ok;
    } catch (error) {
        console.error("Health check failed:", error);
        return false;
    }
};
