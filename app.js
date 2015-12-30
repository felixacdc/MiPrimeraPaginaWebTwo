var express = require('express');
// agregar mongoose
var mongoose = require('mongoose');

// conexcion a la db
//mongoose.connect('mongodb://localhost/primera_pagina');
//Definir el schema de nuestros productos equivale a crear un atabla
// var productShema = {
//     title:String,
//     description:String,
//     imageUrl: String,
//     pricing: Number
// };

// crear un modelo, que define el nombre y la estructura del objeto (tabla)
// var Product = mongoose.model("Product", productShema);

// instanciar un objeto express, este contine los metodos necesarios para hacer
// funcionar nuestra aplicacion
var app = express();

// definir el motor de vistas para la aplicacion
app.set("view engine", "jade");

// para servir imagenes, css y js se utiliza una carpeta estatica o assets
// el nombre de la carpeta es opcional y dentro de ella iran todos los css, js, imagenes, etc.
app.use(express.static("public"));

// le decimos a express que vamos a recivir peticiones en esta URL /
// aceptamos la peticion por medio de metodo GET
// req: es el request(peticion o solicitud) del usuario, este request trae informacion como
// que parametros mando el usuario, que encabezados trae la peticion, de que navegador viene, etc
// res: es la respuesta de nuestra parte, podemos responder con una pagina web, un string, un numero, etc.
app.get("/", function(req, res) {

    // Insertar un dato a la db
    // var data = {
    //     title: "Mi primer producto",
    //     description: "una mega super hiper compra",
    //     imageUrl: "burger.png",
    //     pricing: 10
    // };
    //
    // var product= new Product(data);
    //
    // product.save(function(err){
    //     console.log(product);
    // });

    // render se utiliza para llamar a una vista, no se coloca la extencion de la vista porque con el app.get("view engine", "jade"); se indico que todas las vista seran .jade
    res.render("index");
    // end finaliza la peticion
    // res.end("Hola Mundo");
});

// definir la ruta atravez de la cual se van a crear los productos
app.get("/menu/new", function(request, response){
    response.render("menu/new");
});

// puerto en el que la aplicacion va a estar escuchando
app.listen(8080);
