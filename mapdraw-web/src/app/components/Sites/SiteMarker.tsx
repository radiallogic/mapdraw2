import { ReactElement, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Site } from "./types";

interface SiteMarkerProps {
  site: Site;
}

export default function SiteMarker(props: SiteMarkerProps) {
  const [site, seSite] = useState<Site>(props.site);
  const [edit, setEdit] = useState<boolean>(false);

  let content: ReactElement = <></>;
  if (edit == false) {
    if (site) {
      content = (
        <div
          onClick={() => {
            setEdit(true);
          }}
          dangerouslySetInnerHTML={{ __html: site.content }}
        />
      );
    } else {
      content = (
        <button
          onClick={() => {
            setEdit(true);
          }}
        >
          "Click here to edit and add content"
        </button>
      );
    }
  } else {
    if (site) {
      content = (
        <ReactQuill
          theme="snow"
          value={site.content}
          onChange={(content) => {
            // seSite(content);
          }}
        />
      );
    }
  }

  return (
    <>
      {site && (
        <Marker
          position={site.position}
          draggable={true}
          bubblingMouseEvents={false}
          eventHandlers={{
            mouseup: (event) => {},
            popupclose: () => {
              setEdit(false);
            },
          }}
        >
          <Popup>{content}</Popup>
        </Marker>
      )}
    </>
  );
}
