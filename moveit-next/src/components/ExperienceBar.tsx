import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExpirenceBar.module.css';

export function ExpirenceBar(){

  const {currentExpirence, experienceToNextLevel} = useContext(ChallengesContext);

  const percentToNextLevel = Math.round(currentExpirence*100)/experienceToNextLevel;

  return(
    <header className={styles.expirienceBar}>
      <span>0xp</span>
        <div>
          <div style={{width:`${percentToNextLevel}%`}}/>

          <span className={styles.currentExpirence} style={{left:`${percentToNextLevel}%`}}>
            {currentExpirence}xp
          </span>
        </div>
      <span>{experienceToNextLevel}xp</span>
    </header>
  );
}