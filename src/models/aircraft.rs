use serde::{Deserialize, Serialize};

use crate::models::flight::Flight;

#[derive(Debug, Serialize, Deserialize, PartialEq, PartialOrd)]
pub struct FlightsByAircraft {
    pub tail: String,
    pub flights: Vec<Flight>,
}
