'use client'

import { FaLocationCrosshairs } from "react-icons/fa6"
import { FaMapMarked } from "react-icons/fa"
import { AiFillStar } from "react-icons/ai"

interface ModalProps {
  isOpen: boolean
  data?: string
}

const PickupModal: React.FC<ModalProps> = ({
  isOpen,
  data
}) => {
  const newData = data?.split(',');
  let address;
  if (newData) {
    address = newData[0]+', '+newData[1]+', '+newData[2];
  }

  
  return (
    <div className={`${!isOpen && "hidden"} border border-stone-100 rounded-lg shadow-md mt-[1px] bg-white`}>
      <div className="text-sm font-semibold bg-stone-200/40 p-2 w-fit rounded-full flex items-center gap-2 m-4">
        <AiFillStar />
        <span>Saved places</span>
      </div>
      <hr className="opacity-40" />
      <div className="flex md:grid grid-rows-1 items-center gap-3 p-3 text-sm">
        <FaLocationCrosshairs
          size={20}
          className="bg-black text-white h-10 w-10 p-3 rounded-full"
        />
        {
          data ? (address) : ("Fetching your location...")
        }
      </div>
      <hr className=" opacity-40" />
      <div className="flex gap-3 items-center p-3">
        <FaMapMarked
          size={20}
          className="bg-stone-200 text-black h-10 w-10 p-3 rounded-full"
        />
        <span>Set location on map</span>
      </div>
    </div>
  )
}

export default PickupModal