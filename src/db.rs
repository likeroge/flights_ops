use oracle::{Connection, Error};

pub fn get_connection() -> Result<Connection, Error> {
    Connection::connect("briefing", "BRIF2015", "orantvpn.vda.ru:1521/ORC1")
}
