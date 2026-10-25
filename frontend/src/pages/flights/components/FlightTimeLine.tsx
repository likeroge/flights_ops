import { useMemo, type SetStateAction } from "react";
import type { Flight, FlightsByAircraft } from "../../../domain/models/Flight";
import { FlightRow } from "./FlightRow";
import './FlightsPageStyles.css'
import { TimeRuler } from "./TimeRuler";


export const FlightTimeline = ({ schedule, setSelectedFlight,selectedFlight }:{schedule: FlightsByAircraft[], setSelectedFlight: (id:SetStateAction<Flight | undefined>)=>void, selectedFlight: Flight|undefined}) => {
  const now = useMemo(()=>new Date(), []); // Текущее время в UTC
  // const now = new Date();
  // const rangeStart = /* ... расчет начала */;
  // const rangeEnd = /* ... расчет конца */;

  // Определение границ отображения (например, +/- 2 часа от текущего времени)
  const rangeStart = useMemo(() => {
    const d = new Date(now);
    d.setUTCHours(now.getUTCHours() - 5);
    d.setUTCMinutes(0);
    d.setUTCSeconds(0);
    return d;
  }, [now]);

  const rangeEnd = useMemo(() => {
    const d = new Date(now);
    d.setUTCHours(now.getUTCHours() + 24);
    d.setUTCMinutes(0);
    return d;
  }, [now]);

  return (
    <div className="ops-timeline-wrapper">
      {/* 1. Шкала времени сверху */}
      <TimeRuler rangeStart={rangeStart} rangeEnd={rangeEnd} timeOffsetMinutes={60} />

      {/* 2. Контейнер с бортами */}
      <div className="ops-timeline-body">
        {schedule.map(aircraft => (
          <FlightRow
            setSelectedFlight={setSelectedFlight}
            key={aircraft.tail}
            tail={aircraft.tail}
            flights={aircraft.flights}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            now={now}
            selectedFlight={selectedFlight}
          />
        ))}
      </div>
    </div>
  );
};
