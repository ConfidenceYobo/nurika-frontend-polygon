import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <div className="cta-bg flex flex-col justify-center items-center h-[30vh] md:h-[50vh] space-y-5 w-full px-5">
      <h1 className="text-4xl md:text-5xl  font-bold">Let's start minting</h1>
      <p className="text-white/50">
        Invest and manage all your NFTs at one place.
      </p>
          <Button className="w-full md:w-auto space-x-2" onClick={() => navigate('/mint')}>
            <span>Start Minting</span>
            <ArrowUpRight />
          </Button>

    </div>
  );
}
