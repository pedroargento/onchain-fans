// components/Navbar.tsx
"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Navbar = ({title = "OnChain Fans"}) => {
  return (
    <nav className="w-full flex justify-between p-4 navbar fixed bg-white z-20 ">
      <Link href="/">
        <h1 className="text-xl chelsea-market-regular title">{title}</h1>
      </Link>
      <div className="flex">
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center gap-2 hover:bg-gray-100 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="/upload"
        >
          Create
        </a>
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center gap-2 hover:bg-gray-100 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mr-5"
          href="/my-creations"
        >
          My Creations
        </a>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
