// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import { useGeoPosition } from "../../hooks/useGeoPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../../contexts/CitiesContext";
import "react-datepicker/dist/react-datepicker.css";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoadingGeo, setisLoadingGeo] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState(null);
  const [positionError, setPosistionError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [lat, lng] = useGeoPosition();
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function getCityName() {
        try {
          setisLoadingGeo(true);
          setPosistionError(null);
          const response = await (
            await fetch(`${baseUrl}?latitude=${lat}&longitude=${lng}`)
          )?.json();
          console.log(response);
          if (!response?.countryCode)
            setPosistionError(
              "There is no country on these positions, please try again!"
            );
          setCityName(response?.city || response?.locality || "Unknown");
          setCountry(response?.countryName);
          setEmoji(convertToEmoji(response.countryCode));
        } catch (error) {
          setError(error);
        } finally {
          setisLoadingGeo(false);
        }
      }
      getCityName();
    },
    [lat, lng]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    if (!date || !cityName) return;
    await createCity(newCity);
    // navigate("/app/cities");
  }

  if (error) return <Message message={error.message} />;
  if (positionError) return <Message message={positionError} />;
  if (isLoadingGeo) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Please start by clicking somewhere on the map" />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={() => handleSubmit()}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {<span className={styles.flag}>{emoji}</span>}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
