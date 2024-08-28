export type GameData = {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: {
    id: number;
    image: string;
  }[];
};

export type Comment = {
  id: string;
  userId: string;
  gameId: string;
  gameName: string;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
  gameThumbnail: string;
};

export type UserComment = {
  name: string;
  email: string;
  image: string;
  comments: Comment[];
} | null;

export type UserFavorites = {
  favoriteGames: {
    id: string;
    userId: string;
    gameId: string;
    gameName: string;
    gameThumbnail: string;
  }[];
};

export type UserFavoritesResponse = {
  status: number;
  data: UserFavorites;
};

export type CommentResponse = {
  status: number;
  data: UserComment;
};

export type GameComments = {
  id: string;
  comment: string;
  createdAt: Date;
  user: {
    name: string;
    image: string;
  };
};
