import BigNumber from 'bignumber.js'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { fetchAurumFarmsPublicDataAsync, fetchAurumPoolsPublicDataAsync, fetchAurumPoolsUserDataAsync } from './aurumActions'
import { AurumState, AurumFarm, AurumPool } from './aurumTypes'
import { QuoteToken } from '../config/constants/types'

const ZERO = new BigNumber(0)

export const useAurumFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchAurumFarmsPublicDataAsync())
    // TODO if needed to implement AURUM pools
    // dispatch(fetchAurumPoolsPublicDataAsync())
  }, [dispatch, slowRefresh]) 
}

// Farms
export const useAurumFarms = (): AurumFarm[] => {  
  const aurumFarms = useSelector((state: AurumState) => state.aurumFarms.data)   
  return aurumFarms
}

export const useAurumFarmFromPid = (pid): AurumFarm => {
  const farm = useSelector((state: AurumState) => state.aurumFarms.data.find((f) => f.pid === pid))
  return farm
}

export const useAurumFarmFromSymbol = (lpSymbol: string): AurumFarm => {
  const farm = useSelector((state: AurumState) => state.aurumFarms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useAurumFarmUser = (pid) => {
  const farm = useAurumFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}


// Pools

export const useAurumPools = (account): AurumPool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchAurumPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: AurumState) => state.aurumPools.data)
  return pools
}

export const useAurumPoolFromPid = (sousId): AurumPool => {
  const pool = useSelector((state: AurumState) => state.aurumPools.data.find((p) => p.sousId === sousId))
  return pool
}

// Prices

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 2 // BUSD-BNB LP
  const farm = useAurumFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceMistBusd = (): BigNumber => {
  const pid = 3 // MIST-BUSD LP
  const farm = useAurumFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceAurumBusd = (): BigNumber => {
  const pid = 0; // AURUM-BUSD LP
  const farm = useAurumFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const useAurumTotalValue = (): BigNumber => {
  const aurumFarms = useAurumFarms();
  const bnbPrice = usePriceBnbBusd();
  const aurumPrice = usePriceAurumBusd();  
  let value = new BigNumber(0);  
  for (let i = 0; i < aurumFarms.length; i++) {
    const farm = aurumFarms[i]
    if (farm.lpTotalInQuoteToken) {
      let val;
      if (farm.quoteTokenSymbol === QuoteToken.BNB) {
        val = (bnbPrice.times(farm.lpTotalInQuoteToken));
      }else if (farm.quoteTokenSymbol === QuoteToken.AURUM) {
        val = (aurumPrice.times(farm.lpTotalInQuoteToken));
      }else{
        val = (farm.lpTotalInQuoteToken);
      }
      value = value.plus(val);
    }
  }
  return value;
}