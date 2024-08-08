import { ItemInterface } from "../../types";

const initialCartState: ItemInterface[] = [];

export default (state = initialCartState, action: any): ItemInterface[] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      state.map((data) => {
        if (action.payload.id === data.id) {
          data.quantity++;
          return [...state, data];
        }
        return data;
      });
      return state;
    }
    case "REMOVE_FROM_CART": {
      state.map((data) => {
        if (action.payload.id === data.id) {
          if (data.quantity > 1) {
            data.quantity--;
            return [...state, data];
          } else {
            return state.filter((data) => action.payload.id !== data.id);
          }
        }
      });
      return state;
    }
    default: {
      return state;
    }
  }
};
