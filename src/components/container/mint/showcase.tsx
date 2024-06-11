import one from "@/assets/mint-page/showcase/active.mp4";
import two from "@/assets/mint-page/showcase/hydrate.mp4";
import three from "@/assets/mint-page/showcase/runner.mp4";
import four from "@/assets/mint-page/showcase/walker.mp4";
import five from "@/assets/mint-page/showcase/joggers.mp4";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type SelectedNFTTitle =
  | "Active"
  | "Hydrated"
  | "Runner"
  | "Walker"
  | "Jogger";

const items = [
  {
    title: "Active",
    video: one,
    price: "0.003771ETH",
  },
  {
    title: "Hydrated",
    video: two,
    price: "0.003771ETH",
  },
  {
    title: "Runner",
    video: three,
    price: "0.003771ETH",
  },
  {
    title: "Walker",
    video: four,
    price: "0.003771ETH",
  },
  {
    title: "Jogger",
    video: five,
    price: "0.003771ETH",
  },
];

export default function ShowCase() {
  return (
    <div className="text-start space-y-10 md:space-y-16">
      <h1 className="text-2xl md:text-4xl font-semibold" data-aos="fade-down">
        The amazing NFT art of the Nuriverse
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-start gap-5">
        {items.map((item, index) => (
          <Link
            to={`/mint/${item.title}`}
            key={index}
            onMouseDown={() => {
              toast.success(`${item.title} selected successfully`);
            }}
            className={cn(
              "bg-white/5 w-full sm:w-[300px] p-5 rounded-3xl flex flex-col justify-center items-center space-y-3 mx-auto"
            )}
            data-aos="fade-up"
          >
            <video className="w-full rounded" autoPlay={true} loop={true}>
              <source src={item.video} type="video/mp4" />
            </video>
            <span className="text-xl font-bold">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
