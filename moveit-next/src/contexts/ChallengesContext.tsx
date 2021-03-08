import {createContext, ReactNode, useEffect, useState} from "react";
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from "../components/levelUpModal";

interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData{
  level: number;
  currentExpirence: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
  experienceToNextLevel: number;
}

interface ChallengesProvider{
    children: ReactNode;
    level:number;
    currentExpirence: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({ } as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProvider){
  const[level, setLevel] = useState(rest.level??1);
  const[currentExpirence, setCurrentExpirence ] = useState(rest.currentExpirence??0);
  const[challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted??0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level+1)*4, 2);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  useEffect(()=>{
    Notification.requestPermission();
  }, [])

  useEffect(()=>{
    Cookies.set('level', String(level));
    Cookies.set('currentExpirence', String(currentExpirence));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExpirence, challengesCompleted])

  function levelUp(){
    setLevel(level+1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge(){
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengesIndex];
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play();

    if(Notification.permission === "granted"){
      new Notification('Novo Desafio 🎊', {
        body: `Valendo${challenge.amount}xp`
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completeChallenge(){
    if(!activeChallenge) return;

    const {amount} = activeChallenge;

    let finalExperience = currentExpirence + amount;

    if(finalExperience>= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExpirence(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted+1);
  }

return(
    <ChallengesContext.Provider
      value={{
        level,
        currentExpirence,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal
      }}>
      {children}
      {isLevelUpModalOpen&&<LevelUpModal/>}
    </ChallengesContext.Provider>
  );
}