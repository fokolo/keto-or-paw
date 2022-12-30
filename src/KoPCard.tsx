import React, { useState, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";
import { KoPCardOptions, SwipeDirections } from "./types";
import { KetoIcon, PawIcon } from "./Icons";
import { shuffle } from "./utils";

const db: KoPCardOptions[] = [
  {
    imageUrl: "./dog1.png",
    kop: "paw",
  },
  {
    imageUrl: "./dog2.png",
    kop: "paw",
  },
  {
    imageUrl: "./dog3.png",
    kop: "paw",
  },
  {
    imageUrl: "./dog4.png",
    kop: "paw",
  },
  {
    imageUrl: "./dog5.png",
    kop: "paw",
  },
  {
    imageUrl: "./keto1.png",
    kop: "keto",
  },
  {
    imageUrl: "./keto2.png",
    kop: "keto",
  },
  {
    imageUrl: "./keto3.png",
    kop: "keto",
  },
  {
    imageUrl: "./keto4.png",
    kop: "keto",
  },
  {
    imageUrl: "./keto5.png",
    kop: "keto",
  },
];

export function KoPCard({ incScore }: { incScore: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(shuffle(db).length)
        .fill(0)
        .map((i) => React.createRef<any>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const characters = db;
  const swiped = (
    direction: SwipeDirections,
    kop: KoPCardOptions["kop"],
    index: number
  ) => {
    updateCurrentIndex(index - 1);
    if (kop === "keto" && direction === "right") {
      incScore();
    } else if (kop === "paw" && direction === "left") {
      incScore();
    }
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  const canSwipe = currentIndex >= 0;

  const swipe = async (dir: SwipeDirections) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <div>
      <div className="cardContainer">
        {characters.map((character, index) => (
          <TinderCard
            className="swipe"
            ref={childRefs[index]}
            key={character.imageUrl}
            onSwipe={(dir) => swiped(dir, character.kop, index)}
            onCardLeftScreen={() => outOfFrame(character.imageUrl)}
            swipeRequirementType="position"
            preventSwipe={["down", "up"]}
          >
            <div
              style={{ backgroundImage: "url(" + character.imageUrl + ")" }}
              className="card"
            />
          </TinderCard>
        ))}
        <h3 style={{ marginTop: "50px" }}>More coming soon...</h3>
      </div>
      <div className="actions">
        <button onClick={() => swipe("left")}>
          <PawIcon />
        </button>
        <button onClick={() => swipe("right")}>
          <KetoIcon />
        </button>
      </div>
    </div>
  );
}
