use oracle::RowValue;
use serde::{Deserialize, Serialize};

#[derive(RowValue, Debug, Serialize, Deserialize, PartialEq, PartialOrd, Clone)]
pub struct Flight {
    pub id: Option<u64>,
    pub tail: Option<String>,
    pub flight: Option<String>,
    pub icao1: Option<String>,
    pub icao2: Option<String>,
    pub iata1: Option<String>,
    pub iata2: Option<String>,
    pub status: Option<String>,
    pub etd: Option<String>,
    pub eta: Option<String>,
    pub udate: Option<String>,
    pub etd_unix: Option<String>,
    pub eta_unix: Option<String>,
    pub udate_unix: Option<String>,
}
