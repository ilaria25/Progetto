import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";
import { useState } from "react";
import OnePiece from "./Components/Anime/OnePiece.js";
import AoT from "./Components/Anime/AoT.js";
import MyHeroAcademia from "./Components/Anime/MyHeroAcademia.js";
import Bleach from "./Components/Anime/Bleach.js";
import Naruto from "./Components/Anime/Naruto.js";
import Jjk from "./Components/Anime/Jjk.js";
import DemonSlayer from "./Components/Anime/DemonSlayer.js";
import Contacts from "./Components/Contacts.js";

function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login setAdmin={setAdmin}></Login>} />
        <Route
          path="Homepage"
          element={<Homepage admin={admin} setAdmin={setAdmin}></Homepage>}
        />
        <Route path="OnePiece" element={<OnePiece></OnePiece>} />
        <Route path="Naruto" element={<Naruto></Naruto>} />
        <Route path="AoT" element={<AoT></AoT>} />
        <Route path="Bleach" element={<Bleach></Bleach>} />
        <Route
          path="MyHeroAcademia"
          element={<MyHeroAcademia></MyHeroAcademia>}
        />
        <Route path="Jjk" element={<Jjk></Jjk>} />
        <Route path="DemonSlayer" element={<DemonSlayer></DemonSlayer>} />
        <Route path="Contacts" element={<Contacts></Contacts>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
