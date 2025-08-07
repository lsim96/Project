import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import GuitarModelsPage from "./Pages/GuitarModelsPage/GuitarModelsPage";
// import Layout from "./Layout";
import DetailsPage from "./Pages/DetailsPage/Details";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/:id" element={<GuitarModelsPage />} />
      <Route path="/:id/:guitarId" element={<DetailsPage />} />
    </Routes>
  );
}

export default App;
