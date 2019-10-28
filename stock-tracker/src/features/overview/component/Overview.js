import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../loading/component/loading";
import TopPeers from "../../topPeers/component/TopPeers";
import "./Overview.css";

const Overview = () => {
  const overview = useSelector(state => state.overview.companyOverview);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error.error.companyOverview);

  return (
    <div className="overview">
      <h1>COMPANY OVERVIEW</h1>
      {error ? (
        <p className="error__message">
          Error: Company overview can not be displayed
        </p>
      ) : loading > 0 && !overview ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Overview;
