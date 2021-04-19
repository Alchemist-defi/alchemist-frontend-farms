/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import aurumPoolsConfig from 'config/constants/aurumPools'
import { fetchAurumPoolsBlockLimits, fetchAurumPoolsTotalStatking } from './fetchAurumPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchAurumPoolsUser'
import { AurumPoolsState, AurumPool } from '../aurumTypes'

const initialState: AurumPoolsState = { data: [...aurumPoolsConfig] }

export const AurumPoolsSlice = createSlice({
  name: 'AurumPools',
  initialState,
  reducers: {
    setAurumPoolsPublicData: (state, action) => {
      const livePoolsData: AurumPool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setAurumPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
    },
    updateAurumPoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setAurumPoolsPublicData, setAurumPoolsUserData, updateAurumPoolsUserData } = AurumPoolsSlice.actions

// Thunks
export const fetchAurumPoolsPublicDataAsync = () => async (dispatch) => {
  const blockLimits = await fetchAurumPoolsBlockLimits()
  const totalStakings = await fetchAurumPoolsTotalStatking()

  const liveData = aurumPoolsConfig.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.sousId === pool.sousId)
    const totalStaking = totalStakings.find((entry) => entry.sousId === pool.sousId)
    return {
      ...blockLimit,
      ...totalStaking,
    }
  })

  dispatch(setAurumPoolsPublicData(liveData))
}

export const fetchAurumPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)

  const userData = aurumPoolsConfig.map((pool) => ({
    sousId: pool.sousId,
    allowance: allowances[pool.sousId],
    stakingTokenBalance: stakingTokenBalances[pool.sousId],
    stakedBalance: stakedBalances[pool.sousId],
    pendingReward: pendingRewards[pool.sousId],
  }))

  dispatch(setAurumPoolsUserData(userData))
}

export const updateAurumUserAllowance = (sousId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updateAurumPoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
}

export const updateAurumUserBalance = (sousId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updateAurumPoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
}

export const updateAurumUserStakedBalance = (sousId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updateAurumPoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
}

export const updateAurumUserPendingReward = (sousId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updateAurumPoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
}

export default AurumPoolsSlice.reducer
