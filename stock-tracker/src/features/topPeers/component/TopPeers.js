import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../loading/component/loading";
import { setSymbolAction } from "../../search/redux/actions";
import ErrorMessage from "../../error/error";
import "./TopPeers.css";

export const TopPeers = () => {
  const peers = useSelector(state => state.peers.topPeers);
  const loading = useSelector(state => state.peers.loading);
  const error = useSelector(state => state.peers.error);
  const dispatch = useDispatch();
  const addSymbol = useCallback(symbol => dispatch(setSymbolAction(symbol)), [
    dispatch
  ]);

  const handleClick = data => () => {
    addSymbol(data);
  };

  return (
    <div className="top_peers">
      <h1>TOP PEERS</h1>
      {error ? (
        <ErrorMessage feature={"Top peers"} />
      ) : loading ? (
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
