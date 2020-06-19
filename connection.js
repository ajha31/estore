var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
const app = express();

//connection
var connection = mysql.createConnection({
    multipleStatements:true,
	host     : 'localhost',
	user     : 'root',
	password : '',
    database : 'estore'
});

// Connect
connection.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

module.exports=connection;