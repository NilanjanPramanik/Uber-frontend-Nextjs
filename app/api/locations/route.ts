import { NextResponse } from "next/server";
import NodeGeocoder  from 'node-geocoder';

export async function POST(req: Request) {
  const body = await req.json();
  const data = body.location;

  const options: any = {
    provider: 'google',
  
    // Optional depending on the providers
    // fetch: "POST",
    apiKey: process.env.OPEN_CAGE_API, // for Mapquest, OpenCage, APlace, Google Premier
    formatter: null // 'gpx', 'string', ...
  };

  const geocoder = NodeGeocoder(options)

  const res = await geocoder.reverse({ lat: 45.767, lon: 4.833 });

  console.log(res)

  return NextResponse.json("hello")
}