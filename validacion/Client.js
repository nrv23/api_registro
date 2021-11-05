const {is} = require("validator");

const validateClient = obj => {

    const errors = [];

    /*
         numero_Factura,
        cedula,
        lugar_compra,
        monto,
        producto,
        cantidad
    */

    if(!obj.numero_factura || obj.numero_factura.trim().length === 0) {
        errors.push('El número de la factura es requerido');
    } else if(!obj.cedula){
        errors.push('El campo cédula es requerido');
    } else if(!validator.isNumer(obj.cedula+'',{
        no_symbols: true
    })) {
        errors.push('La cédula debe contener solo dígitos')
    } else if(obj.cedula.trim().length < 9) {
        errors.push('La cédula debe contener al menos 9 dígitos')
    } else if(!obj.numero_factura || obj.numero_factura.trim().length === 0){
        errors.push('El lugar de compra es requerido');
    }

    return errors;
}