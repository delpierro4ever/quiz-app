import React from "react";

function Progress({ index, numOfQuestions, score, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        <strong>{index + 1}</strong>/<strong>{numOfQuestions}</strong>
      </p>

      <p>
        <strong>{score}</strong>/<strong>{maxPossiblePoints}</strong>
      </p>
    </header>
  );
}

export default Progress;
