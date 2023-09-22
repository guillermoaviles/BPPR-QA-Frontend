// import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <div className="">
      <NextUIProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </NextUIProvider>
    </div>
  );
}

export default App;
