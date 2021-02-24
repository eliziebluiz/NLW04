import styles from "../styles/components/Profile.module.css"


export function Profile(){
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/eliziebluiz.png" alt="Foto Perfil"/>
      <div>
        <strong>Elizieb Luiz</strong>
        <p>
          <img src="icons/level.svg" alt="icon level up"/>
          Level 1
        </p>
      </div>
    </div>
  )
}