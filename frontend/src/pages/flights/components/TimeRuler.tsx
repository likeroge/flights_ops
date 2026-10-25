// Вспомогательная функция для форматирования времени в UTC
const formatUTC = (date: Date) => {

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
};

// Функция для получения даты в формате DD MMM (UTC)
const formatUTCDate = (date:Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getUTCDate())} ${months[date.getUTCMonth()]}`;
};

export const TimeRuler = ({ rangeStart, rangeEnd, timeOffsetMinutes = 0 }: {
  rangeStart: Date, rangeEnd:Date, timeOffsetMinutes: number
}) => {
  // Применяем смещение, если шкала должна показывать не UTC, а время другого пояса
  const effectiveStart = new Date(rangeStart.getTime() + timeOffsetMinutes * 60000);
  const effectiveEnd = new Date(rangeEnd.getTime() + timeOffsetMinutes * 60000);

  const totalDuration = (effectiveEnd.getTime() - effectiveStart.getTime()) / 60000; // в минутах

  // Генерируем метки. Шаг в 60 минут (1 час) для наглядности.
  const ticks = [];
  const current = new Date(effectiveStart);

  // Сбрасываем минуты до 00 для ровной сетки
  current.setUTCMinutes(0);
  current.setUTCSeconds(0);
  current.setUTCMilliseconds(0);

  // Если после сброса минут время стало меньше начала диапазона, прыгаем на час вперед
  if (current < effectiveStart) {
    current.setUTCHours(current.getUTCHours() + 1);
  }

  while (current <= effectiveEnd) {
    const minFromStart = (current.getTime() - effectiveStart.getTime()) / 60000;
    const leftPercent = (minFromStart / totalDuration) * 100;

    ticks.push({
      time: formatUTC(current),
      date: formatUTCDate(current),
      left: `${leftPercent}%`,
      isMidnight: current.getUTCHours() === 0
    });

    current.setUTCHours(current.getUTCHours() + 1);
  }

  return (
    <div className="time-ruler">
      {ticks.map((tick, idx) => (
        <div
          key={idx}
          className={`tick ${tick.isMidnight ? 'date-divider' : ''}`}
          style={{ left: tick.left }}
        >
          <div className="tick-line"></div>
          <div className="tick-label">
            <div className="time">{tick.time}</div>
            {tick.isMidnight && <div className="date">{tick.date}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};
