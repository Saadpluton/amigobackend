"use strict";

var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _winston = _interopRequireDefault(require("winston"));
var _db = _interopRequireDefault(require("#config/db"));
var _logger = _interopRequireDefault(require("#utils/logger"));
var _index = _interopRequireDefault(require("#routes/index"));
var _env = require("#utils/env");
var _bodyParser = _interopRequireDefault(require("body-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*****  Packages  *****/

/*****  Modules  *****/

(0, _env.envConfig)();
(0, _db.default)();
(0, _logger.default)();
const app = (0, _express.default)();
const PORT = process.env.PORT || 6000;

/*****  Middlewares  *****/
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use('/uploads', _express.default.static('uploads'));
(0, _index.default)(app);
app.listen(PORT, () => _winston.default.info(`Server is Listening on port ${PORT}.`));