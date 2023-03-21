var mysql = require('mysql');

var con = mysql.createConnection({
    host: "172.23.0.1",
    port: "33306",
    user: "root",
    password: "candspass"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });