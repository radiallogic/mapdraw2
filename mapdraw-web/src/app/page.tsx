"use client";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
// import Link from "next/link";
import React from "react";
import { ToolShortcuts } from "./features/interface/components/ToolShortcuts";

import { MenuBar } from "./features/interface/components/MenuBar";

export default function Home() {
  const Map = dynamic(() => import("@/app/features/map/components/Map"), {
    loading: () => <p>Loading Map</p>,
    ssr: false,
  });

  return (
    <SessionProvider>
      {/* <Save /> */}
      <ToolShortcuts />
      <div className="flex flex-row w-screen h-screen z-50 absolute pointer-events-none">
        <MenuBar />

        <div className="flex flex-col flex-grow z-50 h-screen pointer-events-none"></div>
        <div className="flex flex-col flex-grow items-end pointer-events-none">
          {/* <Buttons /> */}

          {/* <MenuBar /> */}
        </div>
      </div>
      <Map />
    </SessionProvider>
  );
}
