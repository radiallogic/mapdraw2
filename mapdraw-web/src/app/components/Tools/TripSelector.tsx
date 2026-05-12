import * as Popover from "@radix-ui/react-popover";
import { ChevronsUpDown } from "lucide-react";
import { useAtom } from "jotai";
import { tripsCollapsedAtom } from "./state";
import usePostTrip from "@/app/hooks/usePostTrip";
import { useSession } from "next-auth/react";

type Trip = { name: string; vehicle: string };

const trips: Trip[] = [
  { name: "Long way down", vehicle: "Motorbike" },
  { name: "Short loop", vehicle: "Car" },
];

export function TripSelector() {
  const [collapsed, setCollapsed] = useAtom(tripsCollapsedAtom);
  const { data: session } = useSession();
  const { data, loading, error, postTrip } = usePostTrip();

  const addTrip = () => {
    const trip = {
      id: 0,
      name: "Gentle Hop",
      vehicle: "Car",
      userId: 0,
    };

    const value = postTrip(trip);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex w-full items-center gap-2 p-2 rounded hover:bg-gray-100">
          <ChevronsUpDown />
          {collapsed && (
            <div className="flex flex-col text-left text-sm truncate">
              <span className="font-semibold">{trips[0].name}</span>
              <span className="text-xs text-gray-600">{trips[0].vehicle}</span>
            </div>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="z-50 w-64 p-2 bg-white rounded shadow-lg">
          {trips.map((trip) => (
            <div
              key={trip.name}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              <div className="w-6 h-6 border rounded" />
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{trip.name}</span>
                <span className="text-xs text-gray-600">{trip.vehicle}</span>
              </div>
            </div>
          ))}

          <div
            key="add"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              console.log("add");
              addTrip();
            }}
          >
            <span className="material-symbols-outlined text-2xl">add </span>
            <div className="flex flex-col text-sm">
              <span className="text-xs text-gray-600">Add Trip</span>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
