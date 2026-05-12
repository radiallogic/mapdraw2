import { useAtomValue } from "jotai";
import { activeToolAtom, toolbarCollapsedAtom } from "./state";

export function DistancePanel({ distanceKm }: { distanceKm?: number }) {
  const tool = useAtomValue(activeToolAtom);
  const collapsed = useAtomValue(toolbarCollapsedAtom);

  if (collapsed || tool !== "measure") return null;

  return (
    <div className="distancePanel">
      {distanceKm ? (
        <div>{distanceKm.toFixed(2)} km</div>
      ) : (
        <div>Click points to measure</div>
      )}
    </div>
  );
}
