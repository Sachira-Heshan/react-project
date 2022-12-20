import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Dictionary() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const navigate = useNavigate();
  let { search } = useParams();

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <>
      <div className="max-w-7xl w-[1280px] flex-grow mx-auto px-3 xl:px-0">
        <h2>Dictionary</h2>
        <div className="my-2">
          <input
            type="text"
            placeholder="help"
            id="word"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
            className="bg-slate-200 py-1 pl-3 mr-3 rounded"
          />
          <button
            type="submit"
            className="bg-slate-300 py-1 px-4 rounded"
            onClick={(e) => {
              e.preventDefault();
              fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
                .then((response) => {
                  response.json();
                  if (response.status === 404) {
                    navigate("/404");
                  }
                })
                .then((data) =>
                  setDefinition(data[0].meanings[0].definitions[0].definition)
                );
              navigate("/dictionary/" + word);
            }}
          >
            Search
          </button>
        </div>
        <p>Definition: </p>
        {definition ? <p>{definition}</p> : <p>Oops!</p>}
      </div>
    </>
  );
}

export default Dictionary;
