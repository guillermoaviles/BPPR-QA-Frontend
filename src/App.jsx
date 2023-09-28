// import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import Profile from "./pages/Profile";

import NavbarComp from "./components/NavbarComp";

function App() {
  return (

    <div className="font-monserrat text-center bg-app">
      <NavbarComp />
      <Routes>
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
        <Route path="/" element={<IsPrivate><HomePage /></IsPrivate>} />
        <Route path="/search" element={<IsPrivate><Search /></IsPrivate>} />
        <Route path="/profile/:id" element={<IsPrivate><Profile /></IsPrivate>} />
      </Routes>

    </div>
  );
}

export default App;
