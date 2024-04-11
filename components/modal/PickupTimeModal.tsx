import { FaLocationCrosshairs } from "react-icons/fa6"
import Modal from "./Modal"
import { FaMapMarked } from "react-icons/fa"

interface ModalProps {
  isOpen: boolean
}

const PickupTimeModal: React.FC<ModalProps> = ({
  isOpen
}) => {
  return (
    <div className={`${!isOpen && "hidden"} border border-stone-100 rounded-lg shadow-md mt-[1px] bg-white`}>
    <div>
      <span className="text-sm font-semibold">Drop modal</span>
    </div>
    <hr className="opacity-40" />
    <div className="flex items-center gap-3 p-3">
      <FaLocationCrosshairs
        size={20}
        className="bg-black text-white h-10 w-10 p-3 rounded-full"
      />
      fetching : current location
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

export default PickupTimeModal