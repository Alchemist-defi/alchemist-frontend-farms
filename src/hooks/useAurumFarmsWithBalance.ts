import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import multicall from 'utils/multicall'
import { getAurumMasterChefAddress } from 'utils/addressHelpers'
import aurumMasterChefABI from 'config/abi/aurumMasterchef.json'
import { aurumFarmsConfig } from 'config/constants'
import { FarmConfig } from 'config/constants/types'
import useRefresh from './useRefresh'

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber
}

const useAurumFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = aurumFarmsConfig.map((farm) => ({
        address: getAurumMasterChefAddress(),
        name: 'pendingAurum',
        params: [farm.pid, account],
      }))

      const rawResults = await multicall(aurumMasterChefABI, calls)
      const results = aurumFarmsConfig.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

      setFarmsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return farmsWithBalances
}

export default useAurumFarmsWithBalance
