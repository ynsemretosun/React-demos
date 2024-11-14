import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
function CityItem({ city }) {
  const { currCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <p className={styles.name}> {cityName}</p>
        <time className={styles.date}> {formatDate(date)} </time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          -
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
