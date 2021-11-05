const Query = require("../helpers/Query");


class Client {
    
    constructor(dni='',name='',email='',phone='') {

        this.setDni(dni);
        this.setName(name);
        this.setEmail(email);
        this.setPhone(phone);
    }


    setDni(dni) {

        this.dni = dni
    }

    setName(name) {

        this.name = name
    }

    setEmail(email) {

        this.email = email
    }

    setPhone(phone) {

        this.phone = phone
    }

    getDni () {
        return this.dni
    }

    getName () {
        return this.name
    }

    getEmail () {
        return this.email
    }

    getPhone () {
        return this.phone
    }

    addNewClient(dni,name,email,phone) {

        const sql = 'CALL addClient(?,?,?,?)';
        const params = [dni,name,email,phone]
        const query = new Query(sql,params);

        return query.executeQuery(query.getSql(),query.getParams());
    }

    getClient(dni) {

        const sql = 'CALL getClient(?)';
        const params = [dni]
        const query = new Query(sql,params);

        return query.executeQuery(query.getSql(),query.getParams());
    }
}

module.exports = Client;