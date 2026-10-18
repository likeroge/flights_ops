use askama::Template;
use axum::response::Html;

#[derive(Template, Default)]
#[template(path = "home.html")]
pub struct HomePage {}

pub async fn render() -> Html<String> {
    let t = HomePage::default();
    Html(t.render().expect("Can't render"))
}
