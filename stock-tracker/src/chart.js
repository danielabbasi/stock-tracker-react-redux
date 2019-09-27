import React from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { addChartTimeAction } from './redux';

const Chart = () => {
    const chartData = useSelector((state) => state.chartData)
    return (
        <>
            <h2>Stock Chart</h2>
            <button>1D</button>
            <button>5D</button>
            <button>1M</button>
            <button>1Y</button>
            <button>5Y</button>
            <button>MAX</button>
            <AreaChart
                width={1000}
                height={400}
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis orientation="right" />
                <Tooltip />
                <Area type='monotone' dataKey='close' stroke='#0e0e0f' fill='#374B7D' />
            </AreaChart>
        </>
    )
}
export default Chart;