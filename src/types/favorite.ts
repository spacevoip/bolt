export interface Favorite {
  id: string;
  name: string;
  key: string;
  account: string;
  created_at: string;
}

export interface CreateFavoriteDTO {
  name: string;
  key: string;
  account: string;
}