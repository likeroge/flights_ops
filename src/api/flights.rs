use serde_json::json;

use crate::{
    infrastructure::repos::flights_repo,
    responses::{ApiError, ApiResponse, ApiResult},
};

// pub async fn list_flights(State(conection): State<Arc<Connection>>) -> ApiResult<ApiResponse> {
pub async fn list_flights() -> ApiResult<ApiResponse> {
    match flights_repo::get_flights() {
        Ok(flights) => Ok(ApiResponse::JsonReponse(json!(flights))),
        Err(err) => Err(ApiError::NotFound(err.to_string())),
    }
}
