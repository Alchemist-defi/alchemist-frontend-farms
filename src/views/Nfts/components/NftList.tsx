import React, { useState, useEffect } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/stakingNft'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
import Pagination from 'react-responsive-pagination'

const NftList = () => {
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(3)
  const [nftData, setNftData] = useState([])
  const totalPage = nfts.length / sizePerPage

  useEffect(() => {
    setNftData([])
    let data = nfts.slice((page - 1) * sizePerPage, (page - 1) * sizePerPage + sizePerPage)
    setNftData(data)
  }, [page])

  return (
    <>
      <NftGrid>
        {nftData.map((element, index) => (
          <div key={index}>
            <NftCard nft={element} index={index} type="ALL" />
          </div>
        ))}
      </NftGrid>
      <Pagination current={page} total={totalPage + 1} onPageChange={setPage} />
    </>
  )
}

export default NftList
