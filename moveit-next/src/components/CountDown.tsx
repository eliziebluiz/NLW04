import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/CountDown.module.css";

let countDownTimeOut: NodeJS.Timeout;

export function CountDown(){

  const { startNewChallenge } = useContext(ChallengesContext);


  const [time, setTime] = useState(0.1*60);

  const[isActive, setIsActive] = useState(false);

  const[hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time/60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountDown(){
    setIsActive(true);
  }

  function resetCountDown(){
    clearTimeout(countDownTimeOut);
    setIsActive(false);
    setTime(0.1*60);
  }

  useEffect(()=>{
    if(isActive && time>0){
      countDownTimeOut = setTimeout(()=>{
        setTime(time-1);
      }, 1000)
    } else if(isActive && time=== 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return(
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {/* If ternario que só tem a condição de true hasFinished && */}
      {hasFinished ? (
        <button
         type="button"
         disabled
         className={styles.countDownButton}>
          Ciclo encerrado
        </button>
       ):(
         <>
           {isActive ?
           (
              <button
                type="button"
                onClick={resetCountDown}
                className={`${styles.countDownButton} ${styles.countDownButtonActive}`}>
                  Abandonar ciclo
              </button>
            )
              :
            (
              <button
                type="button"
                onClick={startCountDown}
                className={styles.countDownButton}>
                  Iniciar ciclo
              </button>
            )}
         </>
       )}


    </div>
  );
}