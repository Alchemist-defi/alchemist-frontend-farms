import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'


import { getAurumAddress, getCakeAddress } from 'utils/addressHelpers'

import { useAurumTotalSupply, useAurumBurnedBalance } from 'hooks/useAurumTokenBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'

import { getBalanceNumber } from 'utils/formatBalance'
import { useGetStats } from 'hooks/api'
import { usePriceAurumBusd, useAurumTotalValue } from '../../../state/aurumHooks'
import { useFarms, usePriceCakeBusd, useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`


const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const mistTotalValue = useTotalValue()
  const aurumTotalValue = useAurumTotalValue();
  const consolidatedTotalValue = aurumTotalValue.plus(mistTotalValue);
  
  // const tvl = totalValue.toFixed(2);

  // combine Aurum and Mist Market caps to make the complete Market Cap
  // Get Aurum Details
  const aurumBurnedBalance = useAurumBurnedBalance(getAurumAddress());
  const aurumPrice = usePriceAurumBusd();      
  const aurumTotalSupply = useAurumTotalSupply();  
  const aurumCircSupply = aurumTotalSupply ? aurumTotalSupply.minus(aurumBurnedBalance) : new BigNumber(0);  
  const aurumMarketCap = aurumPrice.times(aurumCircSupply);

  // Get Mist Details
  const mistTotalSupply = useTotalSupply()
  const mistBurnedBalance = useBurnedBalance(getCakeAddress())  
  const mistPrice = usePriceCakeBusd();
  const mistCircSupply = mistTotalSupply ? mistTotalSupply.minus(mistBurnedBalance) : new BigNumber(0);  
  const mistMarketCap = mistPrice.times(mistCircSupply);


  // Combine Mist and AURUM
  const combinedMarketCap = aurumMarketCap.plus(mistMarketCap);

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Alchemist Defi Project Stats')}
        </Heading>
        <Row>
          <Text fontSize="18px">{TranslateString(999, 'MIST TVL')}</Text>          
          <CardValue fontSize="18px" value={mistTotalValue.toNumber()} prefix="$" decimals={0}/>          
        </Row>
        <Row>
          <Text fontSize="18px">{TranslateString(999, 'Aurum TVL')}</Text>          
          <CardValue fontSize="18px" value={aurumTotalValue.toNumber()} prefix="$" decimals={0}/>          
        </Row>
        <Row>
          <Text fontSize="18px">{TranslateString(999, 'Total TVL')}</Text>          
          <CardValue fontSize="18px" value={consolidatedTotalValue.toNumber()} prefix="$" decimals={0}/>          
        </Row>
        <Row>
          <Text fontSize="18px">{TranslateString(999, 'Alchemist Defi Market Cap')}</Text>                    
          <CardValue fontSize="18px" value={getBalanceNumber(combinedMarketCap)} decimals={0} prefix="$" />
        </Row>

      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
