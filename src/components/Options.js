import React from "react";

function Options({ options, dispatch, answer, correctOption }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "NEW_ANSWER", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
