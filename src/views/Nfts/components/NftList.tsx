import React, { useState, useEffect } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/stakingNft'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
import Pagination from 'react-responsive-pagination'
import Form from 'react-bootstrap/Form'

const NftList = () => {
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(3)
  const [nftData, setNftData] = useState([])

  const [totalPage, setTotalPage] = useState(nfts.length / sizePerPage)

  // const totalPage = nfts.length / sizePerPage

  const [Level, setLevel] = useState(0)
  const [Breed, setBreed] = useState(0)
  const [Claw, setClaw] = useState(null)
  const [Wingspan, setWingspan] = useState(null)
  const [Sight, setSight] = useState(null)

  useEffect(() => {
    setNftData([])
    let mainData = nfts
    if (Level > 0) {
      mainData = mainData.filter((e) => e.level == Level)
    }
    if (Breed > 0) {
      mainData = mainData.filter((e) => e.level == Level)
    }
    if (Claw) {
      mainData = mainData.filter((e) => e.claw == Claw)
    }
    if (Wingspan) {
      mainData = mainData.filter((e) => e.wingspan == Wingspan)
    }
    if (Sight) {
      mainData = mainData.filter((e) => e.sight == Sight)
    }

    let data = mainData.slice((page - 1) * sizePerPage, (page - 1) * sizePerPage + sizePerPage)
    setNftData(data)
    setTotalPage(mainData.length / sizePerPage)
  }, [page, Level, Breed, Claw, Wingspan, Sight])

  return (
    <>
      <div>
        <Form.Select
          aria-label="Default select example"
          value={Level}
          id="as"
          onChange={(e) => {
            setLevel(parseInt(e.target.value))
          }}
        >
          <option value={0}>Level</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
          <option value={4}>Four</option>
          <option value={5}>Five</option>
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          value={Breed}
          id="asads"
          onChange={(e) => {
            setBreed(parseInt(e.target.value))
          }}
        >
          <option value={0}>Breed</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
          <option value={4}>Four</option>
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          value={Claw}
          id="asdasd"
          onChange={(e) => {
            setClaw(e.target.value)
          }}
        >
          <option value="null">Claw</option>
          <option value="LEGENDARY">LEGENDARY</option>
          <option value="AVERAGE">AVERAGE</option>
          <option value="MYSTICAL">MYSTICAL</option>
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          value={Wingspan}
          id="saddas"
          onChange={(e) => {
            setWingspan(e.target.value)
          }}
        >
          <option value="null">Wingspan</option>
          <option value="LEGENDARY">LEGENDARY</option>
          <option value="AVERAGE">AVERAGE</option>
          <option value="MYSTICAL">MYSTICAL</option>
        </Form.Select>
        <Form.Select aria-label="Default select example">
          value={Sight}
          id="adsas" onChange=
          {(e) => {
            setSight(e.target.value)
          }}
          <option value="null">Sight</option>
          <option value="LEGENDARY">LEGENDARY</option>
          <option value="AVERAGE">AVERAGE</option>
          <option value="MYSTICAL">MYSTICAL</option>
        </Form.Select>
      </div>
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
