var express = require('express');
// agregar mongoose
var mongoose = require('mongoose');
// incluir el body parser sirve para poder visualizar en consola los datos mandados por post o parsearlos
var bodyParser = require('body-parser');
// agregar plugin multer
var multer = require('multer');
// agregar la libreria cloudinary
var cloudinary = require('cloudinary');
var method_override = require("method-override");
var app_password = "123456";


cloudinary.config({
    cloud_name: "dmz1y7lws",
    api_key: "585322687335557",
    api_secret: "T64PbqUZsEAJFdECWZ_vV9EOUZE"
});

// instanciar un objeto express, este contine los metodos necesarios para hacer
// funcionar nuestra aplicacion
var app = express();
// conexcion a la db
mongoose.connect('mongodb://localhost/primera_pagina');

// usar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// indica a node de utilice multer el parametro dest indica el destino donde se guardaran las imagenes
app.use(multer({ dest: 'uploads/'}).single('avatar'));
app.use(method_override("_method"));

//Definir el schema de nuestros productos equivale a crear un atabla
var productShema = {
    title:String,
    description:String,
    imageUrl: String,
    pricing: Number
};

// crear un modelo, que define el nombre y la estructura del objeto (tabla)
var Product = mongoose.model("Product", productShema);



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

// Ruta para el menu
app.get("/menu", function (request, response){
    Product.find(function (error, documents) {

        if (error) {
            console.log(error);
        }
        // se abre la vista y se pasan los valores obtenidos de la DB
        response.render("menu/index", { products: documents });
    });
});

// url de Editar
app.get("/menu/edit/:id", function(request, response) {
    var id_producto = request.params.id;

    Product.findOne({"_id": id_producto}, function(error, documents){
        console.log(documents);
        response.render("menu/edit", {product: documents});
    });

});

app.put("/menu/:id", function(request, response) {
    if (request.body.password == app_password) {
        var data = {
            title: request.body.title,
            description: request.body.description,
            pricing: request.body.pricing
        };

        Product.update({"_id": request.params.id}, data, function(product){
            response.redirect("/menu");
        });
    }else {
        response.redirect("/");
    }
});

// ruta para la vista del admin
app.get('/admin', function (request, response) {
    response.render('admin/form');
});

app.post('/admin', function (request, response) {
    if (request.body.password == app_password) {
        Product.find(function (error, documents) {

            if (error) {
                console.log(error);
            }
            // se abre la vista y se pasan los valores obtenidos de la DB
            response.render("admin/index", { products: documents });
        });
    }else {
        response.redirect("/");
    }
});



// definir la ruta Post para registrar los productos
app.post("/menu", function(request, response){

    if (request.body.password == app_password) {

        var data = {
            title: request.body.title,
            description: request.body.description,
            imageUrl: "burger.png",
            pricing: request.body.pricing
        };

        var product= new Product(data);

        cloudinary.uploader.upload(request.file.path,
                                    function(result) {
                                        product.imageUrl = result.url;
                                        product.save(function(err){
                                            console.log(product);
                                            response.render("index");
                                        });
                                    }
                                );
        /*product.save(function(err){
            console.log(product);
            response.render("index");
        });*/

    }else{
        response.render("menu/new");
    }

});
// puerto en el que la aplicacion va a estar escuchando
app.listen(8080);
