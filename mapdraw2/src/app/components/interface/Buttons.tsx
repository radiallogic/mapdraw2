import { PenLine, MapPin, Trash2, Move } from "lucide-react";
import { useAtom, atom } from "jotai";

import { ModeAtom, mode } from "@/app/globals";

export default function Buttons() {
  const [selected, setSelected] = useAtom(ModeAtom);

  console.log("buttons", selected);

  const size = 42;
  return (
    <div className="flex flex-row bg p-4 mr-16 gap-2 bg-gray-100  border-spacing-2 border-solid border-2 rounded opacity-75 text-slate-950 pointer-events-auto">
      <PenLine
        size={size}
        className={
          (selected == mode.DRAW ? "bg-cyan-400 " : " hover:bg-slate-400 ") +
          "rounded "
        }
        onClick={() => setSelected(mode.DRAW)}
      />

      <MapPin
        size={size}
        className={
          selected == mode.SITES
            ? "bg-cyan-400 rounded"
            : " hover:bg-slate-400 rounded"
        }
        onClick={() => setSelected(mode.SITES)}
      />

      <Trash2
        size={size}
        className={
          selected == mode.DELETE
            ? "bg-cyan-400 rounded"
            : " hover:bg-slate-400 rounded"
        }
        onClick={() => setSelected(mode.DELETE)}
      />

      <Move
        size={size}
        className={
          selected == mode.MOVE
            ? "bg-cyan-400 rounded"
            : " hover:bg-slate-400 rounded"
        }
        onClick={() => setSelected(mode.MOVE)}
      />
    </div>
  );
}
