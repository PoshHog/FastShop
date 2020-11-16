const crypto = require('crypto');
const { reject } = require('lodash');

// TODO : 1. Check user exists and get ID & name, 2. create new session, 3. identify role, 4. return token
async function logIn(res, con, companyID, email, password){
    sql = `SELECT customerAccounts.accountID, customers.forename, customers.email FROM customerAccounts INNER JOIN customers on customerAccounts.customerID=customers.customerID WHERE customers.email='${email}' AND customerAccounts.companyID=${companyID} AND customerAccounts.pwd='${password}'`;
    await con.query(sql, function (err, result) {
        if (err) throw err;
        let customer = result[0];

        var login = 'valid';
        var id;
        var name; 
        var roles = [];
        var token;

        if(customer==undefined){
            login = 'invalid';
        }else{
            id = customer.accountID;
            name = customer.forename;
            sql = `select accessroles.roleName from administrationroles inner join accessroles on administrationroles.roleID=accessroles.roleID inner join customeraccounts on administrationroles.accountID=customeraccounts.accountID where customeraccounts.accountID=${id}`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                result.forEach(element => {
                    roles.push(element.roleName);
                });

                token = generateToken(customer.email);

                sql = `insert into sessions(accountID, sessionToken, sessionActive) values(${id}, '${token}', true);`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                });

                let ret = {'login':login, 'id':id, 'name':name, 'roles':roles, 'token':token};
                res.status(200).json(ret);
            });
        }
    });
}

function generateToken(email){
    
    let ts = Date.now();
    const secret = 'sessionkey';
    //const hash = crypto.createHmac(email, secret).update(ts).digest('hex');

    return "somehash";
}

async function addCustomer(con, companyID, email, password, forename = null, surname = null, dob = null, mobile = null, countryCode = null, addressLine1 = null, postcode = null){
    sqlInsert = "INSERT INTO customers (email";
    sqlValues =  `VALUES ('${email}'`;
    if(forename!=null){
        sqlInsert+=", forename";
        sqlValues+=`, '${forename}'`;
    }
    if(surname!=null){
        sqlInsert+=", surname";
        sqlValues+=`, '${surname}'`;
    }
    if(dob!=null){
        sqlInsert+=", dob";
        sqlValues+=`, ${dob}`;
    }
    if(mobile!=null){
        sqlInsert+=", mobile";
        sqlValues+=`, ${mobile}`;
        if(countryCode!=null){
            sqlInsert+=", countryCode";
            sqlValues+=`, ${countryCode}`;
        }else{
            sqlInsert+=", countryCode";
            sqlValues+=`, 44`;
        }
    }
    if(addressLine1!=null){
        sqlInsert+=", addressLine1";
        sqlValues+=`, '${addressLine1}'`;
    }
    if(postcode!=null){
        sqlInsert+="postcode";
        sqlValues+=`'${postcode}'`;
    }

    sql = `${sqlInsert}) ${sqlValues});`
    console.log(sql);
    var ret;
    await con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID : "+result.insertId);
        customerID = result.insertId;
        ret = customerID;
        addAccount(con, customerID, companyID, password);
    });
    return ret;
}

async function addAccount(con, customerID, companyID, password){
    sql = `INSERT INTO customeraccounts(customerID, companyID, balance, pwd) values(${customerID}, ${companyID}, 0, '${password}')`;
    var queryResult;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID : "+result.insertId);
        queryResult = result.insertId;
      });

    return queryResult;
}

module.exports = {
    logIn, 
    addCustomer,
    addAccount
}