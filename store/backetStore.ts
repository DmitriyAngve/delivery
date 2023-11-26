import { create } from "zustand";

// Это код из https://github.com/pmndrs/zustand
export interface Product {
  id: number;
  name: string;
  price: number;
  info: string;
  img: any;
}

export interface BasketState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
  total: number;
}

const useBasketStore = create<BasketState>((set, get) => ({
  products: [],
  items: 0,
  total: 0,
  addProduct: (product) => {
    set((state) => {
      state.items += 1;
      state.total += product.price;
      const hasProduct = state.products.find((p) => p.id === product.id);

      if (hasProduct) {
        hasProduct.quantity += 1;
        return { products: [...state.products] };
      } else {
        return { products: [...state.products, { ...product, quantity: 1 }] };
      }
    });
  },
  reduceProduct: (product) => {
    set((state) => {
      state.total -= product.price; // Уменьшаю на текущую цену
      state.items -= 1;

      return {
        products: state.products
          .map((p) => {
            // Если продукт найден в текущем продактс, quantity уменьшаем на 1
            if (p.id === product.id) {
              p.quantity -= 1;
            }
            return p;
          })
          .filter((p) => p.quantity > 0), // Это чтобы количество продуктов в корзине не вылезло меньше 0
      };
    });
  },
  clearCart: () => set({ products: [], items: 0, total: 0 }),
}));
