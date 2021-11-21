import React, { useState, useEffect, useContext } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/stakingNft'
import NftCard from './NftCard'
import NftGrid from './NftGrid'

import { NftProviderContext } from '../contexts/NftProvider'

const MyNftList = () => {
  const [page, setPage] = useState(0)
  const [sizePerPage, setSizePerPage] = useState(10)
  const [nftData, setNftData] = useState([])

  const { userNftToken } = useContext(NftProviderContext)

  useEffect(() => {
    let arr = []
    let userNftTokenData = userNftToken.slice(page * sizePerPage, sizePerPage)
    userNftTokenData.forEach((element, index) => {
      arr.push(nfts[element - 1])
    })
    setNftData(arr)
  }, [page, sizePerPage, userNftToken])

  return (
    <NftGrid>
      {nftData.map((element, index) => (
        <div key={index}>
          <NftCard nft={element} index={index} type="MY-TOKEN" />
        </div>
      ))}
    </NftGrid>
  )
}

export default MyNftList
