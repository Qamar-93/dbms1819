const connection = require('../database/db_connection.js');

const getServices = cb => {
  const sql = `SELECT * from hotel.hotel_service`;
  connection.query(sql, (error, res) => {
    if (error) {
      cb(error.message);
    } else {
      cb(null, res.rows);
    }
  });
};

const getServicesByType = (type,cb) => {
const sql = {
  text:`SELECT * from hotel.hotel_service WHERE "type" = $1`,
  values:type
};
connection.query(sql, (error, res) => {
  if (error) {
    cb(error.message);
  } else {
    cb(null, res.rows);
  }
});
};

const checkAvailability = (reservation_id, service_id, cb) => {
  const sql = {
    text:`SELECT * from hotel.availability_period WHERE reservation_id = $1 AND service_id  = $2`,
    values:[reservation_id, service_id]
  };
  connection.query(sql, (error, res) => {
    if (error) {
      cb(error.message);
    } else {
      if(res.rows.length() == 0)
      cb(null, {'available': true});
      else
      cb(null, {'available': false});
    }
  });
  };
module.exports = {
    getServices,
    getServicesByType,
    checkAvailability
};
