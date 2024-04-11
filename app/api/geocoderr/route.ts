import geocoder from 'local-reverse-geocoder';
import { NextResponse } from "next/server";

let geoData: any;
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    geocoder.init(
      {
        citiesFileOverride: 'cities500', // one of 'cities500', 'cities1000', 'cities5000', 'cities15000' or null to keep the default city database (cities1000)
        load: {
          admin1: true,
          admin2: false,
          admin3And4: false,
          alternateNames: false,
        },
      },

      async function () {
        let point = [
          {
            latitude: body.location.lat,
            longitude: body.location.long
          }
        ];
        try {
          await geocoder.lookUp( point, 
            function (err, res) {
              if (res) {
                return new Response(JSON.stringify(res, null, 2), { status: 200 });
              }
            // if (res) {
            //   geoData = JSON.stringify(res, null, 2);

            //   console.log(geoData)
            //   return NextResponse.json(res);
            // }

            return NextResponse.json({ error: "Geocoder Error", err }, { status: 500 });
          });;

        } catch (error: any) {

        }

        geocoder.lookUp(point, function (err, res) {
          if (res) {
            return new Response(JSON.stringify(res, null, 2), {
              status: 200, // Success
              headers: {
                "Content-Type": "application/json",
              },
            });
          }
          // if (res) {
          //   geoData = JSON.stringify(res, null, 2);

          //   console.log(geoData)
          //   return NextResponse.json(res);
          // }

          return NextResponse.json({ error: "Geocoder Error", err }, { status: 500 });
        });
      }
    )

    return NextResponse.json("Something went wrong!", { status: 500 })


  } catch (error: any) {
    return NextResponse.json("Geocoder error", { status: 500 });
  }
}