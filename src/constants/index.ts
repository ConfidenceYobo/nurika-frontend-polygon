import { defaultConfig } from "@web3modal/ethers/react";
import BigNumber from 'bignumber.js';
import { ChainId } from "../types";
import { RPC_URL, CHAIN_ID } from "./network";

export const BIG_TEN = new BigNumber(10)

export const WALLET_CONNECT_ID = process.env.REACT_APP_WALLET_CONNECT_ID || '';

export const METADATA = {
  name: "Nurika",
  description: "",
  url: "https://nurika.io",
  icons: ["https://memedapp.io/images/logo.svg"],
};

export const ETHERS_CONFIG = defaultConfig({
  enableCoinbase: true,
  enableEIP6963: true,
  enableInjected: true,
  metadata: METADATA,
  defaultChainId: parseInt(CHAIN_ID, 10),
  rpcUrl: RPC_URL,
});

export const BASE_EXPLORER_URLS = {
  [ChainId.MAINNET]: "https://polygonscan.com",
  [ChainId.TESTNET]: "https://cardona-zkevm.polygonscan.com",
};

export const BASE_EXPLORER_URL = BASE_EXPLORER_URLS[CHAIN_ID];
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);
export const DEFAULT_GAS_LIMIT = 500000;

export const HUNDRED_IN_BPS = 10000;
export const BASE_BPS = 100;

export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;

export const INITIAL_ALLOWED_SLIPPAGE = 50;
