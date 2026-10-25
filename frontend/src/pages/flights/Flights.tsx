import { useEffect, useState,  } from "react";
import { api } from "../../api/api";
import type {  Flight, FlightsByAircraft } from "../../domain/models/Flight";
import { FlightTimeline } from "./components/FlightTimeLine";
import { FlightDetails } from "./components/FlightDetails";
import { tailSort } from "../../utils/sortFuncs";

export const Flights = () => {
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState<Flight>();



  const [schedule, setSchedule] = useState<FlightsByAircraft[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get<FlightsByAircraft[]>("/flights");
      setSchedule(data.sort(tailSort));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading && <h3>Loading...</h3> }
      <FlightTimeline selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} schedule={schedule} />
      <FlightDetails selectedFlight={selectedFlight} />
    </>
  );
};
