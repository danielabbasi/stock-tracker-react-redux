import React from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";

const TopPeers = () => {
  const peers = useSelector(state => state.topPeers);
  const loading = useSelector(state => state.loading);

  return (
    <div className="top_peers">
      <h1>TOP PEERS</h1>
      {loading > 0 && !peers.length ? (
        <Loading />
      ) : (
        <ul>
          {peers.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TopPeers;
