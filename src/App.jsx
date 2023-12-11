import { useState } from "react";
import "./App.css";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import SplitPane from "./components/SplitPane";
import Navbar from "./components/Navbar";
import PlayIcon from "./assets/icons/play.svg?react";
import StopIcon from "./assets/icons/stop.svg?react";
import CopyIcon from "./assets/icons/copy.svg?react";
import Tooltip from "./components/Tooltip";
import TooltipClick from "./components/TooltipClick";
import { useDispatch, useSelector } from "react-redux";
import { saveCodeDataToLocalStorage } from "./features/code/middleware";

const languages = [
  "C++",
  "Python",
  "Java",
  "C",
  "C#",
  "JavaScript",
  "Ruby",
  "Go",
  "Kotlin",
];

function App() {
  const [code, setCode] = useState(
    `#include <bits/stdc++.h>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello World!" << endl;\n    return 0;\n}`
  );
  const [input, setInput] = useState("");
  const [expOutput, setExpOutput] = useState("");
  const [output, setOutput] = useState(
    `#include <bits/stdc++.h>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello World!" << endl;\n    return 0;\n} #include <bits/stdc++.h>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello World!" << endl;\n    return 0;\n} #include <bits/stdc++.h>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello World!" << endl;\n    return 0;\n} #include <bits/stdc++.h>\nusing namespace std;\n\nint main()\n{\n    cout << "Hello World!" << endl;\n    return 0;\n}`
  );
  const [language, setLanguage] = useState(languages[0]);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleRunCode = async () => {
    console.log(code);
    try {
      await fetch("http://localhost:3000/runcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, input, language }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("POST request successful:", data);
          setOutput(data?.output);
          setIsSuccess(data?.success);
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
      <Navbar language={language} setLanguage={setLanguage} />
      <main>
        <SplitPane>
          <SplitPane.Vertical>
            <div className="textarea-container">
              <div className="textarea-header">
                <span>Input</span>
                <TooltipClick text="copied!" value={input}>
                  <button className="navbar-btn">
                    <CopyIcon className="navbar-icon" />
                  </button>
                </TooltipClick>
              </div>
              <textarea
                name="input"
                id="input-textarea"
                className="textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              ></textarea>
            </div>
            <div className="textarea-container">
              <div className="textarea-header">
                <span>Expected Output</span>
                <TooltipClick text="copied!" value={expOutput}>
                  <button className="navbar-btn">
                    <CopyIcon className="navbar-icon" />
                  </button>
                </TooltipClick>
              </div>
              <textarea
                name="input"
                id="input-textarea"
                className="textarea"
                value={expOutput}
                onChange={(e) => setExpOutput(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              ></textarea>
            </div>
            <div className="textarea-container">
              <div className="textarea-header">
                <span>Output</span>
                <TooltipClick text="copied!" value={output}>
                  <button className="navbar-btn">
                    <CopyIcon className="navbar-icon" />
                  </button>
                </TooltipClick>
              </div>
              <textarea
                name="output"
                id="output-textarea"
                className={
                  isSuccess
                    ? "textarea textarea--success"
                    : "textarea textarea--error"
                }
                value={output}
                readOnly
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                style={{ width: "100%", borderRadius: "5px" }}
              ></textarea>
            </div>
          </SplitPane.Vertical>

          <section className="code-section">
            <div className="textarea-container">
              <div className="textarea-header code-header">
                <span>Code</span>
                <TooltipClick text="copied!" value={input}>
                  <button className="navbar-btn">
                    <CopyIcon className="navbar-icon" />
                  </button>
                </TooltipClick>
              </div>
              <CodeMirror
                value={code}
                height="calc(100vh - 8.8rem)"
                width="100%"
                theme={vscodeDark}
                extensions={[javascript({ jsx: true })]}
                onChange={(val) => setCode(val)}
                style={{ fontSize: "14px", marginTop: "2rem" }}
              />
            </div>
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
