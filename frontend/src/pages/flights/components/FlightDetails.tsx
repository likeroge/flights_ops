import type { Flight } from "../../../domain/models/Flight"

export const FlightDetails = ({selectedFlight}: {selectedFlight:Flight|undefined}) => {
  if (selectedFlight) {
    return (


      <div className="flight_card">
        <div className="flight_card-number-block">
          <div className="flight_card-header">Flight Number</div>
          <div className="flight_card-value">{ selectedFlight.flight}</div>
        </div>

        <div className="flight_card-row">
          <div>
            <div className="flight_card-header">Departure</div>
            <div className="flight_card-value">{selectedFlight.icao1} { selectedFlight.etd.toString().slice(-8,-3) } UTC</div>
          </div>
          <div>
            <div className="flight_card-header">Arrival</div>
            <div className="flight_card-value">{selectedFlight.icao2} { selectedFlight.eta.toString().slice(-8,-3) } UTC</div>
          </div>
        </div>
      </div>

    )
 }

}
