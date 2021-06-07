import React from "react";

const API = "https://hn.algolia.com/api/v1/search?query=";
const DEFAULT_QUERY = "redux";

const Loader = () => (
  <div>
    <p>Loading...</p>
  </div>
);

class FetchExample extends React.Component {
  state = {
    loading: false,
    hits: [],
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true, error: null });
    fetch(API + DEFAULT_QUERY)
      .then((response) => {
        if (response.ok && response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error data fetching");
        }
      })
      .then((data) => {
        this.setState({
          loading: false,
          hits: data.hits,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error,
        });
      });
  }

  render() {
    const { loading, hits, error } = this.state;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <p>Error - {error.message}</p>;
    }

    return hits.length ? (
      <ul>
        {hits.map((hit) => (
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        ))}
      </ul>
    ) : (
      <div>
        <p>No hits to display</p>
      </div>
    );
  }
}

export default FetchExample;
