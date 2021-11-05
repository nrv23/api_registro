
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
    UNIQUE KEY `uniq_cedula` (`cedula`),
    UNIQUE KEY `uniq_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


CREATE TABLE IF NOT EXISTS `compras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_factura` VARCHAR(50) NOT NULL, 
    `cedula` VARCHAR(50) NOT NULL, 
    `fecha_compra` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    `lugar_compra` VARCHAR(30)  NOT NULL, 
    `monto` DECIMAL(18,5) NOT NULL, 
    `producto` VARCHAR(12) NOT NULL, 
    `cantidad` DECIMAL(5,2) NOT NULL, 

    PRIMARY KEY(`id`),
    UNIQUE KEY `uniq_numero_factura` (`numero_factura`),
    FOREIGN KEY(`cedula`) REFERENCES `cliente`(`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


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
-- PROCEDIMIENTOS ALMACENADOS PARA COMPRAS addPurchase

DELIMITER $$
CREATE PROCEDURE getPurchases(
    IN pdni VARCHAR(12)
    )
BEGIN

    SELECT  c.numero_factura,c.fecha_compra,c.lugar_compra,c.monto,c.producto,c.cantidad
        FROM compras c, cliente cl 
        WHERE c.cedula = cl.cedula
        AND cl.cedula = pdni;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE addPurchase(
    IN pnumero_factura VARCHAR(50),
    IN pcedula VARCHAR(12),
    IN plugar_compra VARCHAR(50),
    IN pmonto DECIMAL(18,5),
    IN pproducto VARCHAR(80),
    IN pcantidad DECIMAL(5,2)
    )
BEGIN

    INSERT INTO compras(numero_factura,cedula,lugar_compra,monto,producto,cantidad) 
        VALUES(pnumero_factura,pcedula,plugar_compra,pmonto,pproducto,pcantidad);

    SELECT 'OK';

END$$
DELIMITER ;