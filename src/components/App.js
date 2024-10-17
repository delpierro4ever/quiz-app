import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinnishedScreen from "./FinnishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initailState = {
  questions: [],
  status: "loading",
  currentQuestionIndex: 0,
  error: null,
  currentQuestion: null,
  answer: null,
  score: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECIEVED":
      return { ...state, questions: action.payload, status: "ready" };
    case "DATA_FAILED":
      return { ...state, status: "error" };
    case "START_QUIZ":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "NEW_ANSWER":
      const question = state.questions.at(state.currentQuestionIndex);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };

    case "FINISHED":
      return {
        ...state,
        status: "finished",
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };

    case "RESTART":
      return {
        ...state,
        currentQuestionIndex: 0,
        answer: null,
        status: "ready",
        score: 0,
      };

    case "TICK":
      if (state.secondsRemaining > 0) {
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
        };
      } else {
        return {
          ...state,
          status: "finished",
          highscore:
            state.score > state.highscore ? state.score : state.highscore,
        };
      }

    // case 'SET_LOADING':
    // case 'SET_QUESTIONS':
    //   return {...state, questions: action.payload, status: 'idle' };
    // case 'SET_ERROR':
    //   return {...state, error: action.payload, status: 'error' };
    // case 'SET_CURRENT_QUESTION':
    //   return {...state, currentQuestion: action.payload };
    // case 'ADD_ANSWER':
    //   return {...state, answers: [...state.answers, action.payload] };
    // case 'INCREMENT_SCORE':
    //   return {...state, score: state.score + 1, currentQuestionIndex: state.currentQuestionIndex + 1 };
    default:
      throw new Error("Unexpected action");
  }
}
function App() {
  const [
    {
      questions,
      status,
      currentQuestionIndex,
      answer,
      score,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initailState);

  useEffect(function () {
    fetch("http://localhost:3001/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "DATA_RECIEVED", payload: data }))
      .catch((error) => dispatch({ type: "DATA_FAILED" }));
  }, []);

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={currentQuestionIndex}
              numOfQuestions={numOfQuestions}
              maxPossiblePoints={maxPossiblePoints}
              score={score}
              answer={answer}
            />
            <Question
              question={questions[currentQuestionIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numOfQuestions={numOfQuestions}
                index={currentQuestionIndex}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinnishedScreen
            score={score}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
