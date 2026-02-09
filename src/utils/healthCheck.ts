/**
 * Health check utilities for diagnosing connection issues
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const BACKEND_URL = API_BASE_URL.replace('/api', '');

export interface HealthStatus {
    backend: boolean;
    api: boolean;
    message: string;
}

/**
 * Check if backend is reachable
 */
export const checkBackendHealth = async (): Promise<HealthStatus> => {
    try {
        // Try to reach health endpoint
        const response = await fetch(`${BACKEND_URL}/health`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (response.ok) {
            return {
                backend: true,
                api: true,
                message: 'Backend is running and responding',
            };
        } else {
            return {
                backend: true,
                api: false,
                message: `Backend responded with status ${response.status}`,
            };
        }
    } catch (error: any) {
        console.error('Backend health check failed:', error);
        return {
            backend: false,
            api: false,
            message: `Cannot reach backend at ${BACKEND_URL}. Is it running?`,
        };
    }
};

/**
 * Check if API is accessible
 */
export const checkApiHealth = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        return response.ok || response.status !== 404;
    } catch (error) {
        console.error('API health check failed:', error);
        return false;
    }
};

/**
 * Run full diagnostic
 */
export const runDiagnostic = async () => {
    console.log('🔍 Running connection diagnostic...');
    console.log(`Backend URL: ${BACKEND_URL}`);
    console.log(`API URL: ${API_BASE_URL}`);

    const health = await checkBackendHealth();
    console.log('Health Check Result:', health);

    return health;
};
