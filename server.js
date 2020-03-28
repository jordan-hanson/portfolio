const express = require('express')
const app = express()
const PORT = 3001
var bodyParser = require('body-parser')

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'contactDB'
});

connection.connect();


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'))

app.post("/save", function (req, res) {
    console.log("hit the route", req.body)
    let Query = "insert into mylist (firstname, lastname, email, textarea) values (?,?,?,?)"
    connection.query(Query, [req.body.firstname, req.body.lastname, req.body.email, req.body.textarea], function (err, resolve) {
        console.log(err, resolve)
    })
})

app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});