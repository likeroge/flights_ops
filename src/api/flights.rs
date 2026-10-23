use std::{collections::HashMap, ops::Deref};

use serde_json::json;

use crate::{
    infrastructure::repos::flights_repo,
    models::{aircraft::FlightsByAircraft, flight::Flight},
    responses::{ApiError, ApiResponse, ApiResult},
};

// pub async fn list_flights(State(conection): State<Arc<Connection>>) -> ApiResult<ApiResponse> {
pub async fn list_flights() -> ApiResult<ApiResponse> {
    match flights_repo::get_flights() {
        Ok(flights) => Ok(ApiResponse::JsonReponse(json!(flights))),
        Err(err) => Err(ApiError::NotFound(err.to_string())),
    }
}

pub async fn list_flights_by_aircraft() -> ApiResult<ApiResponse> {
    match flights_repo::get_flights() {
        Ok(flights) => {
            // let mut aircraft_with_flights: Vec<FlightsByAircraft> = Vec::with_capacity(10);

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

        // Ok(flights) => {
        //     let mut aircraft_with_flights: Vec<FlightsByAircraft> = Vec::with_capacity(10);
        //     flights.iter().for_each(|flight| {
        //         if aircraft_with_flights
        //             .iter_mut()
        //             .any(|ac| ac.tail == flight.tail.clone().unwrap_or(String::new()))
        //         {
        //             aircraft_with_flights
        //                 .iter_mut()
        //                 .find(|f| f.tail == flight.tail.clone().unwrap_or(String::new()))
        //                 .expect("Not found")
        //                 .flights
        //                 .push(flight.clone());
        //         } else {
        //             let new_ac = FlightsByAircraft {
        //                 tail: flight.clone().tail.expect("Not found tail"),
        //                 flights: vec![flight.clone()],
        //             };
        //             aircraft_with_flights.push(new_ac);
        //         }
        //     });
        //     Ok(ApiResponse::JsonReponse(json!(aircraft_with_flights)))
        // }
        Err(err) => Err(ApiError::NotFound(err.to_string())),
    }
}
