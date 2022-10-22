import Pokecard from "./Pokecard";
import "./Pokedex.css"
import Pokegame from "./Pokegame";

function Pokedex() {
    var poke=[
        { id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
        { id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
        { id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
        { id: 12, name: 'Butterfree', type: 'flying', base_experience: 178 },
        { id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
        { id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95 },
        { id: 94, name: 'Gengar', type: 'poison', base_experience: 225 },
        { id: 133, name: 'Eevee', type: 'normal', base_experience: 65 }
    ]
    poke = poke.sort((a, b) => 0.5 - Math.random());
    var countA = 0;
    var countB = 0;
    for (let i = 0; i < 4; i++) {
        console.log(poke[i].base_experience)
        countA = countA + poke[i].base_experience;
    }
    for (let i = 4; i < 8; i++) {
        countB = countB + poke[i].base_experience;
    }
    if (countA > countB) {
        var winner = 'A';
    }
    else {
        winner = 'B';
    }
    //console.log(winner)
    return (
        <div className="Pokedex">
            <h1 className="Pokedex-title">Pokedex</h1>
            {poke.map(p =>(
                <Pokecard id={p.id} name={p.name} type={p.type} exp={p.base_experience} />
            ))}
            <Pokegame win={winner}/>
        </div>
    );
}

export default Pokedex;