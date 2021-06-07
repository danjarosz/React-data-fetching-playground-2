import React from "react";
import axios from "axios";

const API = "https://hn.algolia.com/api/v1/search";
const DEFAULT_QUERY = "redux";

const algoliaSearchAPI = axios.create({
  baseURL: API,
});

const Loader = () => (
  <div>
    <p>Loading...</p>
  </div>
);

class AxiosExampleClass extends React.Component {
  state = {
    loading: false,
    hits: [],
    error: null,
  };

  getHits = async () => {
    try {
      const response = await algoliaSearchAPI.get(`?query=${DEFAULT_QUERY}`);
      const { data } = response;
      this.setState({
        hits: data.hits,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
    }
  };

  componentDidMount() {
    this.setState({ loading: true, error: null });
    this.getHits();
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

export default AxiosExampleClass;
