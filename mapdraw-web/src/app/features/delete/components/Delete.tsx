import * as turf from "@turf/turf";
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useMapEvents, Rectangle } from "react-leaflet";
import { LatLngBounds, LatLng } from "leaflet";
import { Button, Typography, Stack } from "@mui/material";

import { activeToolAtom } from "@/app/features/interface/atoms";
import { PathsAtom } from "@/app/features/paths/atoms";
import { SitesAtom } from "@/app/features/sites/atoms";
import { StyledModal } from "@/app/features/interface/modals/StyledModal";
import { Trash2 } from "lucide-react";
import { Path } from "@/app/features/paths/types";
import { Site } from "@/app/features/sites/types";

export default function Delete() {
  const tool = useAtomValue(activeToolAtom);
  const [paths, setPaths] = useAtom(PathsAtom);
  const [sites, setSites] = useAtom(SitesAtom);

  const [selectionStart, setSelectionStart] = useState<LatLng | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<LatLng | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPathIndexes, setSelectedPathIndexes] = useState<number[]>([]);
  const [selectedSiteIndexes, setSelectedSiteIndexes] = useState<number[]>([]);

  const bounds =
    selectionStart && selectionEnd
      ? new LatLngBounds(selectionStart, selectionEnd)
      : null;

  const handleCancel = () => {
    setOpenModal(false);
    setSelectionStart(null);
    setSelectionEnd(null);
    setSelectedPathIndexes([]);
    setSelectedSiteIndexes([]);
  };

  const handleConfirm = () => {
    setPaths((current) =>
      current.filter((_, index) => !selectedPathIndexes.includes(index)),
    );
    setSites((current) =>
      current.filter((_, index) => !selectedSiteIndexes.includes(index)),
    );
    handleCancel();
  };

  const computeSelection = (bounds: LatLngBounds) => {
    const bboxPolygon = turf.bboxPolygon([
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ]);

    const pathIndexes = paths.reduce<number[]>((acc, path, index) => {
      if (path.points.length < 2) {
        return acc;
      }

      const line = turf.lineString(
        path.points.map((point) => [point.lng, point.lat]) as turf.Position[],
      );

      if (turf.booleanIntersects(line, bboxPolygon)) {
        acc.push(index);
      }

      return acc;
    }, []);

    const siteIndexes = sites.reduce<number[]>((acc, site, index) => {
      if (bounds.contains(site.position)) {
        acc.push(index);
      }
      return acc;
    }, []);

    return { pathIndexes, siteIndexes };
  };

  useMapEvents({
    mousedown(e) {
      if (tool !== "delete") return;

      setSelecting(true);
      setSelectionStart(e.latlng);
      setSelectionEnd(e.latlng);
      e.target.dragging.disable();
    },
    mousemove(e) {
      if (tool !== "delete" || !selecting || !selectionStart) return;

      setSelectionEnd(e.latlng);
    },
    mouseup(e) {
      if (tool !== "delete" || !selecting || !selectionStart) return;

      e.target.dragging.enable();
      setSelecting(false);

      const finalBounds = new LatLngBounds(selectionStart, e.latlng);
      const { pathIndexes, siteIndexes } = computeSelection(finalBounds);

      if (pathIndexes.length || siteIndexes.length) {
        setSelectedPathIndexes(pathIndexes);
        setSelectedSiteIndexes(siteIndexes);
        setSelectionEnd(e.latlng);
        setOpenModal(true);
      } else {
        handleCancel();
      }
    },
  });

  const selectedCount = selectedPathIndexes.length + selectedSiteIndexes.length;

  return (
    <>
      <StyledModal open={openModal} onClose={handleCancel}>
        <div>
          <Typography variant="h5" component="h2" fontWeight={700}>
            Confirm delete
          </Typography>
          <Typography sx={{ mt: 1 }}>
            {selectedCount > 0
              ? `Delete ${selectedCount} selected element${selectedCount === 1 ? "" : "s"}?`
              : "No elements selected."}
          </Typography>
          <Typography sx={{ mt: 1 }} color="text.secondary">
            {selectedPathIndexes.length} path
            {selectedPathIndexes.length === 1 ? "" : "s"},{" "}
            {selectedSiteIndexes.length} site
            {selectedSiteIndexes.length === 1 ? "" : "s"}
          </Typography>
        </div>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 4, justifyContent: "flex-end" }}
        >
          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Trash2 />}
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </Stack>
      </StyledModal>

      {bounds && (
        <Rectangle
          bounds={bounds}
          pathOptions={{ color: "red", dashArray: "5,5" }}
        />
      )}
    </>
  );
}
