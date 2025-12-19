import React from 'react';
import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
    data: { subject: string; value: number; fullMark: number }[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
    return (
        <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsRadar cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" />
                    <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: 600 }} 
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Usage"
                        dataKey="value"
                        stroke="rgba(255, 255, 255, 0.9)"
                        strokeWidth={2}
                        fill="rgba(255, 255, 255, 0.3)"
                        fillOpacity={0.4}
                    />
                </RechartsRadar>
            </ResponsiveContainer>
        </div>
    );
};

export default RadarChart;