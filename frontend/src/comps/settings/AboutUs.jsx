import { BsRocketTakeoff } from "react-icons/bs";
import { restmate_version } from "../../utils/utils";
const AboutUs = () => {
  return (
    <div className="px-6 pb-4 relative">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="flex justify-start items-end h-full w-full text-txtsec opacity-30">
          <BsRocketTakeoff
            size="160"
            className="hover:text-accent transition-all  duration-300 ease-in-out transform  hover:translate-x-[20px] hover:translate-y-[-20px]"
          />
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-lit font-bold text-2xl tracking-wider">Restmate</p>
        <p className="text-xs text-txtsec">version {restmate_version}</p>
        <p className="text-xs text-txtsec mt-2 tracking-wider">
          Restmate is a blazing fast, lightweight REST API client built for developers who need speed and efficiency without compromising system performance.
          Simplify your API testing and integration with ease.
        </p>
        <p className="text-xs text-txtsec mt-2 tracking-wider">Help us keep it blazing fast with your support!</p>
        <p className="text-xs text-txtsec mt-1 tracking-wider">
          Buy us a coffee on{" "}
          <a href="https://patreon.com/aunjaffery" target="_blank" className="text-accent hover:text-blue-400 hover:underline">
            Patreon
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
