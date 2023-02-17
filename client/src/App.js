import { useState } from "react";
import axios from "axios";

function App() {
  const [wait, setWait] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    setWait(true);
    e.preventDefault();

    // Send a request to the server with the prompt
    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
        console.log(res.data);
        setWait(false);
      })
      .catch((err) => {
        console.error(err);
        setWait(false);
      });
  };

  return (
    <div style={{ margin: "30px" }}>
      <h1>openai API Test</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {wait ? <h1>I'm Thinking...</h1> : <h3>{response}</h3>}
    </div>
  );
}

export default App;
