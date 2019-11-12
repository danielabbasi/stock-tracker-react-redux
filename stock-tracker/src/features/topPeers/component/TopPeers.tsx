import React, { useCallback, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../loading/component/loading";
import { setSymbolAction } from "../../search/redux/actions";
import { ErrorMessage } from "../../error/error";
import "./TopPeers.css";
import { AppState } from "store/rootReducer";

export const TopPeers: FC = () => {
  const { topPeers, loading, error } = useSelector(
    (state: AppState) => state.peers
  );
  const dispatch = useDispatch();
  const addSymbol = useCallback(
    (symbol: string) => dispatch(setSymbolAction(symbol)),
    [dispatch]
  );

  const handleClick = (peers: string) => () => {
    addSymbol(peers);
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
          {topPeers.map((data, index) => (
            <li onClick={handleClick(data)} key={index}>
              {data}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
