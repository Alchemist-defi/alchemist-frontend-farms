import React, { useState, useContext, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { BaseLayout, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import HowItWorks from './components/HowItWorks'
// import NftList from './components/NftList'
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
  // const [imageUrl, setImageUrl] = useState([])
  // const [userNftToken, setUserNftToken] = useState([1])

  // // const { allowanceToken, isApprovedForAll, userNftToken, reInitialize } = useContext(NftProviderContext)

  // useEffect(() => {
  //   if (userNftToken.length > 0) {
  //     getImageUrl(userNftToken[0])
  //   }
  // }, [userNftToken])

  // const getImageUrl = async (index) => {
  //   axios
  //     .get(`ipfs://QmX52P9CHRP3URUYWrT7BAvkTr8bK66dWWSNxFKKeojpsQ/${index}`)
  //     .then((data) => {
  //       console.log('%c 🍝 data: ', 'font-size:20px;background-color: #FCA650;color:#fff;', data)
  //     })
  //     .catch((e) => {
  //       console.log('%c 🥃 e: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', e)
  //     })
  // }

  return (
    <NftProvider>
      <Page>
        <StyledHero>
          <Heading as="h1" size="xxl" color="secondary" mb="24px">
            NFTs
          </Heading>
          <Heading as="h2" size="lg" color="secondary">
            {TranslateString(999, 'Trade in for CAKE, or keep for your collection!')}
          </Heading>
        </StyledHero>
        {/* <Cards> */}
        <NftInfo />
        {/* </Cards> */}
        <HowItWorks />
        {/* <NftList /> */}
        {/* <Cards> */}
        <AddNft />
        {/* {userNftToken.length > 0 ? userNftToken.map((element) => ({ element })) : ''} */}
        {/* </Cards> */}
      </Page>
    </NftProvider>
  )
}

export default Nft
