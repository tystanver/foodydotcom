import Image from "next/image";

import HEROIMAGE from "../app/assests/Hero.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between  mt-5">
      <h1 className="text-2xl lg:text-5xl font-bold text-red-500">
        WELCOME FOODY DOT COM
      </h1>

      <div className="mt-10 lg:mt-20 relative">
        <Image className="h-[300px]" src={HEROIMAGE} alt="" />

        <div className="absolute top-[20%] left-[20%] lg:left-[35%] ">
          <p className="text-xl lg:text-3xl font-bold text-white mb-10">LET`S START ORDERING</p>
          <Link className=" px-16 py-3 mt-4 bg-[#E4002B] text-white rounded-lg ml-10 lg:ml-24 font-bold" href='/dashboard'>Place Order</Link>
        </div>
      </div>
    </main>
  );
}
