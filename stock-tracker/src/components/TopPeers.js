import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";

const TopPeers = () => {
  const peers = useSelector(state => state.topPeers);
  const loading = useSelector(state => state.loading);

  if (loading > 0 && !peers.length) {
    return (
      <div className="top_peers">
        <h3>TOP PEERS</h3>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="top_peers">
        <h3>TOP PEERS</h3>
        <ul>
          {peers.map((data, index) => (
            <li key={index}>{data}</li>
          ))}{" "}
        </ul>
      </div>
    );
  }
};
export default TopPeers;
