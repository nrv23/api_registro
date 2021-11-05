const connection = require("../db/connection");

class Query {
    
    constructor(sql,params) {

        this.setSql(sql);
        this.setParams(params);
     }

    setSql(sql) {

        this.sql = sql;
    }

    setParams(params) {

        this.params = params;
    }

    getSql() {

        return this.sql;
    }

    getParams() {

        return this.params;
    }


    executeQuery (sql,params){

        return new Promise((resolve,reject) => {
    
            connection.execute(sql,params,(err,rows,fields) => {
    
                if(err) {
                    return reject(err)
                } else {
                    resolve(rows);
                }
            })
        })
    }
}

module.exports = Query;