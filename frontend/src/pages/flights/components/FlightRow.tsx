import { useMemo, type SetStateAction } from "react";
import { FlightBar } from "./FlightBar";
import { differenceInMinutes } from "date-fns";
import type { Flight } from "../../../domain/models/Flight";
import './FlightsPageStyles.css'
// import { differenceInHours } from "date-fns/fp";


export const FlightRow = ({ tail, flights, rangeStart, rangeEnd, now, setSelectedFlight ,selectedFlight}:{tail:string, flights: Flight[], rangeStart: Date, rangeEnd: Date, now: Date, setSelectedFlight: (id:SetStateAction<Flight | undefined>)=>void, selectedFlight: Flight|undefined}) => {
  const totalDuration = useMemo(() => differenceInMinutes(rangeEnd, rangeStart), [rangeStart, rangeEnd]);

  // Сортировка рейсов внутри борта по времени вылета
  // const sortedFlights = [...flights].sort((a, b) =>  a?.etd?.getTime() - b?.etd?.getTime());

  return (
    <div className="flight-row">
      <div className="tail-number">{tail}</div>
      <div className="timeline-container">
        {flights.map(flight => (
          <FlightBar
            key={`${tail}-${flight.flight}-${flight.etd}`}
            flight={flight}
            rangeStart={rangeStart}
            totalDuration={totalDuration}
            now={now}
            setSelectedFlight={setSelectedFlight}
            selectedFlight={selectedFlight}
          />
        ))}
        {/* Вертикальная линия текущего времени */}
        <div
          className="now-line"
          // style={{ left: `${differenceInMinutes(now, rangeStart) / totalDuration * 100}%` }}
          // 120 minutes
          style={{ left: `${60/ totalDuration * 100}%` }}
        />
      </div>
    </div>
  );
};
