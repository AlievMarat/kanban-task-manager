import React from "react";
import { useTypedSelector } from "../../../../customHooks/useTypedSelector";
import CreateBoard from "../../../Modal/CreateBoard/CreateBoard";
export default function AddNewBoard() {
  const addNewBoardFlag = useTypedSelector(
    (state) => state.modalOpen.modalFlags.addNewBoard
  );
  return <>{addNewBoardFlag && <CreateBoard />}</>;
}
