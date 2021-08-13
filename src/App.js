import React from "react";
import "./App.css";
import SearchUser from "./components/searchUser";
import GistList from "./components/gistList";

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <div className="App">
      {!user && <SearchUser onSuccessfulSearch={setUser} />}
      {user}
      {!!user && <GistList username={user} />}
    </div>
  );
}

export default App;
