import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import aurumMasterchefABI from 'config/abi/aurumMasterchef.json'
import multicall from 'utils/multicall'
import aurumFarmsConfig from 'config/constants/aurumFarms'
import { getAurumMasterChefAddress } from 'utils/addressHelpers'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchAurumFarmUserAllowances = async (account: string) => {
  const aurumMasterchefAddress = getAurumMasterChefAddress()

  const calls = aurumFarmsConfig.map((aurumFarm) => {
    const lpContractAddress = aurumFarm.isTokenOnly ? aurumFarm.tokenAddresses[CHAIN_ID] : aurumFarm.lpAddresses[CHAIN_ID]
    return { address: lpContractAddress, name: 'allowance', params: [account, aurumMasterchefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchAurumFarmUserTokenBalances = async (account: string) => {
  const calls = aurumFarmsConfig.map((aurumFarm) => {
    const lpContractAddress = aurumFarm.isTokenOnly ? aurumFarm.tokenAddresses[CHAIN_ID] : aurumFarm.lpAddresses[CHAIN_ID]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchAurumFarmUserStakedBalances = async (account: string) => {
  const aurumMasterchefAddress = getAurumMasterChefAddress()

  const calls = aurumFarmsConfig.map((aurumFarm) => {
    return {
      address: aurumMasterchefAddress,
      name: 'userInfo',
      params: [aurumFarm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(aurumMasterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchAurumFarmUserEarnings = async (account: string) => {
  const aurumMasterchefAddress = getAurumMasterChefAddress()

  const calls = aurumFarmsConfig.map((aurumFarm) => {
    return {
      address: aurumMasterchefAddress,
      name: 'pendingAurum',
      params: [aurumFarm.pid, account],
    }
  })

  const rawEarnings = await multicall(aurumMasterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
