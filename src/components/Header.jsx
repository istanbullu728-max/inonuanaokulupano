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
        <header className="flex justify-between items-center px-4 pt-2 pb-1 h-auto shrink-0 relative z-20">
            {/* Logo & Slogan */}
            <div className="flex items-center gap-6 py-2">
                <div className="relative group flex items-center p-2">
                    <img src="/assets/design/logo_full.png" alt="Logo" className="h-32 md:h-48 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300 relative z-10" />
                </div>
                <img src="/assets/design/slogan.png" alt="Slogan" className="h-16 md:h-24 w-auto object-contain mt-2 drop-shadow-md animate-float" />
            </div>

            {/* Right Side: Date/Clock & Weather */}
            <div className="flex flex-col items-end gap-2">
                {/* Date & Time Pill */}
                <div className="flex flex-col items-end">
                    <div className="text-[#023047] font-bold text-xl uppercase tracking-wider">
                        {format(time, 'd MMMM yyyy', { locale: tr })}
                    </div>
                    <div className="text-[#023047] font-bold text-xl uppercase tracking-wider mb-1">
                        {format(time, 'EEEE', { locale: tr })}
                    </div>

                    <div className="bg-[#8ECAE6] flex items-center gap-2 px-4 py-1 rounded-2xl shadow-md border-2 border-white/50">
                        <div className="bg-white/50 p-1 rounded-lg">
                            <School size={20} className="text-[#023047]" />
                        </div>
                        <span className="text-4xl font-bold text-white tracking-widest font-mono drop-shadow-sm">
                            {format(time, 'HH:mm:ss')}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
