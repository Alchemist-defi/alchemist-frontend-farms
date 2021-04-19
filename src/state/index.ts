import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import poolsReducer from './pools'

import aurumFarmsReducer from './aurumFarms'
import aurumPoolsReducer from './aurumPools'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    pools: poolsReducer,
    aurumFarms : aurumFarmsReducer,
    aurumPools : aurumPoolsReducer,
  },
})
