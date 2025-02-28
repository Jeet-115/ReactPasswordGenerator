import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [symbolAllow, setSymbolAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (symbolAllow) str += "!@#$%^&*()_+-=[]{}";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, symbolAllow]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, symbolAllow, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-lg mx-auto shadow-lg rounded-lg px-6 py-8 my-8 bg-gray-800 text-white">
      <h1 className="text-3xl font-semibold text-center mb-6 text-orange-400">
        🔒 Password Generator
      </h1>

      {/* Password Display */}
      <div className="flex items-center bg-gray-900 rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="w-full py-2 px-3 bg-gray-900 text-white outline-none"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white font-semibold"
        >
          Copy
        </button>
      </div>

      {/* Settings */}
      <div className="flex flex-col gap-4 text-sm">
        {/* Length Slider */}
        <div className="flex items-center justify-between">
          <label className="font-medium">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-2/3 cursor-pointer accent-orange-500"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center justify-between">
          <label htmlFor="numberInput" className="cursor-pointer">
            Include Numbers
          </label>
          <input
            type="checkbox"
            id="numberInput"
            checked={numAllow}
            onChange={() => setNumAllow((prev) => !prev)}
            className="w-5 h-5 accent-orange-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="characterInput" className="cursor-pointer">
            Include Symbols
          </label>
          <input
            type="checkbox"
            id="characterInput"
            checked={symbolAllow}
            onChange={() => setSymbolAllow((prev) => !prev)}
            className="w-5 h-5 accent-orange-500"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
