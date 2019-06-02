const connection = require('../database/db_connection.js');

const makeReservation = (client_id, state, notes = '',amount, cb) => {
  const sql = {
      text: `INSERT INTO hotel.reservation (client_id, state ,created_at, notes, amount) VALUES ($1,$2,$3,$4,$5) RETURNING client_id;`,
      vlaues:[ client_id, state,Date.now(), notes = '',amount]
    };
  connection.query(sql, (error, res) => {
    if (error) {
      cb(error.message);
    } else {
      cb(null, res.rows);
    }
  });
};


const getReservationView = cb => {
  const sql = `SELECT * FROM orderDetails;`;
  connection.query(sql, (error, res) => {
    if (error) {
      cb(error.message);
    } else {
      cb(null, res.rows);
    }
  });
};


const makeOrder= (reservation_id, service_id, state, cb) => {
    const sql = {
        text:`INSERT INTO hotel.order (reservation_id, service_id, state ,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING reservation_id, service_id;`,
        values:[reservation_id, service_id, state, Date.now()]
    };
        connection.query(sql, (error, res) => {
      if (error) {
        cb(error.message);
      } else {
        cb(null, res.rows);
      }
    });
  };

module.exports = {
    makeReservation,
    getReservationView,
    makeOrder
};
