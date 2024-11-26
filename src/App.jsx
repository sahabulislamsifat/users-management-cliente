import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6500/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleTrigger = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const users = { name, email };
    console.log(users);

    fetch("http://localhost:6500/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUsers = [...users, data];
        setUser(newUsers);
        form.reset();
      });
  };
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Users Management System</h2>
      <p>Number of Users: {user.length}</p>

      <div>
        <form onSubmit={handleTrigger}>
          <input type="text" name="name"></input>
          <br />
          <input type="email" name="email"></input>
          <br />
          <input type="submit" value="Add User"></input>
        </form>
      </div>

      <div>
        {user.map((us) => (
          <p key={us.id}>
            {us.name} : {us.Age} : {us.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
