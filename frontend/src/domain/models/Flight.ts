export type Flight = {
  eta: Date;
  etd: Date;
  flight: string;
  iata1?: string;
  iata2?: string;
  icao1?: string;
  icao2?: string;
  status?: string;
  tail?: string;
  udate: Date;
};
