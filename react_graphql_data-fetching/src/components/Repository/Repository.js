import { useMemo } from "react";

const Repository = ({ repository }) => {
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
      {renderIssues && (
        <ul>
          {repository.issues.edges.map((issue) => (
            <li key={issue.node.id}>
              <a href={issue.node.url}>{issue.node.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Repository;
