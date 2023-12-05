import { useState } from "react";
import "./App.css";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import SplitPane from "./components/SplitPane";
import Navbar from "./components/Navbar";
import PlayIcon from "./assets/icons/play.svg?react";
import StopIcon from "./assets/icons/stop.svg?react";

function App() {
  const [code, setCode] = useState(
    `#include <bits/stdc++.h>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello World!" << endl;\n    return 0;\n}`
  );
  const [input, setInput] = useState("");
  const [expOutput, setExpOutput] = useState("");
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    console.log(code);
    try {
      await fetch("http://localhost:3000/runcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, input }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("POST request successful:", data);
          setOutput(data?.output);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <SplitPane>
          <SplitPane.Vertical>
            <textarea
              name="input"
              id="input-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            ></textarea>
            <textarea
              name="input"
              id="input-textarea"
              value={expOutput}
              onChange={(e) => setExpOutput(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            ></textarea>
            <textarea
              name="output"
              id="output-textarea"
              value={"Output:\n" + output}
              readOnly
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              style={{ width: "100%", height: "97%", borderRadius: "5px" }}
            ></textarea>
          </SplitPane.Vertical>

          <section className="code-section">
            <CodeMirror
              value={code}
              height="calc(100vh - 6.8rem)"
              width="100%"
              theme={vscodeDark}
              extensions={[javascript({ jsx: true })]}
              onChange={(val) => setCode(val)}
              style={{ fontSize: "14px" }}
            />
            <button onClick={handleRunCode} className="run-btn">
              <span>Run</span>
              <PlayIcon />
            </button>
          </section>
          
        </SplitPane>
      </main>
    </>
  );
}

export default App;
