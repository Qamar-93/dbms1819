require('env2')('./config.env');
const express = require('express');
const path = require('path');
const routes = require('./controllers/api/v1/index');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'views'), { maxAge: '30d' }));
app.use('/admin', (req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'views', 'admin.html'));
});
app.use('/api/', routes);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send({ message: err.message, error: err });
});
app.set('port', process.env.PORT || 4000);

module.exports = app;
