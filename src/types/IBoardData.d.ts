interface IBoardSidebarPost {
  title: string;
  custom: { description: string };
}
interface IBoardSidebarPostResponse {
  result: string;
  id: number;
}
interface ICreateColumn {
  id: number;
  column: {
    title: string;
    position: number;
  };
}
interface IBoardSidebarGetResponse {
  boards: [
    {
      id: number;
      title: string;
      custom: {
        description: string;
      };
    }
  ];
}
interface ICard {
  id: number;
  title: string;
  color: string;
  description: string;
  custom: {
    deadline: string;
  };
  users: number[];
  created_at?: number;
}
interface IBoardGet {
  title: string;
  custom: {
    description: string;
  };
  users: [{ id: number; username: string }];
  lists: [
    {
      id: number;
      title: string;
      cards: [ICard];
    }
  ];
}
interface IList {
  title: string;
  card: ICard[];
  dropSlot: boolean;
  listIndex: number;
  hoveredPosition: { listIndex: number; cardIndex: number } | null;
  draggedCard: { listIndex: number; cardIndex: number } | null;
  onDragStart: (listIndex: number, cardIndex: number) => void;
  onDragLeave: () => void;
  onDragEnter: (
    e: React.DragEvent,
    listIndex: number,
    cardIndex: number
  ) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
}
export const {
  IList,
  IBoardSidebarPost,
  IBoardSidebarPostResponse,
  IBoardSidebarGetResponse,
  ICreateColumn,
};
