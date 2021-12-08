import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import HowItWorks from './components/HowItWorks'
import NftList from './components/NftList'
import NftProvider from './contexts/NftProvider'
import NftInfo from './components/NftInfo'
import AddNft from './components/AddNft'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`
const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 6;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const Nft = () => {
  const TranslateString = useI18n()

  return (
    <NftProvider>
      <Page>
        <StyledHero>
          <Heading as="h1" size="xxl" color="secondary" mb="24px">
            Owls of Origin
          </Heading>
          <Heading as="h2" size="lg" color="secondary">
            {TranslateString(999, 'Stake MIST for an Owl of Origin')}
          </Heading>
        </StyledHero>
        {/* <Cards> */}
        <NftInfo />
        {/* </Cards> */}
        {/* <HowItWorks /> */}
        <NftList />
        {/* <Cards> */}
        {/* <AddNft /> */}
        {/* </Cards> */}
      </Page>
    </NftProvider>
  )
}

export default Nft
