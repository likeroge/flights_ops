import React from "react";
import type { FlightsByAircraft } from "../../domain/models/Flight";

const FlightTimeline = ({ schedule1 }: { schedule1: FlightsByAircraft[] }) => {
  if (!schedule1 || schedule1.length === 0) return <div>Нет данных</div>;

  // Находим глобальное начало и конец для расчёта координат
  let globalStart = Infinity;
  let globalEnd = -Infinity;

  const schedule = schedule1.map((ac) => ({
    ...ac,
    id: "ssttasdsad",
    flights: ac.flights.map((f) => ({
      ...f,
      depMs: new Date(f.etd).getTime(),
      arrMs: new Date(f.eta).getTime(),
      durationMs: new Date(f.eta).getTime() - new Date(f.etd).getTime(),
    })),
  }));

  schedule.forEach((ac) => {
    ac.flights.forEach((f) => {
      if (new Date(f.etd).getTime() < globalStart)
        globalStart = new Date(f.etd).getTime();
      if (new Date(f.eta).getTime() > globalEnd)
        globalEnd = new Date(f.eta).getTime();
    });
  });

  console.log(schedule);

  // Масштаб: 1 пиксель = X минут.
  // Подбирай экспериментально: 10-15 мин/пиксель — хороший баланс.
  const minutesPerPixel = 1;
  const msPerPixel = minutesPerPixel * 60 * 1000;

  // Вычисляем общую ширину временной шкалы
  const totalDurationMs = globalEnd - globalStart;
  const timelineWidthPx = Math.ceil(totalDurationMs / msPerPixel);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getPosAndSize = (flight: any) => {
    const leftPx = (flight.depMs - globalStart) / msPerPixel;
    const widthPx = flight.durationMs / msPerPixel;
    // Минимальная ширина, чтобы короткие рейсы были видны
    const finalWidth = Math.max(widthPx, 2);
    return { left: leftPx, width: finalWidth };
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Расписание (многодневный вид)</h2>

      {/* Контейнер с горизонтальной прокруткой */}
      <div
        style={{
          overflowX: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Заголовок-линейка (опционально) */}
        <div
          style={{ height: "30px", marginBottom: "15px", position: "relative" }}
        >
          <div style={{ position: "absolute", left: "0", top: "0" }}>
            {new Date(globalStart).toLocaleDateString()}
          </div>
          <div style={{ position: "absolute", right: "0", top: "0" }}>
            {new Date(globalEnd).toLocaleDateString()}
          </div>
        </div>

        {schedule.map((ac) => (
          <div key={ac.tail} style={{ display: "flex", marginBottom: "15px" }}>
            {/* Фиксированная колонка: имя самолёта */}
            <div
              style={{
                width: "200px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "15px",
                borderRight: "2px solid #ddd",
                position: "sticky",
                left: 0,
                zIndex: 10,
                backgroundColor: "#fff",
              }}
            >
              <strong>{ac.tail}</strong>
            </div>

            {/* Временная шкала с рейсами */}
            <div
              style={{
                position: "relative",
                height: "60px",
                minWidth: `${timelineWidthPx}px`, // Гарантируем ширину шкалы
                flexGrow: 1,
                border: "1px dashed #e0e0e0",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              {ac.flights.map((flight, idx) => {
                const { left, width } = getPosAndSize(flight);
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: `${left}px`,
                      width: `${width}px`,
                      height: "40px",
                      top: "10px",
                      backgroundColor:
                        flight.status === "delayed" ? "#F59E0B" : "#3B82F6",
                      color: "white",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textAlign: "center",
                    }}
                    title={`${flight.flight}: ${new Date(flight.etd).toLocaleTimeString()} - ${new Date(flight.eta).toLocaleTimeString()}`}
                  >
                    {flight.flight}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightTimeline;
