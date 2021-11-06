const Purchase = require("../models/Purchase");
const { validationPurchase } = require("../validacion");

class PurchaseController {

    constructor() {

    }

    async addPurchase(req,res) {

        try {

            const {
                body: {
                    idcliente,
                    numero_Factura,
                    cedula,
                    lugar_compra,
                    monto,
                    producto,
                    cantidad
                }
            } = req;

            const errors = validationPurchase({
                idcliente,
                numero_Factura,
                cedula,
                lugar_compra,
                monto,
                producto,
                cantidad
            });

            if(errors.length > 0) return res.status(400).json({
                data: {
                    errores: errors
                }
            })

            const purchase = new Purchase(idcliente,numero_Factura,cedula,lugar_compra,monto,producto,cantidad);
            const exists = await purchase.getClientbyId(idcliente);

            if(!(exists[0] && exists[0][0])) return res.status(400).json({
                msg: 'El idcliente no tiene referencia a ningún cliente registrado'
            });

            const response = await purchase.addNewPurchase(
                    purchase.getClientId(),
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

            if(cedula.length > 12 ){
                return res.status(400).json({
                    msg: 'El parámetro de cédula debe contener máximo 12 caracteres'
                })
            }

            const purchase = new Purchase(cedula);
            const response = await purchase.getPurchases(cedula);

            if(response[0] && response[0][0]) {
                return res.status(200).json({
                    data: response[0]
                })
            } else  {
                return res.status(404).json({data: {}});
            }

        } catch (error) {
            res.status(500).json({
                msg: 'Hubo un error en la búsqueda'
            })
        }

    }
}

module.exports = PurchaseController;