export interface User {
  id: string;
  username: string;
}

export interface Board {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  imgSrc: string;
  createdBy: User;
  description: string;
}
