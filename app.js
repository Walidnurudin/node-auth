const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/authRoute.js')

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// routes
app.use(router);
app.use((req, res) => {
    res.render('404')
});

app.listen(port, () => console.log(`jalan boss . . . http://localhost:${port}`))