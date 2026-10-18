use askama::Template;
use axum::response::Html;

use crate::{db::get_connection, infrastructure::repos::flights_repo, models::flight::Entity};

#[derive(Template, Default)]
#[template(path = "flights.html")]
pub struct FlightsPage {
    flights: Vec<Entity>,
    err: String,
}

pub async fn render() -> Html<String> {
    let mut t = FlightsPage::default();
    match get_connection() {
        Ok(c) => match flights_repo::get_flights() {
            Ok(flights) => {
                t.flights = flights;

                Html(t.render().expect("Can't render"))
            }
            Err(err) => todo!(),
        },
        Err(err) => {
            t.err = err.to_string();

            Html(t.render().expect("Can't render"))
        }
    }
    // Html(t.render().expect("Can't render"))
}
