import React from "react";
import StartTestPage from "./components/StartTestPage";
import "./App.css";
import Container from "./components/Container";
import QuestionsDisplay from "./components/QuestionsDisplay";
import { useGlobalContext } from "./hooks/useGlobalContext";
import Results from "./components/Results";

function App() {
  const { ended, started } = useGlobalContext();
  return (
    <div className="App">
      <header className="header">Quiz Test</header>
      <Container>
        {!started ? <StartTestPage /> : !ended && <QuestionsDisplay />}
        {ended && <Results />}
      </Container>
    </div>
  );
}

export default App;
