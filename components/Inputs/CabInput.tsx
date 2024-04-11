'use client';

import Image from "next/image"
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import qs from 'query-string';

interface IParams {
  title: string
  img_src: string
  passenger: number,
  description: string
  price_km: number
}

const CabInput: React.FC<IParams> = ({
  title,
  img_src,
  passenger,
  description,
  price_km,
}) => {
  const params = useSearchParams();
  const [isSelected, setSelected] = useState(false);
  const paramsData = qs.parse(params.toString());

  const onClick = () => {
    setSelected(!isSelected)
  }
  const totalDistance = paramsData.totalDistance;
  // @ts-ignore
  const totalPrice = Math.round(totalDistance/1000 * price_km);
  console.log(qs.parse(params.toString()));

  return (
    <div 
      onClick={onClick}
      className={`
         cursor-pointer
        flex justify-between border-[3px] rounded-xl 
        ${isSelected ? "border-black" : "border-none"} 
        items-center
      `}>
      <div className="flex gap-4 items-center">
        <Image
          src={`/images/${img_src}`}
          width={90}
          height={20}
          alt="vehicle icon"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
            <div className="flex items-center text-sm text-stone-500 gap-1">
              <BsPersonFill size={16} />
              {passenger}
            </div>
          </div>
          <span className="text-sm font-light text-stone-600">
            5 mins away • 6:48 PM
          </span>
          <span className="text-sm font-light text-stone-600">
            {description}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end pr-2 md:pr-4">
        <div className="font-semibold">₹ {totalPrice}</div>
        <div className="text-sm font-light text-stone-500 line-through">{totalPrice + 40}</div>
      </div>
    </div>
  )
}

export default CabInput
