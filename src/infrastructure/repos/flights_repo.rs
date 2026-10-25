use oracle::Error;

use crate::{db::get_connection, models::flight::Flight};

pub fn get_flights() -> Result<Vec<Flight>, Error> {
    let sql = "SELECT ID, TAIL, FLIGHT, IATA1, IATA2, ICAO1, ICAO2, UDATE, ETD, ETA, STATUS, ETD_UNIX, ETA_UNIX, UDATE_UNIX FROM POTKOM.LEGS2BRIEF_VIE WHERE ETD BETWEEN SYSDATE-1 AND SYSDATE+3 AND NOT STATUS='canceled' ORDER BY ETD ASC";
    match get_connection() {
        Ok(conn) => {
            println!("Connected to DB");
            let mut stmt = conn.statement(sql).build()?;
            let rows = stmt.query_as::<Flight>(&[])?;

            let flights: Vec<Flight> = rows.collect::<Result<Vec<_>, _>>()?;
            // match conn.close() {
            //     Ok(_) => println!("DB closed"),
            //     Err(err) => println!("{}", err.to_string()),
            // }
            conn.break_execution()
                .expect("Error during breaking execution");
            Ok(flights)
        }
        Err(err) => Err(err),
    }
}
