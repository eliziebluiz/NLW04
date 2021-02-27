import Head from 'next/head';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ChallengeBox } from '../components/ChallengeBox';
import { ExpirenceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';

import styles from "../styles/pages/Home.module.css";


export default function Home() {
  return (

    <div className={styles.container}>

      <Head>
        <title> Inicio | move.it</title>
      </Head>

      <ExpirenceBar/>
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
    </div>
  )
}
