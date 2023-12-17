import { useState } from "react";
import "./App.css";
import CodeMirror from "@uiw/react-codemirror";
// import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { javascript } from "@codemirror/lang-javascript";
import SplitPane from "./components/SplitPane";
import Navbar from "./components/Navbar";
import CopyIcon from "./assets/icons/copy.svg?react";
import RefreshIcon from "./assets/icons/refresh.svg?react";
import MaximizeIcon from "./assets/icons/maximize.svg?react";
import MinimizeIcon from "./assets/icons/minimize.svg?react";
import SaveIcon from "./assets/icons/save.svg?react";
import DownloadIcon from "./assets/icons/download.svg?react";
import Tooltip from "./components/Tooltip";
import TooltipClick from "./components/TooltipClick";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCode,
  saveBoilerplate,
  resetToBoilerplate,
} from "./redux/code/codeSlice";
import Modal from "./components/Modal";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import Files from "./components/Files";
import { useEffect } from "react";

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

const languagesCode2 = {
  code_cpp: "C++",
  code_c: "C",
  code_csharp: "C#",
  code_java: "Java",
  code_python: "Python",
  code_ruby: "Ruby",
  code_go: "Go",
  code_kotlin: "Kotlin",
};

const languagesCode = {
  "C++": "code_cpp",
  C: "code_c",
  "C#": "code_csharp",
  Java: "code_java",
  Python: "code_python",
  Ruby: "code_ruby",
  Go: "code_go",
  Kotlin: "code_kotlin",
};

function App() {
  const code = useSelector((state) => state?.codeData[state?.currentCode]);
  const [input, setInput] = useState("");
  const [expOutput, setExpOutput] = useState("");
  const [output, setOutput] = useState(``);
  const [language, setLanguage] = useState(languages[0]);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("light-mode") === "true"
  );
  const [fontSize, setFontSize] = useState(14);
  const dispatch = useDispatch();

  const handleRunCode = async () => {
    console.log(code);
    setIsLoading(true);
    try {
      await fetch("https://code-editor-server-5hkf.onrender.com/runcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code[languagesCode[language]],
          input,
          language,
        }),
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
    setIsLoading(false);
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("light-mode");
    setIsLightMode(!isLightMode);
    localStorage.setItem("light-mode", !isLightMode);
  };

  const handleDownloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code[languagesCode[language]]], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("light-mode");
    if (savedMode === "true") {
      document.body.classList.add("light-mode");
      // setIsLightMode(true);
    }
  }, []);

  return (
    <>
      <Modal setOpen={setIsModalOpen} open={isModalOpen}>
        <Settings fontSize={fontSize} setFontSize={setFontSize} />
      </Modal>
      <Sidebar setOpen={setIsSidebarOpen} open={isSidebarOpen}>
        <Files />
      </Sidebar>
      <Navbar
        language={language}
        setLanguage={setLanguage}
        handleRunCode={handleRunCode}
        isLoading={isLoading}
        modalOpen={() => setIsModalOpen(!isModalOpen)}
        sidebarOpen={() => setIsSidebarOpen(!isSidebarOpen)}
        isLightMode={isLightMode}
        toggleDarkMode={toggleDarkMode}
      />
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

          <section
            className={
              isFullScreen ? "code-section--fullscreen" : "code-section"
            }
          >
            <div className="textarea-container">
              <div className="textarea-header code-header">
                <span>{code.name}</span>
                <TooltipClick text="saved!">
                  <Tooltip text="save as boilerplate">
                    <button
                      className="navbar-btn"
                      onClick={() =>
                        dispatch(
                          saveBoilerplate({
                            code: code[languagesCode[language]],
                            language,
                          })
                        )
                      }
                    >
                      <SaveIcon />
                    </button>
                  </Tooltip>
                </TooltipClick>
                <Tooltip text="refresh to boilerplate">
                  <button
                    className="navbar-btn"
                    onClick={() =>
                      dispatch(
                        resetToBoilerplate({
                          language,
                        })
                      )
                    }
                  >
                    <RefreshIcon />
                  </button>
                </Tooltip>
                <Tooltip text="download code">
                  <button className="navbar-btn" onClick={handleDownloadCode}>
                    <DownloadIcon />
                  </button>
                </Tooltip>
                <TooltipClick text="copied!" value={input}>
                  <Tooltip text="copy">
                    <button className="navbar-btn">
                      <CopyIcon className="navbar-icon" />
                    </button>
                  </Tooltip>
                </TooltipClick>
                <Tooltip text={isFullScreen ? "minimize" : "maximize"}>
                  <button
                    className="navbar-btn"
                    onClick={() => setIsFullScreen(!isFullScreen)}
                  >
                    {isFullScreen ? (
                      <MinimizeIcon className="navbar-icon--2" />
                    ) : (
                      <MaximizeIcon className="navbar-icon" />
                    )}
                  </button>
                </Tooltip>
              </div>
              <CodeMirror
                value={code[languagesCode[language]]}
                height={isFullScreen ? "100vh" : "calc(100vh - 6.2rem)"}
                width="100%"
                theme={!isLightMode ? xcodeDark : xcodeLight}
                extensions={[javascript({ jsx: true })]}
                onChange={(val) => {
                  dispatch(saveCode({ code: val, language }));
                }}
                style={{ fontSize: `${fontSize}px`, marginTop: "2rem" }}
              />
            </div>
          </section>
        </SplitPane>
      </main>
    </>
  );
}

export default App;
