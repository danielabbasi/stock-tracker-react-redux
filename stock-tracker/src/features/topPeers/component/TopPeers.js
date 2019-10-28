import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../loading/component/loading";
import { addSymbolAction } from "../../search/redux/actions";
import "./TopPeers.css";

const TopPeers = () => {
  const peers = useSelector(state => state.peers.topPeers);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error.error.topPeers);
  const dispatch = useDispatch();
  const addSymbol = useCallback(symbol => dispatch(addSymbolAction(symbol)), [
    dispatch
  ]);

  const handleClick = data => () => {
    addSymbol(data);
  };

  return (
    <div className="top_peers">
      <h1>TOP PEERS</h1>
      {error ? (
        <p className="error__message">Error: Top peers can not be displayed</p>
      ) : loading > 0 && !peers.length ? (
        <Loading />
      ) : (
        <ul>
          {peers.map((data, index) => (
            <li onClick={handleClick(data)} key={index}>
              {data}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TopPeers;
