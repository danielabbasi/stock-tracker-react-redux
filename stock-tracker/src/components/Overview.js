import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";
import TopPeers from "./TopPeers";
import "../assets/styles/Overview.css";

const Overview = () => {
  const overview = useSelector(state => state.companyOverview);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error.companyOverview);

  const description =
    overview.description === "0"
      ? "No company description to display"
      : overview.description;
  const website =
    overview.website === "0" ? "No website to display" : overview.website;

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
          <h2 className={overview ? "overviewCompany" : "hidden"}>
            {overview.companyName} ({overview.symbol})
          </h2>
          <p>
            {" "}
            <a href={overview.website}>{website}</a>
          </p>
          <p className="overview__text">{description}</p>
          <TopPeers />
        </>
      )}
    </div>
  );
};

export default Overview;
