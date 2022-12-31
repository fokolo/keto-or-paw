import { KoPCard } from "./KoPCard";
import "./App.css";
import { ScoreIcon } from "./Icons";
import { useCallback, useState } from "react";
import Particles from "react-particles";
import { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { defaultConfig } from "./confetti";

function App() {
  const [score, setScore] = useState(0);
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

  return (
    <div className="app">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={defaultConfig}
      />
      <div>
        <ScoreIcon />
        <div className="scoreBoard" key={score}>
          {`${score}`.padStart(2, "0")}
        </div>
      </div>
      <KoPCard
        incScore={() => {
          setScore(score + 1);
        }}
      />
    </div>
  );
}

export default App;
