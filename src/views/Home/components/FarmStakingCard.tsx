import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import { useAurumAllHarvest } from 'hooks/useAurumHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import useAurumFarmsWithBalance from 'hooks/useAurumFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import { usePriceCakeBusd } from '../../../state/hooks'
import { usePriceAurumBusd } from '../../../state/aurumHooks'
import { getCakeAddress , getAurumAddress} from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllAurumEarnings from '../../../hooks/useAllAurumEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useAurumTokenBalance from '../../../hooks/useAurumTokenBalance'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import AurumWalletBalance from './AurumWalletBalance'
import AurumHarvestBalance from './AurumHarvestBalance'

const StyledFarmStakingCard = styled(Card)`  
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`


const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const aurumBalance = getBalanceNumber(useAurumTokenBalance(getAurumAddress()))
  const aurumPrice = usePriceAurumBusd().toNumber()
  const aurumFarmsWithBalance = useAurumFarmsWithBalance()
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const allAurumEarnings = useAllAurumEarnings()

  console.log ("farmsWithBalance")
  console.log (farmsWithBalance)


  console.log ("aurumFarmsWithBalance")
  console.log (aurumFarmsWithBalance)



  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)

  const aurumEarningsSum = allAurumEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)

  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const aurumBalancesWithValue = aurumFarmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))
  const { onAurumReward } = useAurumAllHarvest(aurumBalancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  // const harvestAllFarms = useCallback(async () => {
  //   setPendingTx(true)
  //   try {
  //     await onReward()
  //   } catch (error) {
  //     // TODO: find a way to handle when the user rejects transaction or it fails
  //   } finally {
  //     setPendingTx(false)
  //   }    

  // }, [onReward])


  // const harvestAllAurumFarms = useCallback(async () => {
  //   setPendingTx(true)
  //   try {
  //     await onAurumReward()
  //   } catch (error) {
  //     // TODO: find a way to handle when the user rejects transaction or it fails
  //   } finally {
  //     setPendingTx(false)
  //   }
  // }, [onAurumReward])

  
  const harvestAllCombinedFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }    
    setPendingTx(true)
    try {
      await onAurumReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }

  }, [onAurumReward, onReward])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24">
          {TranslateString(999, 'Balances')}
        </Heading>
        <Row>        
          <Label>{TranslateString(544, 'MIST to Harvest')}</Label>
          <CakeHarvestBalance earningsSum={earningsSum}/>
          <Label>~${(eggPrice * earningsSum).toFixed(2)}</Label>
        </Row>
        <Row>                  
          <Label>{TranslateString(546, 'MIST in Wallet')}</Label>
          <CakeWalletBalance cakeBalance={cakeBalance} />
          <Label>~${(eggPrice * cakeBalance).toFixed(2)}</Label>        
        </Row>
        <Divider />    
        <Row>        
          <Label>{TranslateString(999, 'AURUM to Harvest')}</Label>
          <AurumHarvestBalance aurumEarningsSum={aurumEarningsSum}/>
          <Label>~${(aurumPrice * aurumEarningsSum).toFixed(2)}</Label>
        </Row>
        <Row>                  
          <Label>{TranslateString(999, 'AURUM in Wallet')}</Label>
          <AurumWalletBalance aurumBalance={aurumBalance} />
          <Label>~${(aurumPrice * aurumBalance).toFixed(2)}</Label>        
        </Row>


        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={(balancesWithValue.length <= 0 && aurumBalancesWithValue.length <= 0)  || pendingTx}
              onClick={harvestAllCombinedFarms}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting MIST')
                : TranslateString(999, `Harvest All (Aurum + Mist) (${balancesWithValue.length + aurumBalancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
