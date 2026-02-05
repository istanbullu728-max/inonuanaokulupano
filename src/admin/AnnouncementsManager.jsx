import React, { useState } from 'react';
import { useBoard } from '../context/BoardContext';
import { Trash2, PlusCircle } from 'lucide-react';

const AnnouncementsManager = () => {
    const { data, updateSection } = useBoard();
    const [newAnnounce, setNewAnnounce] = useState('');
    const [selectedColor, setSelectedColor] = useState('#334155'); // Default Slate
    const [selectedFont, setSelectedFont] = useState('Outfit');

    const colors = [
        { hex: '#334155', name: 'Gri' },
        { hex: '#4F46E5', name: 'İndigo' },
        { hex: '#E11D48', name: 'Gül' },
        { hex: '#059669', name: 'Zümrüt' },
        { hex: '#D97706', name: 'Kehribar' },
        { hex: '#0891B2', name: 'Turkuaz' }
    ];

    const fonts = [
        { id: 'Outfit', name: 'Modern' },
        { id: 'Montserrat', name: 'Elegans' },
        { id: 'Playfair Display', name: 'Klasik' },
        { id: 'Caveat', name: 'El Yazısı' },
    ];

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newAnnounce.trim()) return;

        const newItem = {
            text: newAnnounce,
            style: {
                color: selectedColor,
                fontFamily: selectedFont
            }
        };

        // Support mixed legacy (string) and new (object) until fully migrated
        updateSection('announcements', [...data.announcements, newItem]);
        setNewAnnounce('');
    };

    const handleRemove = (index) => {
        const updated = data.announcements.filter((_, i) => i !== index);
        updateSection('announcements', updated);
    };

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                    <PlusCircle size={24} />
                </div>
                Duyuru Yönetimi
            </h2>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                <form onSubmit={handleAdd} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Duyuru Metni</label>
                        <input
                            type="text"
                            value={newAnnounce}
                            onChange={(e) => setNewAnnounce(e.target.value)}
                            placeholder="Yeni duyuru metni giriniz..."
                            className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700 bg-white"
                            style={{ color: selectedColor, fontFamily: selectedFont }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Color Picker */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Renk Seçimi</label>
                            <div className="flex gap-3 flex-wrap">
                                {colors.map((c) => (
                                    <button
                                        key={c.hex}
                                        type="button"
                                        onClick={() => setSelectedColor(c.hex)}
                                        className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === c.hex ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent'}`}
                                        style={{ backgroundColor: c.hex }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Font Picker */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Yazı Tipi</label>
                            <div className="flex gap-2 flex-wrap">
                                {fonts.map((f) => (
                                    <button
                                        key={f.id}
                                        type="button"
                                        onClick={() => setSelectedFont(f.id)}
                                        className={`px-3 py-2 rounded-lg text-sm border transition-all ${selectedFont === f.id
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                                            }`}
                                        style={{ fontFamily: f.id }}
                                    >
                                        {f.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 transform hover:-translate-y-1">
                            <PlusCircle size={20} /> Listeye Ekle
                        </button>
                    </div>
                </form>
            </div>

            <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-700 mb-4 px-1">Aktif Duyurular ({data.announcements.length})</h3>
                {data.announcements.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">Henüz hiç duyuru eklenmemiş.</p>
                    </div>
                )}
                {data.announcements.map((item, index) => {
                    // Handle legacy string vs new object structure
                    const text = typeof item === 'string' ? item : item.text;
                    const style = typeof item === 'string' ? {} : item.style;

                    return (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl group hover:shadow-md transition-all">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
                                {index + 1}
                            </div>
                            <p className="flex-1 text-lg" style={{ color: style.color || '#334155', fontFamily: style.fontFamily || 'Outfit' }}>
                                {text}
                            </p>
                            <button
                                onClick={() => handleRemove(index)}
                                className="text-gray-300 hover:text-red-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnnouncementsManager;
