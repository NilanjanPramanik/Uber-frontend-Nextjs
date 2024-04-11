import { NextResponse } from "next/server";
import geocoder from 'local-reverse-geocoder'

export async function POST(req: Request) {
  const body = await req.json();
  const data = body.location;
  const { lat, long } = data;

  // console.log(lat, long)

  geocoder.init(
    {
      citiesFileOverride: 'cities5000', // one of 'cities500', 'cities1000', 'cities5000', 'cities15000' or null to keep the default city database (cities1000)
      load: {
        admin1: true,
        admin2: false,
        admin3And4: false,
        alternateNames: false,
      },
    },
    function () {
      const point = { latitude: lat, longitude: long}
      geocoder.lookUp(point, 1, function (_err, res) {
        console.log(JSON.stringify(res, null, 2));

        // return new NextResponse(JSON.stringify(res, null, 2))
        return NextResponse.json("hello")
      });
    }
  );

  return NextResponse.json("success");
}
