import { useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import { Container } from "@mui/material";

function App() {

  return (
    <>
      <div
        style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
          }}
      >
          <MainContent />
      </div>
    </>
  );
}

export default App;
