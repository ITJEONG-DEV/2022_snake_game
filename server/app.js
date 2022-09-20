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
    
    // /snakegame/addrank?name={name}&score={score}&id={id}
    app.get('/snakegame/addrank', async (req, res) => {
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
    
    // /snakegame/getrank?
    app.get('/snakegame/getrank', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");

        const limit = 10;
    
        var name = req.query.name;
        var score = req.query.score;
    
        const query1 = "SELECT * FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked WHERE ranked._rank<=" + limit + " LIMIT 10;";

        let data = {};

        const topRank = Execute(query1)
        .then((result) => {
            data["topRank"] = result;
        });

        if(name == undefined) {
            topRank.then(() => {
                return res.send(data);
            })
            .catch((e) => {
                console.error(e);
                return;
            })
        } else {
            const query2 = "SELECT _rank FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked WHERE ranked._username = '"+ name +"' and ranked._score=" + score + " LIMIT 1;"
            const query3 = "SELECT MAX(ranked._rank) maxRank FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked;";

            const myRank = Execute(query2)
            .then((result) => {
                data["myRank"] = result;
            });

            const maxRank = Execute(query3)
            .then((result) => {
                data["maxRank"] = result;
            })

            Promise.all([topRank, myRank, maxRank])
            .then(() => {
                return res.send(data);
            })
            .catch((e) => {
                console.error(e);
            })
        }
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