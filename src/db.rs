use oracle::{Connection, Error};

pub fn get_connection() -> Result<Connection, Error> {
    Connection::connect("", "", "")
}
