import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { School, ArrowRight, Lock } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (login(username, password)) {
            navigate('/admin');
        } else {
            setError('Hatalı bilgi verdiniz!');
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f0f9ff] flex items-center justify-center relative overflow-hidden font-sans">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-[#8ECAE6] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-72 h-72 bg-[#FFB703] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-80 h-80 bg-[#FB8500] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 border-8 border-white ring-4 ring-[#8ECAE6]/50">
                <div className="text-center mb-10">
                    <div className="mx-auto mb-6 flex justify-center">
                        <img
                            src="/assets/design/school_logo_admin.png"
                            alt="İnönü Anaokulu"
                            className="w-40 h-40 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-[#023047] tracking-tight uppercase leading-snug">
                        İnönü Anaokulu
                    </h1>
                    <p className="text-[#FB8500] mt-1 font-bold text-sm tracking-widest uppercase">
                        Dijital Pano Yönetimi
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-[#023047] mb-2 ml-1 uppercase tracking-wide">Kullanıcı Adı</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#2EC4B6] focus:bg-white outline-none transition-all font-bold text-gray-700 placeholder-gray-300"
                            placeholder="Kullanıcı adınızı girin"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#023047] mb-2 ml-1 uppercase tracking-wide">Şifre</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#2EC4B6] focus:bg-white outline-none transition-all font-bold text-gray-700 placeholder-gray-300 pr-12"
                                placeholder="••••••••"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <Lock size={20} />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-bold text-sm border-2 border-red-100 animate-shake">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#FB8500] hover:bg-[#FFB703] text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2 text-lg group"
                    >
                        Giriş Yap
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">
                        © 2026 Dijital Pano Sistemi
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
