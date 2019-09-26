import React from 'react';
import {useSelector} from 'react-redux';

const Chart = () => {
    const chartData = useSelector((state) => state.chartData)

       return (
           <>
           <h2>Stock Chart</h2>
           </>
       )
   }
   export default Chart;