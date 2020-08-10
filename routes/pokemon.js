var express = require('express');
var router = express.Router();
var db = require('../models');
var axios = require('axios');

//callback function, displays the pokemon posted.
router.get('/', async (req, res) => {
  try{
    const favorites = await db.pokemon.findAll(); //identifies data called by favorites
    res.render("pokemon", {pokemon: favorites}) //rendering /pokemon.ejs, defintes pokemon as the data posted to favorites
    //struggled with this syntax the most, need to review this array structure more
  } catch (err){
    res.send(err, "Error");
  }
});
//when form post submitted...
router.post('/', async (req, res) => {
try {
  await db.pokemon.findOrCreate({
    where: {
      name: req.body.name //create new pokemon in database with the button's name.
    },
  })
  res.redirect('/pokemon') //open up the favorites page upon selection

} catch (err){
  console.log(err, "Error")
}
});


router.get('/:id', async (req, res) => {
try {
  let pokeID = req.params.id;
  let pokemonAPI = 'http://pokeapi.co/api/v2/pokemon/' + pokeID;
  axios.get(pokemonAPI).then(response => {
    let pokemonData = response.data;
    res.render('show', {pokemon: pokemonData})
  })
} catch (err) {
    res.send(err, "Error")
  }
});

module.exports = router;
