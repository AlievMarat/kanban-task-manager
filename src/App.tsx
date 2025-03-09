import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Board/global.css";
import Board from "./Board/Board";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Board />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
