import React from 'react';
import Marquee from 'react-fast-marquee';
import { Bell } from 'lucide-react';
import { useBoard } from '../context/BoardContext';

const Footer = () => {
    const { data } = useBoard();

    return (
        <footer className="h-[9vh] max-h-[90px] min-h-[50px] flex-none flex items-center overflow-hidden w-full bg-[#8ECAE6] border-t-4 border-white z-50 shrink-0">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 rotate-[-10deg] z-20">
                <img src="/assets/megaphone.png" onError={(e) => e.target.style.display = 'none'} alt="" className="h-[12vh] w-auto object-contain drop-shadow-md" />
                {/* Fallback icon if image missing */}
                <div className="text-6xl drop-shadow-md hidden">📢</div>
            </div>

            <div className="h-full pl-[10vw] pr-6 bg-[#023047] flex items-center gap-2 z-10 font-bold shrink-0 clip-path-slant">
                <span className="text-white text-[2.5vmin] tracking-wider">DUYURULAR</span>
            </div>

            <Marquee gradient={false} speed={40} className="text-[3vmin] font-bold py-1 text-[#023047]">
                {data.announcements.length > 0 ? (
                    data.announcements.map((item, i) => {
                        const text = typeof item === 'string' ? item : item.text;
                        const style = typeof item === 'string' ? {} : item.style;

                        return (
                            <span
                                key={i}
                                className="mx-[5vw] uppercase tracking-widest"
                                style={{
                                    color: style.color || '#023047',
                                    fontFamily: style.fontFamily || 'Outfit'
                                }}
                            >
                                {text}
                            </span>
                        );
                    })
                ) : (
                    <span className="mx-12 uppercase tracking-widest">KAYAN YAZI.... KAYAN YAZI.... KAYAN YAZI.... KAYAN YAZI</span>
                )}
            </Marquee>
        </footer>
    );
};

export default Footer;
