import React, { useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    part1:
    You're given the UI for a basic form. Your task is to 
    hook it all up using refs. 

    The `Focus X Input` buttons should focus that specific input
    field.

    The `Submit` button should log `name`, `email`, and `password`
    to the console.

    The `Reset` button should result all of the input fields to 
    empty strings.

    part2: 
    Develop a search tag with debounce functionality. Debouncing means that a function will not be called again until a certain amount of time has passed.
*/

function Form() {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [search, setsearch] = React.useState("");
  const handleSubmit = (e) => {
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    console.log("Name: ", name);
    console.log("Password: ", password);
    console.log("Email: ", email);
  };

  const handleReset = () => {
    nameRef.current.value = "";
    passwordRef.current.value = "";
    emailRef.current.value = "";
  };

  const handleSearch = (e) => {
    setsearch(e.target.value);
  };

  const focusRef = (reference) => {
    if (reference) {
      reference.current.focus();
    }
  };

  const debounce = (callback, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      arguments[0].persist();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => callback.apply(context, args), delay);
    };
  };
  const debouncedSearch = debounce(handleSearch, 1000);
  return (
    <React.Fragment>
      <div>
        <label>
          Name:
          <input placeholder="name" type="text" ref={nameRef} />
        </label>
        <label>
          Email:
          <input placeholder="email" type="text" ref={emailRef} />
        </label>
        <label>
          Password:
          <input placeholder="password" type="text" ref={passwordRef} />
        </label>

        <hr />

        <button
          onClick={() => {
            focusRef(nameRef);
          }}
        >
          Focus Name Input
        </button>
        <button
          onClick={() => {
            focusRef(emailRef);
          }}
        >
          Focus Email Input
        </button>
        <button
          onClick={() => {
            focusRef(passwordRef);
          }}
        >
          Focus Password Input
        </button>

        <hr />

        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <hr />
        <label>
          Search:
          <input
            placeholder="search with debounce"
            type="text"
            onChange={debouncedSearch}
          />
        </label>
      </div>
      <div>
        <h1>{search}</h1>
      </div>
    </React.Fragment>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Form />, rootElement);
