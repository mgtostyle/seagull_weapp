import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './global'
import compositeReducer from './composite'

export default configureStore({
  reducer: {
    global: globalReducer,
    composite: compositeReducer
  }
})