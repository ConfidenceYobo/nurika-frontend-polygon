import ConnectWallet from "@/components/cta/ConnectWalletButton";
import { Button } from "../../ui/button";
import wallet from "@/assets/template/wallet.svg";
import { useWeb3Context } from "@/context/Web3Context";
import { useDisconnect } from "@web3modal/ethers/react";

export default function Header() {
  const web3Context = useWeb3Context();
  const { disconnect } = useDisconnect();

  return (
    <header className="flex items-center justify-between py-4 md:py-2 px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20">
      <a href="https://nft.nurika.health/">
        <div className="flex items-center space-x-2">
          <img
            src="/logo-text.svg"
            alt="Nurika Logo"
            className="w-24 sm:w-28 md:w-32"
          />
        </div>
      </a>

      {!web3Context.isConnected && (
        <ConnectWallet>
          <Button className="space-x-2">
            <img src={wallet} alt="wallet" className="w-4 h-4" />{" "}
            <span>Connect Wallet</span>
          </Button>
        </ConnectWallet>
      )}
      {web3Context.isConnected && (
        <Button onClick={() => disconnect()}>Disconnect</Button>
      )}
    </header>
  );
}
