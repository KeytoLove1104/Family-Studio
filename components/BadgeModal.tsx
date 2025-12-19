import React from 'react';
import { X } from 'lucide-react';
import { BadgeInfo } from '../types';

interface BadgeModalProps {
    isOpen: boolean;
    data: BadgeInfo | null;
    onClose: () => void;
}

const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, data, onClose }) => {
    if (!isOpen || !data) return null;

    return (
        <div className="absolute inset-0 z-[60] flex items-center justify-center p-6 animate-fade-in">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 relative z-10 transform transition-all scale-100">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="flex flex-col items-center text-center -mt-2">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-4xl shadow-sm border-4 ${data.color} ${data.bgColor} ${data.borderColor}`}>
                        {data.icon}
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-800 mb-1">Achievement</h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">{data.user}</p>
                    
                    <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{data.desc}</p>
                    </div>
                    
                    <div className="flex w-full gap-3">
                        <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <span className="block text-xs text-slate-400 font-bold uppercase">Total</span>
                            <span className="block text-xl font-bold text-slate-800">{data.total}</span>
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <span className="block text-xs text-slate-400 font-bold uppercase">Streak</span>
                            <span className="block text-xl font-bold text-indigo-600">{data.streak}</span>
                        </div>
                    </div>
                    
                    <button onClick={onClose} className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-200 active:scale-95 transition-transform">
                        Awesome!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BadgeModal;