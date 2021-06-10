import { useEffect, useMemo, useState } from "react";
import axiosGitHubGraphQL from "./API/axios";
import {
  // GET_ORGANIZATION,
  // GET_REPOSITORY_OF_ORGANIZATION,
  // GET_ISSUES_OF_REPOSITORY,
  getIssuesOfRepositoryQuery,
} from "./API/queries";
import Organization from "./components/Organization/Organization";

const TITLE = "React GraphQL GitHub Client";

function App() {
  const [path, setPath] = useState(
    "the-road-to-learn-react/the-road-to-learn-react"
  );
  const [organization, setOrganization] = useState(null);
  const [errors, setErrors] = useState(null);

  const onFetchFromGitHub = useMemo(
    () => async (path) => {
      try {
        const [pathOrganization, pathRepository] = path.split("/");
        const result = await axiosGitHubGraphQL.post("", {
          query: getIssuesOfRepositoryQuery(pathOrganization, pathRepository),
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
    },
    []
  );

  const onPathChangeHandler = (event) => {
    const path = event.target.value;
    setPath(path);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onFetchFromGitHub(path);
  };

  useEffect(() => {
    // data fetching
    onFetchFromGitHub(path);
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
