import "./Pokecard.css"

function Pokecard(props) {

    const POKE_API = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
    let padToThree = number => (number <= 999 ? `00${number}`.slice(-3) : number);
    let imgSrc = `${POKE_API}${padToThree(props.id)}.png`;

    return (
        <div className="Pokecard">
            <h3>{props.name}</h3>
            <img src={imgSrc} alt={props.id} className="Pokecard-image"/>
            <p>{props.type}</p>
            <p>{props.exp}</p>
        </div>
    );
}

export default Pokecard