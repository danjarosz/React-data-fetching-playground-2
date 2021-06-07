import FetchExampleClass from "./components/FetchExampleClass";
import AxiosExampleClass from "./components/AxiosExampleClass";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <h3>Example 1 - Fetch and Class Component</h3>
        <FetchExampleClass />
      </div>
      <div>
        <h3>Example 2 - Axios and Class Component</h3>
        <AxiosExampleClass />
      </div>
    </div>
  );
}

export default App;
