import active from "@/assets/landing-page/showcase/active.png";
import hydrate from "@/assets/landing-page/showcase/hydrate.png";
import runner from "@/assets/landing-page/showcase/runner.png";
import walker from "@/assets/landing-page/showcase/walker.png";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "Active",
    image: active,
  },
  {
    title: "Hydrated",
    image: hydrate,
  },
  {
    title: "Runner",
    image: runner,
  },
  {
    title: "Walker",
    image: walker,
  },
];

function isEven(number: number) {
  return number % 2 === 0;
}

export default function ShowCase() {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-16">
      <h1 className="text-2xl md:text-4xl font-semibold" data-aos="fade-up">
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
            data-aos={!isEven(index + 1) ? "fade-up-right" : "fade-up-left"}
          >
            <img
              src={item.image}
              alt=""
              className="rounded-2xl max-w-[250px] h-[300px] object-cover"
            />
            <span className="text-xl font-bold">{item.title}</span>
          </div>
        ))}
      </div>

      <Button className="w-full sm:w-auto" onClick={() => navigate("/mint")}>
        Start Minting
      </Button>
    </div>
  );
}
