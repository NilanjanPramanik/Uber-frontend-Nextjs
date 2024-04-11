'use server'

import geocoder from 'local-reverse-geocoder'
import NodeGeocoder from 'node-geocoder'

interface IProps {
  lat: number
  long: number
}

export default async function getReverseCoordinate(location: IProps) {

  const options:any = {
    provider: 'google',
  
    // Optional depending on the providers

    apiKey: '68b68223e5864d48ab2a2954495a23c1', // for Mapquest, OpenCage, APlace, Google Premier
    formatter: null // 'gpx', 'string', ...
  };

  const geocoder = NodeGeocoder(options);

  const res = await geocoder.geocode('29 champs elysée paris');


  console.log(res)
}