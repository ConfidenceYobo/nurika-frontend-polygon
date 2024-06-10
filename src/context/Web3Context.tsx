import { useContext, createContext, useEffect, useMemo } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BASE_CHAIN_CONFIG, BASE_CHAIN_CURRENCIES, CHAIN_ID } from "../constants/network";

interface Web3ContextType {
  chainId: number | undefined;
  isConnected: boolean;
  address: `0x${string}` | null | undefined;
  userSigner: JsonRpcSigner;
}

const Web3Context = createContext<null | Web3ContextType>(null);

export const Web3ContextProvider = ({
  children,
  userSigner,
}: {
  children: JSX.Element[];
  userSigner: JsonRpcSigner;
}) => {
  const { chainId, isConnected, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const switchWalletChain = async () => {
    if (walletProvider) {
      const ethersProvider = new BrowserProvider(walletProvider);
      try {
        await ethersProvider.send("wallet_switchEthereumChain", [
          {
            chainId: `0x${parseInt(CHAIN_ID, 10).toString(16)}`,
          },
        ]);
      } catch (error: any) {
        if (error.error.code === 4902) {
          try {
              await ethersProvider.send("wallet_addEthereumChain", [
                {
                    chainId: `0x${parseInt(BASE_CHAIN_CONFIG[CHAIN_ID].chainId, 10).toString(16)}`,
                    chainName: BASE_CHAIN_CONFIG[CHAIN_ID].name,
                    rpcUrls: [BASE_CHAIN_CONFIG[CHAIN_ID].rpcUrl], // Replace with your chain's RPC URL
                    nativeCurrency: {
                        name: BASE_CHAIN_CURRENCIES[CHAIN_ID].name,
                        symbol: BASE_CHAIN_CURRENCIES[CHAIN_ID].symbol, // 2-6 characters long
                        decimals: 18,
                    },
                    blockExplorerUrls: [BASE_CHAIN_CONFIG[CHAIN_ID].explorerUrl], // Replace with your chain's block explorer URL
                },
            ]);
          } catch (addError) {
              console.error('Failed to add the chain to MetaMask:', addError);
          }
      } else {
          console.error('Failed to switch to the chain:', error);
      }
      }
    }
  };


  useEffect(() => {
    if (isConnected && chainId !== parseInt(CHAIN_ID, 10)) {
      switchWalletChain();
    }
  }, [chainId, isConnected]);

  const web3ContextValue = useMemo(
    () => ({
      chainId,
      isConnected:
        isConnected && chainId === parseInt(CHAIN_ID, 10) ? true : false,
      address:
        isConnected && chainId === parseInt(CHAIN_ID, 10) ? address : null,
      userSigner,
    }),
    [chainId, address, isConnected, userSigner]
  );

  return (
    <Web3Context.Provider value={web3ContextValue}>
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3Context() {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error("useWeb3Context must be used within a Web3ContextProvider");
  }

  return context;
}
