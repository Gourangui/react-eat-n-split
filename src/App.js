const initialFriends = [
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
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
    </div>
  )
}

function FriendList() {
  const friends = initialFriends;

  return(
    <ul>
      {friends.map((friend) => (
        < Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  )
}

function Friend({friend}) {
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
      <Button>Select</Button>
    </li>
  )
}

function FormAddFriend(){
  return (
    <form className="form-add-friend">
      <label htmlFor="name">Friend Name</label>
      <input type="text" id="name" placeholder="Enter name..." required />
      <label htmlFor="image">Image URL</label>
      <input type="text" id="image" placeholder="Enter image URL..." required />
      <Button>Add</Button>
    </form>
  )
}

function Button({children}) {
  return (
    <button className="button">{children}</button>
  )
}