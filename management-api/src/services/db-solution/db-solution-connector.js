var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "api",
  password: "management_api_verification"
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