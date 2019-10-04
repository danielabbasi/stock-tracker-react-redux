import React from 'react';
import { useSelector } from 'react-redux'

const Overview = () => {
    const overview = useSelector((state) => state.companyOverview)
    return (
        <div className="overview">
            <h3>COMPANY OVERVIEW</h3>
            <h2 className={overview ? "overviewCompany" : "hidden"}>{overview.companyName} ({overview.symbol})</h2>
            <p className="overviewWeb">{overview.website}</p>
            <p className="overviewText">{overview.description}</p>
        </div>
    )
}
export default Overview;