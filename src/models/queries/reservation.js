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

const getMyReservation = (tax_code,cb) => {
  const sql = {
    text:`SELECT r.created_at, r.notes, r.rate, r.feedback, r.amount, ap.duration, (CASE WHEN o.service_id IS NOT NULL THEN 'food order' ELSE hs.type END) as type, (CASE WHEN o.service_id IS NOT NULL THEN CAST(o.state AS TEXT) ELSE CAST(r.state AS TEXT) END) as state FROM hotel.client as c INNER JOIN hotel.reservation as r on c.tax_code = r.client_id LEFT OUTER JOIN hotel.availability_period as ap on ap.reservation_id = r.id LEFT OUTER JOIN hotel.hotel_service as hs on hs.id = ap.service_id LEFT OUTER JOIN hotel.order as o on o.reservation_id = r.id WHERE c.tax_code = $1 ORDER BY r.created_at DESC;`,
    values:[tax_code]}
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
    makeOrder,
    getMyReservation
};
