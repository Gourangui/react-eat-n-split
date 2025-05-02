import { useState } from "react";

/* const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
]; */

function Button({children, onClick}) {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  )
}

export default function App() {
  const data = [];
  const [friends, setFriends] = useState(data);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [userBalance, setUserBalance] = useState(0);

  function handleAddFriendForm() {
    setShowAddFriend(!showAddFriend);
  }

  function handleAddFriend(friend){
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend){
    setSelectedFriend(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} selectedFriend={selectedFriend} onSelection={handleSelectFriend} />
        { showAddFriend && 
          <FormAddFriend onAddFriend={handleAddFriend} />
        }
        <Button onClick={handleAddFriendForm}>
          { showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      { selectedFriend && 
        <FormSplitBill selectedFriend={selectedFriend} />
      }
    </div>
  )
}

function FriendList({friends, selectedFriend, onSelection}) {
  return(
    <ul>
      {friends.map((friend) => (
        < Friend key={friend.id} friend={friend} selectedFriend={selectedFriend} onSelection={onSelection} />
      ))}
    </ul>
  )
}

function Friend({friend, selectedFriend, onSelection}) {
  let friendBalance = "";
  if (friend.balance === 0) {
    friendBalance = `You and ${friend.name} are even.`;
  } else if (friend.balance > 0) {
    friendBalance = `${friend.name} owes you $${Math.abs(friend.balance)}`;
  } else {
    friendBalance = `You owe ${friend.name} $${Math.abs(friend.balance)}`;
  }

  return (
    <li key={friend.id}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={friend.balance < 0 ? "red" : friend.balance > 0 ? "green" : ""}>{friendBalance}</p>

      <Button onClick={() => onSelection(friend)}>{selectedFriend ?  selectedFriend.id === friend.id ? "Close" : "Select" : "Select"}</Button>
    </li>
  )
}

function FormAddFriend({onAddFriend}){
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }

    onAddFriend(newFriend);

    // Reset form
    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="name">Friend Name</label>
      <input type="text" id="name" placeholder="Enter name..." value={name} onChange={(e)=>setName(e.target.value)} required />

      <label htmlFor="image">Image URL</label>
      <input type="text" id="image" value={image} onChange={(e)=>setImage(e.target.value)} required />

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({selectedFriend}) {
  const [bill, setBill] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const friendExpense = bill ? bill - yourExpense : "";
  const [whoWillPay, setWhoWillPay] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !yourExpense) return;

    
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend ? selectedFriend.name : "a friend"}</h2>

      <label htmlFor="bill">Bill value</label>
      <input value={bill} onChange={(e) => setBill(Number(e.target.value))} type="text" id="bill" placeholder="Enter bill amount..." required />

      <label htmlFor="bill">Your expense</label>
      <input 
        type="text" 
        placeholder="Enter your expense..."
        id="your-expense" required 
        value={yourExpense} 
        onChange={(e) => 
            setYourExpense(
              Number(e.target.value) > bill ? yourExpense : 
              Number(e.target.value)
          )
        } 
      />
      
      <label htmlFor="bill">{selectedFriend ? selectedFriend.name : "Friend"}'s expense</label>
      <input value={friendExpense} type="text" id="friend-expense" disabled/>

      <label htmlFor="friend">Who will pay the bill?</label>
      <select id="friend" value={whoWillPay} onChange={(e) => setWhoWillPay(e.target.value)} required>
        <option value="user">You</option>
        <option key={selectedFriend.id} value={selectedFriend.id}>{selectedFriend.name}</option>
      </select>
      
      <Button>Split Bill</Button>
    </form>
  )
}