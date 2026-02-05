import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useBoard } from '../context/BoardContext';

const UrgentOverlay = () => {
    const { data } = useBoard();
    const { urgentMessage } = data;

    return (
        <AnimatePresence>
            {urgentMessage.active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.5, y: 100 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.5, y: 100 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="bg-red-600 text-white p-12 rounded-3xl shadow-2xl max-w-4xl text-center border-4 border-red-400 flex flex-col items-center gap-6"
                    >
                        <AlertTriangle size={96} className="animate-pulse" />
                        <h1 className="text-6xl font-bold uppercase tracking-widest">ACİL DUYURU</h1>
                        <p className="text-3xl font-medium">{urgentMessage.text}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UrgentOverlay;
