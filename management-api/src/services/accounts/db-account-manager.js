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
    addCustomer,
    addAccount
}