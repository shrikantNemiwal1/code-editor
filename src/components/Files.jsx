import { useState, useEffect, useRef, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SeparatorIconVertical from "../assets/icons/separator-dots-vertical.svg?react";
import FileIcon from "../assets/icons/file.svg?react";
import FileAddIcon from "../assets/icons/file-add.svg?react";
import DeleteIcon from "../assets/icons/Trash.svg?react";
import EditIcon from "../assets/icons/edit.svg?react";
import "./css/files.css";
import {
  addFile,
  deleteFile,
  editFileName,
  setCurrentFile,
} from "../redux/code/codeSlice";

const Files = () => {
  const dispatch = useDispatch();
  const codes = useSelector((state) => state.codeData);
  const [isInputEnabled, setIsInputEnabled] = useState(
    Array(codes.length).fill(false)
  );
  const inputRefs = useRef(
    Array.from({ length: codes.length }, () => createRef())
  );

  const handleEditFileName = (e, index) => {
    e.stopPropagation();
    const newInputEnabled = [...isInputEnabled];
    newInputEnabled[index] = true;
    setIsInputEnabled(newInputEnabled);

    if (inputRefs.current[index].current)
      inputRefs.current[index].current.focus();
  };

  const handleInputBlur = () => {
    const newInputEnabled = Array(codes.length).fill(false);
    setIsInputEnabled(newInputEnabled);
  };

  useEffect(() => {
    const focusedIndex = isInputEnabled.indexOf(true);
    if (focusedIndex !== -1 && inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex].current.focus();
    }
  }, [isInputEnabled, codes]);

  const handleInputChange = (index, newValue) => {
    dispatch(editFileName({ index, name: newValue }));
  };

  const handleAddFile = () => {
    const newIsInputEnabled = [...isInputEnabled, true];
    setIsInputEnabled(newIsInputEnabled);
    inputRefs.current = Array.from({ length: codes.length + 1 }, (_, index) => {
      return inputRefs.current[index] || createRef();
    });
    dispatch(addFile());
  };

  return (
    <section className="files-container">
      <div className="files-header">
        <button className="add-file-btn" onClick={handleAddFile}>
          <FileAddIcon className="navbar-icon" />
          <span>New</span>
        </button>
      </div>
      <ul>
        {codes.map((file, index) => (
          <div
            key={file.id}
            className="file"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setCurrentFile(index));
            }}
          >
            <FileIcon className="navbar-icon" width="20px" />
            {isInputEnabled[index] ? (
              <input
                type="text"
                className="file-name"
                value={codes[index].name}
                autoCapitalize="false"
                autoCorrect="false"
                autoComplete="false"
                ref={inputRefs.current[index]}
                disabled={!isInputEnabled[index]}
                onBlur={() => handleInputBlur(index)}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInputBlur(index);
                }}
              />
            ) : (
              <span className="file-name--disabled">{codes[index].name}</span>
            )}
            <button
              className="file-options-button"
              onClick={(e) => e.stopPropagation()}
            >
              <SeparatorIconVertical
                className="split-pane-separator-icon file-options-icon"
                width="10px"
              />
              <div className="file-options">
                <div
                  className="file-option"
                  onClick={(e) => handleEditFileName(e, index)}
                >
                  <EditIcon className="navbar-icon--2" />
                  <span>Rename</span>
                </div>
                <div
                  className="file-option"
                  onClick={() => dispatch(deleteFile(index))}
                >
                  <DeleteIcon />
                  <span>Delete</span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default Files;
