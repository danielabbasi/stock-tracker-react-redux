import React from 'react';
import { useSelector } from 'react-redux'

const Overview = () => {
    const overview = useSelector((state) => state.companyOverview)
    return (
        <div>
            <h3>Company Overview</h3>
            <h2>{overview.companyName}</h2>
            <p>{overview.website}</p>
            <p>{overview.description}</p>
        </div>
    )
}
export default Overview;