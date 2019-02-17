const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.json())
app.use(express.static('./views'))

app.listen(process.env.PORT || 3000, function(){
	console.log(`Now listening on ${process.env.PORT || 3000}`)})

	
