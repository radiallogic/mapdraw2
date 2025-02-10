import { LatLng } from "leaflet";

export function getRandomPosition() {
  let n1 = Math.random();
  let n2 = Math.random();
  let pos = [n1 * (90 - -90) + -90, n2 * (80 - -180) + -180];

  // ( ( n1 * (90 - -90)  + -90).toFixed(3) * 1 ) ,
  // ( ( n2 * (80 - -180) + -180).toFixed(3) * 1 ) ,

  const ll = new LatLng(pos[0], pos[1]);
  console.log(" rand ll", ll);
  return ll;
}
