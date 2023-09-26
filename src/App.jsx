// import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import LoginPage from "./pages/LoginPage";


function App() {
  return (

    <div className="text-center">
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
      </Routes>

    </div>
  );
}

export default App;
