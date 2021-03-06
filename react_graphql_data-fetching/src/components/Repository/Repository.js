import { useMemo } from "react";

const Repository = ({ repository, onFetchMoreIssues, onStarRepository }) => {
  const renderIssues = useMemo(
    () =>
      repository.issues &&
      repository.issues.edges &&
      repository.issues.edges.length,
    [repository]
  );

  return (
    <div>
      <p>
        <strong>In Repository:</strong>
        <a href={repository.url}>{repository.name}</a>
      </p>
      <button
        type="button"
        onClick={() =>
          onStarRepository(repository.id, repository.viewerHasStarred)
        }
      >
        {repository.viewerHasStarred ? "Unstar" : "Star"}
      </button>
      {renderIssues && (
        <ul>
          {repository.issues.edges.map((issue) => (
            <li key={issue.node.id}>
              <a href={issue.node.url}>{issue.node.title}</a>
              <ul>
                {issue.node.reactions.edges.map((reaction) => (
                  <li key={reaction.node.id}>{reaction.node.content}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <hr />
      {repository.issues.pageInfo.hasNextPage && (
        <button onClick={onFetchMoreIssues}>More</button>
      )}
    </div>
  );
};

export default Repository;
