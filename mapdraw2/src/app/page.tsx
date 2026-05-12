"use client";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
// import Link from "next/link";
import React from "react";
import Sidebar from "./components/interface/Sidebar";
import Buttons from "./components/interface/Buttons";
import Save from "./components/Save";

import { PathsAtom, SitesAtom, PositionAtom, ZoomAtom } from "./globals";
import { useEffect } from "react";

export default function Home() {
  const Map = dynamic(() => import("@/app/components/map/Map"), {
    loading: () => <p>Loading Map</p>,
    ssr: false,
  });

  return (
    <SessionProvider>
      {/* <Save /> */}
      <div className="flex flex-row w-screen h-screen z-50 absolute pointer-events-none">
        <Sidebar />

        <div className="flex flex-col flex-grow z-50 h-screen pointer-events-none"></div>
        <div className="flex flex-col flex-grow items-end pointer-events-none">
          <Buttons />
        </div>
      </div>
      <Map />
    </SessionProvider>
  );
}
