import { useState } from "react";

const initialFriends = [
  {
    id: 1,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 2,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 3,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [newFriends, setNewFriends] = useState(initialFriends);
  const [isSelected, setIsSelected] = useState(null);
  function handleSelected(e) {
    setIsSelected(() =>
      newFriends
        .filter(
          (friend) =>
            friend.name ===
            e.target.previousElementSibling.previousElementSibling.textContent
        )
        .map((friend) => friend)
    );
  }

  function handleAddFriend(e) {
    const newFriend = {
      id: newFriends.length,
      name: e.target.previousElementSibling.previousElementSibling
        .previousElementSibling.value,
      image: e.target.previousElementSibling.value,
      balance: 0,
    };
    setNewFriends((friends) => [...friends, newFriend]);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          newFriends={newFriends}
          handleAddFriend={handleAddFriend}
          handleSelected={handleSelected}
          isSelected={isSelected}
        />
      </div>
      {isSelected !== null && (
        <SplitBill
          selectedFriend={isSelected}
          friendList={newFriends}
          setNewFriends={setNewFriends}
          isSelected={isSelected}
          key={isSelected[0].id}
        />
      )}
    </div>
  );
}

function FriendsList({
  newFriends,
  handleAddFriend,
  handleSelected,
  isSelected,
}) {
  const [clickedAdd, setClickedAdd] = useState(false);

  function handleAdd() {
    setClickedAdd((clickedAdd) => !clickedAdd);
  }

  return (
    <>
      <ul>
        {newFriends.map((friend) => (
          <Person
            friend={friend}
            key={friend.id}
            handleSelected={handleSelected}
            isSelected={isSelected}
          />
        ))}
        {clickedAdd ? (
          <AddForm handleAddFriend={handleAddFriend} handleAdd={handleAdd} />
        ) : (
          <li>
            <Button handleExec={handleAdd}> Add a friend </Button>
          </li>
        )}
      </ul>
    </>
  );
}

function Person({ friend, handleSelected, isSelected }) {
  return (
    <>
      <li>
        <img src={friend.image} alt={friend.name}></img>
        <h3>{friend.name}</h3>
        {friend.balance > 0 ? (
          <p className="green">
            {friend.name} owes you {friend.balance}£
          </p>
        ) : friend.balance < 0 ? (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}£
          </p>
        ) : (
          <p> You and {friend.name} are even </p>
        )}
        <Button handleExec={handleSelected}>
          {isSelected[0].id === friend.id ? "Close" : "Open"}
        </Button>
      </li>
    </>
  );
}

function AddForm({ handleAddFriend, handleAdd }) {
  const [friendName, setFriendName] = useState("");
  const [friendPhoto, setFriendPhoto] = useState("");
  return (
    <>
      <form className="form-add-friend">
        <label>🙋Friend Name: </label>
        <input
          type="text"
          placeholder="Friend's Name"
          value={friendName}
          onChange={(e) => setFriendName(() => e.target.value)}
        ></input>
        <label>📷Friend Photo: </label>
        <input
          type="text"
          placeholder="Friend's Photo"
          value={friendPhoto}
          onChange={(e) => setFriendPhoto(() => e.target.value)}
        ></input>
        <Button handleExec={handleAddFriend}> Add </Button>
      </form>
      <Button handleExec={handleAdd}> Close </Button>
    </>
  );
}

function Button({ children, handleExec }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleExec(e);
      }}
      className="button"
    >
      {children}
    </button>
  );
}

function SplitBill({ friendList, selectedFriend, setNewFriends, isSelected }) {
  const [bill, setBill] = useState("");
  const [urExp, setUrExp] = useState("");
  const [whoPaying, setWhoPaying] = useState("user");

  function billSplit(e) {
    setNewFriends(() =>
      friendList.map((friends) => {
        if (friends.id === isSelected[0].id) {
          if (whoPaying === "user") {
            return {
              ...friends,
              balance:
                friends.balance + Number(e.target.parentElement[2].value),
            };
          } else {
            return {
              ...friends,
              balance:
                friends.balance - Number(e.target.parentElement[2].value),
            };
          }
        } else {
          return friends;
        }
      })
    );
  }
  return (
    <form className="form-split-bill">
      <h2> SPLIT A BILL WITH {selectedFriend[0].name.toUpperCase()} </h2>
      <label> 💰 Bill Value </label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      ></input>
      <label> 🧍‍♂️Your expanse </label>
      <input
        type="number"
        value={urExp}
        onChange={(e) => setUrExp(e.target.value)}
      ></input>
      <label>🧍{selectedFriend[0].name}'s expanse </label>
      <input
        type="number"
        disabled
        value={bill !== "" ? bill - urExp : ""}
      ></input>
      <label>🤑 Who is paying the bill? </label>
      <select
        value={whoPaying}
        onChange={(e) => {
          setWhoPaying(e.target.value);
        }}
      >
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>
      <Button handleExec={billSplit}> Split bill </Button>
    </form>
  );
}
