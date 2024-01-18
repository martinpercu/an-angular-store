
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // just for practicity == This is NOT secure!!!! ==> the backend should not return the password
  role: 'admin' | 'customer';
  avatar?: string;
}



export interface CreateUserDTO extends Omit<User, 'id'> {}
