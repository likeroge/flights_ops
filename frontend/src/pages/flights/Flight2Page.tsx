import { useEffect, useState } from "react";
import { api } from "../../api/api";
import FlightTimeline from "./FlightTimeLine";

// const prepareSchedule = (aircrafts, flights) => {
//   // 1. Индексируем ВС
//   const acMap = new Map();
//   aircrafts.forEach((ac) => {
//     const key = ac.tailNumber.trim().toUpperCase();
//     acMap.set(key, { ...ac, flights: [] });
//   });

//   // 2. Распределяем рейсы
//   flights.forEach((f) => {
//     const key = f.tail.trim().toUpperCase();
//     if (acMap.has(key)) {
//       acMap.get(key).flights.push(f);
//     }
//   });

//   // 3. Сортируем и считаем длительность
//   const result = Array.from(acMap.values()).map((ac) => ({
//     ...ac,
//     flights: ac.flights
//       .map((f) => ({
//         ...f,
//         depMs: new Date(f.dep).getTime(),
//         arrMs: new Date(f.arr).getTime(),
//         durationMs: new Date(f.arr).getTime() - new Date(f.dep).getTime(),
//       }))
//       .sort((a, b) => a.depMs - b.depMs),
//   }));

//   return result;
// };

export const Flight2Page = () => {
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/flights2");
      setSchedule(data);
    })();
  }, []);
  return <FlightTimeline schedule1={schedule} />;
};
