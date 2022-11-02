import React, { useState } from "react";
import { useEffect } from "react";
import useSound from 'use-sound';
import play from '../assets/sounds/play.mp3';
import correct from '../assets/sounds/correct.mp3';
import wrong from '../assets/sounds/wrong.mp3';





export const Trivia = (props) => {
  const [questions, setQuestions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classNames, setClassNames] = useState('answer')

  const [letsPlay] = useSound(play)
  const [correctAnswer] = useSound(correct)
  const [wrongAnswer] = useSound(wrong)
  

  useEffect(()=> {
      letsPlay()
  }, [letsPlay ])


  useEffect(() => {
    setQuestions(props.data[props.questionNumber - 1]);
  }, [props.data, props.questionNumber]);


  const handleClick = (a) => {
    // console.log(a) 
    setSelectedAnswer(a);
    setClassNames('answer active')

    setTimeout(() => {
        setClassNames(a.correct ? 'answer correct' : 'answer wrong')
    }, 3000);

    setTimeout(() => {
        if(a.correct){
          correctAnswer()

            setTimeout(()=> {
              props.setQuestionNumber((prev)=> prev + 1)
              setSelectedAnswer(null)
            }, 7000)

        }else{
          setTimeout(()=> {
            wrongAnswer()
            props.setStop(true)
          }, 7000)
          
        }
    }, 3000);
  };


  return (
    <div className="trivia">
      <div className="question">{questions?.question}</div>
      <div className="answers">
        {questions?.answers.map((a) => {
          return (
            <div
              className={selectedAnswer === a ? classNames : 'answer'}
              key={a.text}
              onClick={() => handleClick(a)}
            >
              {a.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
