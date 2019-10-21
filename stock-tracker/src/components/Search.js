import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSymbolAction, addSearchInputAction } from "../store/actions";
import { Icon } from "antd";
import "../assets/styles/Search.css";

const Search = () => {
  const [symbol, setSymbol] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const addSymbol = useCallback(symbol => dispatch(addSymbolAction(symbol)), [
    dispatch
  ]);
  const addSearchInput = useCallback(
    searchInput => dispatch(addSearchInputAction(searchInput)),
    [dispatch]
  );
  const suggestions = useSelector(state => state.suggestions);
  const response = useSelector(state => state.response);
  const handleSubmit = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (symbol.trim() === "") return;
      addSymbol(symbol);
      setOpen(false);
      setSymbol("");
    }
  };
  const onChange = e => {
    setSymbol(e.target.value);
    addSearchInput(e.target.value);
  };
  const onClick = data => {
    addSymbol(data.symbol);
    setOpen(false);
    setSymbol("");
  };
  const handleBlur = () => {
    requestAnimationFrame(() => {
      if (
        !dropdownRef.current.contains(document.activeElement) &&
        !searchRef.current.contains(document.activeElement)
      ) {
        setOpen(false);
      } else {
        searchRef.current.focus();
      }
    });
  };
  useEffect(() => {
    setOpen(symbol !== "" && suggestions.length !== 0);
  }, [suggestions, symbol]);
  const suggestionItems =
    suggestions.length > 0
      ? suggestions.map(data => {
          return (
            <tr
              className="search_display__suggestion_list__item"
              onClick={() => onClick(data)} // have to use function to bind data
              key={data.symbol}
            >
              <td className="search_display__suggestion_list__item__symbol">{`${data.symbol} `}</td>
              <td>{`${data.name}`}</td>
            </tr>
          );
        })
      : "";
  return (
    <div className="search_display">
      <h5>
        <Icon className="search_display__icon" type="search" />
      </h5>
      <input
        className="search_display__search_bar"
        placeholder={
          response ? `${response.companyName}(${response.symbol})` : ""
        }
        type="text"
        value={symbol}
        onChange={onChange}
        onKeyPress={handleSubmit}
        onBlur={handleBlur}
        ref={searchRef}
      />
      <table
        ref={dropdownRef}
        tabIndex="-1"
        className="search_display__suggestion_list"
        style={{ display: open ? "block" : "none" }}
      >
        <tbody>{suggestionItems}</tbody>
      </table>
    </div>
  );
};
export default Search;
