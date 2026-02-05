import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useBoard } from '../context/BoardContext';
import { differenceInMinutes, differenceInSeconds } from 'date-fns';

const RightPanel = () => {
    const { data } = useBoard();
    const [timeLeft, setTimeLeft] = React.useState({ hrs: 0, mins: 0, secs: 0 });

    // Dynamic countdown logic
    React.useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const targetTimeStr = data.countdown.targetTime || '12:00';
            const [hours, minutes] = targetTimeStr.split(':').map(Number);

            const target = new Date();
            target.setHours(hours, minutes, 0, 0);

            // If target passed today, aim for tomorrow
            if (now > target) {
                target.setDate(target.getDate() + 1);
            }

            const diffSecs = differenceInSeconds(target, now);

            if (diffSecs <= 0) {
                setTimeLeft({ hrs: 0, mins: 0, secs: 0 });
                return;
            }

            const hrs = Math.floor(diffSecs / 3600);
            const mins = Math.floor((diffSecs % 3600) / 60);
            const secs = diffSecs % 60;

            setTimeLeft({ hrs, mins, secs });
        };

        calculateTime(); // Initial call
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [data.countdown.targetTime]);

    const format = (num) => num < 10 ? `0${num}` : num;

    const getWeatherIcon = (status) => {
        switch (status) {
            case 'Güneşli': return '☀️';
            case 'Parçalı Bulutlu': return '⛅';
            case 'Bulutlu': return '☁️';
            case 'Yağmurlu': return '🌧️';
            case 'Karlı': return '❄️';
            default: return '☀️';
        }
    };

    return (
        <div className="flex flex-col gap-4 h-full overflow-hidden pb-0">
            {/* Nöbetçi Öğretmen */}
            <div className="bg-white/80 rounded-3xl shadow-lg overflow-hidden border-4 border-white shrink-0">
                <div className="bg-[#0f6a9e] text-white p-1 text-center uppercase font-bold text-base tracking-wider flex items-center justify-center gap-2">
                    <span className="text-lg">👔</span> Nöbetçi Öğretmen
                </div>
                <div className="p-1 grid grid-cols-2 gap-1 text-center min-h-0">
                    <div className="flex flex-col">
                        <span className="font-bold text-[#023047] text-base">SABAH</span>
                        <span className="text-[#023047] font-bold text-xl md:text-2xl mt-1">{data.dutyTeachers?.morning || '-'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-[#023047] text-base">ÖĞLEN</span>
                        <span className="text-[#023047] font-bold text-xl md:text-2xl mt-1">{data.dutyTeachers?.afternoon || '-'}</span>
                    </div>
                </div>
            </div>

            {/* Beslenme Menüsü - Flex Grow to fill space */}
            <div className="bg-[#c8e6c9] rounded-3xl shadow-lg overflow-hidden border-4 border-white flex-1 flex flex-col min-h-0">
                <div className="bg-[#7cb342] text-white p-1 text-center uppercase font-bold text-base tracking-wider flex items-center justify-center gap-2 shrink-0">
                    <span className="text-lg">🥗</span> Beslenme Menüsü
                </div>
                <div className="p-2 flex flex-col justify-center items-center flex-1 gap-2 text-center min-h-0 overflow-y-auto">
                    <div className="bg-white/40 p-2 rounded-xl w-full flex-1 flex flex-col items-center justify-center">
                        <span className="text-[#33691e] opacity-70 text-xs uppercase font-bold mb-1">Kahvaltı</span>
                        <p className="font-bold text-[#33691e] text-lg md:text-xl leading-tight">{data.menu.breakfast || 'Menü girilmedi'}</p>
                    </div>
                    <div className="bg-white/40 p-2 rounded-xl w-full flex-1 flex flex-col items-center justify-center">
                        <span className="text-[#33691e] opacity-70 text-xs uppercase font-bold mb-1">Öğle Yemeği</span>
                        <p className="font-bold text-[#33691e] text-lg md:text-xl leading-tight">{data.menu.lunch || 'Menü girilmedi'}</p>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Exit Time & Weather */}
            <div className="grid grid-cols-2 gap-4 h-auto shrink-0">
                {/* Çıkış Saatine */}
                <div className="bg-[#ffe0b2] rounded-3xl shadow-lg border-4 border-white p-2 flex flex-col items-center justify-center relative min-h-[100px]">
                    <div className="absolute -top-3 -left-3 rotate-[-15deg]">
                        <span className="text-3xl drop-shadow-md">📢</span>
                    </div>
                    <div className="bg-[#fb8c00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 uppercase">
                        {data.countdown.label || 'Geri Sayım'}
                    </div>
                    <div className="text-center leading-tight">
                        <div className="font-bold text-[#ef6c00] text-lg">{format(timeLeft.hrs)} SAAT</div>
                        <div className="font-bold text-[#ef6c00] text-lg">{format(timeLeft.mins)} DAKİKA</div>
                        <div className="font-bold text-[#ef6c00] text-lg">{format(timeLeft.secs)} SANİYE</div>
                    </div>
                </div>

                {/* Hava Durumu */}
                <div className="bg-[#b3e5fc] rounded-3xl shadow-lg border-4 border-white p-2 flex flex-col items-center justify-between relative overflow-hidden min-h-[100px]">
                    <div className="bg-[#039be5] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase z-10 truncate max-w-full">
                        {data.weather?.city || 'Hava Durumu'}
                    </div>
                    <div className="absolute top-8 right-2 opacity-20">
                        {/* Background Icon */}
                    </div>

                    <div className="flex flex-col items-center z-10 mt-auto mb-2">
                        <span className="text-6xl font-bold text-[#01579b]">{data.weather?.temp || 15}°</span>
                    </div>
                    <div className="absolute top-6 left-2">
                        <span className="text-3xl">{getWeatherIcon(data.weather?.status)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightPanel;
