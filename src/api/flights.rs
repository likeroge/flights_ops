use serde_json::json;

use crate::{
    db::get_connection,
    infrastructure::repos::flights_repo,
    responses::{ApiResponse, ApiResult},
};

// pub async fn list_flights(State(conection): State<Arc<Connection>>) -> ApiResult<ApiResponse> {
pub async fn list_flights() -> ApiResult<ApiResponse> {
    match flights_repo::get_flights() {
        Ok(flights) => Ok(ApiResponse::JsonReponse(json!(flights))),
        Err(_) => todo!(),
    }
}
