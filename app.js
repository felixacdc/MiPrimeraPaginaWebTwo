var express = require('express');

// instanciar un objeto express, este contine los metodos necesarios para hacer
// funcionar nuestra aplicacion
var app = express();

// le decimos a express que vamos a recivir peticiones en esta URL /
// aceptamos la peticion por medio de metodo GET
// req: es el request(peticion o solicitud) del usuario, este request trae informacion como
// que parametros mando el usuario, que encabezados trae la peticion, de que navegador viene, etc
// res: es la respuesta de nuestra parte, podemos responder con una pagina web, un string, un numero, etc.
app.get("/", function(req, res) {
    res.send("Hola mundo, curso mi primera pagina web");
    // end finaliza la peticion
    // res.end("Hola Mundo");
});

// puerto en el que la aplicacion va a estar escuchando
app.listen(8080);
