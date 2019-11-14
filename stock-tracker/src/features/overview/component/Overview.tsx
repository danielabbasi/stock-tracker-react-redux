import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../loading/component/loading";
import { TopPeers } from "../../topPeers";
import { ErrorMessage } from "../../error/error";
import "./Overview.css";
import { AppState } from "store/rootReducer";

export const Overview: FC = () => {
  const { companyOverview, loading, error } = useSelector(
    (state: AppState) => state.overview
  );

  return (
    <div className="overview">
      <h1>COMPANY OVERVIEW</h1>
      {error ? (
        <ErrorMessage feature={"Company Overview"} />
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <h2 className={companyOverview ? "overview__company" : "hidden"}>
            {companyOverview && companyOverview.companyName} (
            {companyOverview && companyOverview.symbol})
          </h2>
          <p>
            {" "}
            <a
              rel="noopener noreferrer"
              className="overview__web"
              href={companyOverview && companyOverview.website}
              target="_blank"
            >
              {companyOverview && companyOverview.website}
            </a>
          </p>
          <p className="overview__text">
            {companyOverview && companyOverview.description}
          </p>
        </>
      )}
      <TopPeers />
    </div>
  );
};
