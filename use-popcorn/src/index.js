import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StarRating from "./Star";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      starNumber={5}
      color="yellow"
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      initialRate={3}
    ></StarRating> */}
  </React.StrictMode>
);
