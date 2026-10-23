use oracle::Error;

use crate::{db::get_connection, models::flight::Flight};

pub fn get_flights() -> Result<Vec<Flight>, Error> {
    let sql = "SELECT TAIL, FLIGHT, IATA1, IATA2, ICAO1, ICAO2, UDATE, ETD, ETA, STATUS, ETD_UNIX, ETA_UNIX, UDATE_UNIX FROM POTKOM.LEGS2BRIEF_VIE WHERE ETD BETWEEN SYSDATE-1 AND SYSDATE+3 AND NOT STATUS='canceled' ORDER BY ETD ASC";
    match get_connection() {
        Ok(conn) => {
            let mut stmt = conn.statement(sql).build()?;
            let rows = stmt.query_as::<Flight>(&[])?;

            let flights: Vec<Flight> = rows.collect::<Result<Vec<_>, _>>()?;
            // let mut flights = Vec::with_capacity(100);
            // for row_result in rows {
            //     let row = row_result.expect("Can't get row");
            //     flights.push(row);
            // }
            conn.close().expect("can't close connection");
            Ok(flights)
        }
        Err(err) => Err(err),
    }
}
