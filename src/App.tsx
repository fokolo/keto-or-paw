import { KoPCard } from "./KoPCard";
import "./App.css";
import { ScoreIcon } from "./Icons";
import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="app">
      <div>
        <ScoreIcon />
        <div className="scoreBoard" key={score}>
          {`${score}`.padStart(2, "0")}
        </div>
      </div>
      <KoPCard incScore={() => setScore(score + 1)} />
    </div>
  );
}

export default App;
