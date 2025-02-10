import { useMapEvents } from "react-leaflet";

import { atom, useAtom } from "jotai";

import { PositionAtom, BoundsAtom } from "@/app/globals";

export default function Position() {
  const [position, setPosition] = useAtom(PositionAtom);
  const [bounds, setBounds] = useAtom(BoundsAtom);

  const map = useMapEvents({
    dragend: (e) => {
      setPosition(e.target.getCenter());
      setBounds(e.target.getBounds());
    },
  });

  return <> </>;
}
