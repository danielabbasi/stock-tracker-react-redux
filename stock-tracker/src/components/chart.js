import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { addChartTimeAction } from '../store/actions';

const Chart = () => {
    const dispatch = useDispatch()
    const chartData = useSelector((state) => state.chartData)
    const onClick = (e) => {
        dispatch(addChartTimeAction(e.target.value))
    }
    return (
        <div className="chart">
            <h2>Stock Chart</h2>
            <button value="1D" onClick={onClick}>1D</button>
            <button value="5D" onClick={onClick}>5D</button>
            <button value="1M" onClick={onClick}>1M</button>
            <button value="1Y" onClick={onClick}>1Y</button>
            <button value="5Y" onClick={onClick}>5Y</button>
            <button value="MAX" onClick={onClick}>MAX</button>
            <ResponsiveContainer>
                <AreaChart
                    data={chartData}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#73b3ef" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#73b3ef" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis orientation="right" />
                    <Tooltip />
                    <Area type='monotone' dataKey='close' stroke='#73b3ef' fillOpacity={1} fill='url(#colorUv)' />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
export default Chart;