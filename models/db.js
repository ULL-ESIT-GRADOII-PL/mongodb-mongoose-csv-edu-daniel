(function() {
	"use strict";
    const util = require('util');
    const mongoose = require('mongoose');

    const Schema = mongoose.Schema({ /* Creamos un esquema para nuestra base de datos. */
        "name": {
            type: String,
            unique: true
        },
        "content": String
    });

    const Input = mongoose.model("Input", Schema);

    /* Establecemos nuestros tres ejemplos */
    let input1 = new Input({
        "name": "input1.csv",
        "content": `"producto",           "precio"
                    "camisa",             "4,3"
                    "libro de O\\"Reilly", "7,2"`
    });
    let input2 = new Input({
        "name": "input2.csv",
        "content": `"producto",           "precio"  "fecha"
                    "camisa",             "4,3",    "14/01"
                    "libro de O\\"Reilly", "7,2"     "13/02"`
    });
    let input3 = new Input({
        "name": "input3.csv",
        "content": `"edad",  "sueldo",  "peso"
                    ,         "6000€",  "90Kg"
                    47,       "3000€",  "100Kg"`

    });

    let promise1 = input1.save(function (err) {
    	if (err) { 
    		console.log(`Hubieron errores:\n${err}`); 
    		return err; 
    	}
    	console.log(`Saved: ${input1}`);
  	});

  	let promesa2 = input2.save(function (err) {
    	if (err) { 
    		console.log(`Hubieron errores:\n${err}`); 
    		return err; 
    	}
    	console.log(`Saved: ${input2}`);
  	});

    let promesa3 = input3.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Saved: ${input3}`);
    });

  	Promise.all([promesa1, promesa2, promesa3]).then( (value) => { 
    	console.log(util.inspect(value, {depth: null}));  
    	mongoose.connection.close(); 
  	});

  	module.exports = Input;

})