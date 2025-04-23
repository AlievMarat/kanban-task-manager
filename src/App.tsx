import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./features/global.css";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "./features/boards/api/useBoards";

import Board from "./features/Board";
function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["board"],
    queryFn: () => getBoard(),
  });

  const boardId = data?.[0]?.id;

  if (isLoading) return null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/board/${boardId}`} />} />
        <Route path="/board/:board_id" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
