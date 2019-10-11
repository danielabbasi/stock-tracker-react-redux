import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";
import TopPeers from "./TopPeers";

const Overview = () => {
  const overview = useSelector(state => state.companyOverview);
  const loading = useSelector(state => state.loading);

  if (loading > 0 && !overview) {
    return (
      <div className="overview">
        <h3>COMPANY OVERVIEW</h3>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="overview">
        <h3>COMPANY OVERVIEW</h3>
        <h2 className={overview ? "overview__company" : "hidden"}>
          {overview.companyName} ({overview.symbol})
        </h2>
        <p>
          {" "}
          <a className="overview__web" href={overview.website}>
            {overview.website}
          </a>
        </p>
        <p className="overview__text">{overview.description}</p>
        <TopPeers />
      </div>
    );
  }
};
export default Overview;
