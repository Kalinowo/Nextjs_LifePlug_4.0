import Image from "next/image";
import ReZero from "@/public/ReZeroBackground.png";
import Entrance from "@/components/home/Entrance";
import { fetchUniqueYears } from "@/lib/data";

export default async function Home() {
  return (
    <>
      <div className="relative flex justify-center items-center max-w-7xl h-screen mx-auto">
        <div className="absolute border-4 border-black z-[-1]">
          <Image src={ReZero} alt="Entrance Background" />
        </div>
        <Entrance />
      </div>
    </>
  );
}
