import { useEffect } from "react";
import { useState } from "react";
import { Start } from "./components/Start";
import { Timer } from "./components/Timer";
import { Trivia } from "./components/Trivia";
import { moneyPyramid, data } from "./data";

function App() {
  const [username, setUsername] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  useEffect(() => {
    setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1)?.amount);
  }, [questionNumber]);

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <h2 className="endText">
                You earned: {earned ? earned : "$ 0"}{" "}
              </h2>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>

                <div className="bottom">
                  <Trivia
                    data={data}
                    setStop={setStop}
                    setQuestionNumber={setQuestionNumber}
                    questionNumber={questionNumber}
                  />
                </div>
              </>
            )}
          </div>

          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => {
                return (
                  <li
                    className={
                      questionNumber === m.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }
                    key={m.id}
                  >
                    <span className="moneyListItemNumber">{m.id}</span>
                    <span className="moneyListItemAmount">{m.amount}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
