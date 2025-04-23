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
      cards: [
        {
          id: number;
          title: string;
          color: string;
          description: string;
          custom: {
            deadline: string;
          };
          users: number[];
          created_at: number;
        }
      ];
    }
  ];
}

export const {
  IBoardSidebarPost,
  IBoardSidebarPostResponse,
  IBoardSidebarGetResponse,
  ICreateColumn,
};
