const express = require('express');
const mysql = require('mysql');
const fs = require('fs');

const SERVER_PORT = 3308;

const app = express();

const sqlConnection = createConnection();
sqlConnection.connect();

app.get('/', (req, res) => {
    res.send('Hello World!' + req);
});

// /addrank?name={name}&score={score}&id={id}
app.get('/addrank', (req, res) => {
    var name = req.query.name;
    var score = req.query.score;
    var id = req.query.id;

    const query = "INSERT INTO rankdata(_id, _username, _score, _time)" + "VALUES('" + id + "', '" + name + "', " + score + ", NOW());";

    sqlConnection.query(query, function(error, results, fields) {
        if(error) {
            console.log(error);

            return res.send("error: " + error);
        }
        // console.log(results);
        // console.log(fields);

        return res.send("results: " + results + "\nfields: " + fields);
    });
});

app.get('/getrank', (req, res) => {
    const query = "SELECT * FROM rankdata";
    sqlConnection.query(query, function(error, results, fields) {
        if(error) {
            console.log(error);

            return res.send("error: " + error);
        }

        // console.log(results);
        // console.log(fields);

        return res.send("results: " + results + "\nfields: " + fields);
    });
});

app.listen(SERVER_PORT, () => {
    console.log('example app listening at http://localhost:' + SERVER_PORT);
});

function createConnection() {
    const jsonFile = fs.readFileSync('./server/dbinfo.json', 'utf-8');
    const jsonData = JSON.parse(jsonFile);

    return mysql.createConnection({
        host: jsonData["host"],
        user: jsonData["user"],
        password: jsonData["password"],
        database: jsonData["database"]
    });
}

// connection.end();