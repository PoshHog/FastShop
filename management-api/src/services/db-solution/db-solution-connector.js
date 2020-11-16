var mysql = require('mysql');

var con = mysql.createConnection({
  host: "fast-shop-db.cbpqdmidnsld.us-west-2.rds.amazonaws.com",
  port: "3306",
  user: "root",
  password: "sEgmlTIsOE3opLIpcBBI",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  init();
});

async function usedb(){
  var sql = "USE solution";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Using solution");
  });
}

function init(){
  usedb();
}


module.exports = {
  con,
  init
}