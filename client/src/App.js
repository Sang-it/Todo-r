import React, { useState, useCallback } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./pages/Main";

function App() {
  const [sideWidth, setsideWidth] = useState("20vw");
  const [mainWidth, setMainWidth] = useState("80vw");
  const [mainPadding, setMainPadding] = useState("10rem");
  const [valid, setValid] = useState(false);

  const handleClick = () => {
    setsideWidth(sideWidth === "20vw" ? "0vw" : "20vw");
    setMainWidth(mainWidth === "80vw" ? "100vw" : "80vw");
    setMainPadding(mainPadding === "10rem" ? "20rem" : "10rem");
  };

  const forConditional = useCallback(() => {
    setValid(true);
  }, []);

  return (
    <div className="App">
      <Header handleClick={handleClick} valid={valid} />
      <Main
        sideWidth={sideWidth}
        mainWidth={mainWidth}
        padding={mainPadding}
        forConditional={forConditional}
      />
    </div>
  );
}

export default App;
