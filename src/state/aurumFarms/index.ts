/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import aurumFarmsConfig from 'config/constants/aurumFarms'
import fetchAurumFarms from './fetchAurumFarms'

import {
  fetchAurumFarmUserEarnings,
  fetchAurumFarmUserAllowances,
  fetchAurumFarmUserTokenBalances,
  fetchAurumFarmUserStakedBalances,
} from './fetchAurumFarmUser'
import { AurumFarmsState, AurumFarm } from '../aurumTypes'

const initialState: AurumFarmsState = { data: [...aurumFarmsConfig] }

export const aurumFarmsSlice = createSlice({
  name: 'AurumFarms',
  initialState,
  reducers: {
    setAurumFarmsPublicData: (aurumState, aurumAction) => {
      const liveAurumFarmsData: AurumFarm[] = aurumAction.payload      
      aurumState.data = aurumState.data.map((aurumFarm) => {
        const liveAurumFarmData = liveAurumFarmsData.find((f) => f.pid === aurumFarm.pid)
        return { ...aurumFarm, ...liveAurumFarmData }
      })
    },
    setAurumFarmUserData: (aurumState, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        aurumState.data[index] = { ...aurumState.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setAurumFarmsPublicData, setAurumFarmUserData } = aurumFarmsSlice.actions

// Thunks
export const fetchAurumFarmsPublicDataAsync = () => async (dispatch) => {
  const aurumFarms = await fetchAurumFarms()
  dispatch(setAurumFarmsPublicData(aurumFarms))  
}
export const fetchAurumFarmUserDataAsync = (account) => async (dispatch) => {
  const userAurumFarmAllowances = await fetchAurumFarmUserAllowances(account)
  const userAurumFarmTokenBalances = await fetchAurumFarmUserTokenBalances(account)
  const userAurumStakedBalances = await fetchAurumFarmUserStakedBalances(account)
  const userAurumFarmEarnings = await fetchAurumFarmUserEarnings(account)

  const arrayOfUserDataObjects = userAurumFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userAurumFarmAllowances[index],
      tokenBalance: userAurumFarmTokenBalances[index],
      stakedBalance: userAurumStakedBalances[index],
      earnings: userAurumFarmEarnings[index],
    }
  })

  dispatch(setAurumFarmUserData({ arrayOfUserDataObjects }))
}

export default aurumFarmsSlice.reducer
