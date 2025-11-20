import { useState } from "react"
import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";
import Gameover from "./components/Gameover.jsx";
const initialBoardGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],

];
//helper function
function deriveactiveplayer(gameturns) {
  let currentplayer = 'X';
  if (gameturns.length > 0 && gameturns[0].player === 'X') {
    currentplayer = 'O';
  }
  return currentplayer;
}
function App() {
  const [gameturns, setgameturns] = useState([]);

  const [players, setplayers] = useState({
    X: 'player 1',
    O:'player 2',
  })
  //const [haswinner, sethaswinner] = useState(false);
  // const [activeplayer, setactiveplayer] = useState('X');
  const activeplayer = deriveactiveplayer(gameturns);

  let gameboard = [...initialBoardGame.map(array=>[...array])];
  for (const turn of gameturns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  let winner
  for (const commbinations of WINNING_COMBINATIONS) {
    const firstsquaresymbol=gameboard[commbinations[0].row][commbinations[0].column]
    const secondsquaresymbol = gameboard[commbinations[1].row][commbinations[1].column]
    const thirdsquaresymbol = gameboard[commbinations[2].row][commbinations[2].column]

    if (firstsquaresymbol && firstsquaresymbol === secondsquaresymbol && firstsquaresymbol === thirdsquaresymbol) {
      winner = players[firstsquaresymbol];
    }
  }
  let hasdraw = gameturns.length === 9 && !winner;
  
  function handleactiveplayer(rowindex,colindex) {
   // setactiveplayer((curactiveplayer) => curactiveplayer === 'X' ? 'O' : 'X');
    setgameturns((prevturns) => {
      // let currentplayer = 'X';
      // if (prevturns.length>0 && prevturns[0].player === 'X') {
      //   currentplayer = 'O';
      // }
      const currentplayer = deriveactiveplayer(prevturns);
      const updatedturns = [{ square: { row: rowindex, col: colindex }, player: currentplayer }, ...prevturns,]
      return updatedturns;
    });
  }
  function handlereset() {
    setgameturns([]);
  }

  function handleplayernamechange(symbol, newname) {
    setplayers(prevplayers => {
      return {
        ...prevplayers,
        [symbol]:newname
      }
    })
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialname="Player 1" symbol="X" isactive={activeplayer === 'X'}
            onchangename={ handleplayernamechange} />
          <Player initialname="Player 2" symbol="O" isactive={activeplayer === 'O'} onchangename={handleplayernamechange} />
        </ol>
        {(winner|| hasdraw) && <Gameover winner={winner} onrestart={handlereset}/>}
        <GameBoard onselectsquare={handleactiveplayer} board={gameboard} />
        <Log turns={ gameturns} />
      </div>
    </main>
  )
}

export default App
