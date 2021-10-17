const app = require('./app');

const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

module.exports = app;