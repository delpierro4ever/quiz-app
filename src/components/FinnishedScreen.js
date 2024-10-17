import React from "react";

function FinnishedScreen({ score, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (score / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{score}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESTART" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinnishedScreen;
