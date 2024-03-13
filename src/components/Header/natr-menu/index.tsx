import { useState } from "react";
import { getAddresses, TOKEN_DECIMALS, DEFAULD_NETWORK } from "../../../constants";
import { useSelector } from "react-redux";
import CartIcon from "../../../assets/icons/cart.png";
import { Link, Fade, Popper } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./time-menu.scss";
import { IReduxState } from "../../../store/slices/state.interface";
import { getTokenUrl } from "../../../helpers";

function DFButton() {
    const networkID = useSelector<IReduxState, number>(state => {
        return (state.app && state.app.networkID) || DEFAULD_NETWORK;
    });

    const addresses = getAddresses(networkID);

    const NATR_ADDRESS = addresses.NATR_ADDRESS;

    const isVerySmallScreen = useMediaQuery("(max-width: 500px)");

    const clickFunc = () => {
        window.open(`https://traderjoexyz.com/trade?outputCurrency=${NATR_ADDRESS}`, "_blank");
    };

    return (
        <div className="time-menu-root" onClick={clickFunc}>
            <div className="time-menu-btn">{!isVerySmallScreen ? <p>Buy on Trader Joe</p> : <img alt="" width="20" src={CartIcon} />}</div>
        </div>
    );
}

export default DFButton;
