// import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";


function App() {
  return (

    <div className="text-center">
      <Routes>
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
        <Route path="/" element={<IsPrivate><HomePage /></IsPrivate>} />
        <Route path="/search" element={<IsPrivate><Search /></IsPrivate>} />
      </Routes>

    </div>
  );
}

export default App;
