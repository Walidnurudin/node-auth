const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const router = require('./routes/authRoute.js')

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// connect db
const db = 'mongodb+srv://walid:walid@cluster0.vt15h.mongodb.net/node-auth?retryWrites=true&w=majority'
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(port, () => console.log(`jalan boss . . . http://localhost:${port}`)))
    .catch(err => console.log(err))

// routes
app.use(router);
app.use((req, res) => {
    res.render('404')
});