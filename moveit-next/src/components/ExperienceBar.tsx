import styles from '../styles/components/ExpirenceBar.module.css';

export function ExpirenceBar(){
  return(
    <header className={styles.expirienceBar}>
      <span>0xp</span>
        <div>
          <div style={{width:"50%"}}/>

          <span className={styles.currentExpirence} style={{left:"50%"}}>
            300xp
          </span>
        </div>
      <span>600xp</span>
    </header>
  );
}