var express = require('express');

// instanciar un objeto express, este contine los metodos necesarios para hacer
// funcionar nuestra aplicacion
var app = express();

// definir el motor de vistas para la aplicacion
app.set("view engine", "jade");

// le decimos a express que vamos a recivir peticiones en esta URL /
// aceptamos la peticion por medio de metodo GET
// req: es el request(peticion o solicitud) del usuario, este request trae informacion como
// que parametros mando el usuario, que encabezados trae la peticion, de que navegador viene, etc
// res: es la respuesta de nuestra parte, podemos responder con una pagina web, un string, un numero, etc.
app.get("/", function(req, res) {
    // render se utiliza para llamar a una vista, no se coloca la extencion de la vista porque con el app.get("view engine", "jade"); se indico que todas las vista seran .jade
    res.render("index");
    // end finaliza la peticion
    // res.end("Hola Mundo");
});

// puerto en el que la aplicacion va a estar escuchando
app.listen(8080);
