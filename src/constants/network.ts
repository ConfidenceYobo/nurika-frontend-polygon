import { ChainId } from "../types";

const RPC_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "https://polygon-mainnet.infura.io",
  [ChainId.TESTNET]: "https://rpc.cardona.zkevm-rpc.com",
};

export const CHAIN_ID = process.env.REACT_APP_PUBLIC_CHAIN_ID || '137';
export const RPC_URL: string = RPC_URLS[CHAIN_ID];

export const BASE_CHAIN_CONFIG = {
  [ChainId.MAINNET]: {
    chainId: 137,
    name: "Polygon Matic",
    currency: "MATIC",
    explorerUrl: "https://polygonscan.com",
    rpcUrl: "https://polygon-mainnet.infura.io",
  },
  [ChainId.TESTNET]: {
    chainId: 2442,
    name: "Polygon zkEVM Cardona Testnet",
    currency: "ETH",
    explorerUrl: "https://cardona-zkevm.polygonscan.com",
    rpcUrl: "https://rpc.cardona.zkevm-rpc.com",
  },
};

export const BASE_CHAIN_CURRENCIES = {
  [ChainId.MAINNET]: {
    name: 'BNB',
    symbol: 'MATIC',
    decimals: 18,
  },
  [ChainId.TESTNET]: {
    name: 'Testnet BNB',
    symbol: 'ETH',
    decimals: 18,
  },
};

export const BASE_CHAINS_LIST = Object.values(BASE_CHAIN_CONFIG);

export default RPC_URLS;
