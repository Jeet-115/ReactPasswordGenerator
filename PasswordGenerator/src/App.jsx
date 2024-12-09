import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numallow, setnumallow] = useState(false);
  const [symbolallow, setsymbolallow] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallow) str += "0123456789";
    if (symbolallow) str += "!@#$%^&*()_+-=[]{}";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numallow, symbolallow, setpassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numallow, symbolallow, passwordGenerator]);

  const copyPasswordToclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-4xl text-center text-white my-3">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToclipboard}
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-3">
        <div className="flex items-center gap-x-1">
          <input type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setlength(e.target.value)}
          className="cursor-pointer" />
          <label>Length : {length}</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numallow}
          id="numberInput"
          onChange={() => {
            setnumallow((prev) => !prev);
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={symbolallow}
          id="characterInput"
          onChange={() => {
            setsymbolallow((prev) => !prev);
          }} />
          <label htmlFor="characterInput">Characters</label>

        </div>
      </div>
    </div>
  );
}

export default App;
