import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text, Link } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'

const StyledInfoCard = styled(Card)`
  background: linear-gradient(#0088f6, #1b308a);
  align-items: center;
  display: flex;
  flex: 1;
  text-align: center;
  width: 100%;
  & > div {
    width: 100%;        
    background-repeat: no-repeat;
    background-size: 25%;
    background-position: bottom left, bottom right;
    margint-bottom: 0px;
  }
`


const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`


const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const AurumMistDescCard = () => {
  const TranslateString = useI18n()
  return (
    <StyledInfoCard>
      <CardBody>
        <Heading color="invertedContrast" size="lg" mb="24px">
          {TranslateString(999, '$MIST and $AURUM Explained')}
        </Heading>
            <Text color="invertedContrast">
              {TranslateString(999, 'Mist is a mystical token that helps you turn your Crypto into Gold (Aurum).  You can earn MIST in our first layer and then use that MIST to start earning AURUM in our second layer.')}
            </Text>
            <Divider />            
            <Text color="invertedContrast">
              {TranslateString(999, 'AURUM is Latin for Gold, and just like Gold AURUM is intended to be a store of value and is very scarce because of its low emission rate. AURUM will also have special powers in the future allowing you to cast spells (and votes).')}
            </Text>
            <Divider />
            <Text color="invertedContrast">
              {TranslateString(999, 'MIST and AURUM  combine very well together in both  layers, with the highest multipliers applied to this level, magically generating you the highest APR!')}
            </Text>
      </CardBody>
    </StyledInfoCard>
  )
}

export default AurumMistDescCard
