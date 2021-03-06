const Query = require("../helpers/Query");
const Client = require("./Client")

class Purchase extends Client {

    constructor(clientId='',nroFac = '',dni= '',trade= '',amount= '',product= '',quantity= '') {
        super(dni);

        this.setDni(dni);
        this.setNroFac(nroFac);
        this.setTrade(trade);
        this.setAmount(amount);
        this.setProduct(product);
        this.setQuantity(quantity);
        this.setClientId(clientId);
    }

    setClientId(clientId) {

        this.clientId =clientId;
    }

    setDni(dni) {
        super.setDni(dni)
    }

    setNroFac(nroFac) {

        this.nroFac = nroFac
    }

    setTrade(trade) {

        this.trade = trade
    }

    setAmount(amount) {

        this.amount = amount
    }

    setProduct(product) {

        this.product = product
    }

    setQuantity(quantity) {

        this.quantity = quantity
    }


    getClientId(){ 

        return this.clientId;
    }

    getDni() {

        return super.getDni()
    }

    getNroFac() {

       return this.nroFac;
    }

    getTrade() {
        return this.trade;
    }

    getAmount() {

        return this.amount;
    }

    getProduct() {

        return this.product;
    }

    getQuantity() {

        return this.quantity
    }

    getPurchases(dni) {

        const sql = 'CALL getPurchases(?)';
        const params = [dni];
        const query = new Query(sql,params);

        return query.executeQuery(query.getSql(),query.getParams());
    }

    addNewPurchase(clientId,nroFac,dni,trade,amount,product,quantity) {

        const sql = 'CALL addPurchase(?,?,?,?,?,?,?)';
        const params = [clientId,nroFac,dni,trade,amount,product,quantity];
        const query = new Query(sql,params);

        return query.executeQuery(query.getSql(),query.getParams());

    }

}

module.exports = Purchase;