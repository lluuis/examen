 

const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const mysql = require('mysql')



app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "image")));

app.use(cors())


const conexion = mysql.createConnection({
	host : "127.0.0.1",
	user : "amaury",
	password : "5005",
	database : "SEXSTOP" 

})

conexion.connect((error) => {
	if(error){
		console.log("error en la coenxion ")
	}else{

		console.log("coenxion exitosa")
	}
})

app.get('/',(req,res) => {
	res.sendFile(path.join(__dirname,"public","index.html"))
})


app.get('/mostrar/:nombre' , (req,res) => {

	var nombre = req.params.nombre 
	switch(nombre){
		case "awi" :
			var id = "FIG001" 
		break;
		case "tati" : 
			var id = "FIG005"
		break;
		case "gigi" : 
			var id = "FIG002"
		break;
		case "naginy" : 
			var id = "FIG004"
		break;
		case "sondami" : 
			var id = "FIG003"
		break;
		default : 
			console.log("opcion invalida")
		break; 
	}

	const consulta = "select * from figura where ID_figura = ?"
	conexion.query(consulta , [id] , (error,resultado) => {
		if(error){
			console.log("error en consulta")
		}else{
			res.json(resultado)
			console.log(resultado)
		}
	})

})
app.get('/precios' , (req,res) => {
	const consulta_lana = "select precio from figura" 
	conexion.query(consulta_lana , (error,resultado) => {
		if(error){
			console.log("no se pudo conectar ala base de datos")
		}else{
			res.json(resultado)
		}
	})
})

module.exports = app 
