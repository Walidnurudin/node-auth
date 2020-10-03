const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send("MAsukkkkk")
})

app.listen(port, () => console.log(`jalan boss . . . http://localhost:${port}`))