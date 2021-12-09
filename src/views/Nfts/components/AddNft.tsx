import React from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/nfts'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
import { Card, CardBody, Heading, OpenNewIcon, Text, Link as UIKitLink, Progress, Button, Svg } from '@pancakeswap-libs/uikit'
import InfoRow from './InfoRow'

const AddNft = () => {
  return (
    <NftGrid>
      {/* {orderBy(nfts, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <NftCard nft={nft} />
        </div>
      ))} */}
      <Card>
      <CardBody style={{ textAlign : "center"}}>
        <div>
       <img src="images/add.png" />
      </div>
        {/* <InfoRow> */}
        <Button>
            Mint New NFTs
        </Button>
        {/* </InfoRow> */}
      </CardBody>
    </Card>
    </NftGrid>
  )
}

export default AddNft
