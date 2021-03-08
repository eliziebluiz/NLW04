import Head from 'next/head';

import {GetServerSideProps} from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ChallengeBox } from '../components/ChallengeBox';
import { ExpirenceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';

import styles from "../styles/pages/Home.module.css";
import { CountDownProvider } from '../contexts/CountDownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
  level:number;
  currentExpirence: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider
     level={props.level}
     currentExpirence={props.currentExpirence}
     challengesCompleted={props.challengesCompleted}
     >
    <div className={styles.container}>


      <Head>
        <title> Inicio | move.it</title>
      </Head>

      <ExpirenceBar/>
      <CountDownProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallenges/>
            <CountDown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountDownProvider>
    </div>
    </ChallengesProvider>

  )
}

export const getServerSideProps:GetServerSideProps = async (ctx)=>{
  const {level, currentExpirence, challengesCompleted} = ctx.req.cookies;
  return{
    props:{
      level:Number(level),
      currentExpirence: Number(currentExpirence),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}