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
    totalSupply: 0,
    availableToken: 0,
    userToken: 0,
    userTokeBalance: 0,
    contractTokeBalance: 0,
    mintedToken: 0,
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

        const userTokeBalance = await tokenContract.methods.balanceOf(account).call()
        const contractTokeBalance = await tokenContract.methods.balanceOf(stakingNFTAddress).call()

        const userNftToken = await nftTokenContract.methods.tokenOwnedByUser(account).call()

        const isApprovedForAll = await nftTokenContract.methods.isApprovedForAll(account, stakingNFTAddress).call()

        const totalSupply = await nftTokenContract.methods.totalSupply().call()

        const availableToken = await nftTokenContract.methods.balanceOf(nftTokenAddress).call()

        const userToken = await nftTokenContract.methods.balanceOf(account).call()

        const mintedToken = await nftTokenContract.methods.tokenId().call()

        // const myNftTookenList = await nftTokenContract.methods.tokenOwnedByUser(account).call()

        const myTokenList = await setState((prevState) => ({
          ...prevState,
          isInitialized: true,
          allowanceToken,
          userNftToken,
          totalSupply,
          availableToken,
          userToken,
          mintedToken,
          userTokeBalance,
          contractTokeBalance,
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

  const getOwnerOfToken = async (tokenId) => {
    try {
      return await nftTokenContract.methods.ownerOf(tokenId).call()
    } catch (error) {
      return false
    }
  }

  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <NftProviderContext.Provider value={{ ...state, reInitialize, getOwnerOfToken }}>
      {children}
    </NftProviderContext.Provider>
  )
}

export default NftProvider
