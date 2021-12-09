import { getPokemonById } from "../../../helpers/utils";

export default function (req, res) {
  const { id } = req.query;
  fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    .then(response => response.json())
    .then(data => {
      const pokemons = data.pokemon;
      const pokemon = getPokemonById(pokemons, id);
      res.status(200).json({pokemon});
    })
    .catch(error => res.status(500).json(error));
}