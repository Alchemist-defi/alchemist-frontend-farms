import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useBlock from 'hooks/useBlock'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import { RABBIT_MINTING_FARM_ADDRESS } from 'config/constants/nfts'
import multicall from 'utils/multicall'
import { getStakingNftContract, getErc20Contract } from '../utils/contracts'
import { stakingNFTAddress, nftTokenAddress } from 'config/constants/stakingNft'
import { useNftToken } from '../../../hooks/useContract'

interface NftProviderProps {
  children: ReactNode
}

type BunnyMap = {
  [key: number]: number[]
}

type State = {
  isInitialized: boolean
  canClaim: boolean
  hasClaimed: boolean
  countBunniesBurnt: number
  endBlockNumber: number
  startBlockNumber: number
  totalSupplyDistributed: number
  currentDistributedSupply: number
  balanceOf: number
  bunnyMap: BunnyMap
}

type Context = {
  // canBurnNft: boolean
  // getTokenIds: (bunnyId: number) => number[]
  reInitialize: () => void
} & State

export const NftProviderContext = createContext(null)

const NftProvider: React.FC<NftProviderProps> = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState({
    isInitialized: false,
    allowanceToken: 0,
    userNftToken: [],
    isApprovedForAll: false,
  })
  const { account } = useWallet()

  const { isInitialized } = state
  const nftTokenContract = useNftToken(nftTokenAddress)
  // Data from the contract that needs an account
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const tokenContract = getErc20Contract()

        const allowanceToken = await tokenContract.methods.allowance(account, stakingNFTAddress).call()

        const userNftToken = await nftTokenContract.methods.tokenOwnedByUser(account).call()

        const isApprovedForAll = await nftTokenContract.methods.isApprovedForAll(account, stakingNFTAddress).call()

        setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          allowanceToken,
          userNftToken,
          isApprovedForAll,
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    if (account) {
      fetchContractData()
    }
  }, [isInitialized, account, setState])

  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return <NftProviderContext.Provider value={{ ...state, reInitialize }}>{children}</NftProviderContext.Provider>
}

export default NftProvider
