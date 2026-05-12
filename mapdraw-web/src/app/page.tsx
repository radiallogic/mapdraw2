"use client";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
// import Link from "next/link";
import React from "react";
import { ToolShortcuts } from "./components/Tools/ToolShortcuts";

import { ToolBar } from "./components/Tools/ToolBar";

export default function Home() {
  const Map = dynamic(() => import("@/app/components/map/Map"), {
    loading: () => <p>Loading Map</p>,
    ssr: false,
  });

  return (
    <SessionProvider>
      {/* <Save /> */}
      <ToolShortcuts />
      <div className="flex flex-row w-screen h-screen z-50 absolute pointer-events-none">
        <ToolBar />

        <div className="flex flex-col flex-grow z-50 h-screen pointer-events-none"></div>
        <div className="flex flex-col flex-grow items-end pointer-events-none">
          {/* <Buttons /> */}

          {/* <ToolBar /> */}
        </div>
      </div>
      <Map />
    </SessionProvider>
  );
}
