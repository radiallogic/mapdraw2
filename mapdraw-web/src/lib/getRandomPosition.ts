export type LatLng = {
  lat: number;
  lng: number;
};

export function getRandomPosition(): LatLng {
  let n1 = Math.random();
  let n2 = Math.random();
  let pos = [n1 * (90 - -90) + -90, n2 * (80 - -180) + -180];

  return { lat: pos[0], lng: pos[1] };
}
