import React, { useState, useCallback, useEffect } from "react";
import { ReactComponent as XIcon } from "../../../assets/icons/x.svg";
import { Box, Modal, Paper, SvgIcon, IconButton, OutlinedInput, InputAdornment, FormControl, MenuItem, Select } from "@material-ui/core";
import "./txmodal.scss";
import ArrowUpImg from "../../../assets/icons/arrow-down.svg";
import { Skeleton } from "@material-ui/lab";
import { shorten, sleep, trim } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../../store/slices/state.interface";
import { createPlanet, renamePlanet, transferPlanet, mergePlanets } from "../../../store/slices/planet-thunk";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../../store/slices/pending-txns-slice";
import { IPlanetInfoDetails } from "../../../store/slices/account-slice";
import { useWeb3Context } from "../../../hooks";
import { ReactComponent as SettingsIcon } from "../../../assets/icons/settings.svg";
import { warning } from "../../../store/slices/messages-slice";
import { messages } from "../../../constants/messages";
import { utils } from "ethers";
import { String } from "lodash";

interface ITxProps {
    open: boolean;
    handleClose: () => void;
    filter: string;
    planetId: string;
}

function TxModal({ open, handleClose, filter, planetId }: ITxProps) {
    const planets = useSelector<IReduxState, IPlanetInfoDetails[]>(state => {
        return state.account.planets;
    });
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const dispatch = useDispatch();

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const creationMinPrice = useSelector<IReduxState, string>(state => {
        return state.app.creationMinPrice;
    });

    const natrBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.apeu;
    });

    const [quantity, setQuantity] = useState<string>("");
    const [name, setName] = useState<string>("");

    const [planetId1, setPlanetId1] = useState<string>("");
    const [planetId2, setPlanetId2] = useState<string>("");

    const handleChangePlanetId1 = (event: any) => {
        setPlanetId1(event.target.value);
    };

    const handleChangePlanetId2 = (event: any) => {
        setPlanetId2(event.target.value);
    };

    let enabledPlanets = [];

    for (let index = 0; index < planets.length; index++) {
        const actionTime = planets[index].lastProcessingTimestamp + planets[index].compoundDelay;
        if (actionTime <= Math.floor(Date.now() / 1000)) enabledPlanets.push(index);
    }

    let onMint = () => {};
    let text1 = "";
    let text2 = "";
    let titleText = "";
    let buttonText = "";

    if (filter == "create") {
        text1 = "Name";
        text2 = "My first Forest";
        titleText = "New Forest";
        buttonText = "Create";
        onMint = async () => {
            if (await checkWrongNetwork()) return;
            dispatch(createPlanet({ name, quantity, provider, address, networkID: chainID }));
        };
    } else if (filter == "rename") {
        text1 = "New Name";
        text2 = "Input New Name";
        titleText = "Change Name of #" + planetId;
        buttonText = "Change";
        onMint = async () => {
            if (await checkWrongNetwork()) return;
            dispatch(renamePlanet({ id: planetId, name, provider, address, networkID: chainID }));
        };
    } else if (filter == "transfer") {
        text1 = "Address";
        text2 = "Input Address to transfer";
        titleText = "Transfer #" + planetId;
        buttonText = "Transfer";
        onMint = async () => {
            if (await checkWrongNetwork()) return;
            dispatch(transferPlanet({ tokenId: planetId, to: name, provider, address, networkID: chainID }));
        };
    } else if (filter == "merge") {
        text1 = "New Forest Name";
        text2 = "Input New Name";
        titleText = "Merge Forest";
        buttonText = "Merge";
        onMint = async () => {
            if (await checkWrongNetwork()) return;
            dispatch(mergePlanets({ firstId: planetId1, secondId: planetId2, name, provider, address, networkID: chainID }));
        };
    }

    const setMax = () => {
        setQuantity(natrBalance);
    };

    return (
        <Modal id="hades" open={open} onClose={handleClose} hideBackdrop>
            <Paper className="ohm-card ohm-popover txmodal-poper">
                <div className="cross-wrap">
                    <div className="txmodal-title">
                        <p>{titleText}</p>
                    </div>
                    <IconButton onClick={handleClose}>
                        <SvgIcon color="primary" component={XIcon} />
                    </IconButton>
                </div>
                <Box className="card-content">
                    <div className="txmodal-header">
                        <div className="txmodal-header-token-select-wrap">
                            {filter == "merge" && (
                                <div>
                                    <div className="txmodal-header-help-text">
                                        <p>First Forest ID</p>
                                    </div>
                                    <FormControl className="txmodal-form">
                                        {/* <InputLabel id="demo-simple-select-required-label">Age</InputLabel> */}
                                        <Select className="txmodal-form-select" value={planetId1} label="First ID *" onChange={handleChangePlanetId1}>
                                            {enabledPlanets.map(index => (
                                                <MenuItem value={planets[index].id}>
                                                    #{planets[index].id} - {planets[index].name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <div className="txmodal-header-help-text">
                                        <p>Second Forest ID</p>
                                    </div>
                                    <FormControl className="txmodal-form">
                                        {/* <InputLabel id="demo-simple-select-required-label">Age</InputLabel> */}
                                        <Select
                                            // inputProps={{ "aria-label": "Without label" }}
                                            className="txmodal-form-select"
                                            value={planetId2}
                                            label="Second ID *"
                                            onChange={handleChangePlanetId2}
                                        >
                                            {enabledPlanets.map(index => (
                                                <MenuItem value={planets[index].id}>
                                                    #{planets[index].id} - {planets[index].name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                            <div className="txmodal-header-help-text">
                                <p>{text1}</p>
                            </div>
                            <OutlinedInput
                                type="text"
                                placeholder={text2}
                                className="txmodal-header-token-select-input"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                labelWidth={0}
                            />
                            {filter == "create" && (
                                <>
                                    <div className="txmodal-header-help-text">
                                        <p>Amount</p>
                                    </div>
                                    <OutlinedInput
                                        type="number"
                                        placeholder="52,000"
                                        className="txmodal-header-token-select-input"
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        labelWidth={0}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <div className="txmodal-header-token-select-input-btn" onClick={setMax}>
                                                    <p>Max</p>
                                                </div>
                                            </InputAdornment>
                                        }
                                    />
                                </>
                            )}
                            <div
                                className="txmodal-header-token-select-btn"
                                onClick={async () => {
                                    if (isPendingTxn(pendingTransactions, "pending...")) return;
                                    await onMint();
                                    await sleep(10);
                                    handleClose();
                                }}
                            >
                                <p>{txnButtonText(pendingTransactions, "", buttonText)}</p>
                            </div>
                        </div>
                    </div>
                </Box>
            </Paper>
        </Modal>
    );
}

export default TxModal;
