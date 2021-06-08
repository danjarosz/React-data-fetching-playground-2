import { useEffect, useState } from "react";
import axiosGitHubGraphQL from "./API/axios";
import { GET_ORGANIZATION } from "./API/queries";

const TITLE = "React GraphQL GitHub Client";

function App() {
  const [path, setPath] = useState(
    "the-road-to-learn-react/the-road-to-learn-react"
  );

  const onPathChangeHandler = (event) => {
    const path = event.target.value;
    setPath(path);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // data fetching
    const onFetchFromGitHub = () => {
      axiosGitHubGraphQL
        .post("", { query: GET_ORGANIZATION })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    };

    onFetchFromGitHub();
  }, []);

  return (
    <div>
      <h1>{TITLE}</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="url">Show open issues for https://github.com/</label>
        <input
          id="url"
          type="text"
          value={path}
          onChange={onPathChangeHandler}
          style={{ width: "300px" }}
        />
        <button type="submit">Search</button>
      </form>

      <hr />

      {/* Here comes the result! */}
    </div>
  );
}

export default App;
