"use esversion: 6";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/csv'); /* Iniciamos la conexión con la base de datos */

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

calculate = require('./models/calculate');

app.get('/', (request, response) => {
	response.render('index', {title: 'CSV Analizer'});
});

app.get('/csv', (request, response) => { //
	response.send({"rows": calculate(request.query.input)}); // Solo se envian los datos necesarios, no una vista, de ahi a que no se use render.
});
 
const Input = require('./models/db'); // Usamos nuestro modelo.

app.get('/mongo/', function(req, res) {
    let input = new Input({
        "name": req.query.name,
        "content": req.query.content
    });

    input.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Saved: ${input}`);
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});