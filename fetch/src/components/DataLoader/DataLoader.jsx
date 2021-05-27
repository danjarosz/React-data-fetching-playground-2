import { useState } from "react";
import Fetch from "react-fetch";

export default function DataLoader() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error);
  };

  const handleSuccess = (data) => {
    setDataLoaded(true);
  };

  return (
    <Fetch
      url="http://hn.algolia.com/api/v1/items/5"
      onSuccess={handleSuccess}
      onError={handleError}
    >
      <AuthorDataProvider dataLoaded={dataLoaded} error={error} />
    </Fetch>
  );
}

const AuthorDataProvider = ({ dataLoaded, error, ...props }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!dataLoaded) {
    return <Loader />;
  }

  return <Author {...props} />;
};

const Author = (props) => {
  const { id, author, title, url, text, point, children } = props;

  return (
    <div>
      <p>user id: {id}</p>
      <h3>author: {author}</h3>
      <h4>title: {title}</h4>
      <p>page: {url}</p>
      <p>{text}</p>
      <p>score: {point || 0}</p>
      <p>Number of children: {children.length}</p>
    </div>
  );
};

const Loader = () => (
  <div>
    <p>Loading...</p>
  </div>
);

const ErrorMessage = (props) => {
  const { error } = props;
  return (
    <div>
      <p>Error fetching data</p>
      <p>{error.message}</p>
    </div>
  );
};
