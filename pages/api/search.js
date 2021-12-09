import { list1GenPokemons } from "../../constants/Pokemons";

export default function handler(req, res) {
    const { q } = req.query;

    if (q) {
        const results = list1GenPokemons.filter((pokemon) => {
            const { name } = pokemon;
            return name.toLowerCase().includes(q.toLowerCase());
        });
        return res.status(200).json(results);
    }

    // we don't have anything
    res.status(400).json();
}