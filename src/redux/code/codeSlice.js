import { createSlice } from "@reduxjs/toolkit";

const structure = {
  id: "423423",
  name: "some name",
  input: "",
  expOutput: "",
  code_cpp: `#include <bits/stdc++.h>\nusing namespace std\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}\n`,
  code_c: `include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}\n`,
  code_csharp: `Console.WriteLine(\"Hello, World!\");`,
  code_java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n`,
  code_python: `print(\"Hello, World!\")`,
  code_ruby: `puts \"Hello, World!\"`,
  code_go: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}\n`,
  code_kotlin: `fun main() {\n    println(\"Hello, World!\")\n}`,
};

const languages = {
  "C++": "code_cpp",
  C: "code_c",
  "C#": "code_csharp",
  Java: "code_java",
  Python: "code_python",
  Ruby: "code_ruby",
  Go: "code_go",
  Kotlin: "code_kotlin",
};

const defaultSnippets = {
  "C++": `#include <bits/stdc++.h>\nusing namespace std\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}\n`,
  C: `include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}\n`,
  "C#": `Console.WriteLine(\"Hello, World!\");`,
  Java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n`,
  Python: `print(\"Hello, World!\")`,
  Ruby: `puts \"Hello, World!\"`,
  Go: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}\n`,
  Kotlin: `fun main() {\n    println(\"Hello, World!\")\n}`,
};

const defaultBoilerplateData = {
  code_cpp: `#include <bits/stdc++.h>\nusing namespace std\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}\n`,
  code_c: `include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}\n`,
  code_csharp: `Console.WriteLine(\"Hello, World!\");`,
  code_java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}\n`,
  code_python: `print(\"Hello, World!\")`,
  code_ruby: `puts \"Hello, World!\"`,
  code_go: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}\n`,
  code_kotlin: `fun main() {\n    println(\"Hello, World!\")\n}`,
};

const codeSlice = createSlice({
  name: "code",
  initialState: {
    codeData: [structure],
    boilerplateData: defaultBoilerplateData,
    currentCode: 0,
  },
  reducers: {
    saveCode: (state, action) => {
      state.codeData[state.currentCode][languages[action.payload.language]] =
        action.payload.code;
    },
    saveBoilerplate: (state, action) => {
      state.boilerplateData[languages[action.payload.language]] =
        action.payload.code;
    },
    resetToBoilerplate: (state, action) => {
      state.codeData[state.currentCode][languages[action.payload.language]] =
        state.boilerplateData[languages[action.payload.language]];
    },
    addFile: (state) => {
      state.codeData.push({
        id: Date.now(),
        name: "",
        input: "",
        expOutput: "",
        ...state.boilerplateData,
      });
    },
    deleteFile: (state, action) => {
      if (action.payload === 0) return;
      if (action.payload === state.currentCode) state.currentCode--;
      state.codeData.splice(action.payload, 1);
    },
    editFileName: (state, action) => {
      state.codeData[action.payload.index].name = action.payload.name;
    },
    setCurrentFile: (state, action) => {
      state.currentCode = action.payload;
    },
  },
});

export const {
  saveCode,
  saveBoilerplate,
  resetToBoilerplate,
  addFile,
  deleteFile,
  editFileName,
  setCurrentFile,
} = codeSlice.actions;
export default codeSlice.reducer;
