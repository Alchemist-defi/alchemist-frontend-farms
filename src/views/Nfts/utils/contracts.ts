import { AbiItem } from 'web3-utils'
import { getContract } from 'utils/web3'
import { ContractOptions } from 'web3-eth-contract'
import stakingNft from 'config/abi/stakingNft.json'
// import pancakeRabbits from 'config/abi/pancakeRabbits.json'
import erc20 from "config/abi/erc20.json"
import { stakingNFTAddress, tokenContractAddress } from 'config/constants/stakingNft'

// TODO: Figure out how to add current account to contracts to write methods can be used


export const getStakingNftContract = (contractOptions?: ContractOptions) => {
  const stakingNftAbi = (stakingNft as unknown) as AbiItem
  return getContract(stakingNftAbi, stakingNFTAddress, contractOptions)
}

export const getErc20Contract = (contractOptions?: ContractOptions) => {
  const erc20ContractAbi = (erc20 as unknown) as AbiItem
  return getContract(erc20ContractAbi, tokenContractAddress, contractOptions)
}

// export const getPancakeRabbitContract = (contractOptions?: ContractOptions) => {
//   const pancakeRabbitsAbi = (pancakeRabbits as unknown) as AbiItem
//   return getContract(pancakeRabbitsAbi, PANCAKE_RABBITS_ADDRESS, contractOptions)
// }

export default getStakingNftContract