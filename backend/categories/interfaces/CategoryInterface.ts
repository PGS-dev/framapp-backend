interface CategoryInterface {
  userId: string;
  title: string;
  description: string;
  products?: string[];
  _id?: string;
}

export default CategoryInterface;
