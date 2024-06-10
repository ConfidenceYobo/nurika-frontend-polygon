import { parseUnits } from "ethers";
import { CHAIN_ID } from "../constants/network";
import { ChainId, GAS_PRICE } from "../types";

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}

export const getGasPrice = (): string => {
  const chainId = parseInt(CHAIN_ID, 10);
  return chainId === ChainId.MAINNET ? GAS_PRICE_GWEI.default : GAS_PRICE_GWEI.testnet;
}