import { SetStateAction, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import {
  createWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ETHERS_CONFIG, WALLET_CONNECT_ID } from "./constants";
import { BASE_CHAINS_LIST, BASE_CHAIN_CONFIG, CHAIN_ID } from "./constants/network";
import { Web3ContextProvider } from "./context/Web3Context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MintPage from "./routes/mint";
import HomePage from "./routes/home";
import { Toaster } from "sonner";
import Template from "./components/container/block/tenplate";
import { Fragment } from "react/jsx-runtime";
import CheckoutPage from "./routes/checkout";

const projectId = WALLET_CONNECT_ID;

createWeb3Modal({
  defaultChain: BASE_CHAIN_CONFIG[CHAIN_ID],
  ethersConfig: ETHERS_CONFIG,
  chains: BASE_CHAINS_LIST,
  projectId,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <MintPage />,
      },
      {
        path: "/mint",
        element: <MintPage />,
      },
      {
        path: "/mint/:title",
        element: <CheckoutPage />,
      },
    ],
  },
]);

function RouteWrapper() {
  const { walletProvider } = useWeb3ModalProvider();
  const { chainId, isConnected } = useWeb3ModalAccount();
  const [userSigner, setUserSigner] = useState<JsonRpcSigner | null>(null);

  const getSigner = async () => {
    if (walletProvider) {
      try {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        setUserSigner(signer as unknown as SetStateAction<JsonRpcSigner>);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };

  useEffect(() => {
    if (isConnected && chainId === parseInt(CHAIN_ID, 10)) {
      getSigner();
    }
  }, [isConnected, chainId]);

  return (
    <Web3ContextProvider userSigner={userSigner}>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </Web3ContextProvider>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <Fragment>
    <RouteWrapper />
  </Fragment>
);

reportWebVitals();
