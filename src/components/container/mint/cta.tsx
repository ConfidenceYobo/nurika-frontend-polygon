import telegram from "@/assets/template/social-handles/telegram.svg";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CTA() {
  return (
    <div className="bg-tertiary-base text-white space-y-5 h-[30vh] md:h-[40vh] flex flex-col items-center justify-center rounded-2xl">
      <img src={telegram} alt="Telegram Icon" className="w-16" />
      <h1 className="text-2xl md:text-4xl font-semibold">Join Our Community</h1>
      <a
        href="https://t.me/nurikahealth"
        className={cn(buttonVariants({ variant: "secondary" }))}
      >
        Join the Nurika Tribe
      </a>
    </div>
  );
}
