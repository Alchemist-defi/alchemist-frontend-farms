import React, { useState, useContext, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import { getStakingNftContract } from '../../utils/contracts'
import ClaimNftModal from '../ClaimNftModal'
import BurnNftModal from '../BurnNftModal'
import TransferNftModal from '../TransferNftModal'
import Nfts, { NFtImages, PRICELevelPhoenix, PRICELevelAll, startLevel } from '../../../../config/constants/stakingNft'
import { toast } from 'react-toastify'
import { useStakingApprove } from '../../../../hooks/useApprove'
import { useERC20, useStakingNft, useNftToken } from 'hooks/useContract'
import { stakingNFTAddress, tokenContractAddress, nftTokenAddress } from '../../../../config/constants/stakingNft'
import { useStakingDeposit, useStakingWithdrawWithNft, onApproveNftToken } from '../../../../hooks/stakingNfts'

interface NftCardProps {
  nft: Nft
}

const Header = styled(InfoRow)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text', fullWidth: true })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled.div`
  padding: 0 24px 24px;
`

const Value = styled(Text)`
  font-weight: 600;
`

const NftCard = ({ nft, index, type }) => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: false,
    bunnyCount: 0,
    bunnyBurnCount: 0,
  })
  const [tokenAvailable, setTokenAvailable] = useState(false)

  const [isLoading, setsLoading] = useState(false)

  const erc20Contract = useERC20(tokenContractAddress)
  const stakingNftContract = useStakingNft(stakingNFTAddress)
  const nftTokenContract = useNftToken(nftTokenAddress)

  const {
    allowanceToken,
    userNftToken,
    isApprovedForAll,
    totalSupply,
    userTokeBalance,
    reInitialize,
    getOwnerOfToken,
    getUserToken,
  } = useContext(NftProviderContext)

  const onApprove = useStakingApprove(erc20Contract, stakingNFTAddress)
  const onDeposit = useStakingDeposit(stakingNftContract)

  const onWithdraw = useStakingWithdrawWithNft(stakingNftContract)

  const onNftApprove = onApproveNftToken(nftTokenContract, stakingNFTAddress)

  useEffect(() => {
    try {
      const getOwner = async () => {
        const tokenOwner = await getOwnerOfToken(nft.tokenId)

        setTokenAvailable(tokenOwner == stakingNFTAddress || tokenOwner == false ? false : true)
      }
      getOwner()
    } catch {
      setTokenAvailable(false)
    }
  }, [nft])

  // const onWithdraw = useStakingWithdrawWithNft(stakingNftContract)

  // const onNftApprove = onApproveNftToken(nftTokenContract, stakingNFTAddress)

  const TranslateString = useI18n()

  const checkUserSameToken = () => {
    return new Promise(async (resolve) => {
      const selectedNftData = Nfts[parseInt(nft.tokenId) - 1]
      const userTokenList = await getUserToken()
      if (userTokenList.length > 0) {
        userTokenList.forEach((element) => {
          const userNftData = Nfts[element - 1]

          if (userNftData.level === selectedNftData.level && userNftData.breed === selectedNftData.breed) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
      } else {
        resolve(true)
      }
    })
  }

  const handleApprove = useCallback(async () => {
    try {
      // setRequestedApproval(true)
      setsLoading(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        toast.error('Error While Approve Token')
        // setRequestedApproval(false)
      } else {
        reInitialize()
        toast.success('Token Approved')
      }
      setsLoading(false)
    } catch (e) {
      console.error(e)
      toast.error('Error While Approve Token')
      setsLoading(false)
    }
  }, [onApprove])

  const handelStaking = async () => {
    try {
      setsLoading(true)
      const checkToken = await checkUserSameToken()
      if (!checkToken) {
        toast.error('You Have Already This Breed Of Token')
      } else {
        if (userTokeBalance < nft.breed && nft.breed == '0' ? PRICELevelPhoenix[nft.level] : PRICELevelAll[nft.level]) {
          toast.error(`Insuffiecient MIST token amount`)
        } else {
          // setRequestedApproval(true)
          const txHash = await onDeposit(nft.tokenId)
          // user rejected tx or didn't go thru
          if (!txHash) {
            toast.error('Error While Stake Token')
            // setRequestedApproval(false)
          } else {
            reInitialize()
            toast.success('Token Staked')
          }
        }
      }
      setsLoading(false)
    } catch (e) {
      toast.error('Error While Stake Token')
      setsLoading(false)

      console.error(e)
    }
  }

  const handelWithdrawToken = async () => {
    try {
      setsLoading(true)

      // setRequestedApproval(true)
      const txHash = await onWithdraw(nft.tokenId)
      // user rejected tx or didn't go thru
      if (!txHash) {
        toast.error('Error While Withdraw Token')

        // setRequestedApproval(false)
      } else {
        reInitialize()
        toast.success('Token Withdraw Successfully')
      }
      setsLoading(false)
    } catch (e) {
      setsLoading(false)

      console.error(e)
      toast.error('Error While Withdraw Token')
    }
  }

  const handelNftApprove = useCallback(async () => {
    try {
      setsLoading(true)

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
      setsLoading(false)
    } catch (e) {
      setsLoading(false)

      console.error(e)
      toast.error('Error While Approve Token')
    }
  }, [onNftApprove])

  // const {
  //   isInitialized,
  //   canClaim,
  //   hasClaimed,
  //   canBurnNft,
  //   totalSupplyDistributed,
  //   currentDistributedSupply,
  //   getTokenIds,
  //   reInitialize,
  // } = useContext(NftProviderContext)

  // const walletCanClaim = canClaim && !hasClaimed
  // const { bunnyId, name, previewImage, originalImage, description } = nft
  // const tokenIds = getTokenIds(bunnyId)
  // const isSupplyAvailable = currentDistributedSupply < totalSupplyDistributed
  // const walletOwnsNft = tokenIds && tokenIds.length > 0
  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

  // const fetchDetails = useCallback(async () => {
  //   setState((prevState) => ({ ...prevState, isLoading: true }))
  //   try {
  //     const { methods } = getStakingNftContract()

  //     const bunnyCount = await methods.bunnyCount(bunnyId).call()
  //     const bunnyBurnCount = await methods.bunnyBurnCount(bunnyId).call()

  //     setState((prevState) => ({
  //       ...prevState,
  //       isLoading: false,
  //       isDataFetched: true,
  //       bunnyCount: parseInt(bunnyCount, 10),
  //       bunnyBurnCount: parseInt(bunnyBurnCount, 10),
  //     }))
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [bunnyId])

  const handleClick = async () => {
    if (state.isOpen) {
      setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
    } else {
      setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
    }
  }

  // const handleSuccess = () => {
  //   fetchDetails()
  //   reInitialize()
  // }

  // const [onPresentClaimModal] = useModal(<ClaimNftModal nft={nft} onSuccess={handleSuccess} />)
  // const [onPresentBurnModal] = useModal(<BurnNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />)
  // const [onPresentTransferModal] = useModal(
  //   <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  // )

  return (
    <Card isActive={false}>
      <Image src={NFtImages[parseInt(nft.breed) ? parseInt(nft.breed) : 0]} alt="name" />
      <CardBody>
        {/* <Header> */}
        {/* <Heading>{name}</Heading>
          {isInitialized && walletCanClaim && (
            <Tag outline variant="success">
              {TranslateString(526, 'Available')}
            </Tag>
          )}
          {isInitialized && tokenIds && (
            <Tag outline variant="secondary">
              {TranslateString(999, 'In Wallet')}
            </Tag>
          )} */}

        {/* </Header> */}
        {/* {isInitialized && walletOwnsNft && ( */}

        {type == 'ALL' ? (
          isLoading ? (
            <Button fullWidth variant="secondary" mt="24px" disabled={true}>
              {TranslateString(999, 'Loading...')}
            </Button>
          ) : allowanceToken == 0 ? (
            <Button
              fullWidth
              variant="secondary"
              mt="24px"
              onClick={() => {
                handleApprove()
              }}
            >
              {TranslateString(999, ' Approve MIST')}
            </Button>
          ) : (
            <Button
              fullWidth
              mt="24px"
              onClick={handelStaking}
              disabled={nft.level < startLevel ? tokenAvailable : true}
            >
              {nft.level < startLevel
                ? TranslateString(999, 'Stake Now')
                : TranslateString(999, 'This Level Not Live Yet')}
            </Button>
          )
        ) : (
          ''
        )}

        {type == 'MY-TOKEN' ? (
          isLoading ? (
            <Button fullWidth variant="secondary" mt="24px" disabled={true}>
              {TranslateString(999, 'Loading...')}
            </Button>
          ) : isApprovedForAll ? (
            <Button fullWidth variant="secondary" mt="24px" onClick={handelWithdrawToken}>
              {TranslateString(999, ' Unstake NFT')}
            </Button>
          ) : (
            <Button fullWidth mt="24px" onClick={handelNftApprove}>
              {TranslateString(999, 'Approve NFT')}
            </Button>
          )
        ) : (
          ''
        )}

        {/* <Button fullWidth variant="secondary" mt="24px">
          {TranslateString(999, 'Transfer')}
        </Button> */}
        {/* )} */}
        {/* {isInitialized && walletCanClaim && isSupplyAvailable && ( */}
        {/* <Button fullWidth mt="24px">
          {TranslateString(999, 'Claim this NFT')}
        </Button> */}
        {/* )} */}
        {/* {isInitialized && canBurnNft && walletOwnsNft && (
          <Button variant="danger" fullWidth mt="24px">
            {TranslateString(999, 'Trade in for CAKE')}
          </Button>
        )} */}
      </CardBody>
      <CardFooter p="0">
        <DetailsButton
          endIcon={<Icon width="24px" color="primary" />}
          onClick={() => {
            setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
          }}
        >
          {state.isLoading ? TranslateString(999, 'Loading...') : TranslateString(999, 'Details')}
        </DetailsButton>
        {state.isOpen && (
          <InfoBlock>
            {type == 'MY-TOKEN' ? (
              <Text as="h1" color="textSubtle" mb="16px" style={{ textAlign: 'center' }}>
                {nft.tokenId}
              </Text>
            ) : (
              ''
            )}
            <InfoRow>
              <Text>{TranslateString(999, 'Breed')}:</Text>
              <Value>
                {nft.breed && nft.breed == '0' ? 'Phoenix Owl' : ''}
                {nft.breed && nft.breed == '1' ? 'Barn Owl' : ''}
                {nft.breed && nft.breed == '2' ? 'Eagle Owl' : ''}
                {nft.breed && nft.breed == '3' ? 'Screech Owl' : ''}
              </Value>
            </InfoRow>

            <InfoRow>
              <Text>{TranslateString(999, 'Claw')}:</Text>
              <Value> {nft.claw}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Level')}:</Text>
              <Value> {nft.level}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Wingspan')}:</Text>
              <Value> {nft.wingspan}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Sight')}:</Text>
              <Value> {nft.sight}</Value>
            </InfoRow>

            <InfoRow>
              <Text>
                {type == 'ALL' ? TranslateString(999, 'MIST to stake') : TranslateString(999, 'Value if unstaked')}:
              </Text>
              <Value>
                {nft.breed && nft.breed == '0' ? PRICELevelPhoenix[nft.level] : PRICELevelAll[nft.level]} MIST
              </Value>
            </InfoRow>
            {/* <InfoRow>
              <Text>{TranslateString(999, 'Number minted')}:</Text>
              <Value>{state.bunnyCount + state.bunnyBurnCount}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Number burned')}:</Text>
              <Value>{state.bunnyBurnCount}</Value>
            </InfoRow> */}
          </InfoBlock>
        )}
      </CardFooter>
    </Card>
  )
}

export default NftCard
