import { RootState } from '../../types'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducers/storeReducer'

export default function createStore() {
	return configureStore<RootState>({
			reducer: {
				cart: cartReducer
		}
	})
}
