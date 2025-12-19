export interface StoryData {
    id: number;
    name: string;
    icon: string;
    title: string;
    content: string;
    colorClass: string;
    btnClass: string;
    prompt: string;
}

export interface ChartStat {
    label: string;
    val: string;
    width: string;
    color: string;
}

export interface DashboardMode {
    id: 'A' | 'B' | 'C';
    name: string;
    icon: string;
    title: string;
    badge: string;
    bgGradient: string;
    chartData: { subject: string; value: number; fullMark: number }[];
    stats: ChartStat[];
}

export interface BadgeInfo {
    title: string;
    user: string;
    desc: string;
    total: string;
    streak: string;
    icon: string;
    color: string; // Tailwind class for text color
    bgColor: string; // Tailwind class for bg color
    borderColor: string; // Tailwind class
}

export interface FamilyMember {
    id: string;
    name: string;
    avatar: string;
    isHome: boolean;
    stats: {
        time: string;
        data: string;
        app: string;
    };
}