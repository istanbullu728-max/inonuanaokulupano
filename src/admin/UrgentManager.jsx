import React from 'react';
import { useBoard } from '../context/BoardContext';
import { AlertTriangle, Power } from 'lucide-react';

const UrgentManager = () => {
    const { data, updateSection } = useBoard();

    const toggleActive = () => {
        updateSection('urgentMessage', { ...data.urgentMessage, active: !data.urgentMessage.active });
    };

    const handleTextChange = (e) => {
        updateSection('urgentMessage', { ...data.urgentMessage, text: e.target.value });
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-xl mx-auto text-center">
            <div className="mb-6">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors ${data.urgentMessage.active ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
                    <AlertTriangle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Acil Durum Sistemi</h2>
                <p className="text-gray-500 mt-2">Bu mod açıldığında tüm ekranlarda kırmızı uyarı penceresi belirecektir.</p>
            </div>

            <div className="mb-8">
                <textarea
                    className="w-full border-2 border-red-100 focus:border-red-300 rounded-xl p-4 text-center text-lg font-medium text-red-800 outline-none resize-none"
                    rows="3"
                    value={data.urgentMessage.text}
                    onChange={handleTextChange}
                />
            </div>

            <button
                onClick={toggleActive}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${data.urgentMessage.active
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200'
                        : 'bg-gray-800 hover:bg-gray-900 text-white'
                    }`}
            >
                <Power size={24} />
                {data.urgentMessage.active ? 'ACİL DURUMU KAPAT' : 'ACİL DURUMU BAŞLAT'}
            </button>
        </div>
    );
};

export default UrgentManager;
