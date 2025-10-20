import './../styles/card.css'
import cardBack from './images/Pokemon.jpeg'
export default function Card({card, handleChoice, flipped}){


    return <div 
        className="card"
        onClick={()=> !flipped && handleChoice(card)}
    >
    {flipped?
        (
            <div className="card-front">
                <div className="card-content">
                    <img 
                        src={card.image} 
                        alt={card.name}  
                        className="card-image"                 
                    />
                    <p className="card-name">{card.name}</p>
                </div>
            </div>
        )
    :
        (
            <div className="card-back" >
                <img
                    src={cardBack}
                    alt="Card Back"
                    className="card-image"
                />
            </div>
        )
    }              
        
    </div>
}