const express = require('express')
const app = express()
const fetch = require("node-fetch")
const fs = require('fs')
const path = require('path')
var URL = require('url').URL
app.use(express.json())
app.use(express.static('./frontend/web/views'))

app.get('/test', (req, res) => {
	res.json({ hello: 'world' }
	)
})
app.get('/splash', (req, res) => {
	res.get('/frontend/web/views/splash.html')

})
let recipes = undefined
app.get('/status', (req, res) => {
	res.json({ hasRecipe: recipes != undefined })
})
app.get('/tests', (req, res) => {
	console.log((req.query.ingredients))

})

// gets and caches a recipe from edamam
app.get('/recipe', (req, res) => {
	let query = new URL('https://api.edamam.com/search?app_id=a593916b&app_key=5e107e6eccb15211d97ac9cc54c287de')
	query.searchParams.append('q', (req.query.ingredients).split(' ').join('+'))
	fetch(query).then(
		r => r.json()
	).then(e => {
		recipes = e.hits[Math.floor(Math.random() * e.hits.length)].recipe;
		console.log(recipes);
		res.json(recipes);
	}).catch((err) => {
		console.log(err);
		res.status(500).send()
	})
})
app.get('/clear', (req, res) => { recipes = undefined; res.json({ success: true }) })
app.get('/recipe-list', (req, res) => {
	console.log(recipes)
	res.send(recipes)
})
app.listen(process.env.PORT || 3000, function () {
	console.log(`Now listening on ${process.env.PORT || 3000}`)
})


