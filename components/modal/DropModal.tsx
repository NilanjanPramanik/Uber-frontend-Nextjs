import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6"
import Modal from "./Modal"
import { FaMapMarked } from "react-icons/fa"
import { AiFillStar } from "react-icons/ai"

interface ModalProps {
  isOpen: boolean
}

const DropModal: React.FC<ModalProps> = ({
  isOpen
}) => {
  return (
    <div 
      className={`
        ${!isOpen && "hidden"} 
        border 
        border-stone-100 
        rounded-lg 
        shadow-md 
        mt-[1px]
        bg-white`
      }>
      <div 
        className="
        text-sm 
        font-semibold 
        bg-stone-200/40 
        p-2 
        w-fit 
        rounded-full 
        flex 
        items-center 
        gap-2 
        m-4
      ">
        <AiFillStar />
        <span>Saved places</span>
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

export default DropModal