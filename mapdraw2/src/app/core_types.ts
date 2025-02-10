type site = {
  location: { lat: number; lng: number };
  text: string;
};

type trip = {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  userId: number;
};

type path = {
  id: number;
  paths: [];
  tripId: number;
};
