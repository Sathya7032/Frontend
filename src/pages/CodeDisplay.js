import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { Button, Box } from "@mui/material";

const CodeDisplay = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const [codeValue, setCodeValue] = useState(code);
  const editorRef = useRef(null);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(codeValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  const executeCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      new Function(codeValue)();
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  return (
    <Box sx={{ position: "relative", paddingTop: "50px" }}>
      <Button
        onClick={copyCodeToClipboard}
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          padding: "5px 10px",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
      <CodeMirror
        value={codeValue}
        theme={oneDark}
        extensions={[javascript()]}
        onChange={(value) => setCodeValue(value)}
        ref={editorRef}
      />
      <Button
        onClick={executeCode}
        variant="contained"
        color="success"
        sx={{
          position: "absolute",
          bottom: 5,
          right: 5,
          padding: "5px 10px",
        }}
      >
        Run Code
      </Button>
    </Box>
  );
};

export default CodeDisplay;
