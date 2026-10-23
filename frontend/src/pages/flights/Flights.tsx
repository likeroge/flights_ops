import { useEffect, useState } from "react";
import { api } from "../../api/api";
import type { Flight } from "../../domain/models/Flight";

export const Flights = () => {
  const [loading, setLoading] = useState(true);

  const [flights, setFlights] = useState<Flight[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get<Flight[]>("/flights");
      setFlights(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <h1>Flights</h1>
      <h3>Flights: {flights.length}</h3>

      {loading && <h3>Loading...</h3>}
      {flights.map((f) => (
        <div
          style={{
            border: "1px solid black",
            backgroundColor: f.status === "completed" ? "#00BB77" : "",
          }}
        >
          <p>{f.flight}</p>
          <p>
            {f.icao1} - {f.icao2}
          </p>
          <p>
            {f?.etd?.toString()} - {f?.eta?.toString()}
          </p>
          {/* <p>{f.iata1}</p>
          <p>{f.iata2}</p>
          <p>{f.icao1}</p>
          <p>{f.icao2}</p> */}
          <p>{f.status}</p>
          <p>RA-{f.tail}</p>
          {/* <p>{f?.udate?.toString()}</p> */}
        </div>
      ))}

      {/* <pre>{JSON.stringify(flights, null, 2)}</pre> */}
    </>
  );
};
