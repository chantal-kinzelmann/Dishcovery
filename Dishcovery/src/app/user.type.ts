export type User = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    userImgUrl?: string;
    role: 'user' | 'admin';
    createdAt: Date;
  };