import active from "@/assets/mint-page/checkout/active.png";
import hydrated from "@/assets/mint-page/checkout/hydrated.png";
import runner from "@/assets/mint-page/checkout/runner.png";
import walker from "@/assets/mint-page/checkout/walker.png";
import jogger from "@/assets/mint-page/checkout/jogger.png";
import { SelectedNFTTitle } from "./showcase";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SuccessDialog } from "../dialog/success";
import { toast } from "sonner";
import { BASE_CHAIN_CURRENCIES, CHAIN_ID } from "@/constants/network";
import { useBuyNFTCallback } from "@/helpers/calls/useBuyNFTCallback";

const NFT_PRICE = '3.50582';

const selectedNFT = {
  Active: active,
  Hydrated: hydrated,
  Runner: runner,
  Walker: walker,
  Jogger: jogger,
};

export default function CheckoutForm() {
  const title = useParams().title as SelectedNFTTitle;
  const selectedNFTImage = selectedNFT[title];

  return (
    <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0  md:space-x-5 items-start md:items-center">
      <aside className="max-w-[500px]">
        <img src={selectedNFTImage} alt="" />
      </aside>
      <div className="space-y-5">
        <span>{title} #312</span>
        <h1 className="text-5xl font-bold">{title} #312</h1>
        <p className="text-white/70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sed
          rerum recusandae nemo tenetur voluptatum eveniet totam repellendus nam
          commodi. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Lorem ipsum dolor sit amet.
        </p>
        <Properties />
        <Counter selectedNFT={title.toLowerCase()} />
      </div>
    </div>
  );
}

function Counter({ selectedNFT }: {selectedNFT: string}) {
  const buyNFTCallback = useBuyNFTCallback();
  const [counter, setCounter] = useState(1);
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pendingTx, setTxStatus] = useState<boolean>(false);

  const nftIndexes = {
    active: 1,
    hydrated: 2,
    runner: 3,
    walker: 4,
    jogger: 5,
  }

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
      toast.success("NFT minted. Pending confirmation...");

      const receipt = await tx.wait();

      console.log("We will call dialog here:: ", receipt.hash);
      setTxStatus(false);
      setCounter(1);
    } catch (err: any) {
      toast.error(err);
      setTxStatus(false);
    }
  }

  if(!nftIndexes[selectedNFT]) {
    return <></>
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:space-x-5 w-full">
        <div className="space-y-1">
          <span>Price:</span>
          <h3 className="text-2xl font-semibold">{Number(NFT_PRICE) * counter} {BASE_CHAIN_CURRENCIES[CHAIN_ID].symbol}</h3>
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
      <Button disabled={counter < 1 || pendingTx} onClick={
          () => onBuyHandle()
        } className="w-full md:w-auto md:px-10">Buy Now</Button>
    </div>
  );
}

function Properties() {
  const properties = [
    {
      type: "Accessories",
      title: "Sole",
      description: "33% have this trait",
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
