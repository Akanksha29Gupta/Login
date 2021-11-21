const express = require("express");
const path = require('path');
const cors = require('cors')
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const { urlencoded } = require("body-parser");

const PORT = process.env.PORT || 3001;
app.use(express.static(path.resolve(__dirname, 'client/build')));

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "logindb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM REGISTER;";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
        res.send(result);
    });
});

app.post("/api/insert", (req,res) => {

    const UserEmail = req.body.UserEmail;
    const UserPassword = req.body.UserPassword;

    const sqlInsert = "INSERT INTO REGISTER(EMAIL,PASSWORD) VALUES (?,?);";
    db.query(sqlInsert, [UserEmail, UserPassword], (err, result) => {
        console.log(result);
     });
});
/*app.get("/", (req,res) => {
    const sqlInsert = "INSERT INTO REGISTER(EMAIL,PASSWORD) VALUES ('AC@GMAIL.COM', '1234');";
    db.query(sqlInsert, (err, result) => {
        if (err) throw err;
        console.log("done");
        res.send("Hello World");
    });
});*/

app.listen(PORT , () => {
    console.log('running on port ' + PORT);
});