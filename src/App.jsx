import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StartScreen from './components/StartScreen.jsx'
import GameBoard from './components/GameBoard.jsx'
import GameOver from './components/GameOver.jsx'

function App() {

  const [gameStarted, setGameStarted]=useState(false);
  const [moves, setMoves]=useState(0);
  const [highScore, setHighScore]=useState(null);
  const [gameOver, setGameOver]=useState(false);
  
  // array of pokemon objects 
  //pokemon obj- name, image, flipped, matched

  const [pokemon, setPokemon]=useState([]);
  const fetchPokemon= async () =>{
    const res=await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
    const data= await res.json();

    const pokemonDetails=await Promise.all(
      data.results.map(async (p)=>{
        const pokeRes=await fetch(p.url);
        const pokeData=await pokeRes.json();

        return {
          name: pokeData.name,
          image: pokeData.sprites.front_default,
          flipped:false,
          matched: false,
        };
      })
    );
    //duplicate the array to create pairs and assign an id to each card
    const pairedCards =[...pokemonDetails, ...pokemonDetails].map((card, index)=>({
      ...card,
      id: index,
    }));

    //shuffle the cards
    const shuffledCards = pairedCards.sort(()=> Math.random()-0.5);
    setPokemon(shuffledCards);
  };
   

  const handleGameOver =()=>{
    setGameOver(true);
    if(highScore===null || moves<highScore){
      setHighScore(moves);
    } 
  };

  if(!gameStarted){
    return <StartScreen onStart={()=>{
      setGameStarted(true);
      fetchPokemon();
    }}/>
  }

  if(gameOver){
    return <div>
      <GameOver
        moves={moves}
        bestScore={highScore}
        onRestart={()=>{
          setMoves(0);
          setGameOver(false);
          setGameStarted(false);
        }}
      />
    </div>  
  }

  return <div>
    
    {/* <p>Game Started...</p> */}
    <GameBoard 
      pokemonList={pokemon} 
      setPokemonList={setPokemon}
      onGameOver={handleGameOver}
      moves={moves}
      setMoves={setMoves} />
  </div>
}

export default App;
