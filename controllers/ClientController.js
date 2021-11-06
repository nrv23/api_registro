const Client = require("../models/Client");
const { validateClient } = require("../validacion");


class ClientController {


    constructor() {

    }

    async addNewClient(req,res) {

        try {

            console.log(req.body);
            
            const {
                body: {
                    cedula,nombre,email = '',telefono
                }
            } = req;

            const errors = validateClient({cedula,nombre,email,telefono});

            if(errors.length > 0) return res.status(400).json({ data : {
                errores: errors
            }})

            const client = new Client( cedula,nombre,email,telefono);
            const response = await client.addNewClient(client.getDni(),client.getName(),client.getEmail(),client.getPhone())

            if(response[0] && response[0][0].OK) {
                return res.status(201).json({
                    msg: 'Cliente agregado con éxito'
                })
            } else {
                return res.status(400).json({
                    msg: 'No se pudo agregar el cliente'
                })
            }

           
        } catch (error) {

            if(error.errno === 1062) {
      
                return res.status(400).json({
                    msg: 'No se pueden agregar dos clientes con la misma cédula'
                })
            } else {
                return res.status(500).json({
                    msg: 'Ocurrió un error al intentar agregar el cliente'
                })
            }
        }
    }

    async getClient(req,res) {

        try {

            const {
                params : {cedula}
            } = req;
                
            if(cedula.length > 12 ){
                return res.status(400).json({
                    msg: 'El parámetro de cédula debe contener máximo 12 caracteres'
                })
            }

            const client = new Client(cedula);
            const response = await client.getClient(client.getDni());
            
            if(response[0] && response[0][0]) {

                return res.status(200).json({
                    data: response[0][0]
                })
            } else {
            
                return res.status(404).json({data: {}});
            }
        } catch (error) {
            res.status(500).json({
                msg: 'Hubo un error en la búsqueda'
            })
        }
    }
}

module.exports = ClientController;