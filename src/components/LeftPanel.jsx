import React from 'react';
import { useBoard } from '../context/BoardContext';

const LeftPanel = () => {
    const { data } = useBoard();

    return (
        <div className="col-span-3 flex flex-col gap-4 h-full">
            {/* Duty Teachers */}
            <div className="glass-card p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Nöbetçi Öğretmenler</h2>
                <ul className="space-y-3">
                    {data.teachers.map((teacher, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-sm font-bold">
                                {teacher.charAt(0)}
                            </div>
                            <span className="font-medium">{teacher}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Food Menu */}
            <div className="glass-card p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Günün Menüsü</h2>
                <ul className="space-y-4">
                    {data.menu.map((item, i) => (
                        <li key={i} className="flex justify-between">
                            <span>{item.name}</span>
                            <span className="opacity-70">{item.cal}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LeftPanel;
