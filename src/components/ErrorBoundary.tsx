import React from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        console.error('⚠️ ErrorBoundary caught error:', error);
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: unknown) {
        console.error('🛑 Error details:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 bg-red-50 rounded border border-red-100">
                    <h2 className="text-xl font-bold text-red-800">Something went wrong</h2>
                    <p className="text-red-700 mt-2">An unexpected error occurred while rendering this section.</p>
                    {this.state.error && (
                        <pre className="mt-4 text-sm text-gray-700 overflow-auto bg-white p-3 rounded">{this.state.error.message}</pre>
                    )}
                </div>
            );
        }

        return <>{this.props.children}</>;
    }
}

export default ErrorBoundary;
