const express = require('express');
// dipakai untuk memungkinkan sharing resource dengan API
const cors = require('cors');

// inisialisasi app
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.set('view engine', 'ejs');

// basic routing
app.get('/contoh1', (req, res) => {
    // send itu bawaan express
    res.send("contoh 1");
})

// static routing
app.use('/contoh2', express.static('contoh2'))

// JSON routing
app.get('/contoh3', (req, res) => {
    let response = {"item":"A","price":500000};
    res.json(response);
})

// view engine routing
// contoh cara memanggil : http://localhost:5000/contoh4?name=yogi&country=Indonesia
app.get('/contoh4', (req, res) => {
    const name = req.query.name || "Bang Toyib";
    const country = req.query.country || "Indonesia";
    res.render('example', {
        name, country
    })
})

// Handle 404 URLs
app.use('*', (req, res) => {
    res.json({"message": "URL not found"});
});

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});