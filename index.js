const express = require('express');
const app = express();
const routes = require('./controller/routes.js');
const path = require('path');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',routes);
app.post('/register',routes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("servers started at post", PORT));
