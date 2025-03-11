interface IBoardPost {
  title: string;
  custom: { description: string };
}
interface IBoardPostResponse {
  result: string;
  id: number;
}
interface IBoardGetResponse {
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
export const { IBoardPost, IBoardPostResponse, IBoardGetResponse };
