'use client';

import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSolidPackage } from "react-icons/bi";
import { FaCar } from "react-icons/fa";

const MobileNavbar = () => {
  return (
    <div 
      className="
        absolute 
        md:hidden 
        bg-transparent 
        flex 
        justify-between 
        w-[100vw] 
        z-50 
        top-0 
        left-0
        px-4
        py-2
      ">
      <Image
        src={'/images/logo.svg'}
        width={60}
        height={10}
        alt="logo"
        priority
      />

      <div className="md:hidden">
        <div className="bg-white rounded-full p-3 drop-shadow-sm">
          <AiOutlineMenu size={20} fontWeight={600} />
        </div>
      </div>
    </div>
  )
}

const Navbar = () => {
  return (
    <nav className="bg-transparent md:bg-white flex justify-between items-center md:px-12  md:border-b-4 relative border-slate-300/30">
      <MobileNavbar />

      {/* <div className=""> */}
      <div className="hidden md:flex justify-between gap-14 relative">
        <Image
          src={'/images/logo.svg'}
          width={80}
          height={10}
          alt="logo"
        />
        <div className="flex gap-4 items-center relative">
          <div className="flex gap-2 items-center border-b-4 border-black fixed h-[60px]">
            <FaCar
              size={22}
            />
            <span className="text-sm">Ride</span>
          </div>
          <div className="flex gap-2 items-center border-b-4 border-black fixed h-[60px] ml-20">
            <BiSolidPackage
              size={24}
            />
            <span className="text-sm">Package</span>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="hidden md:block">
        <div className="bg-white rounded-full p-3">
          <AiOutlineMenu size={20} fontWeight={600} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar