interface UserInterface {
  name: string;
  surname: string;
  password: string;
  email: string;
  role: string;
  categories?: string[];
  _id?: string;
}

export default UserInterface;
