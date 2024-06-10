import avatars from "@/assets/landing-page/avatars.svg";
import avatarsPNG from "@/assets/landing-page/avatars.png";
import heroImg from "@/assets/landing-page/hero.svg";
import wallet from "@/assets/template/wallet.svg";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex items-center justify-between md:h-[100vh] hero-bg px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20">
      <div className="bg-cover space-y-7 h-full w-full flex justify-center items-start flex-col">
        <h1 className="text-4xl md:text-5xl lg:text-6xl  xl:text-7xl font-bold">
          Welcome to <br /> the Nuriverse
        </h1>
        <p className="max-w-sm text-xl font-normal text-white/70">
          A collection of 10000 NFTs curated with the utmost attention to
          details, giving you all the feels of the Nuriverse
        </p>
        
            <Button className="space-x-2 w-full md:w-auto" onClick={() => navigate('/mint')}>
              <img src={wallet} alt="wallet" className="w-4 h-4" />{" "}
              <span>Start Minting</span>
            </Button>
        
        <div className="flex items-center space-x-3">
          <img
            src={isDesktop ? avatars : avatarsPNG}
            alt="Avatars"
            className="w-24 md:w-32"
          />
          <div>
            <h3 className="font-bold text-2xl sm:text-3xl">60k+</h3>
            <p className="text-gray-500 text-sm">Community members</p>
          </div>
        </div>
      </div>

      <aside className="hidden md:block">
        <img
          src={heroImg}
          alt="Hero Image"
          className="max-w-[400px] lg:max-w-[550px]"
        />
      </aside>
    </div>
  );
}
