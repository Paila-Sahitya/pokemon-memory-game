import { useState, useEffect} from 'react'
import Card from './Card.jsx'
import './../styles/GameBoard.css'

export default function GameBoard({pokemonList, setPokemonList, onGameOver, moves, setMoves}){

    const [choiceOne, setChoiceOne]=useState(null);
    const [choiceTwo, setChoiceTwo]=useState(null);
    const [disabled, setDisabled]= useState(false);

    const resetChoices=()=>{
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
    }

    //compare-if selected cards match mark them
    useEffect(()=>{
        if(choiceOne && choiceTwo){
            setMoves(prev=> prev+1);
            setDisabled(true);
            if(choiceOne.name === choiceTwo.name){
                //matched - update list of cards
                setPokemonList((prev) =>{
                    const updated=prev.map((card) =>
                        card.id === choiceOne.id || card.id===choiceTwo.id 
                            ? {...card, matched: true}
                            : card
                    )
                    //detect gameover
                    if(updated.every(card=>card.matched)){
                        setTimeout(()=> onGameOver(), 500);
                    }
                    return updated;
                });
                setTimeout(()=>resetChoices(),500);
            }
            else{
                //different 
                setTimeout(()=> resetChoices(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    //handle card selection
    const handleChoice=(card)=>{
        if(!disabled){
            if(!choiceOne){
                setChoiceOne(card);
            }
            else if(card.id!=choiceOne.id){
                setChoiceTwo(card);
            }
        }
        
    };


    return <div>
        <div className="game-info">
            <h2>Moves: {moves}</h2>
        </div>
        <div className="game-board">
            {pokemonList.map((pcard)=>{
                return <Card 
                    key={pcard.id} 
                    card={pcard} 
                    handleChoice={handleChoice}
                    flipped={
                        pcard.id===choiceOne?.id || pcard.id===choiceTwo?.id || pcard.matched
                    }
                />
            })}
        </div>
    </div>
}