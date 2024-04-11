import { create } from 'zustand';

export type IDataParms = {
  name: string
  description: string
  lat: null | number
  lon: null | number
}

export type ITripData = {
  totalDistance: null | number;
  totalTime: null | number;
}

export type TripStoreParams = {
  origin: IDataParms;
  destination: IDataParms;
  tripData: ITripData;
  setOriginData: (value: any) => void;
  setDestinationData: (value: any) => void;
  setTripData: (value: any) => void;
}

const useTripSotre = create<TripStoreParams>((set) => ({
  origin: {
    name: "",
    description: "",
    lat: null,
    lon: null
  },

  destination: {
    name: "",
    description: "",
    lat: null,
    lon: null
  },

  tripData: {
    totalDistance: null,
    totalTime: null
  },

  setOriginData: (originData: any) => {
    set((state) => ({
      origin: originData.origin
    }))
  },

  setDestinationData: (destinationData: any) => {
    set((state) => ({
      destination: destinationData.destination
    }))
  },

  setTripData: (tripData: ITripData) => {
    set((state) => ({
      tripData: tripData
    }))
  }
}))

export default useTripSotre