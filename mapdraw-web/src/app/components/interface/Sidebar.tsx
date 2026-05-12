"use client";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import * as Popover from "@radix-ui/react-popover";

import Footer from "./Footer";

import {
  ChevronsUpDown,
  PanelLeftClose,
  Telescope,
  Plus,
  GalleryVertical,
  X,
} from "lucide-react";
import AddTrip from "./AddTrip";

function MenuItem({ children }: { children: ReactElement }) {
  return (
    <li className=" hover:bg-gray-200 p-2 m-2 rounded flex flex-row w-full">
      <>{children}</>
    </li>
  );
}

export default function Sidebar() {
  const [addTripModal, setAddTripModal] = useState(false);

  return (
    <>
      <AddTrip openModal={addTripModal} />
      <div className="flex flex-col w-80 h-screen gap-2 p-2 bg-gray-100  border-spacing-2 border-solid border-2 rounded opacity-75 pointer-events-auto text-slate-950	">
        <div data-sidebar="header" className="flex flex-col gap-2 p-2">
          <ul
            data-sidebar="menu"
            className="flex w-full min-w-0 flex-col gap-1"
          >
            {/* <MenuItem>
            <div>
             <PanelLeftOpen />
              <PanelLeftClose />
            </div>
          </MenuItem> */}
            <li data-sidebar="menu-item" className="">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ">
                    <div className="flex size-8 items-center justify-center rounded-lg">
                      <ChevronsUpDown />
                    </div>
                    <div className="grid flex-1 text-left text-sm ">
                      <span className="truncate font-semibold">
                        Long way down
                      </span>
                      <span className="truncate text-xs">Motorbike</span>
                    </div>
                    <ChevronsUpDown />
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content className="z-50 w-80" side="right">
                    <div className="bg-gray-100 p-4 rounded opacity-75 pointer-events-auto text-slate-950">
                      <div className="font-semibold text-xs text-muted-foreground">
                        Teams
                      </div>
                      <div
                        role="menuitem"
                        className="relative flex cursor-default select-none items-center rounded-sm text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 gap-2 p-2"
                      >
                        <div className="flex size-6 items-center justify-center rounded-sm border">
                          <GalleryVertical />
                        </div>
                        Acme Inc
                        <span className="ml-auto text-xs tracking-widest opacity-60">
                          ⌘1
                        </span>
                      </div>

                      <div
                        role="separator"
                        aria-orientation="horizontal"
                        className="-mx-1 my-1 h-px bg-muted"
                      ></div>
                      <div
                        role="menuitem"
                        className="relative flex cursor-default select-none items-center rounded-sm text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&amp;>svg]:size-4 [&amp;>svg]:shrink-0 gap-2 p-2"
                        onClick={() => {
                          console.log("clicked");

                          setAddTripModal(true);
                        }}
                      >
                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                          <Plus />
                        </div>
                        <div className="font-medium text-muted-foreground">
                          Add trip
                        </div>
                      </div>
                    </div>
                    <Popover.Close
                      className="absolute right-[5px] top-[5px] inline-flex size-[25px] cursor-default items-center justify-center rounded-full text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
                      aria-label="Close"
                    >
                      <X />
                    </Popover.Close>
                    <Popover.Arrow className="fill-white" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </li>
          </ul>
        </div>

        <div data-sidebar="content" className="flex-1 items-end">
          <ul>
            <MenuItem>
              <>
                <Link href="/about" className="flex items-center space-x-4">
                  <Telescope /> <span className="p-2">Examples</span>
                </Link>
              </>
            </MenuItem>

            <MenuItem>
              <Link href="/about" className="flex items-center space-x-4">
                <Telescope /> <span className="p-2">About</span>
              </Link>
            </MenuItem>
          </ul>
        </div>
        <Footer />
      </div>
    </>
  );
}
