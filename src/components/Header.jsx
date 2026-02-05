import React, { useState, useEffect } from 'react';
import { CloudSun, School } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useBoard } from '../context/BoardContext';

const Header = () => {
    const { data } = useBoard();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="flex justify-between items-center w-full h-[14vh] max-h-[140px] min-h-[80px] px-[2vmin] shrink-0 relative z-20 bg-transparent pt-[var(--safe-top)]">
            {/* Logo & Slogan */}
            <div className="flex items-center gap-[2vmin] h-full py-1">
                <div className="relative group flex items-center h-full">
                    <img src="/assets/design/logo_full.png" alt="Logo" className="h-[85%] w-auto object-contain drop-shadow-xl relative z-10" />
                </div>
                <img src="/assets/design/slogan.png" alt="Slogan" className="h-[40%] w-auto object-contain drop-shadow-md animate-float" />
            </div>

            {/* Right Side: Date/Clock & Weather */}
            <div className="flex flex-col items-end justify-center h-full">
                {/* Date & Time Pill */}
                <div className="flex flex-col items-end justify-center">
                    <div className="text-[#023047] font-bold text-[2.5vmin] uppercase tracking-wider leading-tight">
                        {format(time, 'd MMMM yyyy', { locale: tr })}
                    </div>
                    <div className="text-[#023047] font-bold text-[2vmin] uppercase tracking-wider mb-[0.5vmin] opacity-80">
                        {format(time, 'EEEE', { locale: tr })}
                    </div>

                    <div className="bg-[#8ECAE6] flex items-center gap-[1vmin] px-[2vmin] py-[0.5vmin] rounded-2xl shadow-md border-2 border-white/50">
                        <div className="bg-white/50 p-[0.5vmin] rounded-lg">
                            <School size={24} className="w-[3vmin] h-[3vmin] text-[#023047]" />
                        </div>
                        <span className="text-[4vmin] font-bold text-white tracking-widest font-mono drop-shadow-sm leading-none">
                            {format(time, 'HH:mm:ss')}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
