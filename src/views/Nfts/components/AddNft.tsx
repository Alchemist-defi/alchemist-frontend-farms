// import React from 'react'
import React, { useState, useContext, useCallback } from 'react'
import { NftProviderContext } from '../contexts/NftProvider'

// import orderBy from 'lodash/orderBy'
// import nfts from 'config/constants/nfts'
// import NftCard from './NftCard'
import NftGrid from './NftGrid'
import {
  Card,
  CardBody,
  Heading,
  OpenNewIcon,
  Text,
  Link as UIKitLink,
  Progress,
  Button,
  Svg,
} from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useStakingApprove } from '../../../hooks/useApprove'
import { useERC20, useStakingNft, useNftToken } from 'hooks/useContract'
import { stakingNFTAddress, tokenContractAddress, nftTokenAddress } from '../../../config/constants/stakingNft'
import { useStakingDeposit, useStakingWithdrawWithNft, onApproveNftToken } from '../../../hooks/stakingNfts'
import { toast } from 'react-toastify'

// import InfoRow from './InfoRow'

const AddNft = () => {
  const erc20Contract = useERC20(tokenContractAddress)
  const stakingNftContract = useStakingNft(stakingNFTAddress)
  const nftTokenContract = useNftToken(nftTokenAddress)

  const { allowanceToken, isApprovedForAll, userNftToken, reInitialize } = useContext(NftProviderContext)
  const onApprove = useStakingApprove(erc20Contract, stakingNFTAddress)
  const onDeposit = useStakingDeposit(stakingNftContract, 100)
  const onWithdraw = useStakingWithdrawWithNft(stakingNftContract)

  const onNftApprove = onApproveNftToken(nftTokenContract, stakingNFTAddress)

  const handleApprove = useCallback(async () => {
    try {
      // setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        toast.error('Error While Approve Token')
        // setRequestedApproval(false)
      } else {
        reInitialize()
        toast.success('Token Approved')
      }
    } catch (e) {
      console.error(e)
      toast.error('Error While Approve Token')
    }
  }, [onApprove])

  const handelStaking = useCallback(async () => {
    try {
      // setRequestedApproval(true)
      const txHash = await onDeposit()
      // user rejected tx or didn't go thru
      if (!txHash) {
        toast.error('Error While Stake Token')
        // setRequestedApproval(false)
      } else {
        reInitialize()
        toast.success('Token Staked')
      }
    } catch (e) {
      toast.error('Error While Stake Token')

      console.error(e)
    }
  }, [onDeposit])

  const handelWithdrawToken = useCallback(
    async (id) => {
      try {
        // setRequestedApproval(true)
        const txHash = await onWithdraw(id)
        // user rejected tx or didn't go thru
        if (!txHash) {
          toast.error('Error While Withdraw Token')

          // setRequestedApproval(false)
        } else {
          reInitialize()
          toast.success('Token Withdraw Successfully')
        }
      } catch (e) {
        console.error(e)
        toast.error('Error While Withdraw Token')
      }
    },
    [onWithdraw],
  )

  const handelNftApprove = useCallback(async () => {
    try {
      // setRequestedApproval(true)
      const txHash = await onNftApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        toast.error('Error While Approve Token')

        // setRequestedApproval(false)
      } else {
        reInitialize()
        toast.success('Token Approved')
      }
    } catch (e) {
      console.error(e)
      toast.error('Error While Approve Token')
    }
  }, [onNftApprove])

  return (
    <>
      <NftGrid>
        {/* {orderBy(nfts, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <NftCard nft={nft} />
        </div>
      ))} */}
        <Card>
          <CardBody style={{ textAlign: 'center' }}>
            <div>
              <img src="images/add.png" />
            </div>
            {/* <InfoRow> */}
            {allowanceToken == 0 ? (
              <Button
                onClick={() => {
                  handleApprove()
                }}
              >
                Allow token
              </Button>
            ) : (
              <Button onClick={handelStaking}>Mint New NFTs</Button>
            )}
            {/* </InfoRow> */}
          </CardBody>
        </Card>

        {/* {userNftToken.length > 0 ? (
          isApprovedForAll ? (
            userNftToken.map((element) => (
              <Button
                onClick={() => {
                  handelWithdrawToken(element)
                }}
              >
                Withdraw Nft {element}{' '}
              </Button>
            ))
          ) : (
            <Button onClick={handelNftApprove}>Approve Nft Token</Button>
          )
        ) : (
          'You Have No Token Yet'
        )} */}
      </NftGrid>
      <h2>My Token</h2>
      <NftGrid>
        {userNftToken.length > 0 ? (
          isApprovedForAll ? (
            userNftToken.map((element) => (
              <Button
                onClick={() => {
                  handelWithdrawToken(element)
                }}
              >
                Withdraw Nft {element}{' '}
              </Button>
            ))
          ) : (
            <Button onClick={handelNftApprove}>Approve Nft Token</Button>
          )
        ) : (
          'You Have No Token Yet'
        )}
      </NftGrid>

      <h2>My Token</h2>
      <NftGrid>
        {userNftToken.length > 0
          ? userNftToken.map((element) => (
              <a href={`ipfs://QmX52P9CHRP3URUYWrT7BAvkTr8bK66dWWSNxFKKeojpsQ/${element}`} target="_blank">
                <Button>view Token {element} </Button>
              </a>
            ))
          : 'You Have No Token Yet'}
      </NftGrid>
    </>
  )
}

export default AddNft
