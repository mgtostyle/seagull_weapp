import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './global'
import compositeReducer from './composite'
import wfoodReducer from './wfood'

export default configureStore({
  reducer: {
    global: globalReducer,
    composite: compositeReducer,
    wfood: wfoodReducer
  }
})