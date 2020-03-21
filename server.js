const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json(),function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'persondb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(5555, () => console.log('Express server is runnig at port no : 3000'));


//Get all employees
app.get('/persons', (req, res,next) => {

    mysqlConnection.query('SELECT * FROM PERSON', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
        next();
    })
});

//Get an employees
app.get('/persons/:id', (req, res,next) => {
    mysqlConnection.query('SELECT * FROM PERSON WHERE Id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
        next();
    })
});

//Delete an employees
app.delete('/persons/:id', (req, res,next) => {
    mysqlConnection.query('DELETE FROM PERSON WHERE Id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
        next();
    })
});

//Insert an employees
app.post('/persons', (req, res,next) => {

    var Name = req.body.Name;
    var Age = req.body.Age;
    var Gender = req.body.Gender;
    var MObno = req.body.MObno;

    var sql = `INSERT INTO PERSON (Name,Age,Gender,MObno) VALUES ("${Name}","${Age}","${Gender}","${MObno}") `;
    mysqlConnection.query(sql,function(err,result) {
    if (!err)
        res.send('Added successfully');
    else
        console.log(err);

    })
})

//Update an employees
app.put('/persons/:id', (req, res, next) => {

    var Id = req.params.id;
    var Name = req.body.Name;
    var Age = req.body.Age;
    var Gender = req.body.Gender;
    var MObno = req.body.MObno;

    var sql = `UPDATE PERSON SET Name="${Name}",Age="${Age}",Gender="${Gender}",MObno="${MObno}" WHERE Id="${Id}"`
    mysqlConnection.query(sql,function(err,result) {
    if (!err)
        res.send('Updated successfully');
    else
        console.log(err);

    })
})
