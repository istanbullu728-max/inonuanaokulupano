import React from 'react';
import { useBoard } from '../context/BoardContext';

const SettingsManager = () => {
    const { data, updateSection } = useBoard();

    const handleCountdownChange = (e) => {
        // Just save accurate HH:mm string. logic will be handled in RightPanel
        updateSection('countdown', { ...data.countdown, targetTime: e.target.value });
    };

    // Helper to extract HH:mm from ISO
    const currentTimeValue = () => {
        return data.countdown.targetTime || "12:00";
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Genel Ayarlar</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Okul Adı</label>
                    <input
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={data.schoolName}
                        onChange={(e) => updateSection('schoolName', e.target.value)}
                    />
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-semibold text-lg mb-4">Geri Sayım Ayarları</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hedef Saat</label>
                            <input
                                type="time"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={currentTimeValue()}
                                onChange={handleCountdownChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                            <input
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={data.countdown.label}
                                onChange={(e) => updateSection('countdown', { ...data.countdown, label: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h3 className="font-semibold text-lg mb-4">Hava Durumu Ayarları</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                            <input
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={data.weather?.city || ''}
                                onChange={(e) => updateSection('weather', { ...data.weather, city: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sıcaklık (°C)</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={data.weather?.temp || 0}
                                onChange={(e) => updateSection('weather', { ...data.weather, temp: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                            <select
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                value={data.weather?.status || 'Güneşli'}
                                onChange={(e) => updateSection('weather', { ...data.weather, status: e.target.value })}
                            >
                                <option value="Güneşli">Güneşli</option>
                                <option value="Parçalı Bulutlu">Parçalı Bulutlu</option>
                                <option value="Bulutlu">Bulutlu</option>
                                <option value="Yağmurlu">Yağmurlu</option>
                                <option value="Karlı">Karlı</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsManager;
