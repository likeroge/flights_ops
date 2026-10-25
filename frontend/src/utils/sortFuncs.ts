import type { FlightsByAircraft } from "../domain/models/Flight";

export const tailSort = (a:FlightsByAircraft, b:FlightsByAircraft) => {
  if (Number(a.tail) > Number(b.tail)) return -1;
  if (Number(a.tail) < Number(b.tail)) return 1;
  return 0;
}
