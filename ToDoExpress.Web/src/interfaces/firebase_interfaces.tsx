export interface IItem {
  title: string;
}

export interface ITodo {
  items: string[];
}

export interface IFirebaseUser {
  uid: string;
  name: string | undefined;
  email: string | null;
}

export interface IUser {
  name: string;
  email: string;
}

export interface ITodoItem {
  title: string;
  order: number;
  description: string;
}
