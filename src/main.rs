use axum::{
    Router,
    http::{
        HeaderValue, Method,
        header::{ACCEPT, ACCESS_CONTROL_ALLOW_ORIGIN, AUTHORIZATION, CONTENT_TYPE},
    },
    routing::get,
};
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
        ServeDir::new("./static").not_found_service(ServeFile::new("./static/index.html"));
    // ServeDir::new("./front/dist").not_found_service(ServeFile::new("./front/dist/index.html"));
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

    // let conn = get_connection().expect("Can't create connection");
    // let c = Arc::new(conn);
    let router = Router::new()
        .route("/api/flights", get(api::flights::list_flights))
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

    axum::serve(listener, router).await.expect("Cant serve");

    // let conn = Connection::connect("briefing", "BRIF2015", "orantvpn.vda.ru:1521/ORC1")
    //     .expect("Can't connect to DB");
    // // let sql = "SELECT TAIL, AIRLINE, FLIGHT, IATA1, ICAO1, NAME1, ETD, IATA2, ICAO2, NAME2, ETA, STATUS, TKFAL, ALT1, ALT2, ALT3,
    // // ALT4, ETD_UNIX, ETA_UNIX, UDATE_UNIX FROM POTKOM.LEGS2BRIEF_VIE;";

    // let sql2 = "SELECT TAIL, FLIGHT, IATA1, IATA2 FROM POTKOM.LEGS2BRIEF_VIE WHERE ETD BETWEEN SYSDATE-1 AND SYSDATE+3";
    // let mut stmt = conn
    //     .statement(sql2)
    //     .build()
    //     .expect("Can't create statement");

    // let rows = stmt.query_as::<Entity>(&[]).expect("Can't get query");

    // for row_result in rows {
    //     let row = row_result.expect("Can't get row");
    //     println!("{:?}", row);
    // }
}
