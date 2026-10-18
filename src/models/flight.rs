use oracle::RowValue;
use serde::{Deserialize, Serialize};

#[derive(RowValue, Debug, Serialize, Deserialize)]
pub struct Entity {
    tail: Option<String>,
    flight: Option<String>,
    iata1: Option<String>,
    iata2: Option<String>,
}
