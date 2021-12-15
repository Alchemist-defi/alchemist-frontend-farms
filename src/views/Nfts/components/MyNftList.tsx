import React, { useState, useEffect, useContext } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/stakingNft'
import NftCard from './NftCard'
import { BaseLayout, Heading } from '@pancakeswap-libs/uikit'
import NftGrid from './NftGrid'
import Page from 'components/layout/Page'
import styled from 'styled-components'

import { NftProviderContext } from '../contexts/NftProvider'
import { Link } from 'react-router-dom'

const StyledHero = styled.div`
  // border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const MyNftList = () => {
  const [page, setPage] = useState(0)
  const [sizePerPage, setSizePerPage] = useState(10)
  const [nftData, setNftData] = useState([])

  const { userNftToken } = useContext(NftProviderContext)

  useEffect(() => {
    let arr = []
    let userNftTokenData = userNftToken.slice(page * sizePerPage, sizePerPage)
    userNftTokenData.forEach((element, index) => {
      const tokenData = nfts.filter((e) => e.tokenId == element)
      arr.push(tokenData[0])
    })
    setNftData(arr)
  }, [page, sizePerPage, userNftToken])

  return (
    <>
      {nftData.length > 0 ? (
        <NftGrid>
          {nftData.map((element, index) => (
            <div key={index}>
              <NftCard nft={element} index={index} type="MY-TOKEN" />
            </div>
          ))}
        </NftGrid>
      ) : (
        <Page>
          <StyledHero>
            <Heading as="h2" size="lg" color="secondary">
              <Link to="/nft">You don't have any OWLs yet. Start your journey by staking in Owls of Origin</Link>
            </Heading>
          </StyledHero>
        </Page>
      )}
    </>
  )
}

export default MyNftList
