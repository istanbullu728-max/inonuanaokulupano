import React, { useState } from 'react';
import { useBoard } from '../context/BoardContext';
import { Image, Video, Images, Plus, Trash2, Clock, Upload, Link as LinkIcon, Sparkles, MoveHorizontal, ZoomIn, Droplets } from 'lucide-react';

const MediaManager = () => {
    const { data, updateSection } = useBoard();
    const [uploadMode, setUploadMode] = useState('file'); // 'url' or 'file'
    const [tempSlideUrl, setTempSlideUrl] = useState('');

    const updateMedia = (key, val) => {
        let finalVal = val;

        // Auto-convert YouTube URLs to Embed format
        if (key === 'url' && data.media.type === 'video') {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = val.match(regExp);

            if (match && match[2].length === 11) {
                if (!val.includes('youtube.com/embed/')) {
                    finalVal = `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}`;
                }
            }
        }

        updateSection('media', { ...data.media, [key]: finalVal });
    };

    const addSlide = (url) => {
        if (!url) return;
        const currentSlides = data.media.slides || [];
        updateMedia('slides', [...currentSlides, url]);
        setTempSlideUrl('');
    };

    const removeSlide = (index) => {
        const currentSlides = data.media.slides || [];
        const newSlides = currentSlides.filter((_, i) => i !== index);
        updateMedia('slides', newSlides);
    };

    const handleFileUpload = (e, callback) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const TabButton = ({ type, label, icon: Icon }) => (
        <button
            onClick={() => updateMedia('type', type)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${data.media.type === type
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                : 'bg-white border-transparent text-gray-500 hover:bg-gray-50'
                }`}
        >
            <Icon size={20} /> {label}
        </button>
    );

    return (
        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-xl max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 tracking-tight flex items-center gap-3">
                <Images className="text-indigo-500 w-6 h-6 md:w-8 md:h-8" />
                Medya Yönetimi
            </h2>

            {/* Main Type Toggle */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-3 p-1.5 bg-gray-50 rounded-2xl mb-8 w-full md:w-fit border border-gray-100 no-scrollbar">
                <TabButton type="slide" label="Slayt" icon={Images} />
                <TabButton type="video" label="Video" icon={Video} />
                <TabButton type="image" label="Resim" icon={Image} />
            </div>

            <div className="space-y-8">
                {/* Content Area Based on Type */}
                <div className="bg-gray-50 p-4 md:p-6 rounded-2xl border border-gray-100">

                    {/* VIDEO SECTION */}
                    {data.media.type === 'video' && (
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-gray-700">Youtube Video Bağlantısı</label>
                            <div className="flex gap-2">
                                <input
                                    className="flex-1 border border-gray-200 px-5 py-3 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-gray-700 bg-white"
                                    value={data.media.url}
                                    onChange={(e) => updateMedia('url', e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                            </div>
                            <p className="text-xs text-gray-500">Video otomatik olarak döngüye alınacaktır.</p>
                        </div>
                    )}

                    {/* IMAGE SECTION */}
                    {data.media.type === 'image' && (
                        <div className="space-y-6">
                            <div className="flex border-b border-gray-200 mb-4">
                                <button onClick={() => setUploadMode('url')} className={`pb-3 px-4 text-sm font-medium transition-colors relative ${uploadMode === 'url' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>Bağlantı</button>
                                <button onClick={() => setUploadMode('file')} className={`pb-3 px-4 text-sm font-medium transition-colors relative ${uploadMode === 'file' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>Dosya Yükle</button>
                            </div>

                            {uploadMode === 'url' ? (
                                <input
                                    className="w-full border border-gray-200 px-5 py-3 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-gray-700 bg-white"
                                    value={data.media.url}
                                    onChange={(e) => updateMedia('url', e.target.value)}
                                    placeholder="https://ornek-site.com/resim.jpg"
                                />
                            ) : (
                                <div className="relative group cursor-pointer">
                                    <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" onChange={(e) => handleFileUpload(e, (res) => updateMedia('url', res))} />
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50/30">
                                        <Upload className="mx-auto text-gray-400 mb-2 group-hover:text-indigo-500" />
                                        <span className="text-sm text-gray-600 font-medium">Resim seçmek için tıklayın</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* SLIDE SECTION */}
                    {data.media.type === 'slide' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Slide Adder */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Plus size={16} /> Yeni Slayt Ekle
                                    </h3>

                                    <div className="flex border-b border-gray-200 mb-2">
                                        <button onClick={() => setUploadMode('file')} className={`pb-2 px-3 text-xs font-bold transition-colors ${uploadMode === 'file' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400'}`}>DOSYA YÜKLE</button>
                                        <button onClick={() => setUploadMode('url')} className={`pb-2 px-3 text-xs font-bold transition-colors ${uploadMode === 'url' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400'}`}>URL</button>
                                    </div>

                                    {uploadMode === 'file' ? (
                                        <div className="relative group cursor-pointer h-32">
                                            <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" onChange={(e) => handleFileUpload(e, (res) => addSlide(res))} />
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl w-full h-full flex flex-col items-center justify-center bg-white transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50/30">
                                                <Upload size={20} className="text-gray-400 mb-2 group-hover:text-indigo-500" />
                                                <span className="text-xs text-gray-600 font-medium">Slayt görseli yükle</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                className="flex-1 border border-gray-200 px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                                                value={tempSlideUrl}
                                                onChange={(e) => setTempSlideUrl(e.target.value)}
                                                placeholder="Resim bağlantısı..."
                                            />
                                            <button
                                                onClick={() => addSlide(tempSlideUrl)}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                                            >
                                                Ekle
                                            </button>
                                        </div>
                                    )}

                                    <div className="bg-white p-4 rounded-xl border border-gray-200 mt-4">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-2">
                                            <Clock size={14} /> Slayt Geçiş Süresi (Saniye)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-full border border-gray-200 px-4 py-2 rounded-lg font-bold text-gray-700 focus:ring-2 focus:ring-indigo-100 outline-none"
                                            value={data.media.slideDuration || 5}
                                            onChange={(e) => updateMedia('slideDuration', parseInt(e.target.value) || 5)}
                                        />
                                    </div>

                                    <div className="bg-white p-4 rounded-xl border border-gray-200 mt-4">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">
                                            Geçiş Efekti
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { id: 'fade', label: 'Yumuşak', icon: Sparkles },
                                                { id: 'slide', label: 'Kayma', icon: MoveHorizontal },
                                                { id: 'zoom', label: 'Derinlik', icon: ZoomIn },
                                                { id: 'blur', label: 'Flu', icon: Droplets }
                                            ].map((effect) => (
                                                <button
                                                    key={effect.id}
                                                    onClick={() => updateMedia('slideTransition', effect.id)}
                                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${(data.media.slideTransition || 'fade') === effect.id
                                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                        : 'border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <effect.icon size={20} className="mb-1" />
                                                    <span className="text-xs font-bold">{effect.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Slide List */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Images size={16} /> Yüklü Slaytlar ({data.media.slides?.length || 0})
                                    </h3>
                                    <div className="bg-white rounded-xl border border-gray-200 p-2 h-64 overflow-y-auto space-y-2">
                                        {data.media.slides && data.media.slides.length > 0 ? (
                                            data.media.slides.map((slide, index) => (
                                                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg group hover:bg-indigo-50 transition-colors">
                                                    <div className="w-16 h-10 rounded bg-gray-200 overflow-hidden shrink-0 border border-gray-200">
                                                        <img src={slide} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-500 flex-1 truncate">Slayt #{index + 1}</span>
                                                    <button
                                                        onClick={() => removeSlide(index)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-white rounded-md"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center p-4">
                                                <Images size={32} className="mb-2 opacity-50" />
                                                <p className="text-sm">Henüz slayt eklenmemiş.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Common Title/Subtitle Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Başlık</label>
                        <input
                            className="w-full border border-gray-300 px-4 py-3 md:py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-gray-300 bg-white"
                            value={data.media.title || ''}
                            onChange={(e) => updateMedia('title', e.target.value)}
                            placeholder="İçerik başlığı..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Alt Başlık</label>
                        <input
                            className="w-full border border-gray-300 px-4 py-3 md:py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-gray-300 bg-white"
                            value={data.media.subtitle || ''}
                            onChange={(e) => updateMedia('subtitle', e.target.value)}
                            placeholder="İçerik açıklaması..."
                        />
                    </div>
                </div>

                {/* Live Preview */}
                <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Canlı Önizleme</h3>
                    <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg relative ring-4 ring-gray-100">
                        {data.media.type === 'video' ? (
                            <iframe className="w-full h-full" src={data.media.url} title="Preview" frameBorder="0" allowFullScreen></iframe>
                        ) : data.media.type === 'slide' ? (
                            data.media.slides && data.media.slides.length > 0 ? (
                                <img src={data.media.slides[0]} className="w-full h-full object-cover opacity-80" alt="Slide Preview" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/50 text-sm">Slayt Yok</div>
                            )
                        ) : (
                            data.media.url ? (
                                <img src={data.media.url} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/50 text-sm">Görsel Seçilmedi</div>
                            )
                        )}

                        {data.media.type === 'slide' && data.media.slides?.length > 0 && (
                            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                                {data.media.slides.length} Slayt
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaManager;
