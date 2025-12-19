import React, { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, Flag, X, MonitorSmartphone } from 'lucide-react';

const FamilyChallenge: React.FC = () => {
    const [isSetupMode, setIsSetupMode] = useState(true);
    const [duration, setDuration] = useState(60);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const timerRef = useRef<number | null>(null);

    const startTimer = () => {
        setTimeLeft(duration * 60);
        setIsActive(true);
        setIsSetupMode(false);
    };

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsActive(false);
        setIsSetupMode(true);
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            stopTimer();
            alert("Challenge Complete!");
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progressPercent = isActive ? (timeLeft / (duration * 60)) * 100 : 100;

    return (
        <section 
            className={`rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden mb-8 border transition-colors duration-500 
            ${isActive ? 'bg-indigo-950 border-indigo-500/30' : 'bg-slate-800 border-slate-700'}`}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <span>🕒</span> Family Challenge
                </h3>
                {isSetupMode && (
                    <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors text-slate-300 font-bold border border-white/5 flex items-center"
                    >
                        <SlidersHorizontal size={12} className="mr-1" /> Custom
                    </button>
                )}
            </div>

            {isSetupMode ? (
                <div className="relative z-10 animate-fade-in">
                    <div className="mb-6">
                        <p className="text-sm text-slate-300 font-medium leading-relaxed">
                            Can your family survive <span className="text-white font-bold decoration-indigo-500 underline decoration-2 underline-offset-2">{duration} minutes</span> without Wi-Fi?
                        </p>
                        <p className="text-sm text-slate-400 mt-2 font-medium">
                            No scrolling. No streaming. <br />
                            <span className="text-indigo-300 font-bold">Just real life.</span> 🌿
                        </p>
                    </div>

                    {showSettings && (
                        <div className="mb-4 bg-black/20 p-3 rounded-xl border border-white/5 animate-fade-in">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Duration</span>
                                <div className="flex gap-1">
                                    {[30, 60, 120].map(m => (
                                        <button 
                                            key={m}
                                            onClick={() => setDuration(m)}
                                            className={`px-2 py-1 rounded text-[10px] border 
                                            ${duration === m 
                                                ? 'bg-indigo-600 text-white border-indigo-500 ring-1 ring-indigo-400 shadow-sm' 
                                                : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10'}`}
                                        >
                                            {m === 60 ? '1h' : m === 120 ? '2h' : m + 'm'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] uppercase font-bold text-slate-400">Devices</span>
                                <span className="text-[10px] text-slate-300 flex items-center gap-1">
                                    <MonitorSmartphone size={10} /> All Devices
                                </span>
                            </div>
                        </div>
                    )}

                    <button 
                        onClick={startTimer}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-900/50 active:scale-95 transition-all flex items-center justify-center gap-2 group border border-white/10"
                    >
                        <Flag size={14} className="group-hover:rotate-12 transition-transform" />
                        Start the Challenge
                    </button>
                </div>
            ) : (
                <div className="relative z-10 flex flex-col items-center justify-center py-2 animate-fade-in">
                    <div className="text-center mb-6">
                        <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3 border border-indigo-500/30">
                            Challenge In Progress
                        </div>
                        <div className="text-5xl font-extrabold text-white font-mono tracking-tighter tabular-nums drop-shadow-lg">
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                    
                    <div className="w-full bg-slate-700/50 rounded-full h-3 mb-6 overflow-hidden border border-white/5">
                        <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>

                    <button 
                        onClick={stopTimer}
                        className="px-6 py-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 text-xs font-bold border border-white/5 hover:border-red-500/30 transition-all flex items-center gap-2"
                    >
                        <X size={14} /> Give Up
                    </button>
                </div>
            )}
        </section>
    );
};

export default FamilyChallenge;