const http = require('http')
  , express = require('express')
  , cors = require('cors')
  , app = express()
  , server = http.createServer(app)
  , bodyParser = require('body-parser');

app.use(cors());
// Configuration
app.disable('x-powered-by');

// Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(require('multer')().array());

// Middlewares
app.use(require('./middlewares/customResponseTime'));
app.use(require('./middlewares/customHttpCodeMiddleware'));
app.use(require('./middlewares/customHttpHeadersMiddleware'));
app.use(require('./middlewares/logMiddleware'));

// Change Body
app.use(require('./middlewares/showFileMiddleware'));
app.use(require('./middlewares/customHttpEnvBodyMiddleware'));
app.use(require('./middlewares/customHttpBodyMiddleware'));

// Router
app.all('*', (req, res) => res.json({
    host: require('./response/host')(req),
    http: require('./response/http')(req),
    request: require('./response/request')(req),
    environment: require('./response/environment')(req)
}));
module.exports = server
