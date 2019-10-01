import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { addChartTimeAction } from '../store/actions';

const Chart = () => {
    const dispatch = useDispatch()
    const chartData = useSelector((state) => state.chartData)
    const onClick = (e) => {
        dispatch(addChartTimeAction(e.target.value))
    }
    return (
        <>
            <h2>Stock Chart</h2>
            <button value="1D" onClick={onClick}>1D</button>
            <button value="5D" onClick={onClick}>5D</button>
            <button value="1M" onClick={onClick}>1M</button>
            <button value="1Y" onClick={onClick}>1Y</button>
            <button value="5Y" onClick={onClick}>5Y</button>
            <button value="MAX"onClick={onClick}>MAX</button>
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