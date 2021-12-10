import React, { useState, useEffect, useContext } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/stakingNft'
import NftCard from './NftCard'
import styled from 'styled-components'

import { BaseLayout, Heading } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import NftGrid from './NftGrid'
import Pagination from 'react-responsive-pagination'
import Form from 'react-bootstrap/Form'
import { NftProviderContext } from '../contexts/NftProvider'
import { stakingNFTAddress, tokenContractAddress, nftTokenAddress } from '../../../config/constants/stakingNft'

const StyledHero = styled.div`
  // border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const NftList = () => {
  const [page, setPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(9)
  const [nftData, setNftData] = useState([])
  const { userNftToken, getOwnerOfToken } = useContext(NftProviderContext)

  const getOwner = async (tokenId) => {
    try {
      const tokenOwner = await getOwnerOfToken(tokenId)
      return tokenOwner == stakingNFTAddress || tokenOwner == false ? true : false
    } catch (error) {
      return true
    }
  }

  const [totalPage, setTotalPage] = useState(nfts.length / sizePerPage)

  // const totalPage = nfts.length / sizePerPage

  const [Level, setLevel] = useState('')
  const [Breed, setBreed] = useState('')
  const [Claw, setClaw] = useState(null)
  const [Wingspan, setWingspan] = useState(null)
  const [Sight, setSight] = useState(null)
  useEffect(() => {
    const setData = async () => {
      setNftData([])
      let mainData = nfts
      mainData = mainData.filter((e) => e.level == '1')

      if (Level != '') {
        mainData = mainData.filter((e) => e.level == Level)
      }
      if (Breed != '') {
        mainData = mainData.filter((e) => e.breed == Breed)
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

      const getCheckedData = await checkDataAndSet(mainData)
      let data = getCheckedData.slice((page - 1) * sizePerPage, (page - 1) * sizePerPage + sizePerPage)
      setNftData(data)
      setTotalPage(Math.floor(data.length / sizePerPage))
    }
    setData()
  }, [page, Level, Breed, Claw, Wingspan, Sight])

  const checkDataAndSet = async (data) => {
    let sendData = []
    for (const element of data) {
      const checkTokenOwner = await getOwner(element.tokenId)
      if (checkTokenOwner) {
        sendData.push(element)
      }
    }
    return sendData
  }

  return (
    <>
      {nftData.length > 0 ? (
        <>
          <div className="row mt-4">
            {/* <div className="col-12 col-md-2 mb-2">
          <Form.Select
            aria-label="Default select example"
            value={Level}
            id="as"
            onChange={(e) => {
              setLevel(e.target.value)
            }}
          >
            <option value={0}>Level</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
            <option value={4}>Four</option>
            <option value={5}>Five</option>
          </Form.Select>
        </div> */}
            <div className="col-12 col-md-2 mb-2">
              <Form.Select
                aria-label="Default select example"
                value={Breed}
                id="asads"
                onChange={(e) => {
                  setBreed(e.target.value)
                }}
              >
                <option value={''}>Breed</option>
                <option value={0}>Phoenix Owl</option>
                <option value={1}>Barn Owl</option>
                <option value={2}>Eagle Owl</option>
                <option value={3}>Screech Owl</option>
              </Form.Select>
            </div>

            <div className="col-12 col-md-2 mb-2">
              <Form.Select
                aria-label="Default select example"
                value={Claw}
                id="asdasd"
                onChange={(e) => {
                  setClaw(e.target.value)
                }}
              >
                <option value="null">Claw Size</option>
                <option value="LEGENDARY">LEGENDARY</option>
                <option value="AVERAGE">AVERAGE</option>
                <option value="MYSTICAL">MYSTICAL</option>
              </Form.Select>
            </div>

            <div className="col-12 col-md-2 mb-2">
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
            </div>

            <div className="col-12 col-md-2 mb-2">
              <Form.Select
                aria-label="Default select example"
                value={Sight}
                id="adsas"
                onChange={(e) => {
                  setSight(e.target.value)
                }}
              >
                <option value="null">Sight</option>
                <option value="LEGENDARY">LEGENDARY</option>
                <option value="AVERAGE">AVERAGE</option>
                <option value="MYSTICAL">MYSTICAL</option>
              </Form.Select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-md-12 mb-12">
              <NftGrid>
                {nftData.length > 0
                  ? nftData.map((element, index) => (
                      <div key={index}>
                        <NftCard nft={element} index={index} type="ALL" />
                      </div>
                    ))
                  : ''}
              </NftGrid>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-md-12 mb-12">
              <Pagination current={page} total={totalPage + 1} onPageChange={setPage} />
            </div>
          </div>
        </>
      ) : (
        <Page>
          <StyledHero>
            <Heading as="h2" size="lg" color="secondary">
              All Level 1 OWLs are Minted
            </Heading>
          </StyledHero>
        </Page>
      )}
    </>
  )
}

export default NftList
