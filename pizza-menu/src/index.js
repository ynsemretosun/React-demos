// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// const pizzaData = [
//   {
//     name: "Focaccia",
//     ingredients: "Bread with italian olive oil and rosemary",
//     price: 6,
//     photoName: "pizzas/focaccia.jpg",
//     soldOut: false,
//   },
//   {
//     name: "Pizza Margherita",
//     ingredients: "Tomato and mozarella",
//     price: 10,
//     photoName: "pizzas/margherita.jpg",
//     soldOut: false,
//   },
//   {
//     name: "Pizza Spinaci",
//     ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
//     price: 12,
//     photoName: "pizzas/spinaci.jpg",
//     soldOut: false,
//   },
//   {
//     name: "Pizza Funghi",
//     ingredients: "Tomato, mozarella, mushrooms, and onion",
//     price: 12,
//     photoName: "pizzas/funghi.jpg",
//     soldOut: false,
//   },
//   {
//     name: "Pizza Salamino",
//     ingredients: "Tomato, mozarella, and pepperoni",
//     price: 15,
//     photoName: "pizzas/salamino.jpg",
//     soldOut: true,
//   },
//   {
//     name: "Pizza Prosciutto",
//     ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
//     price: 18,
//     photoName: "pizzas/prosciutto.jpg",
//     soldOut: false,
//   },
// ];

// function App() {
//   return (
//     <div className="container">
//       <Header />
//       <PizzaList />
//       <Footer />
//     </div>
//   );
// }
// function Pizza({ pizzaObj }) {
//   return (
//     <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
//       <img src={pizzaObj.photoName} alt={pizzaObj.name} />
//       <div>
//         <h3> {pizzaObj.name} </h3>
//         <p> {pizzaObj.ingredients} </p>
//         <span> {pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price} </span>
//       </div>
//     </li>
//   );
// }
// function Header() {
//   return (
//     <header className="header">
//       <h1>REACT Pizza </h1>
//     </header>
//   );
// }
// function PizzaList() {
//   let pizzas = pizzaData;
//   return (
//     <main className="menu">
//       <h2> Pizza List </h2>
//       {pizzas.length > 0 ? (
//         <>
//           <p>
//             Authentic Italian cuisine. 6 creative dishes to choose from. All
//             from our stone oven, all organic and all delicious!
//           </p>
//           <ul className="pizzas">
//             {pizzas.map((pizza) => {
//               return <Pizza pizzaObj={pizza} key={pizza.name} />;
//             })}
//           </ul>
//         </>
//       ) : (
//         <p> No pizzas available </p>
//       )}
//     </main>
//   );
// }
// function Footer() {
//   const currentHour = new Date().getHours();
//   const closeHour = 23;
//   const openHour = 8;
//   const isOpen = currentHour >= openHour && currentHour < closeHour;
//   return (
//     <footer className="footer">
//       {isOpen ? (
//         <Order closeHour={closeHour} openHour={openHour} />
//       ) : (
//         <p>
//           {" "}
//           We're closed. We open at {openHour} and close at {closeHour}!
//         </p>
//       )}
//     </footer>
//   );
// }
// function Order({ closeHour, openHour }) {
//   return (
//     <div className="order">
//       <p>
//         {" "}
//         We're open from {openHour}:00 to {closeHour}:00 Come visit us or order{" "}
//       </p>
//       <button className="btn"> Order Now </button>
//     </div>
//   );
// }
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header></Header>
      <Menu></Menu>
      <Footer></Footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);

function Header() {
  return (
    <header className="header">
      <h1> FAST REACT PIZZA CO. </h1>
    </header>
  );
}

function Menu() {
  const pizzaList = pizzaData;
  return (
    <main className="menu">
      <h2> Our Pizzas </h2>
      {pizzaList.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic and all delicious!
          </p>
          <ul className="pizzas">
            {pizzaList.map((pizza) => {
              return <Pizza pizzaObj={pizza} key={pizza.name} />;
            })}
          </ul>
        </>
      ) : (
        <p> No pizzas available </p>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <li
      className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}
      key={pizzaObj.name}
    >
      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p> {pizzaObj.ingredients}</p>
        {pizzaObj.soldOut ? "SOLD OUT" : <span>{pizzaObj.price}</span>}
      </div>
    </li>
  );
}

function Footer() {
  const currentHour = new Date().getHours();
  const openHour = 8;
  const closeHour = 24;
  const isOpen = currentHour >= openHour && currentHour < closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour}></Order>
      ) : (
        <p>
          We're closed. We open at {openHour} and close at {closeHour}!
        </p>
      )}
    </footer>
  );
}

function Order({ openHour, closeHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00 Come visit us or order
      </p>
      <button
        className="btn"
        onClick={() => {
          window.location.href = "http://github.com/ynsemretosun";
        }}
      >
        {" "}
        Order Now{" "}
      </button>
    </div>
  );
}
