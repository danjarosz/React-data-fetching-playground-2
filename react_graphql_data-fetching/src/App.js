import { useEffect, useState } from "react";
import axiosGitHubGraphQL from "./API/axios";
import { GET_ORGANIZATION } from "./API/queries";
import Organization from "./components/Organization/Organization";

const TITLE = "React GraphQL GitHub Client";

function App() {
  const [path, setPath] = useState(
    "the-road-to-learn-react/the-road-to-learn-react"
  );
  const [organization, setOrganization] = useState(null);
  const [errors, setErrors] = useState(null);

  const onPathChangeHandler = (event) => {
    const path = event.target.value;
    setPath(path);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // data fetching
    const onFetchFromGitHub = async () => {
      try {
        const result = await axiosGitHubGraphQL.post("", {
          query: GET_ORGANIZATION,
        });
        const {
          data: {
            data: { organization, errors },
          },
        } = result;
        setOrganization(organization);
        setErrors(errors);
      } catch (error) {
        console.error(error);
      }
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

      {organization ? (
        <Organization organization={organization} errors={errors} />
      ) : (
        <p>No information yet ...</p>
      )}
    </div>
  );
}

export default App;
