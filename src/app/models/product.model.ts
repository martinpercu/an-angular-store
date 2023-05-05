export interface Category {
  id: number;
  name: string;
  typeImg: string;
}


export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: number;
}

// export interface UpdateProductDTO {
//   title?: string;
//   price?: number;
//   description?: string;
//   category?: Category;
//   images?: string[];
// }

// Above the perfect Update DTO with all keys optionals (?)
// a much better way to do this is using Partial<CreateProductDTO>
// Partial add the "?" in all keys.. so everything becomes optional

export interface UpdateProductDTO extends Partial<CreateProductDTO> { }
