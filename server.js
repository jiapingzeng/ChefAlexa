const express = require('express')
const app = express()
const fetch = require("node-fetch")
const fs = require('fs')
const path = require('path')
const example = require('./example.json')
var URL = require('url').URL
app.use(express.json())
app.use(express.static('./frontend/web/views'))

app.get('/test', (req, res) => {
	res.json({ hello: 'world' }
	)
})
app.get('/splash', (req, res) => {
	if (req.secure) {
		res.json(splash.html)
	} else {
		// request was via http, so redirect to https
		res.redirect('https://' + req.headers.host + req.url);
	}

})
let recipes = undefined
app.get('status', (req, res)=>{
	res.json({hasRecipe: recipes != undefined})
})
// gets and caches a recipe from 
app.get('/recipe', (req, res)=>{

})
app.get('/recipe-list', (req, res) => {
	console.log(JSON.parse(req.query.ingredients))
	let query = new URL('https://api.edamam.com/search?app_id=a593916b&app_key=5e107e6eccb15211d97ac9cc54c287de')
	query.searchParams.append('q', JSON.parse(req.query.ingredients).join('+'))
	query.searchParams.append('ingr', JSON.parse(req.query.ingredients).length)
	fetch(query).then((r) => res.json({ "hits": r })
	).catch(() => res.status(500).send())
})
app.listen(process.env.PORT || 3000, function () {
	console.log(`Now listening on ${process.env.PORT || 3000}`)
})


