const Purchase = require("../models/Purchase");

class PurchaseController {

    constructor() {

    }

    async addPurchase(req,res) {

        try {

            const {
                body: {
                    numero_Factura,
                    cedula,
                    lugar_compra,
                    monto,
                    producto,
                    cantidad
                }
            } = req;

        
            const purchase = new Purchase(numero_Factura,cedula,lugar_compra,monto,producto,cantidad);
            const response = await purchase.addNewPurchase(
                    purchase.getNroFac(),purchase.getDni(),
                    purchase.getTrade(),purchase.getAmount(),
                    purchase.getProduct(),purchase.getQuantity());


            if(response[0] && response[0][0].OK) {
                return res.status(201).json({
                    msg: 'Compra agregada con éxito'
                })
            } else {
                return res.status(400).json({
                    msg: 'No se pudo agregar la compra'
                })
            }
                        
        } catch (error) {
            console.log(error);
            if(error.errno === 1062) {
                return res.status(400).json({
                    msg: 'No puede ingresar dos compras con el mismo número de factura'
                })
            } else {
                return res.status(500).json({
                    msg: 'Ocurrió un error al ingresar la compra'
                })
            }
        }

    }

    async getPurchases(req,res) {

        try {

            const {
                params: {
                    cedula
                }
            } = req;

            const purchase = new Purchase(cedula);
            const response = await purchase.getPurchases(cedula);

            console.log(response);

            return res.status(200).json(response);


        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = PurchaseController;