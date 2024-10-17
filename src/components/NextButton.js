import React from "react";

function NextButton({ dispatch, answer, index, numOfQuestions }) {
  console.log(index, numOfQuestions);
  if (answer === null) return null;

  if (index < numOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NEXT_QUESTION" })}
      >
        Next
      </button>
    );
  }

  if (index === numOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "FINISHED" })}
      >
        Finnish
      </button>
    );
  }
}

export default NextButton;
