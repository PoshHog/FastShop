const crypto = require('crypto');

async function startsession(con, accountID){
    let ts = Date.now();
    token = generateToken(con, accountID, ts);
    sql = `INSERT INTO customers (accountID, sessionToken, sessionActive, sessionStart) values (${accountID}, ${token}, true, ${ts});`
    console.log(sql);
    await con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID : "+result.insertId);
    });
}

function generateToken(con, accountID, ts){
    sql = `select email from customers inner join customeraccounts on customeraccounts.customerID=customers.customerID where customeraccounts.accountID=${accountID};`
    var email;
    await con.query(sql, function (err, result) {
        if (err) throw err;
        email = result;
    });

    const secret = 'sessionkey';
    const hash = crypto.createHmac(email, secret).update(ts).digest('hex');

    return hash;
}