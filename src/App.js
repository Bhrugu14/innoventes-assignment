import React from "react";
import { useState } from "react";
import "./App.css";
import { GetRepos } from "./services";

function App() {
  const [searchText, setSearchText] = useState("");
  const [repoData, setRepoData] = useState([]);
  const [isFork, setFork] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onClickSubmit = async () => {
    setRepoData([]);
    setError(false);
    const res = await GetRepos(searchText.trim());
    if (Array.isArray(res)) {
      let sortedRepo = res.sort((a, b) => b.size - a.size);
      setRepoData(sortedRepo);
    } else {
      setError(true);
      setErrorMsg(res.message || "not found");
    }
  };

  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input
          id="username"
          type="text"
          className="border"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <label htmlFor="fork">Include forks: </label>
        <input
          id="fork"
          type="checkbox"
          value={isFork}
          onChange={() => setFork(!isFork)}
        />
        <button disabled={searchText === ""} onClick={() => onClickSubmit()}>
          Submit
        </button>
      </div>
      {!isError ? (
        <section>
          {repoData.length > 0 && (
            <header>
              <div className="col">Name</div>
              <div className="col">Language</div>
              <div className="col">Description</div>
              <div className="col">Size</div>
            </header>
          )}
          {repoData.map((i, k) => {
            if (!isFork) {
              if (i.fork) {
                return null;
              }
            }
            return (
              <div key={i.id}>
                <div className="col">{i.full_name}</div>
                <div className="col">{i.language}</div>
                <div className="col">{i.description}</div>
                <div className="col">{i.size}</div>
              </div>
            );
          })}
        </section>
      ) : (
        <div className="error">{errorMsg}</div>
      )}
    </div>
  );
}

export default App;
