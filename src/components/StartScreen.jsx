import './../styles/StartScreen.css'

export default function StartScreen({onStart}){

    return <div className="start-screen">

        <div className="content">
            <h1>Welcome to </h1>
            <h1>Pokemon Memory Game</h1>
            <p>Match all pairs to win</p>
            <button onClick={onStart}>Start Game</button>
        </div>   
    </div>
}