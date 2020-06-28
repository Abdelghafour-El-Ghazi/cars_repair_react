import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  cars: [
    {
      id: 1,
      price: 26395,
      name: "2019 Ford Mustang",
      location: "Kathmandu",
      designation: "Frontend Developer"
    }
  ],
  store: [
    { id: 1, name: "V-6 engine", price: 1500 },
    { id: 2, name: "Racing detail package", price: 1500 },
    { id: 3, name: "Premium sound system", price: 500 },
    { id: 4, name: "Rear spoiler", price: 250 }
  ]
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function removeCar(id) {
    dispatch({
      type: "REMOVE_CAR",
      payload: id
    });
  }

  function addCar(cars) {
    dispatch({
      type: "ADD_CAR",
      payload: employees
    });
  }

  function editCar(cars) {
    dispatch({
      type: "EDIT_CAR",
      payload: employees
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        cars: state.employees,
        removeCar,
        addCar,
        editCar
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};