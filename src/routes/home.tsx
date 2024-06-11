import Hero from "@/components/container/landing-page/hero";
import ShowCase from "@/components/container/landing-page/showcase";
import CTA from "@/components/container/landing-page/cta";
import Story from "@/components/container/landing-page/story";

export default function HomePage() {
  return (
    <main className="py-10 md:pt-0 md:pb-10 overflow-x-hidden">
      <Hero />
      <div className="px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pb-20 pt-32 md:pt-0 space-y-40">
        <ShowCase />
        <Story />
      </div>
      <CTA />
    </main>
  );
}
