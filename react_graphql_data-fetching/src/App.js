import { useEffect, useMemo, useState } from "react";
import axiosGitHubGraphQL from "./API/axios";
import {
  // GET_ORGANIZATION,
  // GET_REPOSITORY_OF_ORGANIZATION,
  GET_ISSUES_OF_REPOSITORY,
  // getIssuesOfRepositoryQuery,
  ADD_STAR,
} from "./API/queries";
import Organization from "./components/Organization/Organization";

const TITLE = "React GraphQL GitHub Client";

const addStarToRepository = (repositoryId) => {
  return axiosGitHubGraphQL.post("", {
    query: ADD_STAR,
    variables: { repositoryId },
  });
};

function App() {
  const [path, setPath] = useState(
    "the-road-to-learn-react/the-road-to-learn-react"
  );
  const [organization, setOrganization] = useState(null);
  const [errors, setErrors] = useState(null);

  const onFetchFromGitHub = useMemo(
    () => async (path, cursor) => {
      try {
        const [pathOrganization, pathRepository] = path.split("/");
        const result = await axiosGitHubGraphQL.post("", {
          query: GET_ISSUES_OF_REPOSITORY,
          variables: {
            organization: pathOrganization,
            repository: pathRepository,
            cursor,
          },
        });

        setErrors(result.data.data.errors);

        if (!cursor) {
          setOrganization(result.data.data.organization);
        } else {
          setOrganization((prevOrganization) => {
            const currentOrganization = result.data.data.organization;
            const { edges: oldIssues } = prevOrganization.repository.issues;
            const { edges: newIssues } = currentOrganization.repository.issues;
            const updatedIssues = [...oldIssues, ...newIssues];

            return {
              ...currentOrganization,
              repository: {
                ...currentOrganization.repository,
                issues: {
                  ...currentOrganization.repository.issues,
                  edges: updatedIssues,
                },
              },
            };
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [organization]
  );

  const onFetchMoreIssues = () => {
    const { endCursor } = organization.repository.issues.pageInfo;

    onFetchFromGitHub(path, endCursor);
  };

  const onStarRepository = (repositoryId, viewerHasStarred) => {
    addStarToRepository(repositoryId).then((mutationResult) => {
      const { viewerHasStarred } = mutationResult.data.data.addStar.starrable;

      setOrganization((prevOrganization) => ({
        ...prevOrganization,
        repository: {
          ...prevOrganization.repository,
          viewerHasStarred,
        },
      }));
    });
  };

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
        <Organization
          organization={organization}
          errors={errors}
          onFetchMoreIssues={onFetchMoreIssues}
          onStarRepository={onStarRepository}
        />
      ) : (
        <p>No information yet ...</p>
      )}
    </div>
  );
}

export default App;
