import { useSelector } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import { trim } from "../../helpers";
import "./dashboard.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IAppSlice } from "../../store/slices/app-slice";
import { IAccountSlice } from "../../store/slices/account-slice";

function Dashboard() {
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);
    const account = useSelector<IReduxState, IAccountSlice>(state => state.account);

    const myBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.apeu;
    });
    const myBalance1 = parseInt(myBalance, 10); //1234

    const limitTransferIn = useSelector<IReduxState, string>(state => {
        return state.account.limits && state.account.limits.transferIn;
    });

    const limitTransferOut = useSelector<IReduxState, string>(state => {
        return state.account.limits && state.account.limits.transferOut;
    });

    const limitSellOut = useSelector<IReduxState, string>(state => {
        return state.account.limits && state.account.limits.sellOut;
    });

    const clickFunc = () => {
        window.open(`https://traderjoexyz.com/trade?outputCurrency=0x0adD05dC5eF7c622CeD36aF14cDF1ca360AEae86#/`, "_blank");
    };

    const clickChart = () => {
        window.open(`https://dexscreener.com/avalanche/0x9aa1c6a4804CC6be836C084aB0Dc8f8FCeC15b7D`, "_blank");
    };

    const clickFuncbook = () => {
        window.open(`https://darkforestmoney.gitbook.io/dark-forest/`, "_blank");
    };

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
                                            <span className="nodeSpan">Dashboard</span>
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
                                                        <span className="SPAN_5">Total Forests</span>
                                                    </div>
                                                </div>
                                                <div className="DIV_6">
                                                    <div className="DIV_7">
                                                        <p className="P_8">
                                                            {isAppLoading ? <Skeleton width="100px" /> : `${new Intl.NumberFormat("en-US").format(app.totalPlanets)}`}
                                                        </p>
                                                        <p className="P_9">Forests</p>
                                                    </div>
                                                    <div className="DIV_10">
                                                        <div className="DIV_11">
                                                            <p className="P_12">TVL</p>
                                                            <p className="P_13">
                                                                {isAppLoading ? (
                                                                    <Skeleton width="100px" />
                                                                ) : (
                                                                    `$${new Intl.NumberFormat("en-US").format(
                                                                        Math.floor(Math.floor((app.totalValueLocked * app.mimPrice * app.marketPrice) / 10000)) / 4,
                                                                    )}`
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="DIV_11">
                                                            <p className="P_12">Emissions Daily</p>
                                                            <p className="P_13">
                                                                {isAppLoading ? (
                                                                    <Skeleton width="100px" />
                                                                ) : (
                                                                    `$${new Intl.NumberFormat("en-US").format(
                                                                        Math.floor((app.calculateTotalDailyEmission * app.mimPrice * app.marketPrice) / 10000),
                                                                    )}`
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="nodetiercontaner">
                                                <div className="DIV_3">
                                                    <span className="SPAN_5">$NART Price</span>
                                                    <div className="tokenamountcount">
                                                        <div className="createcontainer">
                                                            <button className="createnodebutton1" type="button" onClick={clickFunc}>
                                                                Buy<span className="buttonspan"></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="DIV_6 newdiv">
                                                    <div className="divp">
                                                        <p className="pdol">$</p>
                                                        <p className="pval">{isAppLoading ? <Skeleton width="100px" /> : `${trim(app.marketPrice / 10000, 7)}`}</p>
                                                        <p className="pusd"> /USD</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="nodetiercontaner">
                                                <div className="DIV_3">
                                                    <span className="SPAN_5">$Nart Stats</span>
                                                    <div className="tokenamountcount">
                                                        <div className="createcontainer">
                                                            <button className="createnodebutton1" type="button" onClick={clickChart}>
                                                                Chart<span className="buttonspan"></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="DIV_6">
                                                    <div className="DIV_7">
                                                        <p className="P_8">
                                                            {isAppLoading ? (
                                                                <Skeleton width="100px" />
                                                            ) : (
                                                                `${new Intl.NumberFormat("en-US").format(Math.round(Math.floor(app.totalSupply) / 100000000))} BN`
                                                            )}
                                                        </p>
                                                        <p className="P_9">$NART</p>
                                                    </div>
                                                    <div className="DIV_10">
                                                        <div className="DIV_11">
                                                            <p className="P_12">TVL</p>
                                                            <p className="P_13">
                                                                {isAppLoading ? (
                                                                    <Skeleton width="100px" />
                                                                ) : (
                                                                    `${new Intl.NumberFormat("en-US").format(Math.round(Math.floor(app.totalValueLocked) / 2000000000))} BN NART`
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="DIV_11">
                                                            <p className="P_12">Burned</p>
                                                            <p className="P_13">
                                                                {isAppLoading ? (
                                                                    <Skeleton width="250px" />
                                                                ) : (
                                                                    `${new Intl.NumberFormat("en-US").format(
                                                                        Math.floor(Math.round(Math.floor(app.burnedFromRenaming) / 10000000)),
                                                                    )} BN NART`
                                                                )}
                                                            </p>
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
            <div className="container-fluid">
                <div className="row">
                    <Zoom in={true}>
                        <Grid container spacing={4}>
                            <Grid item lg={6} md={10} sm={10} xs={10} direction="row-reverse" justifyContent="center" alignItems="center">
                                <div className="nodeWrapper">
                                    <div className="nodetierwrapper">
                                        <div className="nodetierfix">
                                            <div className="nodetiercontaner">
                                                <div className="nodetiernamecont">
                                                    <p className="nodetiername1">Forest Nodes</p>
                                                    <div className="tokenamountcount">
                                                        <div className="createcontainer">
                                                            <button className="createnodebutton" type="button" onClick={clickFuncbook}>
                                                                Gitbook<span className="buttonspan"></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="DIV_6 newdiv1">
                                                    <p className="aboutDF">
                                                        Why would you invest in our Forest Nodes? On most current node protocols, all you do is buy nodes, claim rewards, and
                                                        refresh the page to see your tokens slowly dripping in. Well, we have something different in mind... Our Forest Nodes are
                                                        tradable NFTs that have utilities across the whole Dark Forest Ecosystem. We envision Dark Forest to be a grand ecosystem
                                                        all DeFi investors can call home.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="nodetiercontaner1">
                                                <div className="rewardheader">
                                                    <div className="nodeHeaderContent">
                                                        <p className="rewardtext">Your Rewards</p>
                                                    </div>
                                                </div>
                                                <div className="rewaramcont">
                                                    <div className="rewardwrap">
                                                        <div className="dailyreward">
                                                            <p className="headeraday">
                                                                {isAppLoading ? (
                                                                    <Skeleton width="100px" />
                                                                ) : (
                                                                    `$${new Intl.NumberFormat("en-US").format(
                                                                        Math.floor((account.estimated * app.mimPrice * app.marketPrice) / 10000),
                                                                    )}/Day`
                                                                )}
                                                            </p>
                                                            <p className="nartaday">
                                                                {isAccountLoading ? (
                                                                    <Skeleton width="100px" />
                                                                ) : (
                                                                    `${new Intl.NumberFormat("en-US").format(Math.floor(account.estimated))} NART`
                                                                )}
                                                            </p>
                                                            <p className="natrtext">/NART</p>
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
            <div className="container-fluid">
                <div className="row">
                    <Zoom in={true}>
                        <Grid container spacing={4}>
                            <Grid item lg={12} md={10} sm={10} xs={10}>
                                <div className="nodeWrapper">
                                    <div className="nodeHeader">
                                        <div className="nodeHeaderContent1">
                                            <span className="nodeSpan">NFT Node Tiers</span>
                                            <div className="tokenamountcount">
                                                <div className="createcontainer"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nodetierwrapper">
                                        <div className="nodetierfix">
                                            <div className="nodetiercontaner2">
                                                <div className="nodetiernamecont">
                                                    <p className="nodetiername">Plain</p>
                                                    <div className="nodetierlvlcont">
                                                        <p className="nodetierlvlp">TIER 1</p>
                                                    </div>
                                                </div>
                                                <div className="nodeTierPicContainer">
                                                    <img src="img/tier1.png" alt="" />
                                                </div>
                                                <div className="DIV_10">
                                                    <div className="DIV_11">
                                                        <p className="P_12">Compounds</p>
                                                        <p className="P_13">0</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Bounus</p>
                                                        <p className="P_13">0</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Daily Reward</p>
                                                        <p className="P_13">3%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Days</p>
                                                        <p className="P_13">0</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="nodetiercontaner2">
                                                <div className="nodetiernamecont">
                                                    <p className="nodetiername">Glade</p>
                                                    <div className="nodetierlvlcont">
                                                        <p className="nodetierlvlp">TIER 2</p>
                                                    </div>
                                                </div>
                                                <div className="nodeTierPicContainer">
                                                    <img src={"img/1.png"} alt="" />
                                                </div>
                                                <div className="DIV_10">
                                                    <div className="DIV_11">
                                                        <p className="P_12">Compounds</p>
                                                        <p className="P_13">1</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Bonus</p>
                                                        <p className="P_13">1-5%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Daily Reward</p>
                                                        <p className="P_13">3.15%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Days</p>
                                                        <p className="P_13">0.5</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nodetierwrapper">
                                        <div className="nodetierfix">
                                            <div className="nodetiercontaner2">
                                                <div className="nodetiernamecont">
                                                    <p className="nodetiername">Camp</p>
                                                    <div className="nodetierlvlcont">
                                                        <p className="nodetierlvlp">TIER 3</p>
                                                    </div>
                                                </div>
                                                <div className="nodeTierPicContainer">
                                                    <img className="imagetier" src={"img/2.png"} alt="" />
                                                </div>
                                                <div className="DIV_10">
                                                    <div className="DIV_11">
                                                        <p className="P_12">Compounds</p>
                                                        <p className="P_13">4</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Bonus</p>
                                                        <p className="P_13">5-10%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Daily Reward</p>
                                                        <p className="P_13">3.3%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Days</p>
                                                        <p className="P_13">2</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="nodetiercontaner2">
                                                <div className="nodetiernamecont">
                                                    <p className="nodetiername">Lumberjack</p>
                                                    <div className="nodetierlvlcont">
                                                        <p className="nodetierlvlp">TIER 4</p>
                                                    </div>
                                                </div>
                                                <div className="nodeTierPicContainer">
                                                    <img className="imagetier" src={"img/3.png"} alt="" width="75%" height="auto" />
                                                </div>
                                                <div className="DIV_10">
                                                    <div className="DIV_11">
                                                        <p className="P_12">Compounds</p>
                                                        <p className="P_13">10</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Bonus</p>
                                                        <p className="P_13">10-20%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Daily Reward</p>
                                                        <p className="P_13">3.6%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Days</p>
                                                        <p className="P_13">5</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nodetierwrapper">
                                        <div className="nodetierfix">
                                            <div className="nodetiercontaner2">
                                                <div className="nodetiernamecont">
                                                    <p className="nodetiername">Valley</p>
                                                    <div className="nodetierlvlcont">
                                                        <p className="nodetierlvlp">TIER 5</p>
                                                    </div>
                                                </div>
                                                <div className="nodeTierPicContainer">
                                                    <img className="imagetier" src={"img/4.png"} alt="" />
                                                </div>
                                                <div className="DIV_10">
                                                    <div className="DIV_11">
                                                        <p className="P_12">Compounds</p>
                                                        <p className="P_13">100</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Bonus</p>
                                                        <p className="P_13">20-30%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Daily Reward</p>
                                                        <p className="P_13">3.9%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Days</p>
                                                        <p className="P_13">50</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="nodetiercontaner2">
                                                <div className="nodetiernamecont">
                                                    <p className="nodetiername">Settlement</p>
                                                    <div className="nodetierlvlcont">
                                                        <p className="nodetierlvlp">TIER 6</p>
                                                    </div>
                                                </div>
                                                <div className="nodeTierPicContainer">
                                                    <img className="imagetier" src={"img/5.png"} alt="" />
                                                </div>
                                                <div className="DIV_10">
                                                    <div className="DIV_11">
                                                        <p className="P_12">Compounds</p>
                                                        <p className="P_13">200</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Bonus</p>
                                                        <p className="P_13">30-40%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Daily Reward</p>
                                                        <p className="P_13">4.2%</p>
                                                    </div>
                                                    <div className="DIV_11">
                                                        <p className="P_12">Days</p>
                                                        <p className="P_13">100</p>
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
        </>
    );
}

export default Dashboard;
