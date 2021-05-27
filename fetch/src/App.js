import logo from "./logo.svg";
import "./App.css";
import DataLoader from "./components/DataLoader/DataLoader";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-main">
        <DataLoader />
      </main>
    </div>
  );
}

export default App;
