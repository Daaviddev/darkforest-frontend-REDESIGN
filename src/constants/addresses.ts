import { Networks } from "./blockchain";

const AVAX_MAINNET = {
    MIM_ADDRESS: "0x130966628846bfd36ff31a822705796e8cb8c18d",
    NATR_ADDRESS: "0x0adD05dC5eF7c622CeD36aF14cDF1ca360AEae86",
    NATR_MANAGER_ADDRESS: "0x5F501F84A28995Bcd7fE4A3Fd1F2C2E45BC8373c",
    WALLET_OBSERVER_CONTRACT: "0x381a03738E85A3c2aD129b20a480707025473c7E",
    POOL_MANAGER_ADDRESS: "0x7bb02fF57a1359B00E4154C6f8c36eDB9d76a33D",
    DF_MIM_ADDRESS: "0x9aa1c6a4804CC6be836C084aB0Dc8f8FCeC15b7D",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.AVAX) return AVAX_MAINNET;

    throw Error("Network don't support");
};
