import { ItemInterface } from '../../types'

/**
 *
 * @param data object with the type of ItemInterface
 *
 * @returns returns the actions object for adding to cart
 */
export const addToCart = (data: ItemInterface) => ({
	type: 'ADD_TO_CART',
	payload: data
})

/**
 *
 * @param data object with the type of ItemInterface
 *
 * @returns returns the object for removing from cart
 */
export const removeFromCart = (data: ItemInterface) => ({
	type: 'REMOVE_FROM_CART',
	payload: data
})


export const clearCart = () => ({
	type: 'CLEAR_CART'
})

