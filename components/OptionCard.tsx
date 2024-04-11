"use client"

import { useCallback, useEffect, useRef, useState } from "react";

import useDropModal from "@/hooks/useDropModal";
import usePickupModal from "@/hooks/usPickupModal";
import usePickupTimeModal from "@/hooks/uesPickupTimeModal";
import { PiFlagPennantFill } from "react-icons/pi";
import { MdMyLocation } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";
import useTripSotre from "@/store/tripStore";
import Input from "./Inputs/Input";
import CabInput from "./Inputs/CabInput";

enum OPTIONS {
  LOCATION = 0,
  VEHICLES,
}

interface OProps {
  option: number,
  setOption?: (value: number) => void
}


const OptionCard: React.FC<OProps> = ({option, setOption}) => {
  const pickupModal = usePickupModal()
  const dropModal = useDropModal();
  const pickupTimeModal = usePickupTimeModal();

  const origin = useTripSotre((state) => state.origin);
  const destination = useTripSotre((state) => state.destination);

  const [isDisable, setDisable] = useState(true);

  const uberCars = [
    {
      name:"Uber Go",
      img_src: "UberGo_v1.png",
      passesger: 4,
      description: "Affordable, compact rides",
      price_km: 22.57
    },{
      name:"Uber Go Non-AC",
      img_src: "UberX_Taxi.png",
      passesger: 4,
      description: "Affordable, cost-efficient rides",
      price_km: 19.69
    },{
      name:"Uber Moto",
      img_src: "Uber_Moto_India1.png",
      passesger: 4,
      description: "Affordable, motorcycle rides",
      price_km: 6.1
    },{
      name:"Premier",
      img_src: "package_UberComfort_new_2022.png",
      passesger: 4,
      description: "Comfortable sedans, top-quality drivers",
      price_km: 27.77
    },{
      name:"Go Sedan",
      img_src: "Select_v1.png",
      passesger: 4,
      description: "Affordable, sedan rides",
      price_km: 24.6
    }
  ];

  const handleChangeOptions = () => {
    if (option === OPTIONS.LOCATION) {
      setOption!(option + 1);
    }
  }

  const handleBackButton = () => {
    if (option !== OPTIONS.LOCATION) {
      setOption!(option - 1);
    }
  }

  const togglePickupModal = useCallback(() => {
    dropModal.onClose();
    pickupTimeModal.onClose();
    pickupModal.isOpen ? pickupModal.onClose() : pickupModal.onOpen()
  }, [pickupModal, dropModal, pickupTimeModal]);

  const toggleDropModal = useCallback(() => {
    pickupModal.onClose();
    pickupTimeModal.onClose();
    dropModal.isOpen ? dropModal.onClose() : dropModal.onOpen()
  }, [pickupModal, dropModal, pickupTimeModal]);

  const togglePickupTimeModal = useCallback(() => {
    pickupModal.onClose();
    dropModal.onClose();
    pickupTimeModal.isOpen ? pickupTimeModal.onClose() : pickupTimeModal.onOpen()
  }, [pickupModal, dropModal, pickupTimeModal]);

  useEffect(() => {
    setDisable(true)
    if (destination.lat && destination.lon) {
      setDisable(false);
    }
  }, [destination])


  let body = (
    <>
      <div onClick={togglePickupModal}>
        <Input
          isInput
          title={"Pickup location"}
          icon={MdMyLocation}
          onChange={() => { }}
          isOpen={pickupModal.isOpen}
          modal="pickup"
          data={`${origin.name}, ${origin.description}`}
        />
      </div>
      <div onClick={toggleDropModal}>
        <Input
          isInput
          title="Dropoff location"
          icon={PiFlagPennantFill}
          onChange={() => { }}
          isOpen={dropModal.isOpen}
          modal="drop"

        />
      </div>
      <div onClick={togglePickupTimeModal}>
        <Input
          title="Pickup now"
          icon={BsClockFill}
          onChange={() => { }}
          isOpen={pickupTimeModal.isOpen}
          modal="time"
        />
      </div>
    </>
  );

  // time = 17.96min distance = 13.5615km
  // uberapp- price

  if (option === OPTIONS.VEHICLES) {
    body = (
      <>{
        uberCars.map((car) => (
          <CabInput 
            key={car.name}
            title={car.name}
            img_src={car.img_src}
            passenger={car.passesger}
            description={car.description}
            price_km={car.price_km}
          />
        ))
      }</>
    )
  }


  return (
    <div
      className={`
        ${option === OPTIONS.LOCATION ? "h-[40vh]" : "h-[60vh]"}
        p-4
        overflow-y-hidden
        overflow-x-hidden
        scroll-smooth
        flex
        flex-col
        justify-between
        gap-2
        md:w-[300px]
        md:border rounded-lg
        lg:w-[380px]
      `}>
      <h3 className="hidden md:block text-xl font-semibold">Get a ride</h3>
      {/* <div className="flex flex-col flex-2 gap-4 md:gap-4"> */}
      <div className="flex flex-col gap-2 overflow-y-auto h-[100%] scroll-smooth">
        {body}
      </div>
      {/* </div> */}
      <div className="flex flex-row-reverse gap-4 z-40  w-full">
        <button
          disabled={isDisable}
          onClick={handleChangeOptions}
          className={`
              bg-black/85
              text-white 
              ${option === OPTIONS.LOCATION ? "w-full" : "w-1/2"}
              py-3 
              rounded-md
              ${isDisable ?
              'cursor-not-allowed opacity-60' : 'hover:cursor-pointer hover:bg-black/95'
            }
            `}>
          {option === OPTIONS.LOCATION && "Get Cab"}
          {option === OPTIONS.VEHICLES && "Book Cab"}
        </button>
        {
          option !== OPTIONS.LOCATION && (
            <button
              onClick={handleBackButton}
              className="
                bg-black/55
                hover:bg-black/65
                text-white 
                w-1/2 
                py-3 
                rounded-md
                ">
              Back
            </button>
          )
        }
      </div>
    </div>
  )
}

export default OptionCard