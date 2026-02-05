import React, { useState } from 'react';
import { useBoard } from '../context/BoardContext';
import { Trash2, Plus, User, Utensils, Users } from 'lucide-react';

const TeachersManager = () => {
    const { data, updateSection } = useBoard();
    const [newItem, setNewItem] = useState('');
    const items = data.teachers || [];

    const addItem = () => {
        if (!newItem.trim()) return;
        updateSection('teachers', [...items, newItem]);
        setNewItem('');
    };

    const removeItem = (index) => {
        updateSection('teachers', items.filter((_, i) => i !== index));
    };

    const updateDuty = (period, teacher) => {
        updateSection('dutyTeachers', { ...data.dutyTeachers, [period]: teacher });
    };

    return (
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 border border-gray-100 shadow-sm h-full flex flex-col gap-6 md:gap-8">
            {/* 1. SELECTION SECTION */}
            <div className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100">
                <h3 className="text-base md:text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                    <User size={20} className="text-[#6366F1]" /> Nöbetçi Seçimi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Sabah Nöbetçisi</label>
                        <select
                            className="w-full border border-slate-200 px-4 py-3 md:py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#6366F1] bg-white text-slate-700 font-medium"
                            value={data.dutyTeachers?.morning || ''}
                            onChange={(e) => updateDuty('morning', e.target.value)}
                        >
                            <option value="">Seçiniz...</option>
                            {data.teachers.map((t, i) => (
                                <option key={i} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Öğle Nöbetçisi</label>
                        <select
                            className="w-full border border-slate-200 px-4 py-3 md:py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-[#6366F1] bg-white text-slate-700 font-medium"
                            value={data.dutyTeachers?.afternoon || ''}
                            onChange={(e) => updateDuty('afternoon', e.target.value)}
                        >
                            <option value="">Seçiniz...</option>
                            {data.teachers.map((t, i) => (
                                <option key={i} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* 2. LIST MANAGEMENT */}
            <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-4 flex items-center gap-3">
                    <Users className="text-[#6366F1]" size={24} />
                    Öğretmen Listesi
                </h2>

                <div className="flex gap-3 mb-6">
                    <input
                        className="flex-1 rounded-2xl border-slate-200 focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 px-5 py-3.5 outline-none transition-all placeholder-slate-400 text-slate-700 font-medium"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Yeni öğretmen adı girin..."
                        onKeyPress={(e) => e.key === 'Enter' && addItem()}
                    />
                    <button
                        onClick={addItem}
                        className="bg-[#6366F1] hover:bg-[#4f46e5] text-white px-6 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5 flex items-center justify-center"
                    >
                        <Plus size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-96 overflow-y-auto pr-2">
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <div key={index} className="group flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#6366F1]/30 hover:shadow-md transition-all duration-200">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm ${index % 2 === 0 ? 'bg-orange-50 text-orange-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                        {item.charAt(0)}
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold text-slate-700 block">{item}</span>
                                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mt-0.5 ${index % 2 === 0 ? 'bg-orange-100/50 text-orange-600' : 'bg-emerald-100/50 text-emerald-600'}`}>
                                            {index % 2 === 0 ? 'Sınıf Öğretmeni' : 'Müzik'}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-slate-300 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                            <Users size={40} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium text-sm">Henüz öğretmen eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MenuManager = () => {
    const { data, updateSection } = useBoard();
    const [menu, setMenu] = useState(data.menu);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateSection('menu', menu);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                <Utensils size={24} className="text-orange-600" /> Yemek Listesi
            </h3>

            <div className="space-y-6 flex-1">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Kahvaltı Menüsü</label>
                    <textarea
                        className="w-full border border-slate-200 px-5 py-4 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-700 min-h-[120px] resize-none font-medium text-base md:text-lg leading-relaxed bg-slate-50 focus:bg-white transition-colors"
                        placeholder="Örn: Haşlanmış Yumurta - Zeytin - Peynir..."
                        value={menu.breakfast}
                        onChange={(e) => setMenu({ ...menu, breakfast: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Öğle Yemeği Menüsü</label>
                    <textarea
                        className="w-full border border-slate-200 px-5 py-4 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-700 min-h-[120px] resize-none font-medium text-base md:text-lg leading-relaxed bg-slate-50 focus:bg-white transition-colors"
                        placeholder="Örn: Kuru Fasülye - Pilav - Ayran..."
                        value={menu.lunch}
                        onChange={(e) => setMenu({ ...menu, lunch: e.target.value })}
                    />
                </div>
            </div>

            <div className="mt-6 md:mt-8 flex items-center gap-4">
                <button
                    onClick={handleSave}
                    className="flex-1 bg-orange-600 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98] transform duration-100 text-base md:text-lg"
                >
                    Kaydet
                </button>
                {saved && (
                    <span className="text-emerald-600 font-bold animate-bounce px-4">
                        ✓ Kaydedildi!
                    </span>
                )}
            </div>
        </div>
    );
}

export { TeachersManager, MenuManager };
