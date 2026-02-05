import React from 'react';
import Marquee from 'react-fast-marquee';
import { Bell } from 'lucide-react';
import { useBoard } from '../context/BoardContext';

const Footer = () => {
    const { data } = useBoard();

    return (
        <footer className="h-16 flex-none flex items-center overflow-hidden w-full bg-[#8ECAE6] border-t-4 border-white z-50">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 rotate-[-10deg] z-20">
                <img src="/assets/megaphone.png" onError={(e) => e.target.style.display = 'none'} alt="" className="h-24 w-auto object-contain drop-shadow-md" />
                {/* Fallback icon if image missing */}
                <div className="text-6xl drop-shadow-md hidden">📢</div>
            </div>

            <div className="h-full pl-24 pr-6 bg-[#023047] flex items-center gap-2 z-10 font-bold shrink-0 clip-path-slant">
                <span className="text-white text-xl tracking-wider">DUYURULAR</span>
            </div>

            <Marquee gradient={false} speed={40} className="text-3xl font-bold py-2 text-[#023047]">
                {data.announcements.length > 0 ? (
                    data.announcements.map((item, i) => {
                        const text = typeof item === 'string' ? item : item.text;
                        const style = typeof item === 'string' ? {} : item.style;

                        return (
                            <span
                                key={i}
                                className="mx-12 uppercase tracking-widest"
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
