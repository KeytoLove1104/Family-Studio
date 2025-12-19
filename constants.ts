import { DashboardMode, StoryData, FamilyMember } from "./types";

export const MEMBERS: FamilyMember[] = [
    { 
        id: 'dad', 
        name: 'Dad', 
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', 
        isHome: true,
        stats: { time: '6h 30m', data: '2.5 GB', app: 'Outlook' }
    },
    { 
        id: 'mom', 
        name: 'Mom', 
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka', 
        isHome: true,
        stats: { time: '5h 45m', data: '4.2 GB', app: 'Instagram' }
    },
    { 
        id: 'jack', 
        name: 'Jack', 
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack', 
        isHome: true,
        stats: { time: '8h 15m', data: '45 GB', app: 'Steam' }
    },
    { 
        id: 'emma', 
        name: 'Emma', 
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coco', 
        isHome: false,
        stats: { time: '1h 20m', data: '0.8 GB', app: 'YouTube' }
    },
    { 
        id: 'grandma', 
        name: 'Grandma', 
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Granny', 
        isHome: false,
        stats: { time: '0h 45m', data: '0.1 GB', app: 'FaceTime' }
    }
];

export const PROMPTS = {
    1: `1. Standard (温馨日记)
Role:
你是一个温馨的数字家庭助手，负责记录每日日记。📔
Task:
根据提供的【家庭互联网使用日志】，写一篇简短、连贯的日记条目来总结这一天。
Requirements:
风格： 温馨、舒适且具有叙事性。就像对一天数字生活的温柔回顾。
结构： 写成单一、流畅的段落。
重点： 一天的整体流程（从早晨开始到晚间放松）。避免过度夸张的戏剧性。
长度： ≤ 70 字（英文词数）。
语气： 友好、冷静、乐于助人。`,
    2: `2. Gossip (八卦头条)
Role:
你是一名调皮的家庭八卦记者，正在为移动应用撰写“家庭互联网头条”。
Task:
根据提供的【家庭互联网使用日志】，写 3 条简短幽默的新闻快讯来报道家庭的在线活动。
Requirements:
语气： 充满活力、夸张的新闻风格 🎤
快讯数量： 3 条
每条快讯： 2–3 句话，总共 ≤ 70 字，适合手机屏幕展示。
重点关注变化和反差：
• 父母在异常时间上网 🤫
• 孩子们消耗大量数据 🎮📉
• 家庭流媒体刷剧狂欢`,
    3: `3. Gaming (电竞解说)
Role:
你是一名调皮的游戏解说员，将家庭的每日互联网活动当作一场多人在线直播游戏来报道。
Task:
根据提供的【家庭互联网使用日志】，写 3 条游戏风格的“战报”或“任务更新”。
Requirements:
语气： 充满活力、像游戏一样 🎮⚔️
快讯数量： 3 条
每条快讯： 2–3 句话，≤ 70 字。
重点关注异常事件或峰值。`,
    4: `4. Network Detective (网络侦探)
Role:
你是一名敏锐、风趣的“数字侦探”，像分析犯罪现场一样分析家庭网络流量。🕵️‍♂️
Task:
根据【家庭互联网使用日志】，编写一份简短的**“每日调查日志”**。
Requirements:
逻辑结构： 输出确切的 3 个要点，并遵循逻辑流：异常点、嫌疑人、裁决。`,
    5: `5. Atmospheric (氛围故事)
Role:
你是一个充满诗意的家庭网络说书人。
Task:
根据提供的【家庭互联网使用日志】，创作一个关于当天网络节奏的简短、异想天开的故事。
Requirements:
关注模式、流动、互动和突然爆发，而不是详细日志。`
};

