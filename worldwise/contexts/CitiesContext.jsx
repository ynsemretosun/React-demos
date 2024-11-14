import { createContext, useCallback, useContext, useReducer } from "react";
import { useEffect, useState } from "react";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currCity: {},
      };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}
function CitiesProvider({ children }) {
  const baseUrl = "http://localhost:9000";
  const [{ cities, isLoading, currCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      const response = await (
        await fetch(`${baseUrl}/cities`).catch((err) => {
          dispatch({ type: "rejected", payload: err.message });
        })
      ).json();
      dispatch({ type: "cities/loaded", payload: response });
    }
    getCities();
  }, []);
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currCity.id) return;
      dispatch({ type: "loading" });
      const response = await fetch(`http://localhost:9000/cities/${id}`);
      const city = await response.json();
      dispatch({ type: "city/loaded", payload: city });
    },
    [currCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    const response = await (
      await fetch(`${baseUrl}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      }).catch((err) => {
        dispatch({ type: "rejected", payload: err.message });
      })
    ).json();
    dispatch({ type: "city/created", payload: response });
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    await fetch(`${baseUrl}/cities/${id}`, {
      method: "DELETE",
    }).catch((err) => {
      dispatch({ type: "rejected", payload: err.message });
    });
    dispatch({ type: "city/deleted", payload: id });
  }
  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currCity, getCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useContext must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
