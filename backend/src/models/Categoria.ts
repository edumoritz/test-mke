import { uuid } from 'uuidv4';

class Category {
  id: string;

  title: string;

  constructor(title: string) {
    this.id = uuid();
    this.title = title;
  }
}

export default Category;