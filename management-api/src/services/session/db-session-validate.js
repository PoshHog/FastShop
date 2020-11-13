async function validateToken(res, con, companyID, token, role, callback){
    sql = `select accessroles.roleName from administrationroles inner join accessroles on administrationroles.roleID=accessroles.roleID inner join customeraccounts on customeraccounts.accountID=administrationroles.accountID inner join sessions on sessions.accountID=administrationroles.accountID where customeraccounts.companyID=${companyID} and sessions.sessionToken=${token};`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        inv = {'token':'invalid'};
        if(result[0]==undefined){
            res.status(200).json(inv);
        }else{
            perm = false;
            result.array.forEach(element => {
                if(element.roleName == role){
                    perm = true;
                }
            });
            if(perm){
                callback();
            }else{
                res.status(200).json(inv);
            }
        }
    });
}

module.exports = {
    validateToken
}