import { useSelector } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import "./mint.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IPlanetInfoDetails } from "../../store/slices/account-slice";
import ToolBar from "./ToolBar";
import DFCard from "./ApeCard";
import { trim } from "../../helpers";
import { IAppSlice } from "../../store/slices/app-slice";
import { IAccountSlice } from "../../store/slices/account-slice";

function Mint() {
    const planets = useSelector<IReduxState, IPlanetInfoDetails[]>(state => {
        return state.account.planets;
    });
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);
    const account = useSelector<IReduxState, IAccountSlice>(state => state.account);
    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);
    const myBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.apeu;
    });
    const myBalance1 = parseInt(myBalance, 10); //1234
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Zoom in={true}>
                        <Grid container spacing={4}>
                            <Grid item lg={6} md={8} sm={7} xs={5}>
                                <div className="nodeWrapper">
                                    <div className="nodeHeader">
                                        <div className="nodeHeaderContent">
                                            <span className="nodeSpan">My Stats</span>
                                            <div className="tokenamountcont">
                                                <p className="yourwallet">Your wallet:</p>
                                                <p className="walletamount">{myBalance1}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nodetierwrapper">
                                        <div className="nodetierfix1">
                                            <div className="nodetiercontaner">
                                                <div className="DIV_3">
                                                    <div className="">
                                                        <span className="SPAN_5">My Forests</span>
                                                    </div>
                                                </div>
                                                <div className="DIV_6">
                                                    <div className="DIV_7">
                                                        <p className="P_8">
                                                            {isAccountLoading ? <Skeleton width="100px" /> : `${new Intl.NumberFormat("en-US").format(account.number)}`}
                                                        </p>
                                                        <p className="P_9">Forests</p>
                                                    </div>
                                                    <div className="DIV_10">
                                                        <div className="DIV_11">
                                                            <p className="P_12">Daily Rewards</p>
                                                            <p className="P_13">
                                                                {isAccountLoading ? (
                                                                    <Skeleton width="100px" />
                                                                ) : (
                                                                    `${new Intl.NumberFormat("en-US").format(Math.floor(account.estimated))} NART`
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="DIV_11">
                                                            <p className="P_12">Daily Rewards $</p>
                                                            <p className="P_13">
                                                                {isAppLoading ? (
                                                                    <Skeleton width="100px" />
                                                                ) : (
                                                                    `$${new Intl.NumberFormat("en-US").format(
                                                                        Math.floor((account.estimated * app.mimPrice * app.marketPrice) / 10000),
                                                                    )}`
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="nodetiercontaner">
                                                <div className="DIV_3">
                                                    <span className="SPAN_5">Pending Rewards</span>
                                                </div>
                                                <div className="DIV_6">
                                                    <div className="dailyreward">
                                                        <p className="headeraday">
                                                            {isAppLoading ? (
                                                                <Skeleton width="100px" />
                                                            ) : (
                                                                `$${new Intl.NumberFormat("en-US").format(
                                                                    Math.floor((account.totalpending * app.mimPrice * app.marketPrice) / 10000),
                                                                )}`
                                                            )}
                                                        </p>
                                                        <p className="P_8">
                                                            {isAccountLoading ? (
                                                                <Skeleton width="100px" />
                                                            ) : (
                                                                `${new Intl.NumberFormat("en-US").format(Math.floor(account.totalpending))} NART`
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="DIV_10">
                                                        <div className="DIV_11">
                                                            <p className="P_12">Total Claimed</p>
                                                            <p className="P_13">0 NART</p>
                                                        </div>
                                                        <div className="DIV_11">
                                                            <p className="P_12">Total Claimed $</p>
                                                            <p className="P_13">$0</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Zoom>
                </div>
            </div>
            {planets == undefined ? <></> : <ToolBar planets={planets} />}
            <div className="mint-view">
                <div className="mint-infos-wrap">
                    <Zoom in={true}>
                        <Grid container spacing={4} direction="row-reverse" justifyContent="center" alignItems="center">
                            {planets == undefined ? (
                                <Skeleton width="100px" />
                            ) : (
                                planets.map(planet => (
                                    <Grid item xl={4} lg={5} md={6} sm={8} xs={10}>
                                        <DFCard planet={planet} />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Zoom>
                </div>
            </div>
        </>
    );
}

export default Mint;
