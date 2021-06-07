import FetchExampleClass from "./components/FetchExampleClass";
import AxiosExampleClass from "./components/AxiosExampleClass";
import AxiosExampleFn from "./components/AxiosExampleFn";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <h3>Axios and Class Component</h3>
        <AxiosExampleFn />
      </div>
      <div>
        <h3>Fetch and Class Component</h3>
        <FetchExampleClass />
      </div>
      <div>
        <h3>Axios and Class Component</h3>
        <AxiosExampleClass />
      </div>
    </div>
  );
}

export default App;
