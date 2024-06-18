import { SelectedNFTTitle } from "./showcase";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ConnectWallet from "@/components/cta/ConnectWalletButton";
import { toast } from "sonner";
import { BASE_CHAIN_CURRENCIES, CHAIN_ID } from "@/constants/network";
import { useBuyNFTCallback } from "@/helpers/calls/useBuyNFTCallback";
import { useWeb3Context } from "@/context/Web3Context";

import one from "@/assets/mint-page/showcase/active.mp4";
import two from "@/assets/mint-page/showcase/hydrate.mp4";
import three from "@/assets/mint-page/showcase/runner.mp4";
import four from "@/assets/mint-page/showcase/walker.mp4";
import five from "@/assets/mint-page/showcase/joggers.mp4";

const selectedNFT = {
  Active: {
    image: one,
    content:
      "Every heart beat reminds you of the essence of life, every second spent exercising brings you closer to your goals, and every sweat broken is a badge of honor. Keep your vitals within range, stay active! Crafted for Nurikans on-the-go",
  },
  Hydrated: {
    image: two,
    content:
      "When you’re pushing your limits, don’t forget to oil your levers! Pause, and indulge in the refreshing essence of water, keeping you hydrated all through your fitness journey. And even when you’re just going about your day, have a jar with you.",
  },
  Runner: {
    image: three,
    content:
      "The wind against your face, as you push beyond limits, through tracks and difficult terrains. For runners at heart, where determination trumps sweat and cramps.",
  },
  Walker: {
    image: four,
    content:
      "One foot after the other, one day after the other, smashing one goal after another. Walk away from a sedentary life, into one of endless possibilities, fit as fiddle. True walkers understand that no distance is too great to be surmounted. Here’s a badge for true walkers.",
  },
  Jogger: {
    image: five,
    content:
      "Jogging is your happy place, at dusk or dawn, with a dash of upbeat music or whatever suits your mood. Purple is royalty, even when mixed with sweat and dirt.",
  },
};

const NFT_PRICE = "3.50582";

export default function CheckoutForm() {
  const title = useParams().title as SelectedNFTTitle;
  const selectedNFTVideo = selectedNFT[title].image;
  const selectedNFTContent = selectedNFT[title].content;

  return (
    <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0  md:space-x-5 items-start md:items-center">
      <aside className="max-w-[500px] h-full">
        <video className="w-full rounded" autoPlay={true} loop={true}>
          <source src={selectedNFTVideo} type="video/mp4" />
        </video>
      </aside>
      <div className="space-y-5">
        <span>{title}</span>
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="text-white/70">{selectedNFTContent}</p>
        <Properties />
        <Counter selectedNFT={title.toLowerCase()} />
      </div>
    </div>
  );
}

function Counter({ selectedNFT }: { selectedNFT: string }) {
  const buyNFTCallback = useBuyNFTCallback();
  const [counter, setCounter] = useState(1);
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pendingTx, setTxStatus] = useState<boolean>(false);
  const { isConnected } = useWeb3Context();

  const nftIndexes = {
    active: 1,
    hydrated: 2,
    runner: 3,
    walker: 4,
    jogger: 5,
  };

  const onBuyHandle = async () => {
    if (counter < 1) return;

    const amount = counter * Number(NFT_PRICE);

    setTxStatus(true);

    try {
      const tx = await buyNFTCallback.handleBuy({
        amount,
        numTokens: counter,
        variant: nftIndexes[selectedNFT],
      });
      toast.info("NFT minted. Pending confirmation...");

      const receipt = await tx.wait();
      toast.success("Transaction successful");
      console.log("We will call dialog here:: ", receipt.hash);
      setTxStatus(false);
      setCounter(1);
    } catch (err: any) {
      toast.error(err);
      setTxStatus(false);
    }
  };

  if (!nftIndexes[selectedNFT]) {
    return <></>;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:space-x-5 w-full">
        <div className="space-y-1">
          <span>Price:</span>
          <h3 className="text-2xl font-semibold">
            {Number(NFT_PRICE) * counter}{" "}
            {BASE_CHAIN_CURRENCIES[CHAIN_ID].symbol}
          </h3>
        </div>
        <div className="text-center space-y-1 w-full md:w-auto">
          <span>Quantity:</span>
          <div className="space-x-2 w-full md:w-auto flex">
            <button
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
              disabled={counter < 1 || pendingTx}
              onMouseDown={() => setCounter((prev) => prev - 1)}
            >
              -
            </button>

            <div className="w-full md:w-auto px-16 bg-white/5 border border-white/10 py-2 rounded-lg">
              {counter}
            </div>

            <button
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
              disabled={pendingTx}
              onMouseDown={() => setCounter((prev) => prev + 1)}
            >
              {" "}
              +{" "}
            </button>
          </div>
        </div>
      </div>
      {isConnected ? (
        <Button
          disabled={counter < 1 || pendingTx}
          onClick={() => onBuyHandle()}
          className="w-full md:w-auto md:px-10"
        >
          Buy Now
        </Button>
      ) : (
        <ConnectWallet>
          <Button className="w-full md:w-auto md:px-10">Connect Wallet</Button>
        </ConnectWallet>
      )}
    </div>
  );
}

function Properties() {
  const title = useParams().title as SelectedNFTTitle;

  const properties = [
    {
      type: "Accessories",
      title: title === "Hydrated" ? "Fluid" : "Sole",
      description: "20% have this trait",
    },
  ];

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Properties</h1>
      <div className="w-full flex flex-col md:flew-row">
        {properties.map((property, index) => (
          <div
            key={index}
            className="flex items-center flex-col w-full md:max-w-[260px] rounded-xl border border-white/10 p-2 space-y-0.5"
          >
            <span className="text-primary-base">{property.type}</span>
            <h3 className="text-2xl font-medium">{property.title}</h3>
            <p className="text-white/70">{property.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
