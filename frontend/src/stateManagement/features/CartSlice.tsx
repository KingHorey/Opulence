
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartInterface, cartProduct } from "../../types";

type DefaultState = {
  cartItems: cartProduct[],
  numItemsInCart: number,
  cartTotal: number,
} 

const initialState:DefaultState = {
  cartItems:[], 
  cartTotal: 0,
  numItemsInCart: 0,
}




export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action:PayloadAction<CartInterface>) => {
        const {cartProduct} = action.payload
        const item = state.cartItems.find((i)=>i.cartID === cartProduct.cartID)
        if (item) {
          item.amount += cartProduct.amount
        } else {
          state.cartItems.push(cartProduct)
        }
        state.numItemsInCart += cartProduct.amount
        state.cartTotal += cartProduct.price * cartProduct.amount

    },
    increaseAmount: (state,action:PayloadAction<CartInterface>)=>{
      const{cartProduct} = action.payload
        state.cartItems.map((i)=>{
            if (i.cartID === cartProduct.cartID) {
              return { ...i, amount: i.amount ++ }
            }
            return i;
        })
        state.numItemsInCart = state.cartItems.reduce((ini,curr)=>{
            return ini += curr.amount
        },0)
        state.cartTotal = state.cartItems.reduce((ini,curr)=>{
          return ini += (curr.amount * curr.price)
        },0)
    },
    decreaseAmount: (state,action:PayloadAction<CartInterface>)=>{
      const {cartProduct} = action.payload

      state.cartItems.map((i) => {
        if (i.cartID === cartProduct.cartID) {
          return { ...i, amount: i.amount-- }
        }
        return i
      })
      state.numItemsInCart = state.cartItems.reduce((ini, curr) => {
        return (ini += curr.amount)
      }, 0)
      state.cartTotal = state.cartItems.reduce((ini, curr) => {
        return (ini += curr.amount * curr.price)
      }, 0)
    },
    removeItem: (state,action:PayloadAction<CartInterface>)=>{
        const {cartProduct} = action.payload
       state.cartItems = state.cartItems.filter((i)=>i.cartID !== cartProduct.cartID)
      state.numItemsInCart = state.cartItems.reduce((ini, curr) => {
        return (ini += curr.amount)
      }, 0)
      state.cartTotal = state.cartItems.reduce((ini, curr) => {
        return (ini += curr.amount * curr.price)
      }, 0)
       
    }
  },
})




export const {addtoCart,increaseAmount,decreaseAmount,removeItem} = cartSlice.actions

export default cartSlice.reducer