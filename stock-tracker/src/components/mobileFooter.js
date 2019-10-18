import React, { useCallback } from "react";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { addSymbolAction } from "../store/actions";

const MobileFooter = () => {

    const dispatch = useDispatch();
    const addSymbol = useCallback(symbol => dispatch(addSymbolAction(symbol)), [
      dispatch
    ]);

    const handleClick = () => {
        addSymbol("");
      };

    return(
        <div className="footer__mobile">
        <img onClick={handleClick} className="footer__logo" alt="logo" src={logo} />
        </div>
    )
}
export default MobileFooter;