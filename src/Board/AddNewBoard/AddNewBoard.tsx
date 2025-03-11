import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTypedSelector } from "../../customHooks/useTypedSelector";
import { createBoard } from "../../api/useBoards";
import { useState } from "react";
import Modal from ".././Modal/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { IBoardPost } from "../../types/IBoardData";
export default function AddNewBoard() {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState("");
  const isModalOpen = useTypedSelector((state) => state.modalSlice.open);
  const mutation = useMutation({
    mutationFn: createBoard,
    onSuccess: (id) => {
      queryClient.setQueryData(["boardId"], id); // Сохраняем ID в кеш
    },
  });

  const handleBoardCreate = () => {
    const boardData: IBoardPost = {
      title: inputValue,
      custom: { description: "dsf" },
    };
    mutation.mutate(boardData);
  };
  return (
    <>
      {isModalOpen && (
        <Modal title="Add New Board">
          <>
            <label className="modal__label">
              Board Name
              <Input
                placeholder="e.g. Web Design"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {/* <Input placeholder="e.g. Web Design" /> */}
              <Button title="Save Changes" onClick={handleBoardCreate} />
            </label>
          </>
        </Modal>
      )}
    </>
  );
}
