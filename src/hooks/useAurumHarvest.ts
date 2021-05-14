import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync } from 'state/actions'
import {   harvest } from 'utils/callHelpers'
import { useAurumMasterchef } from './useContract'

export const useAurumHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const aurumMasterChefContract = useAurumMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(aurumMasterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, aurumMasterChefContract])

  return { onAurumReward: handleHarvest }
}

export const useAurumAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const aurumMasterChefContract = useAurumMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(aurumMasterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, aurumMasterChefContract])

  return { onAurumReward: handleHarvest }
}
