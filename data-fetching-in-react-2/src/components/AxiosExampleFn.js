import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AxiosExampleFn() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const baseURL = "https://hn.algolia.com/api/v1/search?query=";
    const fetchData = async () => {
      setLoading(true);
      setIsError(false);
      try {
        const result = await axios(`${baseURL}${search}`);
        setData(result.data);
      } catch (err) {
        setIsError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [search]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : isError ? (
        <div>
          <p>Something went wrong...</p>
        </div>
      ) : data.hits.length ? (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>No results found.</p>
        </div>
      )}
    </>
  );
}
