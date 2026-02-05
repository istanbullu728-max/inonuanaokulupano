import React, { createContext, useContext, useState, useEffect } from 'react';

const BoardContext = createContext();

const initialData = {
    schoolName: 'ATATÜRK ANADOLU LİSESİ',
    announcements: [
        "29 Ekim Cumhuriyet Bayramı Töreni saat 09:30'da okul bahçesinde yapılacaktır.",
        "12. Sınıflar Deneme Sınavı Cuma günü saat 10:00'da.",
        "Kütüphane haftası etkinlikleri kapsamında kitap okuma yarışması başvuruları başlamıştır."
    ],
    teachers: ['Ahmet Yılmaz', 'Ayşe Demir', 'Mehmet Kaya', 'Zeynep Şen'],
    dutyTeachers: {
        morning: "Ahmet Yılmaz",
        afternoon: "Ayşe Demir"
    },
    menu: {
        breakfast: "Haşlanmış Yumurta - Zeytin - Peynir - Domates - Meyve Suyu",
        lunch: "Kuru Fasülye - Pirinç Pilavı - Ayran - Meyve"
    },
    media: {
        type: 'image', // 'image', 'video', 'slide'
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop',
        slides: [],
        slideDuration: 5,
        slideTransition: 'fade', // 'fade', 'slide', 'zoom', 'blur'
        title: 'Cumhuriyet Bayramı Hazırlıkları',
        subtitle: 'Öğrencilerimiz tören için hazırlıklarını sürdürüyor...'
    },
    weather: {
        city: 'İstanbul',
        temp: 15,
        status: 'Güneşli'
    },
    countdown: {
        targetIso: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(), // Default to next noon
        targetTime: '12:00', // HH:mm format for reliable daily recurrence
        label: 'Öğle Arasına Kalan'
    },
    urgentMessage: {
        active: false,
        text: 'ACİL DURUM: Lütfen toplanma alanına gidiniz.'
    }
};

export const BoardProvider = ({ children }) => {
    // Flag to prevent echo loops when syncing across tabs
    const isRemoteUpdate = React.useRef(false);

    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('boardData');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);

                // Ultra-defensive merge
                const merged = {
                    ...initialData,
                    ...parsed,
                    media: {
                        ...initialData.media,
                        ...(parsed.media || {}),
                        ...(parsed.urgentMessage || {})
                    },
                    weather: {
                        ...initialData.weather,
                        ...(parsed.weather || {})
                    },
                    dutyTeachers: {
                        ...initialData.dutyTeachers,
                        ...(parsed.dutyTeachers || {})
                    },
                    menu: {
                        ...initialData.menu,
                        ...(parsed.menu || {})
                    }
                };
                return merged;
            } catch (e) {
                console.error("Failed to parse board data, resetting to defaults", e);
                return initialData;
            }
        }
        return initialData;
    });

    // Persist to localStorage whenever state changes
    useEffect(() => {
        // Prevent echo if this update came from another tab
        if (isRemoteUpdate.current) {
            isRemoteUpdate.current = false;
            return;
        }

        const newData = JSON.stringify(data);
        const currentData = localStorage.getItem('boardData');

        // Only write if actual content changed to avoid infinite loops with other tabs
        if (newData !== currentData) {
            localStorage.setItem('boardData', newData);
        }
    }, [data]);

    // Sync across tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'boardData' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    isRemoteUpdate.current = true;
                    setData(prev => ({
                        ...prev,
                        ...parsed,
                        media: { ...prev.media, ...(parsed.media || {}) }
                    }));
                } catch (e) {
                    console.error("Sync error", e);
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateSection = (section, value) => {
        setData(prev => ({ ...prev, [section]: value }));
    };

    return (
        <BoardContext.Provider value={{ data, updateSection }}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoard = () => useContext(BoardContext);
