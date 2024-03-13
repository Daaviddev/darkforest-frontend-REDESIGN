import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ReactComponent as plain } from "../../../assets/apes/0.svg";
import { ReactComponent as glade } from "../../../assets/apes/1.svg";
import { ReactComponent as camp } from "../../../assets/apes/2.svg";
import { ReactComponent as lumberjack } from "../../../assets/apes/3.svg";
import { ReactComponent as valley } from "../../../assets/apes/4.svg";
import { ReactComponent as settlement } from "../../../assets/apes/5.svg";
import PlanetButton from "../ToolBar/planet-button";
import "./apecard.scss";
import { trim } from "../../../helpers";
import { IReduxState } from "../../../store/slices/state.interface";
import { IAccountSlice, IPlanetInfoDetails } from "../../../store/slices/account-slice";
import { BorderAll } from "@material-ui/icons";

interface IDFCardProps {
    planet: IPlanetInfoDetails;
}

function DFCard({ planet }: IDFCardProps) {
    const tierImg = [plain, glade, camp, lumberjack, valley, settlement];
    const tierLabel = ["Plain", "Glade", "Camp", "Lumberjack", "Valley", "Settlement"];

    const mimPrice = useSelector<IReduxState, number>(state => state.app.mimPrice);
    const marketPrice = useSelector<IReduxState, number>(state => state.app.marketPrice);

    const getTierLevel = (reward: number) => {
        const amount = reward - 100000;
        if (amount === 0) return 0;
        else if (amount < 5000) return 1;
        else if (amount < 10000) return 2;
        else if (amount < 20000) return 3;
        else if (amount < 30000) return 4;
        else if (amount < 40000) return 5;
        else return 0;
    };

    const getBonus = (reward: number) => {
        return (reward - 100000) / 1000;
    };

    const getActionTime = () => {
        const actionTime = planet.lastProcessingTimestamp + planet.compoundDelay;
        // return actionTime == 0 ? "0" : new Date(actionTime * 1000).toISOString().substring(11, 19);
        return actionTime <= 0 ? 0 : actionTime;
    };

    const getTimeLeft = () => {
        const timestamp = getActionTime() - Math.floor(Date.now() / 1000);
        return timestamp <= 0 ? 0 : timestamp;
    };

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    const id = 1;

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });

    const className = timeLeft == 0 ? "dapp-topbar-btns-wrap" : "dapp-topbar-btns-wrap-full";

    return (
        <>
            <div className="container" data-tilt>
                <div className="df-card" data-tilt>
                    <div className="content">
                        <p className="card-name">{planet.name}</p>
                        <SvgIcon
                            color="primary"
                            component={tierImg[getTierLevel(planet.rewardMult)]}
                            viewBox="0 0 200 200"
                            style={{ minWidth: "250px", minHeight: "250px", width: "400px" }}
                        />
                        <br />
                        <p className="card-tier">
                            {tierLabel[getTierLevel(planet.rewardMult)]} #{planet.id}
                        </p>
                        <br />
                        <p className="card-title">Created Time: {planet.creationTime}</p>
                        <p className="card-title">Reward Mult: {planet.rewardMult}</p>
                        <p className="card-title">
                            Locked Amount: <span className="card-value">{Math.floor(planet.planetValue)}</span> ($
                            {trim((planet.planetValue * mimPrice * marketPrice) / 10000, 2)})
                        </p>
                        <p className="card-title">Total Claimed: {Math.floor(planet.totalClaimed)}</p>
                        <div className="dapp-topbar-btns-wrap">
                            <PlanetButton action="rename" planetId={planet.id.toString()} actionTime={getActionTime()} />
                            <PlanetButton action="transfer" planetId={planet.id.toString()} actionTime={getActionTime()} />
                        </div>
                        <div className={className}>
                            {timeLeft == 0 ? (
                                <>
                                    <PlanetButton action="compound" planetId={planet.id.toString()} actionTime={getActionTime()} />
                                    <PlanetButton action="claim" planetId={planet.id.toString()} actionTime={getActionTime()} />
                                </>
                            ) : (
                                <>
                                    <PlanetButton action="compound" planetId={planet.id.toString()} actionTime={getActionTime()} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DFCard;
