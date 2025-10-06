import styles from "./Card.module.css";
export default function Card({ name, population, region, capital, flags }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <img src={flags.png} alt="Egypt flag" />
      </div>
      <div className={styles.bottom}>
        <h1 style={{ fontSize: name.length > 10 ? "18px" : "30px" }}>{name}</h1>
        <div className={styles.info}>
          <div>
            <h2>Population:</h2>
            <p>{population}</p>
          </div>
          <div>
            <h2>Region:</h2>
            <p>{region}</p>
          </div>
          <div>
            <h2>Capital:</h2>
            <p>{capital}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
