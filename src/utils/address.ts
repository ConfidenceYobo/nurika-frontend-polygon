import { ethers } from "ethers";
import { Address } from "../types";
import { CHAIN_ID } from "../constants/network";
import contracts from "../constants/contracts";

export const isAddress = (address: string | any) => {
  if (ethers.isAddress(address)) {
    return true;
  }
  return false;
};

export const getAddress = (address: Address): string => {
  return address[CHAIN_ID];
};

export const getERC721Address = () => {
  return getAddress(contracts.nft);
};
