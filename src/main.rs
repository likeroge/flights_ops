use axum::{
    Router,
    http::{
        HeaderValue, Method,
        header::{ACCEPT, ACCESS_CONTROL_ALLOW_ORIGIN, AUTHORIZATION, CONTENT_TYPE},
    },
    routing::get,
};
use tokio::signal;
use tower_http::{
    cors::CorsLayer,
    services::{ServeDir, ServeFile},
};

mod api;
mod db;
mod infrastructure;
mod models;
mod responses;
mod template_controllers;

// #[derive(RowValue, Debug)]
// struct Entity {
//     tail: Option<String>,
//     flight: Option<String>,
//     iata1: Option<String>,
//     iata2: Option<String>,
// }

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let static_files =
        // ServeDir::new("./static").not_found_service(ServeFile::new("./static/index.html"));
    ServeDir::new("./front/dist").not_found_service(ServeFile::new("./front/dist/index.html"));
    let cors = CorsLayer::new()
        .allow_origin("*".parse::<HeaderValue>().expect("Cannot parse"))
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
            Method::PATCH,
        ])
        .allow_headers([
            AUTHORIZATION,
            ACCEPT,
            CONTENT_TYPE,
            ACCESS_CONTROL_ALLOW_ORIGIN,
        ]);

    let router = Router::new()
        // .route("/api/flights", get(api::flights::list_flights))
        .route("/api/flights", get(api::flights::list_flights_by_aircraft))
        .route("/home", get(template_controllers::home::render))
        .route("/flights", get(template_controllers::flights_page::render))
        .layer(cors)
        // .with_state(c)
        .fallback_service(static_files);

    println!("Server is starting...");
    println!("API activated");

    let listener = tokio::net::TcpListener::bind("0.0.0.0:5005")
        .await
        .expect("Cant start server");

    let server = axum::serve(listener, router).with_graceful_shutdown(async move {
        if let Err(e) = signal::ctrl_c().await {
            eprintln!("Error waiting for Ctrl+c: {}", e);
        }
    });
    if let Err(e) = server.await {
        eprintln!("Server error {}", e);
    }
}
