export type User = {
  id: string;
  username: string;
  userImgUrl: string;
  profileText: string;
  role: 'user' | 'admin';
  updatedAt: Date;
  createdAt: Date;
};
