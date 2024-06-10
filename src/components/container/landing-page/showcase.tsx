import one from "@/assets/landing-page/showcase/art01.png";
import two from "@/assets/landing-page/showcase/art02.png";
import three from "@/assets/landing-page/showcase/art03.png";
import four from "@/assets/landing-page/showcase/art04.png";
import oneMobile from "@/assets/landing-page/showcase/art01-mobile.png";
import twoMobile from "@/assets/landing-page/showcase/art02-mobile.png";
import threeMobile from "@/assets/landing-page/showcase/art03-mobile.png";
import fourMobile from "@/assets/landing-page/showcase/art04-mobile.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "Active",
    image: one,
    imageMobile: oneMobile,
  },
  {
    title: "Hydrated",
    image: two,
    imageMobile: twoMobile,
  },
  {
    title: "Runner",
    image: three,
    imageMobile: threeMobile,
  },
  {
    title: "Walker",
    image: four,
    imageMobile: fourMobile,
  },
];

function isEven(number: number) {
  return number % 2 === 0;
}

export default function ShowCase() {
  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="text-center space-y-16">
      <h1 className="text-2xl md:text-4xl font-semibold">
        The amazing NFT art of the Nuriverse
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-start gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "bg-white/5 w-full sm:w-[300px] p-5 rounded-3xl flex flex-col justify-center items-center space-y-3 mx-auto",
              !isEven(index + 1) ? "sm:mt-10" : ""
            )}
          >
            <img
              src={isDesktop ? item.image : item.imageMobile}
              className="rounded-2xl h-full max-w-[300px]"
            />
            <span className="text-xl font-bold">{item.title}</span>
          </div>
        ))}
      </div>

      <Button className="w-full sm:w-auto" onClick={() => navigate('/mint')}>Start Minting</Button>
    </div>
  );
}
