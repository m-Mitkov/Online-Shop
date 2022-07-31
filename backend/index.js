const express = require('express');

const { PORT } = require('./config/config')
const routes = require('./routes');

const app = express();

require('./config/mongoose')(app);
require('./config/express')(app);

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server is listenin on ${PORT} port`));