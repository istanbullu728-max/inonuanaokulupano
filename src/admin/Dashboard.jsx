import React from 'react';
import { useBoard } from '../context/BoardContext';
import { Users, Megaphone, Utensils, Clock } from 'lucide-react';

const Dashboard = () => {
    const { data } = useBoard();

    const stats = [
        { label: 'Aktif Duyuru', value: data.announcements.length, icon: Megaphone, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Nöbetçi Öğretmen', value: data.teachers.length, icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Menü Öğeleri', value: data.menu.length, icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Son Güncelleme', value: 'Şimdi', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Genel Bakış</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 text-nowrap">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Sistem Durumu</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                        <span className="text-gray-600">Pano Modu</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">AKTİF</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                        <span className="text-gray-600">Okul Adı</span>
                        <span className="font-medium">{data.schoolName}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                        <span className="text-gray-600">Medya Türü</span>
                        <span className="uppercase font-medium">{data.media.type}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
