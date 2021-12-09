import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import Web3 from 'web3'

// approve staking
export const useStakingDeposit = (stakingContract: Contract, tokenId) => {
  const { account } = useWallet()
  const onDeposit = useCallback(async () => {
    try {
      const tx = await stakingContract.methods
        .deposit(tokenId)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account,  stakingContract])

  return onDeposit
}

export const useStakingWithdrawWithNft = (stakingContract: Contract) => {
  const { account } = useWallet()
  const onWithdraw = useCallback(async (tokenId) => {
    console.log('%c 🍰 tokenId: ', 'font-size:20px;background-color: #FCA650;color:#fff;', tokenId);
    try {
      const tx = await stakingContract.methods
        .withdrawWithNFT(tokenId)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account,  stakingContract])

  return onWithdraw
}

export const onApproveNftToken = (nftContract: Contract, spenderAddress) => {
  const { account } = useWallet()
  const onWithdraw = useCallback(async () => {
    try {
      const tx = await nftContract.methods
        .setApprovalForAll(spenderAddress, true)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account,  nftContract])

  return onWithdraw
}