use oracle::RowValue;
use serde::{Deserialize, Serialize};

#[derive(RowValue, Debug, Serialize, Deserialize)]
pub struct Entity {
    tail: Option<String>,
    flight: Option<String>,
    icao1: Option<String>,
    icao2: Option<String>,
    iata1: Option<String>,
    iata2: Option<String>,
    status: Option<String>,
    etd: Option<String>,
    eta: Option<String>,
    udate: Option<String>,
    etd_unix: Option<String>,
    eta_unix: Option<String>,
    udate_unix: Option<String>,
}
