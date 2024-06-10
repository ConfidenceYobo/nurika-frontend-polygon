import one from "@/assets/landing-page/showcase/art01.png";
import two from "@/assets/landing-page/showcase/art02.png";
import three from "@/assets/landing-page/showcase/art03.png";
import four from "@/assets/landing-page/showcase/art04.png";
import five from "@/assets/landing-page/showcase/art05.png";
import oneMobile from "@/assets/landing-page/showcase/art01-mobile.png";
import twoMobile from "@/assets/landing-page/showcase/art02-mobile.png";
import threeMobile from "@/assets/landing-page/showcase/art03-mobile.png";
import fourMobile from "@/assets/landing-page/showcase/art04-mobile.png";
import fiveMobile from "@/assets/landing-page/showcase/art05-mobile.png";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type SelectedNFTTitle =
  | "Active"
  | "Hydrated"
  | "Runner"
  | "Walker"
  | "Jogger";

interface Item {
  title: SelectedNFTTitle;
  image: string;
  imageMobile: string;
  price: string;
}

const items: Item[] = [
  {
    title: "Active",
    image: one,
    imageMobile: oneMobile,
    price: "3.50582ETH",
  },
  {
    title: "Hydrated",
    image: two,
    imageMobile: twoMobile,
    price: "3.50582ETH",
  },
  {
    title: "Runner",
    image: three,
    imageMobile: threeMobile,
    price: "3.50582ETH",
  },
  {
    title: "Walker",
    image: four,
    imageMobile: fourMobile,
    price: "3.50582ETH",
  },
  {
    title: "Jogger",
    image: five,
    imageMobile: fiveMobile,
    price: "3.50582ETH",
  },
];

export default function ShowCase() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="text-start space-y-10 md:space-y-16">
      <h1 className="text-2xl md:text-4xl font-semibold">
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
          >
            <img
              src={isDesktop ? item.image : item.imageMobile}
              className="rounded-2xl h-full max-w-[300px]"
            />
            <span className="text-xl font-bold">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
