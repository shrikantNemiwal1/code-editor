import { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import {
  saveCode,
  saveBoilerplate,
  resetToBoilerplate,
  saveInput,
  saveExpOutput,
} from "./redux/code/codeSlice";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
const BASE_URL = import.meta.env.VITE_REACT_API_URL;

// Editor Themes
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { basicLight, basicDark } from "@uiw/codemirror-theme-basic";
import { duotoneLight, duotoneDark } from "@uiw/codemirror-theme-duotone";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { materialDark, materialLight } from "@uiw/codemirror-theme-material";
import { solarizedLight, solarizedDark } from "@uiw/codemirror-theme-solarized";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";

// Components
import SplitPane from "./components/SplitPane";
import Navbar from "./components/Navbar";
import Tooltip from "./components/Tooltip";
import TooltipClick from "./components/TooltipClick";
import Modal from "./components/Modal";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import Files from "./components/Files";

// Language data
import { javascript } from "@codemirror/lang-javascript";
import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { python } from "@codemirror/legacy-modes/mode/python";
import { cpp, csharp, c, java } from "@codemirror/legacy-modes/mode/clike";

// Icons
import CopyIcon from "./assets/icons/copy.svg?react";
import RefreshIcon from "./assets/icons/refresh.svg?react";
import MaximizeIcon from "./assets/icons/maximize.svg?react";
import MinimizeIcon from "./assets/icons/minimize.svg?react";
import SaveIcon from "./assets/icons/save.svg?react";
import DownloadIcon from "./assets/icons/download.svg?react";
import SparklesIcon from "./assets/icons/sparkle.svg?react";

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
  const code = useSelector(
    (state) => state?.code?.codeData[state?.code?.currentCode]
  );
  const settings = useSelector((state) => state?.settings);
  const dispatch = useDispatch();
  const [output, setOutput] = useState(``);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("light-mode") === "true"
  );
  const [isFormatting, setIsFormatting] = useState(false);
  const [cancelController, setCancelController] = useState(null);

  const makeCodeFile = (data) => {
    console.log(data);
  };

  window.addEventListener("message", function (event) {
    console.log("data received from ext");
    if (event.data && event.data.type === "FROM_EXTENSION") {
      // Access the data from the extension
      const extensionData = event.data.data;

      // Call your React function with the received data
      makeCodeFile(extensionData);
    }
  });

  const handleRunCode = async () => {
    if (isLoading) {
      // If already loading, cancel the request
      if (cancelController) {
        cancelController.abort();
      }
      setIsLoading(false);
      return;
    }

    // Create a new AbortController
    const newCancelController = new AbortController();
    setCancelController(newCancelController);

    setIsLoading(true);

    try {
      const response = await fetch(BASE_URL + "/runcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code[languagesCode[settings?.language]],
          input: code?.input,
          language: settings?.language,
        }),
        signal: newCancelController.signal,
      });

      const data = await response.json();
      setOutput(data?.output);
      setIsSuccess(data?.success);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setCancelController(null);
    }
  };

  const handleFormatCode = async () => {
    setIsFormatting(true);
    try {
      await fetch(BASE_URL + "/formatcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code[languagesCode[settings?.language]],
          language: settings?.language,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("POST format request successful:", data);
          console.log(data);
          dispatch(
            saveCode({
              code:
                data?.formattedCode || code[languagesCode[settings?.language]],
              language: settings?.language,
            })
          );
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
        });
    } catch (error) {
      console.log(error);
    }
    setIsFormatting(false);
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
    document.body.appendChild(element);
    element.click();
  };

  const getLanguageLib = () => {
    switch (settings?.language) {
      case "C++":
        return cpp;
      case "C":
        return c;
      case "C#":
        return csharp;
      case "Java":
        return java;
      case "Go":
        return go;
      case "Ruby":
        return ruby;
      case "Python":
        return python;
      case "Kotlin":
        return java;
    }
  };

  const getTheme = () => {
    switch (settings?.theme) {
      case "vscode":
        return isLightMode ? xcodeLight : vscodeDark;
      case "basic":
        return isLightMode ? basicLight : basicDark;
      case "duotone":
        return isLightMode ? duotoneLight : duotoneDark;
      case "github":
        return isLightMode ? githubLight : githubDark;
      case "material":
        return isLightMode ? materialLight : materialDark;
      case "solarized":
        return isLightMode ? solarizedLight : solarizedDark;
      case "xcode":
        return isLightMode ? xcodeLight : xcodeDark;
      default:
        return isLightMode ? xcodeLight : xcodeDark;
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("light-mode");
    if (savedMode === "true") document.body.classList.add("light-mode");
  }, []);

  var keyPressed = {};

  const handleKeyDown = (e) => {
    keyPressed[e.key + e.location] = true;
    console.log(keyPressed);

    if (keyPressed.Control1 == true && keyPressed.s0 == true) {
      e.preventDefault();
      handleFormatCode();
    } else if (
      (keyPressed.Control2 == true || keyPressed.Control1 == true) &&
      (keyPressed.Shift2 == true || keyPressed.Shift1 == true)
    ) {
      e.preventDefault();
      handleRunCode();
      console.log("run code");
    }
  };

  const handleKeyUp = (e) => {
    keyPressed[e.key + e.location] = false;
  };

  return (
    <>
      <Modal setOpen={setIsModalOpen} open={isModalOpen}>
        <Settings />
      </Modal>
      <Sidebar setOpen={setIsSidebarOpen} open={isSidebarOpen}>
        <Files />
      </Sidebar>
      <Navbar
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
                <TooltipClick text="copied!" value={code?.input}>
                  <button className="navbar-btn">
                    <CopyIcon className="navbar-icon" />
                  </button>
                </TooltipClick>
              </div>
              <textarea
                name="input"
                id="input-textarea"
                className="textarea"
                value={code?.input}
                onChange={(e) => dispatch(saveInput(e.target.value))}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              ></textarea>
            </div>
            <div className="textarea-container">
              <div className="textarea-header">
                <span>Expected Output</span>
                <TooltipClick text="copied!" value={code?.expOutput}>
                  <button className="navbar-btn">
                    <CopyIcon className="navbar-icon" />
                  </button>
                </TooltipClick>
              </div>
              <textarea
                name="input"
                id="input-textarea"
                className="textarea"
                value={code?.expOutput}
                onChange={(e) => dispatch(saveExpOutput(e.target.value))}
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
                <span>{code?.name || "Untitled"}</span>
                <Tooltip text="format code">
                  <button className="navbar-btn" onClick={handleFormatCode}>
                    <SparklesIcon
                      className={`navbar-icon ${
                        isFormatting ? "navbar-icon--loading" : ""
                      }`}
                    />
                  </button>
                </Tooltip>
                <TooltipClick text="saved!">
                  <Tooltip text="save as boilerplate">
                    <button
                      className="navbar-btn"
                      onClick={() =>
                        dispatch(
                          saveBoilerplate({
                            code: code[languagesCode[settings?.language]],
                            language: settings?.language,
                          })
                        )
                      }
                    >
                      <SaveIcon className="navbar-icon--2" />
                    </button>
                  </Tooltip>
                </TooltipClick>
                <Tooltip text="refresh to boilerplate">
                  <button
                    className="navbar-btn"
                    onClick={() =>
                      dispatch(
                        resetToBoilerplate({
                          language: settings?.language,
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
                <TooltipClick
                  text="copied!"
                  value={code[languagesCode[settings?.language]]}
                >
                  <Tooltip text="copy">
                    <button className="navbar-btn">
                      <CopyIcon />
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
                value={code[languagesCode[settings?.language]]}
                height={isFullScreen ? "100vh" : "calc(100vh - 6.2rem)"}
                width="100%"
                theme={getTheme()}
                extensions={[
                  settings?.language === "JavaScript"
                    ? javascript({ jsx: true })
                    : StreamLanguage.define(getLanguageLib()),
                  basicSetup({
                    tabSize: settings?.tabSize,
                    foldGutter: false,
                  }),
                ]}
                onChange={(val) => {
                  dispatch(
                    saveCode({ code: val, language: settings?.language })
                  );
                }}
                style={{
                  fontSize: `${settings?.fontSize || 14}px`,
                  marginTop: "2rem",
                }}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
              />
            </div>
          </section>
        </SplitPane>
      </main>
    </>
  );
}

export default App;
