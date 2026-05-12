import * as turf from "@turf/turf";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useMapEvents, Rectangle } from "react-leaflet";
import { LatLngBounds, latLng, LatLng, PolyUtil } from "leaflet";
import { Modal, Box, Typography, Button } from "@mui/material";

import {
  ModeAtom,
  PathsAtom,
  SitesAtom,
  mode as modeEnum,
} from "@/app/globals";
import { Trash2 } from "lucide-react";

export default function Delete() {
  const [mode, setMode] = useAtom(ModeAtom);
  const [paths, setPaths] = useAtom(PathsAtom);
  const [sites, setSites] = useAtom(SitesAtom);

  const [latlngs, setLatLngs] = useState<LatLng[]>([]);
  const [bounds, setBounds] = useState<LatLngBounds>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setBounds(new LatLngBounds(latlngs[0], latlngs[latlngs.length - 1]));
  }, [latlngs]);

  function deleteInside() {}

  const map = useMapEvents({
    mousemove(e) {
      if (mode == modeEnum.DELETE) {
        const point = map.mouseEventToContainerPoint(e.originalEvent);
        const latLong = map.containerPointToLatLng(point);
        setLatLngs([...latlngs, latLong]);
      }
    },
    mouseup(e) {
      //e.originalEvent.preventDefault();

      map.dragging.enable();
      console.log("mouse up");

      if (mode == modeEnum.DELETE) {
        // confirm delete
        setOpenModal(true);
      }
    },
    mousedown(e) {
      //e.originalEvent.preventDefault();
      if (mode == modeEnum.DELETE) {
        map.dragging.disable();
      }
      console.log("mouse down");
    },
  });

  return (
    <>
      <Modal
        open={openModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>

          <Button variant="contained">Cancel</Button>
          <Button variant="outlined" startIcon={<Trash2 />}>
            Delete
          </Button>
        </Box>
      </Modal>

      {bounds && <Rectangle color="red" bounds={bounds} />}
    </>
  );
}
