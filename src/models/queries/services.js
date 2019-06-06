const connection = require('../database/db_connection.js');
const {getUser}= require('./users.js');

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

// const getServicesByType = (type,cb) => {
// const sql = {
//   text:`SELECT * from hotel.hotel_service WHERE "type" = $1 `,
//   values:type
// };
// connection.query(sql, (error, res) => {
//   if (error) {
//     cb(error.message);
//   } else {
//     cb(null, res.rows);
//   }
// });
// };
 

const getAvialableRooms = cb => {
  const sql = {
    text:`SELECT distinct(hotel_service.id), hotel_service.capacity, hotel_service.price, availability_period.duration, availability_period.notes FROM hotel.hotel_service LEFT OUTER JOIN hotel.availability_period on hotel_service.id=availability_period.service_id WHERE  availability_period.reservation_id is null AND lower(availability_period.duration) < now() AND hotel_service.type='room';`
  };
  connection.query(sql, (error, res) => {
    if (error) {
      cb(error.message);
    } else {
      cb(null, res.rows);
    }
  });
  };
const checkAvailability = (user_id, service_id, from, to, cb) => {
  getUser(user_id,(err2,res2)=>{
  if(err2){
  cb(err2.message);
}
  else{
    const sql = {
      text: `SELECT * FROM hotel.hotel_service LEFT OUTER JOIN hotel.availability_period on hotel_service.id=availability_period.service_id WHERE  availability_period.reservation_id is null AND lower(availability_period.duration) < $1 AND upper(availability_period.duration) > $2 AND hotel_service.id = $3 AND hotel_service.type='room';`,
      values:[from, to, service_id]
    };
    connection.query(sql, (error, res1) => {
      if (error) {
        cb(error.message);
      } else {
        if(res1.rows.length == 0){// no service          
         cb(null,{...{'durationIsValid': false}, ...{user:res2}});
        }
        else{          
          cb(null,{...{'durationIsValid': true}, ...{user:res2}});
      }
      }
    });
  }  
  })
 
  };
module.exports = {
    getServices,
    // getServicesByType,
    checkAvailability,
    getAvialableRooms
};
