export const toolRegistry = {
  draw: {
    icon: "polyline",
    label: "Draw line",
    cursor: "crosshair",
    key: "d",
  },

  add: {
    icon: "add_location_alt",
    label: "Add point",
    cursor: "copy",
    key: "a",
  },

  move: {
    icon: "open_with",
    label: "Move",
    cursor: "grab",
    key: "m",
  },

  delete: {
    icon: "delete",
    label: "Delete",
    cursor: "not-allowed",
    key: "x",
  },

  measure: {
    icon: "straighten",
    label: "Measure distance",
    cursor: "crosshair",
    key: "s",
  },
} as const;
