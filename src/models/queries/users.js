const connection = require('../database/db_connection.js');

const addUser = (tax_code, name, email, phone_number, address_zip, address_street, cb) => {
  const sql = {
    text: `INSERT INTO hotel.client (tax_code, name, email, phone_number, address_zip, address_street) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    values: [tax_code, name, email, phone_number, address_zip, address_street]
  };
  connection.query(sql, (error, res) => {
    if (error) {
      cb(error.message);
    } else {
      cb(null, res.rows);
    }
  });
};

const getUser = (tax_code, cb) => {
  user = {};
  const sql = {
    text: 'SELECT * FROM hotel.client WHERE hotel.client.tax_code = $1',
    values:[tax_code]
  }  
  connection.query(sql, (error, res) => {
    if (error)
      cb(error.message);
    else{      
    if(res.rows.length == 0)
      cb(null, {'user':'undefined'});
      else
        cb(null,res.rows[0]);
    }
  });
};

module.exports = {
  getUser,
  addUser
};
