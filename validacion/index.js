const validator = require('validator');

const validateClient = obj => {

    const errors = [];

    if(!obj.cedula){
        errors.push('El campo cédula es requerido');
    } else if(!validator.isNumeric(obj.cedula+'',{
        no_symbols: true
    })) {
        errors.push('La cédula debe contener solo dígitos')
    } else if(obj.cedula.trim().length < 9) {
        errors.push('La cédula debe contener al menos 9 dígitos')
    } else if(obj.cedula.trim().length > 12) {
        errors.push("La cedula debe contener un máximo de 12 dígitos")
    }else if(!obj.nombre) {
        errors.push("El nombre es requerido")
    } else if(obj.nombre.trim().length > 50 ) {
        errors.push("El nombre debe contener un máximo de 50 caracteres")
    }else if(!obj.telefono || !validator.isNumeric(obj.telefono+'',{
        no_symbols: true
    })) {
        errors.push("No es un telefono válido")
    } else if(obj.telefono.length < 8) {
        errors.push("El telefono debe contener al menos 8 dígitos")
    } else if(obj.telefono.length > 11) {
        errors.push("EL teléfono debe contener un máximo de 11 dígitos")
    }else if(obj.email || obj.email.trim().length > 0) {
        
        if(!validator.isEmail(obj.email)) {
            errors.push("No es un email válido")
        }
    }

    return errors;
}

const validationPurchase = obj => {

    const errors = [];

    if(!obj.numero_Factura){
        errors.push("El número de factura es necesario")
    }  else if(obj.numero_Factura.trim().length > 50) {
        errors.push("EL numero de factura debe contener un máximo de 50 caracteres")
    } else if(!obj.cedula){
        errors.push('El campo cédula es requerido');
    } else if(!validator.isNumeric(obj.cedula+'',{
        no_symbols: true
    })) {
        errors.push('La cédula debe contener solo dígitos')
    } else if(obj.cedula.trim().length < 9) {
        errors.push('La cédula debe contener al menos 9 dígitos')
    } else if(obj.cedula.trim().length > 12) {
        errors.push("La cedula debe contener un máximo de 12 dígitos")
    } else if(!obj.lugar_compra) {
        errors.push("El lugar de la compra es requerido")
    } else if(obj.lugar_compra.trim().length > 30) {
        errors.push("El campo lugar de compra debe contener un maximo de 30 caracteres")
    } else if(!obj.monto) {
        errors.push("El monto es requerido")
    }else if(!validator.isNumeric(obj.monto+'',{
        no_symbols: false
    })) { 
        errors.push("El monto no es válido")
    }else if(!obj.cantidad) {
        errors.push("El cantidad es requerido")
    }else if(!validator.isNumeric(obj.cantidad+'',{
        no_symbols: false
    })) { 
        errors.push("La cantidad no es válida")
    } else if(!obj.producto){
        errors.push("El producto es requerido")
    }  else if(obj.producto.trim().length > 12) {
        errors.push("EL código del producto debe contener un máximo de 12 dígitos")
    } else if(!obj.idcliente) {
        errors.push("EL idcliente es necesario");
    } else if(!validator.isNumeric(obj.idcliente+'',{
        no_symbols: true
    })) { 

        errors.push("Idcliente no válido")
    }

    return errors;

}

module.exports = {
    validateClient,
    validationPurchase
}