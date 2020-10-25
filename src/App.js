import React from "react";
import "./scss/styles.scss";

// views
import Main from "./views/Main";

// components
import Menu from "./components/Menu";

function App() {
  return (
    <div className="App">
      <Main />
      <Menu />
    </div>
  );
}

export default App;
