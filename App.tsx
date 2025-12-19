import React, { useState } from 'react';
import { 
    PieChart, Clock, Zap, FileText, Newspaper, Gamepad2, Search, Moon, 
    Signal, Wifi, BatteryFull, PenSquare, Info, X, Terminal, Bot,
    Home, Shield, Settings, Users, Laptop, Layers, Activity, Smartphone
} from 'lucide-react';
import { STORIES, MODES, MEMBERS } from './constants';
import { BadgeInfo } from './types';
import RadarChart from './components/RadarChart';
import FamilyChallenge from './components/FamilyChallenge';
import BadgeModal from './components/BadgeModal';

const App: React.FC = () => {
    // State
    const [currentModeId, setCurrentModeId] = useState<'A' | 'B' | 'C'>('A');
    const [currentStoryId, setCurrentStoryId] = useState<number>(1);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null); // Null = Family View
    const [showPrompt, setShowPrompt] = useState(false);
    const [familyName, setFamilyName] = useState("The Millers");
    const [statsTab, setStatsTab] = useState<'today' | 'history'>('today');
    const [badgeModalData, setBadgeModalData] = useState<BadgeInfo | null>(null);

    const currentMode = MODES[currentModeId];
    const currentStory = STORIES[currentStoryId];
    const selectedMember = selectedMemberId ? MEMBERS.find(m => m.id === selectedMemberId) : null;

    // Handlers
    const togglePrompt = () => setShowPrompt(!showPrompt);
    const handleEditName = () => {
        const newName = prompt("Enter new family name:", familyName);
        if (newName && newName.trim()) setFamilyName(newName.trim());
    };

    const openBadge = (info: BadgeInfo) => setBadgeModalData(info);
    const closeBadge = () => setBadgeModalData(null);

    // Sidebar Icons Map
    const ModeIcons = { PieChart, Clock, Zap };
    const StoryIcons = { FileText, Newspaper, Gamepad2, Search, Moon };
    
    // Dynamic Icon for story card
    const StoryCardIcon = StoryIcons[currentStory.icon as keyof typeof StoryIcons];

    return (
        <div className="flex items-center justify-center min-h-screen py-4 xl:py-10 relative overflow-x-hidden">
            
            {/* --- DESKTOP LEFT SIDEBAR --- */}
            <div className="fixed top-6 left-6 z-50 bg-white p-4 rounded-xl shadow-xl border border-slate-200 w-64 hidden xl:block h-[850px] overflow-y-auto no-scrollbar">
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Metric Control</h3>
                <div className="space-y-2 mb-6">
                    {(['A', 'B', 'C'] as const).map((mode) => {
                        const m = MODES[mode];
                        const Icon = ModeIcons[m.icon as keyof typeof ModeIcons];
                        const isActive = currentModeId === mode;
                        const btnClass = isActive 
                            ? (mode === 'B' ? "btn-teal" : "btn-purple") 
                            : "btn-inactive";
                        
                        return (
                            <button 
                                key={mode}
                                onClick={() => setCurrentModeId(mode)}
                                className={`w-full py-2 px-4 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-2 ${btnClass}`}
                            >
                                <Icon size={16} /> {m.name}
                            </button>
                        );
                    })}
                </div>

                <div className="border-t border-slate-100 pt-4 mb-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Story Narrator</h3>
                    <div className="space-y-2">
                        {Object.values(STORIES).map((story) => {
                            const Icon = StoryIcons[story.icon as keyof typeof StoryIcons];
                            const isActive = currentStoryId === story.id;
                            const btnClass = isActive ? story.btnClass : "btn-inactive";

                            return (
                                <button 
                                    key={story.id}
                                    onClick={() => setCurrentStoryId(story.id)}
                                    className={`w-full py-2 px-4 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-2 ${btnClass}`}
                                >
                                    <Icon size={16} /> {story.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-100 text-[10px] text-slate-400 leading-relaxed flex items-start">
                    <Info size={14} className="mr-1 mt-0.5 shrink-0" /> 
                    <span>Use these controls to toggle the display modes on the main device view.</span>
                </div>
            </div>

            {/* --- PROMPT SIDEBAR --- */}
            <div 
                className={`fixed top-1/2 -translate-y-1/2 right-6 xl:right-20 z-40 w-80 xl:w-96 bg-white p-6 rounded-2xl shadow-2xl border border-slate-200 transition-all duration-500 max-h-[80vh] overflow-y-auto no-scrollbar
                ${showPrompt ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-10 pointer-events-none'}`}
            >
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prompt Details</h3>
                    <button onClick={() => setShowPrompt(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>
                <div className="space-y-3">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Input Prompt (Chinese)</div>
                    <div className="text-xs text-slate-600 leading-normal font-mono bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-wrap">
                        {currentStory.prompt}
                    </div>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                    <Bot size={14} />
                    <span>Generated by Family AI Model</span>
                </div>
            </div>

            {/* --- MAIN PHONE FRAME --- */}
            <div className="w-full max-w-[400px] bg-slate-50 h-[800px] xl:h-[850px] rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-slate-900 relative flex flex-col mx-4">
                
                {/* Status Bar */}
                <div className="px-6 pt-4 pb-2 flex justify-between items-center text-xs font-bold text-slate-900 z-50 bg-slate-50 shrink-0">
                    <span>9:41</span>
                    <div className="flex gap-1.5 items-center">
                        <Signal size={14} />
                        <Wifi size={14} />
                        <BatteryFull size={14} />
                    </div>
                </div>

                <div className="flex flex-col h-full w-full absolute top-0 left-0 pt-[44px] bg-slate-50">
                    
                    {/* Header */}
                    <header className="px-6 py-2 pb-2 bg-slate-50 flex justify-between items-center shrink-0">
                        <div className="cursor-pointer group" onClick={handleEditName}>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Family Insight</div>
                            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight inline-block flex items-center gap-2">
                                {familyName}
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
                                    <PenSquare size={16} />
                                </span>
                            </h1>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
                        </div>
                    </header>

                    {/* Member Tabs */}
                    <div className="px-6 pb-2 shrink-0 bg-slate-50">
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                            <button 
                                onClick={() => setSelectedMemberId(null)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${!selectedMemberId ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                            >
                                All Family
                            </button>
                            {MEMBERS.map(member => (
                                <button 
                                    key={member.id}
                                    onClick={() => setSelectedMemberId(member.id)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${selectedMemberId === member.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                                >
                                    {member.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Scrollable */}
                    <main className="flex-1 overflow-y-auto no-scrollbar px-5 pb-8 space-y-6 relative">
                        
                        {!selectedMemberId ? (
                            // FAMILY VIEW
                            <>
                                {/* Chart Section with Family Portrait */}
                                <section className={`relative rounded-3xl p-5 text-white shadow-lg overflow-hidden transition-all duration-500 bg-gradient-to-br ${currentMode.bgGradient}`}>
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">The Digital Vibe</p>
                                                <h2 className="text-xl font-bold">{currentMode.title}</h2>
                                            </div>
                                            <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold border border-white/10">{currentMode.badge}</span>
                                        </div>
                                        
                                        {/* Family Portrait Effect */}
                                        <div className="mt-3 flex items-center gap-1.5">
                                            {MEMBERS.map(member => (
                                                <div 
                                                    key={member.id} 
                                                    className={`relative rounded-full border-2 border-white/20 transition-all duration-300 ${member.isHome ? 'opacity-100 ring-2 ring-emerald-400 ring-offset-2 ring-offset-transparent' : 'opacity-40 grayscale'}`}
                                                >
                                                    <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full bg-slate-200/20" />
                                                    {member.isHome && (
                                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-white rounded-full"></div>
                                                    )}
                                                </div>
                                            ))}
                                            <div className="ml-2 text-[10px] text-white/60 font-medium">
                                                {MEMBERS.filter(m => m.isHome).length} Online
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-2 h-44">
                                            <div className="w-[50%] h-full relative -ml-2">
                                                <RadarChart data={currentMode.chartData} />
                                            </div>
                                            <div className="flex-1 pl-2 space-y-3">
                                                {currentMode.stats.map((stat, i) => (
                                                    <div key={i} className="group">
                                                        <div className="flex justify-between text-xs text-indigo-100 mb-0.5">
                                                            <span>{stat.label}</span>
                                                            <span className="font-bold text-white">{stat.val}</span>
                                                        </div>
                                                        <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                                                            <div 
                                                                className={`h-full rounded-full transition-all duration-700 ${stat.color}`} 
                                                                style={{ width: stat.width }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Story Section */}
                                <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 transition-all duration-300">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`p-1.5 rounded-lg text-xs ${currentStory.colorClass}`}>
                                                <StoryCardIcon size={16} />
                                            </span>
                                            <h3 className="font-bold text-slate-800 text-sm uppercase">{currentStory.title}</h3>
                                        </div>
                                        <button 
                                            onClick={togglePrompt}
                                            className="text-[10px] font-bold text-orange-500 hover:text-orange-700 bg-orange-50 px-2 py-1 rounded-md transition-colors border border-orange-100 flex items-center"
                                        >
                                            <Terminal size={10} className="mr-1" /> Prompt
                                        </button>
                                    </div>
                                    <div 
                                        className="mt-2 text-sm text-slate-600 leading-relaxed font-medium animate-fade-in"
                                        dangerouslySetInnerHTML={{ __html: currentStory.content }}
                                    ></div>
                                </section>

                                {/* Live Activity */}
                                <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-green-100 text-green-600 p-1.5 rounded-lg text-xs">
                                            <Zap size={16} />
                                        </span>
                                        <h3 className="font-bold text-slate-800 text-sm uppercase">Live Activity</h3>
                                    </div>
                                    <div className="relative pl-4 border-l-2 border-slate-100 space-y-5">
                                        {[
                                            { color: 'bg-blue-500', text: "Dad's iPhone connected to Wi-Fi", time: "18:30" },
                                            { color: 'bg-purple-500', text: "Jack's PC hit peak (50MB/s)", time: "16:45" },
                                            { color: 'bg-pink-500', text: "Emma on Roblox for 2 hours", time: "15:00" },
                                        ].map((item, i) => (
                                            <div key={i} className="relative">
                                                <div className={`absolute -left-[21px] top-0 h-3 w-3 rounded-full ${item.color} border-2 border-white shadow`}></div>
                                                <div className="flex justify-between items-start">
                                                    <p className="text-xs font-bold text-slate-700">{item.text}</p>
                                                    <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Digital Sync */}
                                <section className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-5 text-white shadow-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-sm uppercase text-slate-400">Digital Sync</h3>
                                        <button className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors text-slate-300 flex items-center">
                                            <Users size={12} className="mr-1" /> Switch
                                        </button>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-4 border border-white/20 relative overflow-hidden">
                                        <div className="absolute right-0 top-0 w-16 h-16 bg-pink-500 blur-2xl opacity-20"></div>
                                        
                                        <div className="flex items-center justify-between mb-3 px-2">
                                            <div className="flex flex-col items-center">
                                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" className="w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-800 shadow-lg" alt="Dad" />
                                                <span className="text-[10px] mt-1 text-slate-400 font-bold">Dad</span>
                                            </div>
                                            
                                            <div className="flex flex-col items-center flex-1 px-4">
                                                <span className="text-2xl font-bold text-pink-400 mb-1">85%</span>
                                                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full" style={{ width: '85%' }}></div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Molly" className="w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-800 shadow-lg" alt="Mom" />
                                                <span className="text-[10px] mt-1 text-slate-400 font-bold">Mom</span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-[10px] text-slate-200 leading-relaxed text-center opacity-90">
                                            Your compatibility is very high! You both enjoy visiting YouTube and surfing the web at night.
                                        </p>
                                    </div>
                                </section>

                                {/* Daily Awards */}
                                <section>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">Daily Awards</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { title: 'Early Bird', user: 'Mom', desc: 'Online at 5:30 AM for Yoga.', total: '3', streak: '2', icon: '🌅', color: 'text-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-100' },
                                            { title: 'Night Owl', user: 'Kevin', desc: 'Last offline: 02:45 AM.', total: '5', streak: '4', icon: '🦉', color: 'text-indigo-500', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-100' },
                                            { title: 'Data Monster', user: 'Jack', desc: 'Consumed 42GB today.', total: '2', streak: '1', icon: '🦖', color: 'text-rose-500', bgColor: 'bg-rose-50', borderColor: 'border-rose-100' },
                                            { title: 'Focus Master', user: 'Dad', desc: '6h of Office Apps.', total: '10', streak: '7', icon: '🧘', color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-100' },
                                        ].map((badge, i) => (
                                            <div 
                                                key={i}
                                                onClick={() => openBadge(badge)}
                                                className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm active:scale-95 transition cursor-pointer hover:border-slate-300"
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 text-lg shadow-sm border ${badge.color} ${badge.bgColor} ${badge.borderColor}`}>
                                                    {badge.icon}
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase">{badge.title}</span>
                                                <span className="text-sm font-bold text-slate-800">{badge.user}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Network Stats */}
                                <section className="bg-slate-800 rounded-3xl p-5 text-white shadow-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-lg text-xs">
                                                <PieChart size={16} />
                                            </span>
                                            <h3 className="font-bold text-sm uppercase text-slate-200">Network Stats</h3>
                                        </div>
                                        <div className="bg-slate-900/80 p-1 rounded-lg flex text-[10px] font-bold">
                                            <button 
                                                onClick={() => setStatsTab('today')} 
                                                className={`px-3 py-1 rounded-md shadow-sm transition-all ${statsTab === 'today' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                            >
                                                Today
                                            </button>
                                            <button 
                                                onClick={() => setStatsTab('history')} 
                                                className={`px-3 py-1 rounded-md shadow-sm transition-all ${statsTab === 'history' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                            >
                                                History
                                            </button>
                                        </div>
                                    </div>

                                    {statsTab === 'today' ? (
                                        <div className="animate-fade-in">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                                    <div className="text-[10px] text-slate-400 uppercase">Total Traffic</div>
                                                    <div className="text-xl font-bold text-emerald-400 my-0.5">145 GB</div>
                                                    <div className="text-[9px] text-slate-500">Video 90GB · Game 40GB</div>
                                                </div>
                                                <div className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                                    <div className="text-[10px] text-slate-400 uppercase">Total Time</div>
                                                    <div className="text-xl font-bold text-blue-400 my-0.5">32.5 Hrs</div>
                                                    <div className="text-[9px] text-slate-500">Across 8 devices</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 mt-3">
                                                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors">
                                                    <div>
                                                        <div className="text-[10px] text-slate-400 uppercase">Online Devices</div>
                                                        <div className="text-lg font-bold">8</div>
                                                    </div>
                                                    <Laptop size={20} className="text-slate-600" />
                                                </div>
                                                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors">
                                                    <div>
                                                        <div className="text-[10px] text-slate-400 uppercase">Apps Visited</div>
                                                        <div className="text-lg font-bold">42</div>
                                                    </div>
                                                    <Layers size={20} className="text-slate-600" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="animate-fade-in">
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-3">
                                                <div className="flex justify-between items-end mb-2">
                                                    <div className="text-[10px] text-slate-400 uppercase">All-Time Traffic</div>
                                                    <div className="text-2xl font-bold text-purple-400">4.2 TB</div>
                                                </div>
                                                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-purple-500 h-full rounded-full" style={{ width: '75%' }}></div>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                                    <div className="text-[10px] text-slate-400 uppercase mb-1">Total Time</div>
                                                    <div className="text-xl font-bold text-slate-200">1.2k <span className="text-xs font-normal text-slate-500">Hrs</span></div>
                                                </div>
                                                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                                    <div className="text-[10px] text-slate-400 uppercase mb-1">Unique Apps</div>
                                                    <div className="text-xl font-bold text-slate-200">156</div>
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-3 border-t border-white/10 text-center">
                                                <p className="text-[10px] text-slate-500">Data collected since Jan 1, 2023</p>
                                            </div>
                                        </div>
                                    )}
                                </section>

                                {/* Family Challenge */}
                                <FamilyChallenge />
                            </>
                        ) : (
                            // INDIVIDUAL MEMBER VIEW
                            <div className="animate-fade-in space-y-4">
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                                    <div className={`w-24 h-24 rounded-full border-4 p-1 mb-3 ${selectedMember?.isHome ? 'border-emerald-400' : 'border-slate-200 grayscale'}`}>
                                        <img src={selectedMember?.avatar} alt={selectedMember?.name} className="w-full h-full rounded-full bg-slate-100" />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-slate-800">{selectedMember?.name}</h2>
                                    <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${selectedMember?.isHome ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                        <div className={`w-2 h-2 rounded-full ${selectedMember?.isHome ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                                        {selectedMember?.isHome ? 'Online / Home' : 'Offline / Away'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                                        <div className="flex items-center gap-2 mb-2 text-indigo-600">
                                            <Clock size={16} />
                                            <span className="text-xs font-bold uppercase">Screen Time</span>
                                        </div>
                                        <div className="text-2xl font-extrabold text-slate-800">{selectedMember?.stats.time}</div>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                                        <div className="flex items-center gap-2 mb-2 text-purple-600">
                                            <Signal size={16} />
                                            <span className="text-xs font-bold uppercase">Data Used</span>
                                        </div>
                                        <div className="text-2xl font-extrabold text-slate-800">{selectedMember?.stats.data}</div>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Most Used App</h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                                                <Activity size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{selectedMember?.stats.app}</div>
                                                <div className="text-xs text-slate-500">2.5 hrs today</div>
                                            </div>
                                        </div>
                                        <div className="text-lg font-bold text-slate-800">45%</div>
                                    </div>
                                    <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-slate-900 h-full rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-bold text-slate-400 uppercase">Device Info</h3>
                                        <Smartphone size={16} className="text-slate-400" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Model</span>
                                            <span className="font-bold">iPhone 14 Pro</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Battery</span>
                                            <span className="font-bold text-emerald-400">84%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">IP Address</span>
                                            <span className="font-mono text-xs bg-white/10 px-2 py-0.5 rounded">192.168.1.104</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </main>

                    {/* Navbar */}
                    <nav className="h-20 bg-white border-t border-slate-100 flex justify-around items-center pb-2 shrink-0 z-20">
                        <div className="flex flex-col items-center gap-1 text-indigo-600">
                            <Home size={20} />
                            <span className="text-[10px] font-medium">Home</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-slate-400">
                            <PieChart size={20} />
                            <span className="text-[10px] font-medium">Insight</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-slate-400">
                            <Shield size={20} />
                            <span className="text-[10px] font-medium">Safety</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-slate-400">
                            <Settings size={20} />
                            <span className="text-[10px] font-medium">Settings</span>
                        </div>
                    </nav>

                </div>

                <BadgeModal 
                    isOpen={!!badgeModalData} 
                    data={badgeModalData} 
                    onClose={closeBadge} 
                />

            </div>
        </div>
    );
};

export default App;