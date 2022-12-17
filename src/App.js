import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import Home from "./Pages/Home/Home";
import Reports from "./Pages/Reports/Reports";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Team from "./Pages/Team/Team";
import Support from "./Pages/Support/Support";
import GeneralContextProvider from "./contexts/GeneralContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <GeneralContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/team" element={<Team />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </GeneralContextProvider>
    </div>
  );
}

export default App;
