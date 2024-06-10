import { Contract, Provider, Signer } from 'ethers';
import { simpleRpcProvider } from '../utils/web3'

// ABI
import erc721Abi from '../config/abis/erc721.json'

const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider)
}

export const getERC721Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(erc721Abi, address, signer)
}
