var express = require('express');
var router = express.Router();
var db = require('../models');
var axios = require('axios');

//callback function, displays the pokemon posted.
router.get('/', async (req, res) => {
    const favorites = await db.pokemon.findAll(); //identifies data called by favorites
    res.render("pokemon", {pokemon: favorites}) //rendering /pokemon.ejs, defintes pokemon as the data posted to favorites
    //struggled with this syntax the most, need to review this array structure more
});
//when form post submitted...
router.post('/', (req, res) => {
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name //create new pokemon in database with the button's name.
    },
  })
  res.redirect('/pokemon') //open up the favorites page upon selection
});


router.get('/:id', (req, res) => {
  let pokeID = req.params.id; //I'm not sure if I understand how this works, but it's what we've been doing so I used it. 
  //Still trying to read more about it, or maybe I don't need to focus so much on theory.
  let pokemonAPI = 'http://pokeapi.co/api/v2/pokemon/' + pokeID;
  axios.get(pokemonAPI).then(response => {
    let pokemonData = response.data;
    res.render('show', {pokemon: pokemonData}) //open show view, send pokemonData to produce pokemon
  })
});

module.exports = router;
