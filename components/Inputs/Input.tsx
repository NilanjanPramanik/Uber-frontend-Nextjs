"use client";

import { IconType } from "react-icons";
import { FaAngleDown } from "react-icons/fa";
import Modal from "../modal/Modal";
import useLocationModal from "@/hooks/usPickupModal";
import { useCallback, useState } from "react";
import PickupModal from "../modal/PickupModal";
import DropModal from "../modal/DropModal";
import PickupTimeModal from "../modal/PickupTimeModal";
import axios from "axios";
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from '@geoapify/react-geocoder-autocomplete';
import useTripSotre from "@/store/tripStore";


interface IParams {
  title: string
  icon: IconType
  onChange: (value: string) => void
  isInput?: boolean
  isOpen: boolean
  modal: string
  data?: string
}

const Input: React.FC<IParams> = ({
  title,
  icon: Icon,
  onChange,
  isInput,
  isOpen,
  modal,
  data
}) => {
  const setOriginData = useTripSotre((state) => state.setOriginData);
  const setDestinationData = useTripSotre((state) => state.setDestinationData);

  const origin = useTripSotre((state) => state.origin);
  const destination = useTripSotre((state) => state.destination);

  const onPlaceSelect = (place: any) => {
    // console.log(place?.properties)
    // setTripData(place?.properties)
    if (modal === "pickup") {
      setOriginData({
        origin: {
          name: place?.properties.address_line1,
          description: place?.properties.address_line2,
          lat: place?.properties.lat,
          lon: place?.properties.lon
        }
      })
    }

    if (modal === "drop") {
      setDestinationData({
        destination: {
          name: place?.properties.address_line1,
          description: place?.properties.address_line2,
          lat: place?.properties.lat,
          lon: place?.properties.lon
        }
      })
    }
  }

  // console.log( destination)

  return (
    <>
      <div
        className="flex flex-col items-center relative"
      >
        <Icon size={20} className="absolute left-4 top-5" />
        {
          isInput ? (
            <div
              className="
                bg-stone-200/40 
                rounded-md 
                outline-2 
                py-3 
                pl-12 
                w-full 
                focus:bg-white 
                placeholder:font-[300] 
                placeholder:text-black"
            >
              <GeoapifyContext
                apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_KEY}>
                <GeoapifyGeocoderAutocomplete
                  placeholder={title}
                  debounceDelay={200}
                  placeSelect={onPlaceSelect}
                  type={"city"}
                  filterByCountryCode={["in"]}
                  skipIcons={true}
                  allowNonVerifiedStreet={true}
                />
              </GeoapifyContext>
            </div>
          ) : (
            <div
              className="flex justify-between items-center pr-4 bg-stone-200/40 rounded-md outline-2 py-[18px] pl-12 w-full focus:bg-white cursor-pointer select-none hover:bg-stone-200"
            >
              {title}
              <span><FaAngleDown /></span>
            </div>
          )
        }
        {
          modal === "pickup" && (
              <div className="w-full">
                <PickupModal isOpen={isOpen} data={data} />
              </div>
          )
        }
        {
          modal === "drop" && (
            <div className="w-full">
              <DropModal isOpen={isOpen} />
            </div>
          )
        }
        {
          modal === "time" && (
            <div className="w-full">
              <PickupTimeModal isOpen={isOpen} />
            </div>
          )
        }
      </div>

    </>
  )
}

export default Input