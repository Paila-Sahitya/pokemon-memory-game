import './../styles/GameOver.css'
export default function GameOver({moves, bestScore, onRestart}){


    return <div className="game-over">
        <h1>Game Over</h1>
        <p>You finished in <strong>{moves}</strong> moves!</p>
        {bestScore!==null && <p> Best Score: {bestScore==0? moves: bestScore} moves</p>}
        <button onClick={onRestart}>Play Again</button>
    </div>
}