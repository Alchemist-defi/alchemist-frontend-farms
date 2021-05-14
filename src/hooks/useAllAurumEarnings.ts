import { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import multicall from 'utils/multicall'
import { getAurumMasterChefAddress } from 'utils/addressHelpers'
import aurumMasterChefABI from 'config/abi/aurumMasterchef.json'
import { aurumFarmsConfig } from 'config/constants/'
import useRefresh from './useRefresh'

const useAllAurumEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account }: { account: string } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {
      const calls = aurumFarmsConfig.map((farm) => ({
        address: getAurumMasterChefAddress(),
        name: 'pendingAurum',
        params: [farm.pid, account],
      }))

      const res = await multicall(aurumMasterChefABI, calls)

      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useAllAurumEarnings