export const STORIES: Record<number, StoryData> = {
    1: {
        id: 1,
        name: "Standard (温馨日记)",
        icon: "FileText",
        title: "Digital Story",
        content: "The house pulsed with digital energy ⚡—Mom and Dad drifting between work and social feeds, screens flickering; the kids surfing waves of YouTube, TikTok, and Roblox 🌊🎮.<br/><br/>The evening glowed with Netflix and Hulu marathons 🍿📺, devices weaving a vivid symphony of clicks, swipes, and streams under one roof.",
        colorClass: "text-orange-600 bg-orange-100",
        btnClass: "btn-orange",
        prompt: PROMPTS[1]
    },
    2: {
        id: 2,
        name: "Gossip (八卦头条)",
        icon: "Newspaper",
        title: "Family Scoop",
        content: "🕵️ <strong>Early Bird Alert!</strong> Dad smashed Gmail at 6:45 AM, Mom close behind on Instagram ☀️—who knew mornings were this wild?<br/><br/>🎮 <strong>Data Tsunami!</strong> The kids devoured YouTube, TikTok, Roblox, and Fortnite like there was no tomorrow 📉💥—Junior burned 1GB before dinner!<br/><br/>🍿 <strong>Streaming War!</strong> The 18:10 Netflix showdown—Mom, Dad, and Senior caused chaos in prime time, bingeing 4500MB 😱📺.",
        colorClass: "text-rose-600 bg-rose-100",
        btnClass: "btn-inactive",
        prompt: PROMPTS[2]
    },
    3: {
        id: 3,
        name: "Gaming (电竞解说)",
        icon: "Gamepad2",
        title: "E-Sports Report",
        content: "⚔️ <strong>Early Spawn!</strong> Dad infiltrated Gmail and Google News at dawn 🌅, Mom leveled up her Instagram Reels skills—morning raid complete!<br/><br/>🔥 <strong>Junior's Combo!</strong> Junior unleashed a TikTok + Roblox + Fortnite combo, dealing an epic 1.5GB damage 📉🎮—Wi-Fi defenses barely survived!<br/><br/>🍿 <strong>Stream Siege!</strong> 18:10 Prime Time Battle: Mom, Dad, and Senior rushed Netflix and Hulu 🛡️📺, consuming over 4500MB in an epic clash!",
        colorClass: "text-purple-600 bg-purple-100",
        btnClass: "btn-inactive",
        prompt: PROMPTS[3]
    },
    4: {
        id: 4,
        name: "Detective (网络侦探)",
        icon: "Search",
        title: "Investigation Log",
        content: "• <strong>The Anomaly:</strong> Midnight Mayhem! 📱 Between 00:00–01:05, multiple devices surged on streaming and TikTok—highly unusual for 'sleep hours'.<br/><br/>• <strong>The Suspects:</strong> Dad raiding YouTube & Reddit, Mom scrolling Instagram, Junior bingeing YouTube—all guilty of digital insomnia.<br/><br/>• <strong>The Verdict:</strong> The Late Night Social Case: This family moonlights as a streaming gang, proving sleep is optional when Wi-Fi is unlimited. 🌙🕵️‍♂️",
        colorClass: "text-teal-600 bg-teal-100",
        btnClass: "btn-inactive",
        prompt: PROMPTS[4]
    },
    5: {
        id: 5,
        name: "Atmospheric (氛围故事)",
        icon: "Moon",
        title: "Digital Vibe",
        content: "The screens woke with the house 🌅, signals floating between focus and play.<br/><br/>Data surged, overlapped, then blended softly into shared streams.<br/><br/>Into the night, glowing rectangles hummed in quiet harmony ✨",
        colorClass: "text-amber-600 bg-amber-100",
        btnClass: "btn-inactive",
        prompt: PROMPTS[5]
    }
};

export const MODES: Record<string, DashboardMode> = {
    A: {
        id: 'A',
        name: "Plan A: Traffic",
        icon: "PieChart",
        title: "Cinema Paradise 🎬",
        badge: "Traffic Analysis",
        bgGradient: "from-indigo-600 to-purple-700",
        chartData: [
            { subject: 'Video', value: 90, fullMark: 100 },
            { subject: 'Game', value: 15, fullMark: 100 },
            { subject: 'Social', value: 10, fullMark: 100 },
            { subject: 'Work', value: 5, fullMark: 100 },
            { subject: 'Edu', value: 5, fullMark: 100 },
            { subject: 'DL', value: 30, fullMark: 100 },
        ],
        stats: [
            { label: "Video", val: "90 GB", width: "90%", color: "bg-amber-400" },
            { label: "Download", val: "30 GB", width: "70%", color: "bg-pink-400" },
            { label: "Game", val: "15 GB", width: "30%", color: "bg-cyan-400" }
        ]
    },
    B: {
        id: 'B',
        name: "Plan B: Time",
        icon: "Clock",
        title: "E-Sports Camp 🎮",
        badge: "Time Analysis",
        bgGradient: "from-emerald-600 to-teal-700",
        chartData: [
            { subject: 'Video', value: 15, fullMark: 100 },
            { subject: 'Game', value: 30, fullMark: 100 },
            { subject: 'Social', value: 12, fullMark: 100 },
            { subject: 'Work', value: 8, fullMark: 100 },
            { subject: 'Edu', value: 6, fullMark: 100 },
            { subject: 'DL', value: 4, fullMark: 100 },
        ],
        stats: [
            { label: "Game", val: "30 Hrs", width: "90%", color: "bg-emerald-300" },
            { label: "Video", val: "15 Hrs", width: "70%", color: "bg-lime-300" },
            { label: "Social", val: "12 Hrs", width: "45%", color: "bg-teal-200" }
        ]
    },
    C: {
        id: 'C',
        name: "Plan C: Active",
        icon: "Zap",
        title: "Social Butterflies 🦋",
        badge: "Activity Analysis",
        bgGradient: "from-purple-600 to-pink-700",
        chartData: [
            { subject: 'Video', value: 13, fullMark: 100 },
            { subject: 'Game', value: 24, fullMark: 100 },
            { subject: 'Social', value: 45, fullMark: 100 },
            { subject: 'Work', value: 5, fullMark: 100 },
            { subject: 'Edu', value: 6, fullMark: 100 },
            { subject: 'DL', value: 2, fullMark: 100 },
        ],
        stats: [
            { label: "Social", val: "45 Act", width: "95%", color: "bg-purple-400" },
            { label: "Game", val: "24 Act", width: "50%", color: "bg-pink-300" },
            { label: "Video", val: "13.5 Act", width: "30%", color: "bg-rose-300" }
        ]
    }
};