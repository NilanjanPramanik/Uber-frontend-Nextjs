"use client"

import { useCallback, useEffect, useMemo, useState } from "react";

import Map from "@/components/Map";
import dynamic from "next/dynamic";
import data from '@/public/data.json'
import getUserLocation from "@/utils/getUserLocation";
import useTripSotre, { IDataParms } from "@/store/tripStore";
import axios from "axios";
import OptionCard from "@/components/OptionCard";

enum OPTIONS {
  LOCATION = 0,
  VEHICLES,
}

interface LParams {
  lat: number
  lon: number
}

interface OProps {
  option: number,
  setOption?: (value: number) => void
}

export default function Home() {

  const Map = useMemo(() => dynamic(() => import('../components/Map'), {
    ssr: false
  }), []);

  const setOriginData = useTripSotre((state) => state.setOriginData);

  const [option, setOption] = useState(OPTIONS.LOCATION)
  
  const getGeocodeDate = useCallback(async(location: LParams) => {

    await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${location.lat}+${location.lon}&key=${process.env.NEXT_PUBLIC_OPEN_CAGE_KEY}&pretty=1`)
      .then((res) => {
        const data: any = res.data.results[0];
        setOriginData({
          origin: {
            name: data?.components?.suburb as string,
            description: data?.formatted as string,
            lat: data?.geometry?.lat as number,
            lon: data?.geometry?.lng as number
          }
        })
      });
  }, [setOriginData]);

  useEffect(() => {
    getUserLocation()
      .then((data: any) => {
        const location = {
          lat: data.latitude as number,
          lon: data.longitude as number,
        }
        getGeocodeDate(location)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [getGeocodeDate]);


  return (
    <main className="md:p-8 h-[100vh]">
      <section
        className="
          
          md:grid 
          md:grid-cols-5 
          md:gap-2 
          lg:grid-cols-7 
          overflow-x-hidden
          lg:pr-6
        ">
        <div className={`${option === OPTIONS.LOCATION ? "h-[60vh]" : "h-[40vh]"} bg-stone-400/30 md:col-span-3 lg:col-span-5 overflow-hidden`}>
          <Map />
        </div>
        <OptionCard option={option} setOption={setOption}/>
      </section>
    </main>
  );
}
