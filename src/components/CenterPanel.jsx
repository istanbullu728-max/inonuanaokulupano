import React from 'react';
import { useBoard } from '../context/BoardContext';

const SlideShow = ({ media }) => {
    const [index, setIndex] = React.useState(0);
    const [animKey, setAnimKey] = React.useState(0);

    React.useEffect(() => {
        if (media.type !== 'slide' || !media.slides || media.slides.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prev) => {
                const next = (prev + 1) % media.slides.length;
                setAnimKey(k => k + 1);
                return next;
            });
        }, (media.slideDuration || 5) * 1000);

        return () => clearInterval(interval);
    }, [media.type, media.slides, media.slideDuration]);

    const currentImage = media.type === 'image' ? media.url : (media.slides && media.slides.length > 0 ? media.slides[index] : null);
    const transition = media.slideTransition || 'fade';

    if (!currentImage) return <div className="text-white/50">Görsel Yok</div>;

    let animClass = "animate-fade-in";

    switch (transition) {
        case 'slide':
            animClass = "animate-slide-in-right";
            break;
        case 'zoom':
            animClass = "animate-ken-burns";
            break;
        case 'blur':
            animClass = "animate-blur-in";
            break;
        case 'fade':
        default:
            animClass = "animate-fade-in";
            break;
    }

    return (
        <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
            <img
                key={`${currentImage}-${animKey}`}
                src={currentImage}
                alt={media.title}
                className={`w-full h-full object-contain pointer-events-none ${animClass}`}
            />
        </div>
    );
};

const CenterPanel = () => {
    const { data } = useBoard();
    const { media } = data;

    return (
        <div className="h-full relative group rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] overflow-hidden border-[16px] border-[#8ECAE6] shadow-[0_10px_20px_rgba(0,0,0,0.15)] bg-black flex flex-col transition-all duration-300">
            {/* Top Section: Media Container (Flex Grow) */}
            <div className="flex-1 relative w-full min-h-0 bg-black overflow-hidden">
                {/* Image/Video/Slide is absolutely positioned to fill this flex container without pushing boundaries */}
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    {media.type === 'video' ? (
                        <iframe
                            src={media.url}
                            className="w-full h-full bg-black"
                            title={media.title}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <SlideShow media={media} />
                    )}
                </div>
            </div>

            {/* Bottom Section: Caption (Static Height / Auto) */}
            <div className="bg-white border-t-[8px] border-[#8ECAE6] p-4 shrink-0 z-30 relative min-h-[100px] flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-[#023047] leading-tight min-h-[32px]">
                    {media.title || 'Medyayı Görüntülüyorsunuz'}
                </h2>
                {media.subtitle && (
                    <p className="text-[#023047] opacity-80 mt-1 text-lg font-medium">
                        {media.subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CenterPanel;
