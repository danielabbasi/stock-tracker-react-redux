import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";
import TopPeers from "./TopPeers";

const Overview = () => {
  const overview = useSelector(state => state.companyOverview);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error.companyOverview);
  console.log(error)

  if(error){
    return (
      <div className="overview error">
        <h3>COMPANY OVERVIEW</h3>
        <p className="error__message">Error: Company overview can not be displayed</p>
      </div>
    )
  }
  if (loading > 0 && !overview) {
    return (
      <div className="overview">
        <h1>COMPANY OVERVIEW</h1>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="overview">
        <h1>COMPANY OVERVIEW</h1>
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

// return(
//     <div className="overview">
//       <h3>COMPANY OVERVIEW</h3>
//       {loading > 0 && !overview ? (
//           <Loading/>
//         ) : (<div>
//           <h2 className={overview ? "overviewCompany" : "hidden"}>
//           {overview.companyName} ({overview.symbol})
//           </h2>
//           <p>
//             {" "}
//             <a href={overview.website}>{overview.website}</a>
//           </p>
//           <p className="overviewText">{overview.description}</p>
//           </div>
//       )}
//     </div>
//   );
// };

export default Overview;
