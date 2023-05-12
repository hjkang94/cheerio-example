const express = require('express');
const app = express();
const route = require('./routes');
const rankRoute = require('./routes/rank');
const port = process.env.PORT || 3000;

app.use('/', route)
app.use('/rank', rankRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});