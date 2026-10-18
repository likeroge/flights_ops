use axum::{Json, http::StatusCode, response::IntoResponse};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};

#[derive(Serialize, Deserialize)]
pub enum ApiResponse {
    JsonReponse(Value),
    StrResponse(String),
}

impl IntoResponse for ApiResponse {
    fn into_response(self) -> axum::response::Response {
        match self {
            ApiResponse::JsonReponse(data) => (StatusCode::OK, Json(data)).into_response(),
            ApiResponse::StrResponse(str_data) => (StatusCode::OK, str_data).into_response(),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub enum ApiError {
    NotFound(String),
    BadRequest(String, Option<Value>),
    // Unauthorized,
    // Forbidden,
    // Conflict(String),
    // Internal(String),
}

impl IntoResponse for ApiError {
    fn into_response(self) -> axum::response::Response {
        match self {
            ApiError::NotFound(_) => (StatusCode::NOT_FOUND).into_response(),
            ApiError::BadRequest(_, val) => match val {
                Some(v) => (StatusCode::BAD_REQUEST, v.to_string()).into_response(),
                None => (StatusCode::BAD_REQUEST).into_response(),
            },
        }
    }
}

pub type ApiResult<ApiResponse> = Result<ApiResponse, ApiError>;
