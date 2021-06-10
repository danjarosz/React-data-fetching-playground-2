import Repository from "../Repository/Repository";

const Organization = ({
  organization,
  errors,
  onFetchMoreIssues,
  onStarRepository,
}) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map((error) => error.message).join(" ")}
      </p>
    );
  }

  return (
    <div>
      <p>
        <strong>Issues from Organization:</strong>
        <a href={organization.url}>{organization.name}</a>
      </p>
      {organization.repository ? (
        <Repository
          repository={organization.repository}
          onFetchMoreIssues={onFetchMoreIssues}
          onStarRepository={onStarRepository}
        />
      ) : null}
    </div>
  );
};

export default Organization;
