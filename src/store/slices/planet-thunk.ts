import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { ApeuManagerContract } from "../../abi";
import { clearPendingTxn, fetchPendingTxns } from "./pending-txns-slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadAccountDetails } from "./account-slice";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { warning, success, info, error } from "./messages-slice";
import { messages } from "../../constants/messages";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";

interface ICreatePlanet {
    name: string;
    quantity: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const createPlanet = createAsyncThunk("mint/createPlanet", async ({ name, quantity, provider, address, networkID }: ICreatePlanet, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const natrManager = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await natrManager.createPlanetWithTokens(name, ethers.utils.parseUnits(quantity, "ether"), { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Creating Forest", type: "creating" }));
        await tx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (tx) {
            dispatch(clearPendingTxn(tx.hash));
        }
    }
    await sleep(2);
    dispatch(info({ text: messages.your_data_update_soon }));
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});

interface IRenamePlanet {
    id: string;
    name: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const renamePlanet = createAsyncThunk("mint/renamePlanet", async ({ id, name, provider, address, networkID }: IRenamePlanet, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const natrManager = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await natrManager.renamePlanet(id, name, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Renaming Planet", type: "renaming" }));
        await tx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (tx) {
            dispatch(clearPendingTxn(tx.hash));
        }
    }
    await sleep(2);
    dispatch(info({ text: messages.your_data_update_soon }));
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});

interface IMergePlanets {
    firstId: string;
    secondId: string;
    name: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const mergePlanets = createAsyncThunk("mint/mergePlanets", async ({ firstId, secondId, name, provider, address, networkID }: IMergePlanets, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const apeuManager = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await apeuManager.mergePlanets([firstId, secondId], name, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Merging Planet", type: "merging" }));
        await tx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (tx) {
            dispatch(clearPendingTxn(tx.hash));
        }
    }
    await sleep(2);
    dispatch(info({ text: messages.your_data_update_soon }));
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});

interface ITransferPlanet {
    tokenId: string;
    to: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const transferPlanet = createAsyncThunk("mint/transferPlanet", async ({ tokenId, to, provider, address, networkID }: ITransferPlanet, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const natrManager = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await natrManager.transferFrom(address, to, tokenId, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Transferring Planet", type: "transferring" }));
        await tx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (tx) {
            dispatch(clearPendingTxn(tx.hash));
        }
    }
    await sleep(2);
    dispatch(info({ text: messages.your_data_update_soon }));
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});

interface IBasicInterface {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const compoundAll = createAsyncThunk("mint/compoundAll", async ({ provider, address, networkID }: IBasicInterface, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const natrManager = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await natrManager.compoundAll({ gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Compounding All", type: "allcompounding" }));
        await tx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (tx) {
            dispatch(clearPendingTxn(tx.hash));
        }
    }
    await sleep(2);
    dispatch(info({ text: messages.your_data_update_soon }));
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});

export const claimAll = createAsyncThunk("mint/claimAll", async ({ provider, address, networkID }: IBasicInterface, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const natrManager = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await natrManager.cashoutAll({ gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Claim All", type: "allclaiming" }));
        await tx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (tx) {
            dispatch(clearPendingTxn(tx.hash));
        }
    }
    await sleep(2);
    dispatch(info({ text: messages.your_data_update_soon }));
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});

interface ICompoundPlanet {
    planetId: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const compoundReward = createAsyncThunk("mint/compoundReward", async ({ planetId, provider, address, networkID }: ICompoundPlanet, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const natrManager = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await natrManager.compoundReward(planetId, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Compounding NART", type: "compounding" }));
        await tx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (tx) {
            dispatch(clearPendingTxn(tx.hash));
        }
    }
    await sleep(2);
    dispatch(info({ text: messages.your_data_update_soon }));
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});

export const cashoutReward = createAsyncThunk("mint/cashoutReward", async ({ planetId, provider, address, networkID }: ICompoundPlanet, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const natrManager = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, signer);

    let tx;

    try {
        const gasPrice = await getGasPrice(provider);

        tx = await natrManager.cashoutReward(planetId, { gasPrice });

        dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Claiming NART", type: "claiming" }));
        await tx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (tx) {
            dispatch(clearPendingTxn(tx.hash));
        }
    }
    await sleep(2);
    dispatch(info({ text: messages.your_data_update_soon }));
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(info({ text: messages.your_data_updated }));
    return;
});
