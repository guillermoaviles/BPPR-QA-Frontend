// import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import NavbarComp from "./components/NavbarComp";
import Profile from "./pages/Profile";

function App() {
  return (

    <div className="text-center">
      <NavbarComp />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>

    </div>
  );
}

export default App;
