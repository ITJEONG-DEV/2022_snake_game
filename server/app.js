const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const { rejects } = require('assert');

const SERVER_PORT = 3308;

const app = express();

try {
    const jsonFile = fs.readFileSync('./server/dbinfo.json', 'utf-8');
    const jsonData = JSON.parse(jsonFile);
    
    const sqlConnection = mysql.createConnection({
        host: jsonData["host"],
        user: jsonData["user"],
        password: jsonData["password"],
        database: jsonData["database"]
    });

    sqlConnection.connect(function(e) {
        if(e) throw e;
    });
    
    // /addrank?name={name}&score={score}&id={id}
    app.get('/addrank', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");

        var name = req.query.name;
        var score = req.query.score;
    
        const query1 = "INSERT INTO rankdata(_username, _score, _time)" + "VALUES('" + name + "', " + score + ", NOW());";
    
        let data = {};

        Execute(query1)
        .then((result) => {
            data["rows"] = result;
        })
        .then(() => {
            return res.send(data);
        })
        .catch((e) => {
            console.error(e);
        })
    });
    
    app.get('/getrank', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");

        const limit = 5;
    
        var name = req.query.name;
        var score = req.query.score;
    
        const query1 = "SELECT * FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked WHERE ranked._rank<=" + limit + " LIMIT 10;";
        const query2 = "SELECT _rank FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked WHERE ranked._username = '"+ name +"' and ranked._score=" + score + " LIMIT 1;"

        let data = {};

        const topRank = Execute(query1)
        .then((result) => {
            data["topRank"] = result;
        });

        const myRank = Execute(query2)
        .then((result) => {
            data["myRank"] = result;
        });

        Promise.all([topRank, myRank])
        .then(() => {
            return res.send(data);
        })
        .catch((e) => {
            console.error(e);
        })
    });
    
    app.listen(SERVER_PORT, () => {
        console.log('example app listening at http://localhost:' + SERVER_PORT);
    });
    
    // connection.end();

    function Execute(query) {
        return new Promise((resolve, reject) => {
            sqlConnection.query(query, (error, rows, fields) => {
                if(error) return reject(error);

                return resolve(rows);
            });
        });
    }

} catch(e) {
    console.log(e);
}