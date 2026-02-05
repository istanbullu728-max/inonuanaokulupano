import React from 'react';

const Layout = ({ children }) => {
    return (
        <div
            className="fixed inset-0 w-full h-full flex flex-col overflow-hidden font-sans box-border"
            style={{
                backgroundImage: 'url(/assets/design/bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] z-0"></div>

            {/* Cute Clouds Ambient Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Cloud 1 - Top Left */}
                <div className="absolute top-10 left-[10%] opacity-40 animate-cloud-drift">
                    <svg width="120" height="80" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.819 10.034C17.657 6.618 14.826 4 11.5 4C8.48 4 5.856 6.16 5.3 9.06C2.398 9.56 0.5 11.956 0.5 14.5C0.5 17.538 2.962 20 6 20H17.5H18.5H17.5Z" />
                    </svg>
                </div>
                {/* Cloud 2 - Top Right */}
                <div className="absolute top-20 right-[15%] opacity-30 animate-cloud-drift-slow">
                    <svg width="160" height="100" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.819 10.034C17.657 6.618 14.826 4 11.5 4C8.48 4 5.856 6.16 5.3 9.06C2.398 9.56 0.5 11.956 0.5 14.5C0.5 17.538 2.962 20 6 20H17.5H18.5H17.5Z" />
                    </svg>
                </div>
                {/* Cloud 3 - Bottom Left */}
                <div className="absolute bottom-32 -left-10 opacity-20 animate-cloud-drift">
                    <svg width="200" height="120" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.819 10.034C17.657 6.618 14.826 4 11.5 4C8.48 4 5.856 6.16 5.3 9.06C2.398 9.56 0.5 11.956 0.5 14.5C0.5 17.538 2.962 20 6 20H17.5H18.5H17.5Z" />
                    </svg>
                </div>
                {/* Cloud 4 - Bottom Right small */}
                <div className="absolute bottom-10 right-[25%] opacity-25 animate-float">
                    <svg width="90" height="60" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.819 10.034C17.657 6.618 14.826 4 11.5 4C8.48 4 5.856 6.16 5.3 9.06C2.398 9.56 0.5 11.956 0.5 14.5C0.5 17.538 2.962 20 6 20H17.5H18.5H17.5Z" />
                    </svg>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-[20%] w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-[10%] w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 flex flex-col flex-1 min-h-0 w-full">
                {children}
            </div>
        </div>
    );
};

export default Layout;
