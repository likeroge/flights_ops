use askama::Template;
use axum::response::Html;

use crate::{infrastructure::repos::flights_repo, models::flight::Flight};

#[derive(Template, Default)]
#[template(path = "flights.html")]
pub struct FlightsPage {
    flights: Vec<Flight>,
    err: String,
}

pub async fn render() -> Html<String> {
    let mut t = FlightsPage::default();
    match flights_repo::get_flights() {
        Ok(flights) => {
            t.flights = flights;
            Html(t.render().expect("Can't render"))
        }
        Err(err) => {
            t.err = err.to_string();
            Html(t.render().expect("Can't render"))
        }
    }
}
