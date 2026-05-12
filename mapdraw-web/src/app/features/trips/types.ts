export type Trip = {
  id: number;
  name: string;
  vehicle: string;
  location?: { lat: number; lng: number };
  userId: number;
};
