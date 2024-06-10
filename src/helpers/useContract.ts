import { useWeb3Context } from "../context/Web3Context";
import { getERC721Contract } from "./contracts";

export const useERC721 = (address: string) => {
  const { userSigner } = useWeb3Context();
  return getERC721Contract(address, userSigner);
};
