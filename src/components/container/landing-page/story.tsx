import two from "@/assets/landing-page/showcase/hydrate.png";

export default function Story() {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-start md:items-center space-y-5 md:space-y-0">
      <div
        className="p-5 rounded-3xl bg-white/5 w-full sm:w-auto max-w-[300px]"
        data-aos="fade-right"
      >
        <img src={two} alt="" className="w-full h-full rounded-md" />
      </div>

      <div data-aos="fade-left">
        <span className="uppercase text-primary-base font-bold">
          The Nuriverse story
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold pt-5">
          Create your own NFT
        </h1>
        <p className="max-w-md text-xl font-normal text-white/70 pt-7">
          The Nuriverse NFT series represents our users' commitment to their
          wellness journey with Nurika, a health and wellness product that has
          helped hundreds of thousands of people all over the world. Each NFT
          serves as a digital badge of honor, providing ownership and access to
          exclusive benefits within the Nurika ecosystem. The NFTs also grant
          access to the Nurika token allocation, unlocking premium features and
          resources. The Nuriverse NFT series symbolizes hope, resilience, and
          community, empowering our users to prioritize their well-being and
          thrive.
        </p>
      </div>
    </div>
  );
}
