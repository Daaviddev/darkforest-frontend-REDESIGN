import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { ApeuContract, ApeuManagerContract, PoolManagerContract, WalletObserverContract } from "../../abi";
import { setAll } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getMarketPrice, getTokenPrice } from "../../helpers";
import { RootState } from "../store";

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {
        const mimPrice = getTokenPrice("MIM");
        const addresses = getAddresses(networkID);
        const natrContract = new ethers.Contract(addresses.NATR_ADDRESS, ApeuContract, provider);
        const natrManagerContract = new ethers.Contract(addresses.NATR_MANAGER_ADDRESS, ApeuManagerContract, provider);

        const marketPrice = await getMarketPrice(networkID, provider);

        const totalSupply = Math.floor((await natrContract.totalSupply()) / Math.pow(10, 18));

        let totalValueLocked = 0;
        try {
            totalValueLocked = Math.floor((await natrManagerContract.totalValueLocked()) / Math.pow(10, 18));
        } catch {}
        const totalPlanets = await natrManagerContract.totalSupply();

        const burnedFromRenaming = Math.floor((await natrManagerContract.burnedFromRenaming()) / Math.pow(10, 18));
        const calculateTotalDailyEmission = Math.floor((await natrManagerContract.calculateTotalDailyEmission()) / Math.pow(10, 18));
        const creationMinPrice = ethers.utils.formatUnits(await natrManagerContract.creationMinPrice(), "ether");

        return {
            mimPrice,
            totalSupply,
            totalPlanets,
            marketPrice,
            totalValueLocked,
            burnedFromRenaming,
            calculateTotalDailyEmission,
            creationMinPrice,
        };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    loading: boolean;
    mimPrice: number;
    totalSupply: number;
    totalPlanets: number;
    marketPrice: number;
    totalValueLocked: number;
    burnedFromRenaming: number;
    calculateTotalDailyEmission: number;
    creationMinPrice: string;
    networkID: number;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
