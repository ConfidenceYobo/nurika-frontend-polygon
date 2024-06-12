import facebook from "@/assets/template/social-handles/facebook.svg";
import instagram from "@/assets/template/social-handles/instagram.svg";
import twitter from "@/assets/template/social-handles/twitter.svg";
import telegram from "@/assets/template/social-handles/telegram.svg";

export default function Footer() {
  const socialMediaHandles = [
    {
      link: "https://www.facebook.com/nurikahealth",
      icon: facebook,
    },
    {
      link: "https://twitter.com/nurikahealth",
      icon: twitter,
    },
    {
      link: "https://instagram.com/nurikahealth",
      icon: instagram,
    },
    {
      link: "https://t.me/nurikahealth",
      icon: telegram,
    },
  ];

  return (
    <footer className="text-center space-y-5 px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-10">
      <div className="max-w-[250px] mx-auto flex justify-between">
        {socialMediaHandles.map((handle, index) => (
          <a href={handle.link} target="_blank" key={index} rel="noreferrer">
            <div className="flex justify-center items-center p-3 rounded-full bg-primary-base">
              <img src={handle.icon} alt="" className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
      <p>Copyright © 2024 Nuriverse All Rights Reserved.</p>
    </footer>
  );
}
