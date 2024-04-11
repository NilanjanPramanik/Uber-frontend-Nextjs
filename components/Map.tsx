"use client";

import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet"

import { createControlComponent } from '@react-leaflet/core'

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import useTripSotre from "@/store/tripStore";
import { useCallback, useRef, useState } from "react";
import "leaflet-routing-machine";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src
})

const MyComponent = ({ center }: { center: L.LatLngExpression }) => {
  const map = useMap();
  map.setView(center);
  map.flyTo(center, 13)

  // map.flyTo(center)

  return null;
};

const Map = () => {
  const router = useRouter();
  const params = useSearchParams();
  const instance = useRef<null | L.Routing.Control>(null);

  const origin = useTripSotre((state) => state.origin);
  const destination = useTripSotre((state) => state.destination);

  const [isLoading, setLoading] = useState(false);

  // @ts-ignore
  let center: L.LatLngExpression = origin.lat && origin.lon && [origin.lat, origin.lon];

  const createRoutineMachineLayer = useCallback(() => {
    setLoading(true);
    let currentQuery: any = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    instance.current = L.Routing.control({
      waypoints: [
        L.latLng(origin.lat!, origin.lon!),
        L.latLng(destination.lat!, destination.lon!)
      ],
      // @ts-ignore
      lineOptions: {
        styles: [{ color: "#222222", weight: 4 }]
      },

      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false
    });

    instance.current.on('routesfound', function (e) {
      let summary = e.routes[0].summary;
      // console.log(summary)
      if (summary) {
        currentQuery.totalDistance = summary.totalDistance;

        const url = qs.stringifyUrl({
          url: '/',
          query: currentQuery
        })
        router.push(url);
      }
    })
    setLoading(false);

    return instance.current

  }, [origin, destination]);

  const RoutingMachine = createControlComponent(createRoutineMachineLayer);


  return (
  <>
    {center &&
      <MapContainer
        center={center || [51, -0.09]}
        zoom={center ? 13 : 5}
        scrollWheelZoom={true}
        zoomControl={false}
        bounceAtZoomLimits={true}
        touchZoom={true}
        className={`
          h-[60vh] rounded-lg z-10
        `}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {
          destination.lat && destination.lon && (

            <RoutingMachine />
          )
        }
        <MyComponent center={center} />
        {
          center && (

            <Marker
              position={center as L.LatLngExpression}
            >
              <Popup
                autoPan={true}
                keepInView={true}
                autoClose={true}
                closeOnClick={true}
              >
                <div className=" opacity-40">
                  <h3 className=" text-base font-semibold">{origin.name}</h3>
                  <p>{origin.description}</p>
                </div>
              </Popup>
            </Marker>
          )
        }
      </MapContainer>
    }
  </>
  )
}

export default Map