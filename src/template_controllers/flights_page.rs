use askama::Template;
use axum::response::Html;

#[derive(Template, Default)]
#[template(path = "flights.html")]
pub struct FlightsPage {}

pub async fn render() -> Html<String> {
    let t = FlightsPage::default();
    Html(t.render().expect("Can't render"))
}
