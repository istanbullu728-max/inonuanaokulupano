import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 bg-red-50 flex items-center justify-center p-10 z-[9999]">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full border border-red-200">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Bir Hata Oluştu!</h1>
                        <p className="text-gray-700 mb-4">Uygulama beklenmedik bir hata ile karşılaştı. Lütfen aşağıdaki hatayı geliştiriciye bildirin.</p>

                        <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60 mb-6 border border-gray-300">
                            <code className="text-xs text-red-800 font-mono block whitespace-pre-wrap">
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </code>
                        </div>

                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                            Verileri Sıfırla ve Sayfayı Yenile
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
