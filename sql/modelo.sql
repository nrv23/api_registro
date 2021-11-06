
DROP DATABASE IF EXISTS `API_REGISTRO`;
CREATE DATABASE IF NOT EXISTS `API_REGISTRO`;
ALTER DATABASE `API_REGISTRO` CHARACTER SET utf8 COLLATE utf8_general_ci;

USE API_REGISTRO;

CREATE TABLE IF NOT EXISTS `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cedula` VARCHAR(12) NOT NULL, 
    `nombre` VARCHAR(50) NOT NULL, 
    `email` VARCHAR(50)  DEFAULT NULL, 
    `telefono` VARCHAR(11)  NOT NULL, 

    PRIMARY KEY(`id`),
    UNIQUE KEY `uniq_cedula` (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


CREATE TABLE IF NOT EXISTS `compras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idcliente` INTEGER NOT NULL,
    `numero_factura` VARCHAR(50) NOT NULL, 
    `cedula` VARCHAR(50) NOT NULL, 
    `fecha_compra` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    `lugar_compra` VARCHAR(30)  NOT NULL, 
    `monto` DECIMAL(18,5) NOT NULL, 
    `producto` VARCHAR(12) NOT NULL, 
    `cantidad` DECIMAL NOT NULL, 

    PRIMARY KEY(`id`),
    UNIQUE KEY `uniq_numero_factura` (`numero_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `compras`
ADD CONSTRAINT `cliente_fbk`
FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- PROCEDIMIENTOS ALMACENADOS PARA Cliente

DELIMITER $$
CREATE PROCEDURE addClient(
    IN pcedula VARCHAR(12),
    IN pnombre VARCHAR(80),
    IN pemail VARCHAR(50),
    IN ptelefono VARCHAR(11)
    )
BEGIN
    
    INSERT INTO cliente(cedula,nombre, email, telefono) 
    VALUES(pcedula,pnombre, pemail,ptelefono);
    
    SELECT 'OK';
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE getClient(
    IN pdni VARCHAR(12)
    )
BEGIN

    SELECT cedula,nombre,email,telefono FROM cliente WHERE cedula=pdni;
    
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE getClientById(
    IN clientId INTEGER
    )
BEGIN

    SELECT id FROM cliente WHERE id = clientId;
    
END$$
DELIMITER ;

-- PROCEDIMIENTOS ALMACENADOS PARA COMPRAS addPurchase

DELIMITER $$
CREATE PROCEDURE getPurchases(
    IN pdni VARCHAR(12)
    )
BEGIN

    SELECT  c.numero_factura,c.fecha_compra,c.lugar_compra,c.monto,c.producto,c.cantidad
        FROM compras c, cliente cl 
        WHERE c.idcliente = cl.id
        AND cl.cedula = pdni;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE addPurchase(
    IN pidcliente INTEGER,
    IN pnumero_factura VARCHAR(50),
    IN pcedula VARCHAR(12),
    IN plugar_compra VARCHAR(50),
    IN pmonto DECIMAL(18,5),
    IN pproducto VARCHAR(80),
    IN pcantidad DECIMAL
    )
BEGIN

    INSERT INTO compras(idcliente,numero_factura,cedula,lugar_compra,monto,producto,cantidad) 
        VALUES(pidcliente,pnumero_factura,pcedula,plugar_compra,pmonto,pproducto,pcantidad);

    SELECT 'OK';

END$$
DELIMITER ;