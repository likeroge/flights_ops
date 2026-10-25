// FlightTimeline.js
import { format, differenceInMinutes, isBefore, isAfter } from 'date-fns';
import type { Flight } from '../../../domain/models/Flight';
import './FlightsPageStyles.css'
import type { SetStateAction } from 'react';

export const FlightBar = ({ flight,  rangeStart, totalDuration, now,setSelectedFlight, selectedFlight }:{flight: Flight, rangeStart: Date, totalDuration:number, now:Date, setSelectedFlight: (id:SetStateAction<Flight | undefined>)=>void, selectedFlight: Flight|undefined }) => {
  // Расчет координат в процентах
  const startMin = differenceInMinutes(flight.etd, rangeStart);
  const endMin = differenceInMinutes(flight.eta, rangeStart);

  const left = (startMin / totalDuration) * 100;
  const width = ((endMin - startMin) / totalDuration) * 100;

  // Определение статуса рейса относительно текущего времени
  let status = 'future';
  if (isBefore(flight.etd, now) && isAfter(flight.eta, now)) {
    status = 'in-progress';
  } else if (isBefore(flight.eta, now)) {
    status = 'completed';
  }

  return (
    <div
      onClick={() => setSelectedFlight(flight)}
      onTouchStart={() => setSelectedFlight(flight)}
      className={`flight-bar ${status}`}
      style={{
        //left+3 / width -3 - for presicion
        left: `${left}%`,
        width: `${width}%`,
        border: `${selectedFlight?.id === flight?.id?'2px solid #212121':'none'}`
      }}
      title={`${flight.flight} | ${format(flight.etd, 'HH:mm')} - ${format(flight.eta, 'HH:mm')} (${flight.icao1} -> ${flight.icao2})`}
    >
      <div className="flight-info">
          {flight.flight}
      </div>
    </div>
  );
};
