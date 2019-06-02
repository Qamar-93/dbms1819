const queries = require('../../../models/queries/index.js');

  const addUser = (req, res) => {
  const data = req.body;
  queries.users.addUser(data.tax_code, data.name, data.email, data.phone_number, data.address_zip, data.address_street, (err, result) => {
    if (err) {
      res.status(401).json({ message: err.message });
    } else {
      res.send(JSON.stringify(result));
    }
  });
};


const getUser = (req, res) => {
  const data = req.params.tax_code;
  queries.users.getUser(data, (err, result) => {
    if (err) {
      res.status(401).json({ message: err.message });
    } else {
      res.send(JSON.stringify(result));
    }
  });
};
module.exports = {
  addUser,
  getUser
};
