use std::collections::HashMap;

use serde_json::json;

use crate::{
    infrastructure::repos::flights_repo,
    models::{aircraft::FlightsByAircraft, flight::Flight},
    responses::{ApiError, ApiResponse, ApiResult},
};

pub async fn list_flights_by_aircraft() -> ApiResult<ApiResponse> {
    match flights_repo::get_flights() {
        Ok(flights) => {
            let mut by_tail: HashMap<String, Vec<Flight>> = HashMap::new();

            for flight in flights {
                match flight.tail.as_deref() {
                    Some(tail) if !tail.is_empty() => {
                        by_tail.entry(tail.to_owned()).or_default().push(flight);
                    }
                    _ => (),
                }
            }
            let aircraft_with_flights: Vec<FlightsByAircraft> = by_tail
                .into_iter()
                .map(|(tail, fls)| FlightsByAircraft { tail, flights: fls })
                .collect();
            Ok(ApiResponse::JsonReponse(json!(aircraft_with_flights)))
        }

        Err(err) => Err(ApiError::NotFound(err.to_string())),
    }
}
